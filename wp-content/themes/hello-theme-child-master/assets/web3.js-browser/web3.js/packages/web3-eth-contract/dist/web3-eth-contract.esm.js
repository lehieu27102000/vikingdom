import * as Utils from 'web3-utils';
import { formatters } from 'web3-core-helpers';
import { AbiCoder } from 'web3-eth-abi';
import isArray from 'lodash/isArray';
import { PromiEvent, EthSendTransactionMethod, CallMethod, GetPastLogsMethod, ChainIdMethod, GetTransactionCountMethod, EstimateGasMethod, TransactionObserver, GetTransactionReceiptMethod, GetBlockByNumberMethod } from 'web3-core-method';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import cloneDeep from 'lodash/cloneDeep';
import { NewHeadsSubscription, LogSubscription } from 'web3-core-subscriptions';
import { AbstractWeb3Module } from 'web3-core';

class AbiModel {
  constructor(mappedAbi) {
    this.abi = mappedAbi;
  }
  getMethod(name) {
    if (this.hasMethod(name)) {
      return this.abi.methods[name];
    }
    return false;
  }
  getMethods() {
    return this.abi.methods;
  }
  getEvent(name) {
    if (this.hasEvent(name)) {
      return this.abi.events[name];
    }
    return false;
  }
  getEvents() {
    return this.abi.events;
  }
  getEventBySignature(signature) {
    let event;
    Object.keys(this.abi.events).forEach(key => {
      if (this.abi.events[key].signature === signature) {
        event = this.abi.events[key];
      }
    });
    return event;
  }
  hasMethod(name) {
    return typeof this.abi.methods[name] !== 'undefined';
  }
  hasEvent(name) {
    return typeof this.abi.events[name] !== 'undefined';
  }
}

class AbiItemModel {
  constructor(abiItem) {
    this.abiItem = abiItem;
    this.signature = this.abiItem.signature;
    this.name = this.abiItem.name;
    this.payable = this.abiItem.payable;
    this.anonymous = this.abiItem.anonymous;
    this.contractMethodParameters = [];
  }
  getInputLength() {
    if (isArray(this.abiItem.inputs)) {
      return this.abiItem.inputs.length;
    }
    return 0;
  }
  getInputs() {
    if (isArray(this.abiItem.inputs)) {
      return this.abiItem.inputs;
    }
    return [];
  }
  getOutputs() {
    if (isArray(this.abiItem.outputs)) {
      return this.abiItem.outputs;
    }
    return [];
  }
  getIndexedInputs() {
    return this.getInputs().filter(input => {
      return input.indexed === true;
    });
  }
  isOfType(type) {
    return this.abiItem.type === type;
  }
}

class MethodEncoder {
  constructor(abiCoder) {
    this.abiCoder = abiCoder;
  }
  encode(abiItemModel, deployData) {
    let encodedParameters = this.abiCoder.encodeParameters(abiItemModel.getInputs(), abiItemModel.contractMethodParameters);
    if (encodedParameters.startsWith('0x')) {
      encodedParameters = encodedParameters.slice(2);
    }
    if (abiItemModel.isOfType('constructor')) {
      if (!deployData) {
        throw new Error('The contract has no contract data option set. This is necessary to append the constructor parameters.');
      }
      return deployData + encodedParameters;
    }
    if (abiItemModel.isOfType('function')) {
      return abiItemModel.signature + encodedParameters;
    }
    return encodedParameters;
  }
}

class EventFilterEncoder {
  constructor(abiCoder) {
    this.abiCoder = abiCoder;
  }
  encode(abiItemModel, filter) {
    let topics = [];
    abiItemModel.getIndexedInputs().forEach(input => {
      if (filter[input.name]) {
        let filterItem = filter[input.name];
        if (isArray(filterItem)) {
          filterItem = filterItem.map(item => {
            return this.abiCoder.encodeParameter(input.type, item);
          });
          topics.push(filterItem);
          return;
        }
        topics.push(this.abiCoder.encodeParameter(input.type, filterItem));
        return;
      }
      topics.push(null);
    });
    return topics;
  }
}

class AllEventsFilterEncoder extends EventFilterEncoder {
  encode(abiModel, filter) {
    const events = abiModel.getEvents();
    let topics = [];
    Object.keys(events).forEach(key => {
      topics.push(super.encode(events[key], filter));
    });
    return topics;
  }
}

class EventLogDecoder {
  constructor(abiCoder) {
    this.abiCoder = abiCoder;
  }
  decode(abiItemModel, response) {
    let argumentTopics = response.topics;
    if (!abiItemModel.anonymous) {
      argumentTopics = response.topics.slice(1);
    }
    if (response.data === '0x') {
      response.data = null;
    }
    response.returnValues = this.abiCoder.decodeLog(abiItemModel.getInputs(), response.data, argumentTopics);
    response.event = abiItemModel.name;
    response.signature = abiItemModel.signature;
    response.raw = {
      data: response.data,
      topics: response.topics
    };
    if (abiItemModel.anonymous || !response.topics[0]) {
      response.signature = null;
    }
    delete response.data;
    delete response.topics;
    return response;
  }
}

class AllEventsLogDecoder extends EventLogDecoder {
  constructor(abiCoder) {
    super(abiCoder);
  }
  decode(abiModel, response) {
    const abiItemModel = abiModel.getEventBySignature(response.topics[0]);
    if (abiItemModel) {
      return super.decode(abiItemModel, response);
    }
    return {
      raw: {
        data: response.data,
        topics: response.topics
      }
    };
  }
}

class AbiMapper {
  constructor(contractModuleFactory, abiCoder, utils) {
    this.utils = utils;
    this.abiCoder = abiCoder;
    this.contractModuleFactory = contractModuleFactory;
    this.hasConstructor = false;
  }
  map(abi) {
    const mappedAbiItems = {
      methods: {},
      events: {}
    };
    abi.forEach(abiItem => {
      abiItem.constant = this.isConstant(abiItem);
      abiItem.payable = this.isPayable(abiItem);
      if (abiItem.name) {
        abiItem.funcName = this.utils.jsonInterfaceMethodToString(abiItem);
      }
      let abiItemModel;
      if (abiItem.type === 'function') {
        abiItem.signature = this.abiCoder.encodeFunctionSignature(abiItem.funcName);
        abiItemModel = this.contractModuleFactory.createAbiItemModel(abiItem);
        if (!mappedAbiItems.methods[abiItem.name]) {
          mappedAbiItems.methods[abiItem.name] = abiItemModel;
        } else {
          if (isArray(mappedAbiItems.methods[abiItem.name])) {
            mappedAbiItems.methods[abiItem.name].push(abiItemModel);
          } else {
            mappedAbiItems.methods[abiItem.name] = [mappedAbiItems.methods[abiItem.name], abiItemModel];
          }
        }
        mappedAbiItems.methods[abiItem.signature] = abiItemModel;
        mappedAbiItems.methods[abiItem.funcName] = abiItemModel;
        return;
      }
      if (abiItem.type === 'event') {
        abiItem.signature = this.abiCoder.encodeEventSignature(abiItem.funcName);
        abiItemModel = this.contractModuleFactory.createAbiItemModel(abiItem);
        if (!mappedAbiItems.events[abiItem.name] || mappedAbiItems.events[abiItem.name].name === 'bound ') {
          mappedAbiItems.events[abiItem.name] = abiItemModel;
        }
        mappedAbiItems.events[abiItem.signature] = abiItemModel;
        mappedAbiItems.events[abiItem.funcName] = abiItemModel;
      }
      if (abiItem.type === 'constructor') {
        abiItem.signature = abiItem.type;
        mappedAbiItems.methods['contractConstructor'] = this.contractModuleFactory.createAbiItemModel(abiItem);
        this.hasConstructor = true;
      }
    });
    if (!this.hasConstructor) {
      mappedAbiItems.methods['contractConstructor'] = this.contractModuleFactory.createAbiItemModel({
        inputs: [],
        payable: false,
        constant: false,
        type: 'constructor'
      });
    }
    return this.contractModuleFactory.createAbiModel(mappedAbiItems);
  }
  isConstant(abiItem) {
    return abiItem.stateMutability === 'view' || abiItem.stateMutability === 'pure' || abiItem.constant;
  }
  isPayable(abiItem) {
    return abiItem.stateMutability === 'payable' || abiItem.payable;
  }
}

class MethodOptionsMapper {
  constructor(utils, formatters) {
    this.utils = utils;
    this.formatters = formatters;
  }
  map(contract, options) {
    let from = null;
    if (options.from) {
      from = this.utils.toChecksumAddress(this.formatters.inputAddressFormatter(options.from));
    }
    options.to = contract.address;
    options.from = from || contract.defaultAccount;
    options.gasPrice = options.gasPrice || contract.defaultGasPrice;
    options.gas = options.gas || options.gasLimit || contract.defaultGas;
    delete options.gasLimit;
    return options;
  }
}

class EventOptionsMapper {
  constructor(formatters, eventFilterEncoder) {
    this.formatters = formatters;
    this.eventFilterEncoder = eventFilterEncoder;
  }
  map(abiItemModel, contract, options) {
    if (!options) {
      options = {};
    }
    if (!isArray(options.topics)) {
      options.topics = [];
    }
    if (typeof options.fromBlock !== 'undefined') {
      options.fromBlock = this.formatters.inputBlockNumberFormatter(options.fromBlock);
    } else if (contract.defaultBlock !== null) {
      options.fromBlock = contract.defaultBlock;
    }
    if (typeof options.toBlock !== 'undefined') {
      options.toBlock = this.formatters.inputBlockNumberFormatter(options.toBlock);
    }
    if (typeof options.filter !== 'undefined') {
      options.topics = options.topics.concat(this.eventFilterEncoder.encode(abiItemModel, options.filter));
      delete options.filter;
    }
    if (!abiItemModel.anonymous) {
      options.topics.unshift(abiItemModel.signature);
    }
    if (!options.address) {
      options.address = contract.address;
    }
    return options;
  }
}

class AllEventsOptionsMapper {
  constructor(formatters, allEventsFilterEncoder) {
    this.formatters = formatters;
    this.allEventsFilterEncoder = allEventsFilterEncoder;
  }
  map(abiModel, contract, options) {
    if (!options) {
      options = {};
    }
    if (!isArray(options.topics)) {
      options.topics = [];
    }
    if (typeof options.fromBlock !== 'undefined') {
      options.fromBlock = this.formatters.inputBlockNumberFormatter(options.fromBlock);
    } else if (contract.defaultBlock !== null) {
      options.fromBlock = contract.defaultBlock;
    }
    if (typeof options.toBlock !== 'undefined') {
      options.toBlock = this.formatters.inputBlockNumberFormatter(options.toBlock);
    }
    if (typeof options.filter !== 'undefined') {
      options.topics = options.topics.concat(this.allEventsFilterEncoder.encode(abiModel, options.filter));
      delete options.filter;
    }
    if (!options.address) {
      options.address = contract.address;
    }
    return options;
  }
}

class MethodsProxy {
  constructor(contract, methodFactory, methodEncoder, methodOptionsValidator, methodOptionsMapper) {
    this.contract = contract;
    this.methodFactory = methodFactory;
    this.methodEncoder = methodEncoder;
    this.methodOptionsValidator = methodOptionsValidator;
    this.methodOptionsMapper = methodOptionsMapper;
    return new Proxy(this, {
      get: (target, name) => {
        if (this.contract.abiModel.hasMethod(name)) {
          let abiItemModel = this.contract.abiModel.getMethod(name);
          function ContractMethod() {
            let methodArguments = [...arguments];
            if (name === 'contractConstructor') {
              if (methodArguments[0]) {
                if (methodArguments[0]['data']) {
                  target.contract.data = methodArguments[0]['data'];
                }
                if (methodArguments[0]['arguments']) {
                  abiItemModel.contractMethodParameters = methodArguments[0]['arguments'];
                }
                return ContractMethod;
              }
              abiItemModel.contractMethodParameters = [];
              return ContractMethod;
            }
            if (isArray(abiItemModel)) {
              const abiItemModelFound = abiItemModel.some(model => {
                if (model.getInputLength() === methodArguments.length) {
                  abiItemModel = model;
                  return true;
                }
                return false;
              });
              if (!abiItemModelFound) {
                throw new Error(`Methods with name "${name}" found but the given parameters are wrong`);
              }
            }
            abiItemModel.contractMethodParameters = methodArguments;
            return ContractMethod;
          }
          ContractMethod.call = function () {
            return target.executeMethod(abiItemModel, arguments, 'call');
          };
          ContractMethod.send = function () {
            if (abiItemModel.isOfType('constructor')) {
              return target.executeMethod(abiItemModel, arguments, 'contract-deployment');
            }
            return target.executeMethod(abiItemModel, arguments, 'send');
          };
          ContractMethod.call.request = function () {
            return target.createMethod(abiItemModel, arguments, 'call');
          };
          ContractMethod.send.request = function () {
            return target.createMethod(abiItemModel, arguments, 'send');
          };
          ContractMethod.estimateGas = function () {
            return target.executeMethod(abiItemModel, arguments, 'estimate');
          };
          ContractMethod.encodeABI = function () {
            return target.methodEncoder.encode(abiItemModel, target.contract.data);
          };
          return ContractMethod;
        }
        return Reflect.get(target, name);
      }
    });
  }
  executeMethod(abiItemModel, methodArguments, requestType) {
    let method;
    try {
      method = this.createMethod(abiItemModel, methodArguments, requestType);
    } catch (error) {
      const promiEvent = new PromiEvent();
      method = this.methodFactory.createMethodByRequestType(abiItemModel, this.contract, requestType);
      method.setArguments(methodArguments);
      if (isFunction(method.callback)) {
        method.callback(error, null);
      }
      promiEvent.reject(error);
      promiEvent.emit('error', error);
      return promiEvent;
    }
    return method.execute();
  }
  createMethod(abiItemModel, methodArguments, requestType) {
    const method = this.methodFactory.createMethodByRequestType(abiItemModel, this.contract, requestType);
    method.setArguments(methodArguments);
    if (!method.parameters[0]) {
      method.parameters[0] = {};
    }
    method.parameters[0]['data'] = this.methodEncoder.encode(abiItemModel, this.contract.data);
    method.parameters[0] = this.methodOptionsMapper.map(this.contract, method.parameters[0]);
    this.methodOptionsValidator.validate(abiItemModel, method);
    return method;
  }
}

class EventSubscriptionsProxy {
  constructor(contract, eventSubscriptionFactory, eventOptionsMapper, eventLogDecoder, allEventsLogDecoder, allEventsOptionsMapper) {
    this.contract = contract;
    this.eventSubscriptionFactory = eventSubscriptionFactory;
    this.eventOptionsMapper = eventOptionsMapper;
    this.eventLogDecoder = eventLogDecoder;
    this.allEventsLogDecoder = allEventsLogDecoder;
    this.allEventsOptionsMapper = allEventsOptionsMapper;
    return new Proxy(this, {
      get: (target, name) => {
        if (this.contract.abiModel.hasEvent(name)) {
          return (options, callback) => {
            return target.subscribe(target.contract.abiModel.getEvent(name), cloneDeep(options), callback);
          };
        }
        if (name === 'allEvents') {
          return (options, callback) => {
            return target.subscribeAll(cloneDeep(options), callback);
          };
        }
        return Reflect.get(target, name);
      }
    });
  }
  subscribe(abiItemModel, options, callback) {
    if (options && !isUndefined(options.filter) && !isUndefined(options.topics)) {
      this.handleValidationError('Invalid subscription options: Only filter or topics are allowed and not both', callback);
      return;
    }
    return this.eventSubscriptionFactory.createEventLogSubscription(this.eventLogDecoder, this.contract, this.eventOptionsMapper.map(abiItemModel, this.contract, options), abiItemModel).subscribe(callback);
  }
  subscribeAll(options, callback) {
    if (options && !isUndefined(options.filter) && !isUndefined(options.topics)) {
      this.handleValidationError('Invalid subscription options: Only filter or topics are allowed and not both', callback);
      return;
    }
    return this.eventSubscriptionFactory.createAllEventsLogSubscription(this.allEventsLogDecoder, this.contract, this.allEventsOptionsMapper.map(this.contract.abiModel, this.contract, options)).subscribe(callback);
  }
  handleValidationError(errorMessage, callback) {
    const error = new Error(errorMessage);
    if (isFunction(callback)) {
      callback(error, null);
    }
    throw error;
  }
}

class SendContractMethod extends EthSendTransactionMethod {
  constructor(utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod, allEventsLogDecoder, abiModel) {
    super(utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod);
    this.allEventsLogDecoder = allEventsLogDecoder;
    this.abiModel = abiModel;
  }
  afterExecution(response) {
    if (isArray(response.logs)) {
      response.events = {};
      response.logs.forEach((log, index) => {
        log = this.allEventsLogDecoder.decode(this.abiModel, log);
        if (log.event) {
          if (response.events[log.event]) {
            if (isArray(response.events[log.event])) {
              response.events[log.event].push(log);
              return;
            }
            response.events[log.event] = [response.events[log.event], log];
            return;
          }
          response.events[log.event] = log;
          return;
        }
        response.events[index] = log;
      });
      delete response.logs;
    }
    return super.afterExecution(response);
  }
}

class MethodOptionsValidator {
  constructor(utils) {
    this.utils = utils;
  }
  validate(abiItemModel, method) {
    if (!this.isToSet(abiItemModel, method)) {
      throw new Error("This contract object doesn't have address set yet, please set an address first.");
    }
    if (!this.isFromSet(method) && method instanceof SendContractMethod) {
      throw new Error('No valid "from" address specified in neither the given options, nor the default options.');
    }
    if (!this.isValueValid(abiItemModel, method)) {
      throw new Error('Can not send value to non-payable contract method or constructor');
    }
    return true;
  }
  isToSet(abiItemModel, method) {
    if (abiItemModel.isOfType('constructor')) {
      return true;
    }
    return this.utils.isAddress(method.parameters[0].to);
  }
  isFromSet(method) {
    return this.utils.isAddress(method.parameters[0].from);
  }
  isValueValid(abiItemModel, method) {
    return abiItemModel.payable || !abiItemModel.payable && !method.parameters[0].value;
  }
}

class CallContractMethod extends CallMethod {
  constructor(utils, formatters, moduleInstance, abiCoder, abiItemModel) {
    super(utils, formatters, moduleInstance);
    this.abiCoder = abiCoder;
    this.abiItemModel = abiItemModel;
  }
  afterExecution(response) {
    if (!response || response === '0x') {
      return null;
    }
    const outputs = this.abiItemModel.getOutputs();
    if (outputs.length > 1) {
      return this.abiCoder.decodeParameters(outputs, response);
    }
    return this.abiCoder.decodeParameter(outputs[0], response);
  }
}

class ContractDeployMethod extends EthSendTransactionMethod {
  constructor(utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod) {
    super(utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod);
  }
  beforeExecution(moduleInstance) {
    if (this.rpcMethod !== 'eth_sendRawTransaction') {
      super.beforeExecution(moduleInstance);
      delete this.parameters[0].to;
    }
  }
  afterExecution(response) {
    const clonedContract = this.moduleInstance.clone();
    clonedContract.address = response.contractAddress;
    if (this.promiEvent.listenerCount('receipt') > 0) {
      this.promiEvent.emit('receipt', super.afterExecution(response));
      this.promiEvent.removeAllListeners('receipt');
    }
    return clonedContract;
  }
}

class PastEventLogsMethod extends GetPastLogsMethod {
  constructor(utils, formatters, moduleInstance, eventLogDecoder, abiItemModel, eventOptionsMapper) {
    super(utils, formatters, moduleInstance);
    this.abiItemModel = abiItemModel;
    this.eventLogDecoder = eventLogDecoder;
    this.eventOptionsMapper = eventOptionsMapper;
  }
  beforeExecution(moduleInstance) {
    super.beforeExecution(moduleInstance);
    this.parameters[0] = this.eventOptionsMapper.map(this.abiItemModel, moduleInstance, this.parameters[0]);
  }
  afterExecution(response) {
    const formattedLogs = super.afterExecution(response);
    return formattedLogs.map(logItem => {
      return this.eventLogDecoder.decode(this.abiItemModel, logItem);
    });
  }
}

class AllPastEventLogsMethod extends GetPastLogsMethod {
  constructor(utils, formatters, moduleInstance, allEventsLogDecoder, abiModel, allEventsOptionsMapper) {
    super(utils, formatters, moduleInstance);
    this.abiModel = abiModel;
    this.allEventsLogDecoder = allEventsLogDecoder;
    this.allEventsOptionsMapper = allEventsOptionsMapper;
  }
  beforeExecution(moduleInstance) {
    super.beforeExecution(moduleInstance);
    this.parameters[0] = this.allEventsOptionsMapper.map(this.abiModel, moduleInstance, this.parameters[0]);
  }
  afterExecution(response) {
    const formattedLogs = super.afterExecution(response);
    return formattedLogs.map(logItem => {
      return this.allEventsLogDecoder.decode(this.abiModel, logItem);
    });
  }
}

class MethodFactory {
  constructor(utils, formatters, contractModuleFactory, abiCoder) {
    this.utils = utils;
    this.formatters = formatters;
    this.contractModuleFactory = contractModuleFactory;
    this.abiCoder = abiCoder;
  }
  createMethodByRequestType(abiItem, contract, requestType) {
    let rpcMethod;
    switch (requestType) {
      case 'call':
        rpcMethod = this.createCallContractMethod(abiItem, contract);
        break;
      case 'send':
        rpcMethod = this.createSendContractMethod(contract);
        break;
      case 'estimate':
        rpcMethod = this.createEstimateGasMethod(contract);
        break;
      case 'contract-deployment':
        rpcMethod = this.createContractDeployMethod(contract);
        break;
    }
    if (typeof rpcMethod === 'undefined') {
      throw new TypeError(`RPC call not found with requestType: "${requestType}"`);
    }
    return rpcMethod;
  }
  createPastEventLogsMethod(abiItem, contract) {
    return new PastEventLogsMethod(this.utils, this.formatters, contract, this.contractModuleFactory.createEventLogDecoder(), abiItem, this.contractModuleFactory.createEventOptionsMapper());
  }
  createAllPastEventLogsMethod(abiModel, contract) {
    return new AllPastEventLogsMethod(this.utils, this.formatters, contract, this.contractModuleFactory.createAllEventsLogDecoder(), abiModel, this.contractModuleFactory.createAllEventsOptionsMapper());
  }
  createCallContractMethod(abiItem, contract) {
    return new CallContractMethod(this.utils, this.formatters, contract, this.abiCoder, abiItem);
  }
  createSendContractMethod(contract) {
    return new SendContractMethod(this.utils, this.formatters, contract, this.createTransactionObserver(contract), new ChainIdMethod(this.utils, this.formatters, contract), new GetTransactionCountMethod(this.utils, this.formatters, contract), this.contractModuleFactory.createAllEventsLogDecoder(), contract.abiModel);
  }
  createContractDeployMethod(contract) {
    return new ContractDeployMethod(this.utils, this.formatters, contract, this.createTransactionObserver(contract), new ChainIdMethod(this.utils, this.formatters, contract), new GetTransactionCountMethod(this.utils, this.formatters, contract));
  }
  createEstimateGasMethod(contract) {
    return new EstimateGasMethod(this.utils, this.formatters, contract);
  }
  getTimeout(contract) {
    let timeout = contract.transactionBlockTimeout;
    if (!contract.currentProvider.supportsSubscriptions()) {
      timeout = contract.transactionPollingTimeout;
    }
    return timeout;
  }
  createTransactionObserver(contract) {
    return new TransactionObserver(contract.currentProvider, this.getTimeout(contract), contract.transactionConfirmationBlocks, new GetTransactionReceiptMethod(this.utils, this.formatters, contract), new GetBlockByNumberMethod(this.utils, this.formatters, contract), new NewHeadsSubscription(this.utils, this.formatters, contract));
  }
}

class EventLogSubscription extends LogSubscription {
  constructor(options, utils, formatters, contract, getPastLogsMethod, eventLogDecoder, abiItemModel) {
    super(options, utils, formatters, contract, getPastLogsMethod);
    this.eventLogDecoder = eventLogDecoder;
    this.abiItemModel = abiItemModel;
  }
  onNewSubscriptionItem(subscriptionItem) {
    let log = this.formatters.outputLogFormatter(subscriptionItem);
    if (log.removed) {
      log = this.eventLogDecoder.decode(this.abiItemModel, log);
      this.emit('changed', log);
      return log;
    }
    return this.eventLogDecoder.decode(this.abiItemModel, log);
  }
}

class AllEventsLogSubscription extends LogSubscription {
  constructor(options, utils, formatters, contract, getPastLogsMethod, allEventsLogDecoder, abiModel) {
    super(options, utils, formatters, contract, getPastLogsMethod);
    this.allEventsLogDecoder = allEventsLogDecoder;
    this.abiModel = abiModel;
  }
  onNewSubscriptionItem(subscriptionItem) {
    let log = this.formatters.outputLogFormatter(subscriptionItem);
    if (log.removed) {
      log = this.allEventsLogDecoder.decode(this.abiModel, log);
      this.emit('changed', log);
      return log;
    }
    return this.allEventsLogDecoder.decode(this.abiModel, log);
  }
}

class EventSubscriptionFactory {
  constructor(utils, formatters) {
    this.utils = utils;
    this.formatters = formatters;
  }
  createEventLogSubscription(eventLogDecoder, contract, options, abiItemModel) {
    return new EventLogSubscription(options, this.utils, this.formatters, contract, new GetPastLogsMethod(this.utils, this.formatters, contract), eventLogDecoder, abiItemModel);
  }
  createAllEventsLogSubscription(allEventsLogDecoder, contract, options) {
    return new AllEventsLogSubscription(options, this.utils, this.formatters, contract, new GetPastLogsMethod(this.utils, this.formatters, contract), allEventsLogDecoder, contract.abiModel);
  }
}

class AbstractContract extends AbstractWeb3Module {
  constructor(provider, contractModuleFactory, accounts, abiCoder, utils, formatters, abi = [], address = '', options = {}) {
    super(provider, options, null, null);
    this.contractModuleFactory = contractModuleFactory;
    this.abiCoder = abiCoder;
    this.utils = utils;
    this.formatters = formatters;
    this.abiMapper = this.contractModuleFactory.createAbiMapper();
    this.options = options;
    this.accounts = accounts;
    this.methodFactory = this.contractModuleFactory.createMethodFactory();
    this.abiModel = this.abiMapper.map(abi);
    this.transactionSigner = options.transactionSigner;
    this.methods = this.contractModuleFactory.createMethodsProxy(this);
    this.events = this.contractModuleFactory.createEventSubscriptionsProxy(this);
    if (address) {
      this.address = address;
    }
  }
  get jsonInterface() {
    return this.abiModel;
  }
  set jsonInterface(value) {
    this.abiModel = this.abiMapper.map(value);
    this.methods.abiModel = this.abiModel;
    this.events.abiModel = this.abiModel;
  }
  get address() {
    return this.options.address;
  }
  set address(value) {
    this.options.address = value;
  }
  get data() {
    return this.options.data;
  }
  set data(value) {
    this.options.data = value;
  }
  once(eventName, options, callback) {
    if (!callback) {
      throw new Error('Once requires a callback function.');
    }
    if (options) {
      delete options.fromBlock;
    }
    const eventSubscription = this.events[eventName](options, callback);
    eventSubscription.on('data', () => {
      eventSubscription.unsubscribe();
    });
  }
  getPastEvents(eventName, options, callback) {
    let method;
    if (eventName !== 'allEvents') {
      if (!this.abiModel.hasEvent(eventName)) {
        return Promise.reject(new Error(`Event with name "${eventName}" does not exists.`));
      }
      method = this.methodFactory.createPastEventLogsMethod(this.abiModel.getEvent(eventName), this);
    } else {
      method = this.methodFactory.createAllPastEventLogsMethod(this.abiModel, this);
    }
    method.parameters = [options];
    method.callback = callback;
    return method.execute();
  }
  deploy(options) {
    return this.methods.contractConstructor(options);
  }
  clone() {
    const clone = this.contractModuleFactory.createContract(this.currentProvider, this.accounts, [], '', {
      defaultAccount: this.defaultAccount,
      defaultBlock: this.defaultBlock,
      defaultGas: this.defaultGas,
      defaultGasPrice: this.defaultGasPrice,
      transactionBlockTimeout: this.transactionBlockTimeout,
      transactionConfirmationBlocks: this.transactionConfirmationBlocks,
      transactionPollingTimeout: this.transactionPollingTimeout,
      transactionSigner: this.transactionSigner,
      data: this.options.data
    });
    clone.abiModel = this.abiModel;
    return clone;
  }
}

class ContractModuleFactory {
  constructor(utils, formatters, abiCoder) {
    this.utils = utils;
    this.formatters = formatters;
    this.abiCoder = abiCoder;
  }
  createContract(provider, accounts, abi, address, options) {
    return new AbstractContract(provider, this, accounts, this.abiCoder, this.utils, this.formatters, abi, address, options);
  }
  createAbiModel(mappedAbi) {
    return new AbiModel(mappedAbi);
  }
  createAbiItemModel(abiItem) {
    return new AbiItemModel(abiItem);
  }
  createMethodEncoder() {
    return new MethodEncoder(this.abiCoder);
  }
  createEventFilterEncoder() {
    return new EventFilterEncoder(this.abiCoder);
  }
  createAllEventsFilterEncoder() {
    return new AllEventsFilterEncoder(this.abiCoder);
  }
  createAbiMapper() {
    return new AbiMapper(this, this.abiCoder, this.utils);
  }
  createEventLogDecoder() {
    return new EventLogDecoder(this.abiCoder);
  }
  createAllEventsLogDecoder() {
    return new AllEventsLogDecoder(this.abiCoder);
  }
  createMethodOptionsValidator() {
    return new MethodOptionsValidator(this.utils);
  }
  createMethodOptionsMapper() {
    return new MethodOptionsMapper(this.utils, this.formatters);
  }
  createEventOptionsMapper() {
    return new EventOptionsMapper(this.formatters, this.createEventFilterEncoder());
  }
  createAllEventsOptionsMapper() {
    return new AllEventsOptionsMapper(this.formatters, this.createAllEventsFilterEncoder());
  }
  createMethodFactory() {
    return new MethodFactory(this.utils, this.formatters, this, this.abiCoder);
  }
  createMethodsProxy(contract) {
    return new MethodsProxy(contract, this.createMethodFactory(), this.createMethodEncoder(), this.createMethodOptionsValidator(), this.createMethodOptionsMapper());
  }
  createEventSubscriptionsProxy(contract) {
    return new EventSubscriptionsProxy(contract, this.createEventSubscriptionFactory(), this.createEventOptionsMapper(), this.createEventLogDecoder(), this.createAllEventsLogDecoder(), this.createAllEventsOptionsMapper());
  }
  createEventSubscriptionFactory() {
    return new EventSubscriptionFactory(this.utils, this.formatters);
  }
}

function Contract(provider, abi, accounts, address, options) {
  return new ContractModuleFactory(Utils, formatters, new AbiCoder()).createContract(provider, accounts, abi, address, options);
}

export { AbstractContract, Contract, ContractModuleFactory };
