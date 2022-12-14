'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Utils = require('web3-utils');
var web3CoreHelpers = require('web3-core-helpers');
var web3EthAbi = require('web3-eth-abi');
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var isArray = _interopDefault(require('lodash/isArray'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _get = _interopDefault(require('@babel/runtime/helpers/get'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var web3CoreMethod = require('web3-core-method');
var isFunction = _interopDefault(require('lodash/isFunction'));
var isUndefined = _interopDefault(require('lodash/isUndefined'));
var cloneDeep = _interopDefault(require('lodash/cloneDeep'));
var web3CoreSubscriptions = require('web3-core-subscriptions');
var _assertThisInitialized = _interopDefault(require('@babel/runtime/helpers/assertThisInitialized'));
var web3Core = require('web3-core');

var AbiModel =
function () {
  function AbiModel(mappedAbi) {
    _classCallCheck(this, AbiModel);
    this.abi = mappedAbi;
  }
  _createClass(AbiModel, [{
    key: "getMethod",
    value: function getMethod(name) {
      if (this.hasMethod(name)) {
        return this.abi.methods[name];
      }
      return false;
    }
  }, {
    key: "getMethods",
    value: function getMethods() {
      return this.abi.methods;
    }
  }, {
    key: "getEvent",
    value: function getEvent(name) {
      if (this.hasEvent(name)) {
        return this.abi.events[name];
      }
      return false;
    }
  }, {
    key: "getEvents",
    value: function getEvents() {
      return this.abi.events;
    }
  }, {
    key: "getEventBySignature",
    value: function getEventBySignature(signature) {
      var _this = this;
      var event;
      Object.keys(this.abi.events).forEach(function (key) {
        if (_this.abi.events[key].signature === signature) {
          event = _this.abi.events[key];
        }
      });
      return event;
    }
  }, {
    key: "hasMethod",
    value: function hasMethod(name) {
      return typeof this.abi.methods[name] !== 'undefined';
    }
  }, {
    key: "hasEvent",
    value: function hasEvent(name) {
      return typeof this.abi.events[name] !== 'undefined';
    }
  }]);
  return AbiModel;
}();

var AbiItemModel =
function () {
  function AbiItemModel(abiItem) {
    _classCallCheck(this, AbiItemModel);
    this.abiItem = abiItem;
    this.signature = this.abiItem.signature;
    this.name = this.abiItem.name;
    this.payable = this.abiItem.payable;
    this.anonymous = this.abiItem.anonymous;
    this.contractMethodParameters = [];
  }
  _createClass(AbiItemModel, [{
    key: "getInputLength",
    value: function getInputLength() {
      if (isArray(this.abiItem.inputs)) {
        return this.abiItem.inputs.length;
      }
      return 0;
    }
  }, {
    key: "getInputs",
    value: function getInputs() {
      if (isArray(this.abiItem.inputs)) {
        return this.abiItem.inputs;
      }
      return [];
    }
  }, {
    key: "getOutputs",
    value: function getOutputs() {
      if (isArray(this.abiItem.outputs)) {
        return this.abiItem.outputs;
      }
      return [];
    }
  }, {
    key: "getIndexedInputs",
    value: function getIndexedInputs() {
      return this.getInputs().filter(function (input) {
        return input.indexed === true;
      });
    }
  }, {
    key: "isOfType",
    value: function isOfType(type) {
      return this.abiItem.type === type;
    }
  }]);
  return AbiItemModel;
}();

var MethodEncoder =
function () {
  function MethodEncoder(abiCoder) {
    _classCallCheck(this, MethodEncoder);
    this.abiCoder = abiCoder;
  }
  _createClass(MethodEncoder, [{
    key: "encode",
    value: function encode(abiItemModel, deployData) {
      var encodedParameters = this.abiCoder.encodeParameters(abiItemModel.getInputs(), abiItemModel.contractMethodParameters);
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
  }]);
  return MethodEncoder;
}();

var EventFilterEncoder =
function () {
  function EventFilterEncoder(abiCoder) {
    _classCallCheck(this, EventFilterEncoder);
    this.abiCoder = abiCoder;
  }
  _createClass(EventFilterEncoder, [{
    key: "encode",
    value: function encode(abiItemModel, filter) {
      var _this = this;
      var topics = [];
      abiItemModel.getIndexedInputs().forEach(function (input) {
        if (filter[input.name]) {
          var filterItem = filter[input.name];
          if (isArray(filterItem)) {
            filterItem = filterItem.map(function (item) {
              return _this.abiCoder.encodeParameter(input.type, item);
            });
            topics.push(filterItem);
            return;
          }
          topics.push(_this.abiCoder.encodeParameter(input.type, filterItem));
          return;
        }
        topics.push(null);
      });
      return topics;
    }
  }]);
  return EventFilterEncoder;
}();

var AllEventsFilterEncoder =
function (_EventFilterEncoder) {
  _inherits(AllEventsFilterEncoder, _EventFilterEncoder);
  function AllEventsFilterEncoder() {
    _classCallCheck(this, AllEventsFilterEncoder);
    return _possibleConstructorReturn(this, _getPrototypeOf(AllEventsFilterEncoder).apply(this, arguments));
  }
  _createClass(AllEventsFilterEncoder, [{
    key: "encode",
    value: function encode(abiModel, filter) {
      var _this = this;
      var events = abiModel.getEvents();
      var topics = [];
      Object.keys(events).forEach(function (key) {
        topics.push(_get(_getPrototypeOf(AllEventsFilterEncoder.prototype), "encode", _this).call(_this, events[key], filter));
      });
      return topics;
    }
  }]);
  return AllEventsFilterEncoder;
}(EventFilterEncoder);

var EventLogDecoder =
function () {
  function EventLogDecoder(abiCoder) {
    _classCallCheck(this, EventLogDecoder);
    this.abiCoder = abiCoder;
  }
  _createClass(EventLogDecoder, [{
    key: "decode",
    value: function decode(abiItemModel, response) {
      var argumentTopics = response.topics;
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
  }]);
  return EventLogDecoder;
}();

var AllEventsLogDecoder =
function (_EventLogDecoder) {
  _inherits(AllEventsLogDecoder, _EventLogDecoder);
  function AllEventsLogDecoder(abiCoder) {
    _classCallCheck(this, AllEventsLogDecoder);
    return _possibleConstructorReturn(this, _getPrototypeOf(AllEventsLogDecoder).call(this, abiCoder));
  }
  _createClass(AllEventsLogDecoder, [{
    key: "decode",
    value: function decode(abiModel, response) {
      var abiItemModel = abiModel.getEventBySignature(response.topics[0]);
      if (abiItemModel) {
        return _get(_getPrototypeOf(AllEventsLogDecoder.prototype), "decode", this).call(this, abiItemModel, response);
      }
      return {
        raw: {
          data: response.data,
          topics: response.topics
        }
      };
    }
  }]);
  return AllEventsLogDecoder;
}(EventLogDecoder);

var AbiMapper =
function () {
  function AbiMapper(contractModuleFactory, abiCoder, utils) {
    _classCallCheck(this, AbiMapper);
    this.utils = utils;
    this.abiCoder = abiCoder;
    this.contractModuleFactory = contractModuleFactory;
    this.hasConstructor = false;
  }
  _createClass(AbiMapper, [{
    key: "map",
    value: function map(abi) {
      var _this = this;
      var mappedAbiItems = {
        methods: {},
        events: {}
      };
      abi.forEach(function (abiItem) {
        abiItem.constant = _this.isConstant(abiItem);
        abiItem.payable = _this.isPayable(abiItem);
        if (abiItem.name) {
          abiItem.funcName = _this.utils.jsonInterfaceMethodToString(abiItem);
        }
        var abiItemModel;
        if (abiItem.type === 'function') {
          abiItem.signature = _this.abiCoder.encodeFunctionSignature(abiItem.funcName);
          abiItemModel = _this.contractModuleFactory.createAbiItemModel(abiItem);
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
          abiItem.signature = _this.abiCoder.encodeEventSignature(abiItem.funcName);
          abiItemModel = _this.contractModuleFactory.createAbiItemModel(abiItem);
          if (!mappedAbiItems.events[abiItem.name] || mappedAbiItems.events[abiItem.name].name === 'bound ') {
            mappedAbiItems.events[abiItem.name] = abiItemModel;
          }
          mappedAbiItems.events[abiItem.signature] = abiItemModel;
          mappedAbiItems.events[abiItem.funcName] = abiItemModel;
        }
        if (abiItem.type === 'constructor') {
          abiItem.signature = abiItem.type;
          mappedAbiItems.methods['contractConstructor'] = _this.contractModuleFactory.createAbiItemModel(abiItem);
          _this.hasConstructor = true;
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
  }, {
    key: "isConstant",
    value: function isConstant(abiItem) {
      return abiItem.stateMutability === 'view' || abiItem.stateMutability === 'pure' || abiItem.constant;
    }
  }, {
    key: "isPayable",
    value: function isPayable(abiItem) {
      return abiItem.stateMutability === 'payable' || abiItem.payable;
    }
  }]);
  return AbiMapper;
}();

var MethodOptionsMapper =
function () {
  function MethodOptionsMapper(utils, formatters) {
    _classCallCheck(this, MethodOptionsMapper);
    this.utils = utils;
    this.formatters = formatters;
  }
  _createClass(MethodOptionsMapper, [{
    key: "map",
    value: function map(contract, options) {
      var from = null;
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
  }]);
  return MethodOptionsMapper;
}();

var EventOptionsMapper =
function () {
  function EventOptionsMapper(formatters, eventFilterEncoder) {
    _classCallCheck(this, EventOptionsMapper);
    this.formatters = formatters;
    this.eventFilterEncoder = eventFilterEncoder;
  }
  _createClass(EventOptionsMapper, [{
    key: "map",
    value: function map(abiItemModel, contract, options) {
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
  }]);
  return EventOptionsMapper;
}();

var AllEventsOptionsMapper =
function () {
  function AllEventsOptionsMapper(formatters, allEventsFilterEncoder) {
    _classCallCheck(this, AllEventsOptionsMapper);
    this.formatters = formatters;
    this.allEventsFilterEncoder = allEventsFilterEncoder;
  }
  _createClass(AllEventsOptionsMapper, [{
    key: "map",
    value: function map(abiModel, contract, options) {
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
  }]);
  return AllEventsOptionsMapper;
}();

var MethodsProxy =
function () {
  function MethodsProxy(contract, methodFactory, methodEncoder, methodOptionsValidator, methodOptionsMapper) {
    var _this = this;
    _classCallCheck(this, MethodsProxy);
    this.contract = contract;
    this.methodFactory = methodFactory;
    this.methodEncoder = methodEncoder;
    this.methodOptionsValidator = methodOptionsValidator;
    this.methodOptionsMapper = methodOptionsMapper;
    return new Proxy(this, {
      get: function get(target, name) {
        if (_this.contract.abiModel.hasMethod(name)) {
          var ContractMethod = function ContractMethod() {
            var methodArguments = Array.prototype.slice.call(arguments);
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
              var abiItemModelFound = abiItemModel.some(function (model) {
                if (model.getInputLength() === methodArguments.length) {
                  abiItemModel = model;
                  return true;
                }
                return false;
              });
              if (!abiItemModelFound) {
                throw new Error("Methods with name \"".concat(name, "\" found but the given parameters are wrong"));
              }
            }
            abiItemModel.contractMethodParameters = methodArguments;
            return ContractMethod;
          };
          var abiItemModel = _this.contract.abiModel.getMethod(name);
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
  _createClass(MethodsProxy, [{
    key: "executeMethod",
    value: function executeMethod(abiItemModel, methodArguments, requestType) {
      var method;
      try {
        method = this.createMethod(abiItemModel, methodArguments, requestType);
      } catch (error) {
        var promiEvent = new web3CoreMethod.PromiEvent();
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
  }, {
    key: "createMethod",
    value: function createMethod(abiItemModel, methodArguments, requestType) {
      var method = this.methodFactory.createMethodByRequestType(abiItemModel, this.contract, requestType);
      method.setArguments(methodArguments);
      if (!method.parameters[0]) {
        method.parameters[0] = {};
      }
      method.parameters[0]['data'] = this.methodEncoder.encode(abiItemModel, this.contract.data);
      method.parameters[0] = this.methodOptionsMapper.map(this.contract, method.parameters[0]);
      this.methodOptionsValidator.validate(abiItemModel, method);
      return method;
    }
  }]);
  return MethodsProxy;
}();

var EventSubscriptionsProxy =
function () {
  function EventSubscriptionsProxy(contract, eventSubscriptionFactory, eventOptionsMapper, eventLogDecoder, allEventsLogDecoder, allEventsOptionsMapper) {
    var _this = this;
    _classCallCheck(this, EventSubscriptionsProxy);
    this.contract = contract;
    this.eventSubscriptionFactory = eventSubscriptionFactory;
    this.eventOptionsMapper = eventOptionsMapper;
    this.eventLogDecoder = eventLogDecoder;
    this.allEventsLogDecoder = allEventsLogDecoder;
    this.allEventsOptionsMapper = allEventsOptionsMapper;
    return new Proxy(this, {
      get: function get(target, name) {
        if (_this.contract.abiModel.hasEvent(name)) {
          return function (options, callback) {
            return target.subscribe(target.contract.abiModel.getEvent(name), cloneDeep(options), callback);
          };
        }
        if (name === 'allEvents') {
          return function (options, callback) {
            return target.subscribeAll(cloneDeep(options), callback);
          };
        }
        return Reflect.get(target, name);
      }
    });
  }
  _createClass(EventSubscriptionsProxy, [{
    key: "subscribe",
    value: function subscribe(abiItemModel, options, callback) {
      if (options && !isUndefined(options.filter) && !isUndefined(options.topics)) {
        this.handleValidationError('Invalid subscription options: Only filter or topics are allowed and not both', callback);
        return;
      }
      return this.eventSubscriptionFactory.createEventLogSubscription(this.eventLogDecoder, this.contract, this.eventOptionsMapper.map(abiItemModel, this.contract, options), abiItemModel).subscribe(callback);
    }
  }, {
    key: "subscribeAll",
    value: function subscribeAll(options, callback) {
      if (options && !isUndefined(options.filter) && !isUndefined(options.topics)) {
        this.handleValidationError('Invalid subscription options: Only filter or topics are allowed and not both', callback);
        return;
      }
      return this.eventSubscriptionFactory.createAllEventsLogSubscription(this.allEventsLogDecoder, this.contract, this.allEventsOptionsMapper.map(this.contract.abiModel, this.contract, options)).subscribe(callback);
    }
  }, {
    key: "handleValidationError",
    value: function handleValidationError(errorMessage, callback) {
      var error = new Error(errorMessage);
      if (isFunction(callback)) {
        callback(error, null);
      }
      throw error;
    }
  }]);
  return EventSubscriptionsProxy;
}();

var SendContractMethod =
function (_EthSendTransactionMe) {
  _inherits(SendContractMethod, _EthSendTransactionMe);
  function SendContractMethod(utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod, allEventsLogDecoder, abiModel) {
    var _this;
    _classCallCheck(this, SendContractMethod);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(SendContractMethod).call(this, utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod));
    _this.allEventsLogDecoder = allEventsLogDecoder;
    _this.abiModel = abiModel;
    return _this;
  }
  _createClass(SendContractMethod, [{
    key: "afterExecution",
    value: function afterExecution(response) {
      var _this2 = this;
      if (isArray(response.logs)) {
        response.events = {};
        response.logs.forEach(function (log, index) {
          log = _this2.allEventsLogDecoder.decode(_this2.abiModel, log);
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
      return _get(_getPrototypeOf(SendContractMethod.prototype), "afterExecution", this).call(this, response);
    }
  }]);
  return SendContractMethod;
}(web3CoreMethod.EthSendTransactionMethod);

var MethodOptionsValidator =
function () {
  function MethodOptionsValidator(utils) {
    _classCallCheck(this, MethodOptionsValidator);
    this.utils = utils;
  }
  _createClass(MethodOptionsValidator, [{
    key: "validate",
    value: function validate(abiItemModel, method) {
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
  }, {
    key: "isToSet",
    value: function isToSet(abiItemModel, method) {
      if (abiItemModel.isOfType('constructor')) {
        return true;
      }
      return this.utils.isAddress(method.parameters[0].to);
    }
  }, {
    key: "isFromSet",
    value: function isFromSet(method) {
      return this.utils.isAddress(method.parameters[0].from);
    }
  }, {
    key: "isValueValid",
    value: function isValueValid(abiItemModel, method) {
      return abiItemModel.payable || !abiItemModel.payable && !method.parameters[0].value;
    }
  }]);
  return MethodOptionsValidator;
}();

var CallContractMethod =
function (_CallMethod) {
  _inherits(CallContractMethod, _CallMethod);
  function CallContractMethod(utils, formatters, moduleInstance, abiCoder, abiItemModel) {
    var _this;
    _classCallCheck(this, CallContractMethod);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallContractMethod).call(this, utils, formatters, moduleInstance));
    _this.abiCoder = abiCoder;
    _this.abiItemModel = abiItemModel;
    return _this;
  }
  _createClass(CallContractMethod, [{
    key: "afterExecution",
    value: function afterExecution(response) {
      if (!response || response === '0x') {
        return null;
      }
      var outputs = this.abiItemModel.getOutputs();
      if (outputs.length > 1) {
        return this.abiCoder.decodeParameters(outputs, response);
      }
      return this.abiCoder.decodeParameter(outputs[0], response);
    }
  }]);
  return CallContractMethod;
}(web3CoreMethod.CallMethod);

var ContractDeployMethod =
function (_EthSendTransactionMe) {
  _inherits(ContractDeployMethod, _EthSendTransactionMe);
  function ContractDeployMethod(utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod) {
    _classCallCheck(this, ContractDeployMethod);
    return _possibleConstructorReturn(this, _getPrototypeOf(ContractDeployMethod).call(this, utils, formatters, moduleInstance, transactionObserver, chainIdMethod, getTransactionCountMethod));
  }
  _createClass(ContractDeployMethod, [{
    key: "beforeExecution",
    value: function beforeExecution(moduleInstance) {
      if (this.rpcMethod !== 'eth_sendRawTransaction') {
        _get(_getPrototypeOf(ContractDeployMethod.prototype), "beforeExecution", this).call(this, moduleInstance);
        delete this.parameters[0].to;
      }
    }
  }, {
    key: "afterExecution",
    value: function afterExecution(response) {
      var clonedContract = this.moduleInstance.clone();
      clonedContract.address = response.contractAddress;
      if (this.promiEvent.listenerCount('receipt') > 0) {
        this.promiEvent.emit('receipt', _get(_getPrototypeOf(ContractDeployMethod.prototype), "afterExecution", this).call(this, response));
        this.promiEvent.removeAllListeners('receipt');
      }
      return clonedContract;
    }
  }]);
  return ContractDeployMethod;
}(web3CoreMethod.EthSendTransactionMethod);

var PastEventLogsMethod =
function (_GetPastLogsMethod) {
  _inherits(PastEventLogsMethod, _GetPastLogsMethod);
  function PastEventLogsMethod(utils, formatters, moduleInstance, eventLogDecoder, abiItemModel, eventOptionsMapper) {
    var _this;
    _classCallCheck(this, PastEventLogsMethod);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(PastEventLogsMethod).call(this, utils, formatters, moduleInstance));
    _this.abiItemModel = abiItemModel;
    _this.eventLogDecoder = eventLogDecoder;
    _this.eventOptionsMapper = eventOptionsMapper;
    return _this;
  }
  _createClass(PastEventLogsMethod, [{
    key: "beforeExecution",
    value: function beforeExecution(moduleInstance) {
      _get(_getPrototypeOf(PastEventLogsMethod.prototype), "beforeExecution", this).call(this, moduleInstance);
      this.parameters[0] = this.eventOptionsMapper.map(this.abiItemModel, moduleInstance, this.parameters[0]);
    }
  }, {
    key: "afterExecution",
    value: function afterExecution(response) {
      var _this2 = this;
      var formattedLogs = _get(_getPrototypeOf(PastEventLogsMethod.prototype), "afterExecution", this).call(this, response);
      return formattedLogs.map(function (logItem) {
        return _this2.eventLogDecoder.decode(_this2.abiItemModel, logItem);
      });
    }
  }]);
  return PastEventLogsMethod;
}(web3CoreMethod.GetPastLogsMethod);

var AllPastEventLogsMethod =
function (_GetPastLogsMethod) {
  _inherits(AllPastEventLogsMethod, _GetPastLogsMethod);
  function AllPastEventLogsMethod(utils, formatters, moduleInstance, allEventsLogDecoder, abiModel, allEventsOptionsMapper) {
    var _this;
    _classCallCheck(this, AllPastEventLogsMethod);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(AllPastEventLogsMethod).call(this, utils, formatters, moduleInstance));
    _this.abiModel = abiModel;
    _this.allEventsLogDecoder = allEventsLogDecoder;
    _this.allEventsOptionsMapper = allEventsOptionsMapper;
    return _this;
  }
  _createClass(AllPastEventLogsMethod, [{
    key: "beforeExecution",
    value: function beforeExecution(moduleInstance) {
      _get(_getPrototypeOf(AllPastEventLogsMethod.prototype), "beforeExecution", this).call(this, moduleInstance);
      this.parameters[0] = this.allEventsOptionsMapper.map(this.abiModel, moduleInstance, this.parameters[0]);
    }
  }, {
    key: "afterExecution",
    value: function afterExecution(response) {
      var _this2 = this;
      var formattedLogs = _get(_getPrototypeOf(AllPastEventLogsMethod.prototype), "afterExecution", this).call(this, response);
      return formattedLogs.map(function (logItem) {
        return _this2.allEventsLogDecoder.decode(_this2.abiModel, logItem);
      });
    }
  }]);
  return AllPastEventLogsMethod;
}(web3CoreMethod.GetPastLogsMethod);

var MethodFactory =
function () {
  function MethodFactory(utils, formatters, contractModuleFactory, abiCoder) {
    _classCallCheck(this, MethodFactory);
    this.utils = utils;
    this.formatters = formatters;
    this.contractModuleFactory = contractModuleFactory;
    this.abiCoder = abiCoder;
  }
  _createClass(MethodFactory, [{
    key: "createMethodByRequestType",
    value: function createMethodByRequestType(abiItem, contract, requestType) {
      var rpcMethod;
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
        throw new TypeError("RPC call not found with requestType: \"".concat(requestType, "\""));
      }
      return rpcMethod;
    }
  }, {
    key: "createPastEventLogsMethod",
    value: function createPastEventLogsMethod(abiItem, contract) {
      return new PastEventLogsMethod(this.utils, this.formatters, contract, this.contractModuleFactory.createEventLogDecoder(), abiItem, this.contractModuleFactory.createEventOptionsMapper());
    }
  }, {
    key: "createAllPastEventLogsMethod",
    value: function createAllPastEventLogsMethod(abiModel, contract) {
      return new AllPastEventLogsMethod(this.utils, this.formatters, contract, this.contractModuleFactory.createAllEventsLogDecoder(), abiModel, this.contractModuleFactory.createAllEventsOptionsMapper());
    }
  }, {
    key: "createCallContractMethod",
    value: function createCallContractMethod(abiItem, contract) {
      return new CallContractMethod(this.utils, this.formatters, contract, this.abiCoder, abiItem);
    }
  }, {
    key: "createSendContractMethod",
    value: function createSendContractMethod(contract) {
      return new SendContractMethod(this.utils, this.formatters, contract, this.createTransactionObserver(contract), new web3CoreMethod.ChainIdMethod(this.utils, this.formatters, contract), new web3CoreMethod.GetTransactionCountMethod(this.utils, this.formatters, contract), this.contractModuleFactory.createAllEventsLogDecoder(), contract.abiModel);
    }
  }, {
    key: "createContractDeployMethod",
    value: function createContractDeployMethod(contract) {
      return new ContractDeployMethod(this.utils, this.formatters, contract, this.createTransactionObserver(contract), new web3CoreMethod.ChainIdMethod(this.utils, this.formatters, contract), new web3CoreMethod.GetTransactionCountMethod(this.utils, this.formatters, contract));
    }
  }, {
    key: "createEstimateGasMethod",
    value: function createEstimateGasMethod(contract) {
      return new web3CoreMethod.EstimateGasMethod(this.utils, this.formatters, contract);
    }
  }, {
    key: "getTimeout",
    value: function getTimeout(contract) {
      var timeout = contract.transactionBlockTimeout;
      if (!contract.currentProvider.supportsSubscriptions()) {
        timeout = contract.transactionPollingTimeout;
      }
      return timeout;
    }
  }, {
    key: "createTransactionObserver",
    value: function createTransactionObserver(contract) {
      return new web3CoreMethod.TransactionObserver(contract.currentProvider, this.getTimeout(contract), contract.transactionConfirmationBlocks, new web3CoreMethod.GetTransactionReceiptMethod(this.utils, this.formatters, contract), new web3CoreMethod.GetBlockByNumberMethod(this.utils, this.formatters, contract), new web3CoreSubscriptions.NewHeadsSubscription(this.utils, this.formatters, contract));
    }
  }]);
  return MethodFactory;
}();

var EventLogSubscription =
function (_LogSubscription) {
  _inherits(EventLogSubscription, _LogSubscription);
  function EventLogSubscription(options, utils, formatters, contract, getPastLogsMethod, eventLogDecoder, abiItemModel) {
    var _this;
    _classCallCheck(this, EventLogSubscription);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(EventLogSubscription).call(this, options, utils, formatters, contract, getPastLogsMethod));
    _this.eventLogDecoder = eventLogDecoder;
    _this.abiItemModel = abiItemModel;
    return _this;
  }
  _createClass(EventLogSubscription, [{
    key: "onNewSubscriptionItem",
    value: function onNewSubscriptionItem(subscriptionItem) {
      var log = this.formatters.outputLogFormatter(subscriptionItem);
      if (log.removed) {
        log = this.eventLogDecoder.decode(this.abiItemModel, log);
        this.emit('changed', log);
        return log;
      }
      return this.eventLogDecoder.decode(this.abiItemModel, log);
    }
  }]);
  return EventLogSubscription;
}(web3CoreSubscriptions.LogSubscription);

var AllEventsLogSubscription =
function (_LogSubscription) {
  _inherits(AllEventsLogSubscription, _LogSubscription);
  function AllEventsLogSubscription(options, utils, formatters, contract, getPastLogsMethod, allEventsLogDecoder, abiModel) {
    var _this;
    _classCallCheck(this, AllEventsLogSubscription);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(AllEventsLogSubscription).call(this, options, utils, formatters, contract, getPastLogsMethod));
    _this.allEventsLogDecoder = allEventsLogDecoder;
    _this.abiModel = abiModel;
    return _this;
  }
  _createClass(AllEventsLogSubscription, [{
    key: "onNewSubscriptionItem",
    value: function onNewSubscriptionItem(subscriptionItem) {
      var log = this.formatters.outputLogFormatter(subscriptionItem);
      if (log.removed) {
        log = this.allEventsLogDecoder.decode(this.abiModel, log);
        this.emit('changed', log);
        return log;
      }
      return this.allEventsLogDecoder.decode(this.abiModel, log);
    }
  }]);
  return AllEventsLogSubscription;
}(web3CoreSubscriptions.LogSubscription);

var EventSubscriptionFactory =
function () {
  function EventSubscriptionFactory(utils, formatters) {
    _classCallCheck(this, EventSubscriptionFactory);
    this.utils = utils;
    this.formatters = formatters;
  }
  _createClass(EventSubscriptionFactory, [{
    key: "createEventLogSubscription",
    value: function createEventLogSubscription(eventLogDecoder, contract, options, abiItemModel) {
      return new EventLogSubscription(options, this.utils, this.formatters, contract, new web3CoreMethod.GetPastLogsMethod(this.utils, this.formatters, contract), eventLogDecoder, abiItemModel);
    }
  }, {
    key: "createAllEventsLogSubscription",
    value: function createAllEventsLogSubscription(allEventsLogDecoder, contract, options) {
      return new AllEventsLogSubscription(options, this.utils, this.formatters, contract, new web3CoreMethod.GetPastLogsMethod(this.utils, this.formatters, contract), allEventsLogDecoder, contract.abiModel);
    }
  }]);
  return EventSubscriptionFactory;
}();

var AbstractContract =
function (_AbstractWeb3Module) {
  _inherits(AbstractContract, _AbstractWeb3Module);
  function AbstractContract(provider, contractModuleFactory, accounts, abiCoder, utils, formatters) {
    var _this;
    var abi = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
    var address = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';
    var options = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : {};
    _classCallCheck(this, AbstractContract);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(AbstractContract).call(this, provider, options, null, null));
    _this.contractModuleFactory = contractModuleFactory;
    _this.abiCoder = abiCoder;
    _this.utils = utils;
    _this.formatters = formatters;
    _this.abiMapper = _this.contractModuleFactory.createAbiMapper();
    _this.options = options;
    _this.accounts = accounts;
    _this.methodFactory = _this.contractModuleFactory.createMethodFactory();
    _this.abiModel = _this.abiMapper.map(abi);
    _this.transactionSigner = options.transactionSigner;
    _this.methods = _this.contractModuleFactory.createMethodsProxy(_assertThisInitialized(_this));
    _this.events = _this.contractModuleFactory.createEventSubscriptionsProxy(_assertThisInitialized(_this));
    if (address) {
      _this.address = address;
    }
    return _this;
  }
  _createClass(AbstractContract, [{
    key: "once",
    value: function once(eventName, options, callback) {
      if (!callback) {
        throw new Error('Once requires a callback function.');
      }
      if (options) {
        delete options.fromBlock;
      }
      var eventSubscription = this.events[eventName](options, callback);
      eventSubscription.on('data', function () {
        eventSubscription.unsubscribe();
      });
    }
  }, {
    key: "getPastEvents",
    value: function getPastEvents(eventName, options, callback) {
      var method;
      if (eventName !== 'allEvents') {
        if (!this.abiModel.hasEvent(eventName)) {
          return Promise.reject(new Error("Event with name \"".concat(eventName, "\" does not exists.")));
        }
        method = this.methodFactory.createPastEventLogsMethod(this.abiModel.getEvent(eventName), this);
      } else {
        method = this.methodFactory.createAllPastEventLogsMethod(this.abiModel, this);
      }
      method.parameters = [options];
      method.callback = callback;
      return method.execute();
    }
  }, {
    key: "deploy",
    value: function deploy(options) {
      return this.methods.contractConstructor(options);
    }
  }, {
    key: "clone",
    value: function clone() {
      var clone = this.contractModuleFactory.createContract(this.currentProvider, this.accounts, [], '', {
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
  }, {
    key: "jsonInterface",
    get: function get() {
      return this.abiModel;
    }
    ,
    set: function set(value) {
      this.abiModel = this.abiMapper.map(value);
      this.methods.abiModel = this.abiModel;
      this.events.abiModel = this.abiModel;
    }
  }, {
    key: "address",
    get: function get() {
      return this.options.address;
    }
    ,
    set: function set(value) {
      this.options.address = value;
    }
  }, {
    key: "data",
    get: function get() {
      return this.options.data;
    }
    ,
    set: function set(value) {
      this.options.data = value;
    }
  }]);
  return AbstractContract;
}(web3Core.AbstractWeb3Module);

var ContractModuleFactory =
function () {
  function ContractModuleFactory(utils, formatters, abiCoder) {
    _classCallCheck(this, ContractModuleFactory);
    this.utils = utils;
    this.formatters = formatters;
    this.abiCoder = abiCoder;
  }
  _createClass(ContractModuleFactory, [{
    key: "createContract",
    value: function createContract(provider, accounts, abi, address, options) {
      return new AbstractContract(provider, this, accounts, this.abiCoder, this.utils, this.formatters, abi, address, options);
    }
  }, {
    key: "createAbiModel",
    value: function createAbiModel(mappedAbi) {
      return new AbiModel(mappedAbi);
    }
  }, {
    key: "createAbiItemModel",
    value: function createAbiItemModel(abiItem) {
      return new AbiItemModel(abiItem);
    }
  }, {
    key: "createMethodEncoder",
    value: function createMethodEncoder() {
      return new MethodEncoder(this.abiCoder);
    }
  }, {
    key: "createEventFilterEncoder",
    value: function createEventFilterEncoder() {
      return new EventFilterEncoder(this.abiCoder);
    }
  }, {
    key: "createAllEventsFilterEncoder",
    value: function createAllEventsFilterEncoder() {
      return new AllEventsFilterEncoder(this.abiCoder);
    }
  }, {
    key: "createAbiMapper",
    value: function createAbiMapper() {
      return new AbiMapper(this, this.abiCoder, this.utils);
    }
  }, {
    key: "createEventLogDecoder",
    value: function createEventLogDecoder() {
      return new EventLogDecoder(this.abiCoder);
    }
  }, {
    key: "createAllEventsLogDecoder",
    value: function createAllEventsLogDecoder() {
      return new AllEventsLogDecoder(this.abiCoder);
    }
  }, {
    key: "createMethodOptionsValidator",
    value: function createMethodOptionsValidator() {
      return new MethodOptionsValidator(this.utils);
    }
  }, {
    key: "createMethodOptionsMapper",
    value: function createMethodOptionsMapper() {
      return new MethodOptionsMapper(this.utils, this.formatters);
    }
  }, {
    key: "createEventOptionsMapper",
    value: function createEventOptionsMapper() {
      return new EventOptionsMapper(this.formatters, this.createEventFilterEncoder());
    }
  }, {
    key: "createAllEventsOptionsMapper",
    value: function createAllEventsOptionsMapper() {
      return new AllEventsOptionsMapper(this.formatters, this.createAllEventsFilterEncoder());
    }
  }, {
    key: "createMethodFactory",
    value: function createMethodFactory() {
      return new MethodFactory(this.utils, this.formatters, this, this.abiCoder);
    }
  }, {
    key: "createMethodsProxy",
    value: function createMethodsProxy(contract) {
      return new MethodsProxy(contract, this.createMethodFactory(), this.createMethodEncoder(), this.createMethodOptionsValidator(), this.createMethodOptionsMapper());
    }
  }, {
    key: "createEventSubscriptionsProxy",
    value: function createEventSubscriptionsProxy(contract) {
      return new EventSubscriptionsProxy(contract, this.createEventSubscriptionFactory(), this.createEventOptionsMapper(), this.createEventLogDecoder(), this.createAllEventsLogDecoder(), this.createAllEventsOptionsMapper());
    }
  }, {
    key: "createEventSubscriptionFactory",
    value: function createEventSubscriptionFactory() {
      return new EventSubscriptionFactory(this.utils, this.formatters);
    }
  }]);
  return ContractModuleFactory;
}();

function Contract(provider, abi, accounts, address, options) {
  return new ContractModuleFactory(Utils, web3CoreHelpers.formatters, new web3EthAbi.AbiCoder()).createContract(provider, accounts, abi, address, options);
}

exports.AbstractContract = AbstractContract;
exports.Contract = Contract;
exports.ContractModuleFactory = ContractModuleFactory;
