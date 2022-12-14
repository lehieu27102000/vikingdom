'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var isObject = _interopDefault(require('lodash/isObject'));
var web3Providers = require('web3-providers');
var web3CoreMethod = require('web3-core-method');
var web3Utils = require('web3-utils');

var AbstractWeb3Module =
function () {
  function AbstractWeb3Module(provider) {
    var _this = this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var methodFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var nodeNet = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    _classCallCheck(this, AbstractWeb3Module);
    this.providerResolver = new web3Providers.ProviderResolver();
    this.givenProvider = web3Providers.ProviderDetector.detect();
    this._currentProvider = this.providerResolver.resolve(provider, nodeNet);
    this._defaultAccount = options.defaultAccount ? web3Utils.toChecksumAddress(options.defaultAccount) : undefined;
    this._defaultBlock = options.defaultBlock || 'latest';
    this._transactionBlockTimeout = options.transactionBlockTimeout || 50;
    this._transactionConfirmationBlocks = options.transactionConfirmationBlocks || 24;
    this._transactionPollingTimeout = options.transactionPollingTimeout || 750;
    this._defaultGasPrice = options.defaultGasPrice;
    this._defaultGas = options.defaultGas;
    this.BatchRequest = function () {
      return new web3Providers.BatchRequest(_this);
    };
    if (methodFactory) {
      return new web3CoreMethod.MethodProxy(this, methodFactory);
    }
  }
  _createClass(AbstractWeb3Module, [{
    key: "setProvider",
    value: function setProvider(provider, net) {
      if (!this.isSameProvider(provider)) {
        var resolvedProvider = this.providerResolver.resolve(provider, net);
        this.clearSubscriptions();
        this._currentProvider = resolvedProvider;
        return true;
      }
      return false;
    }
  }, {
    key: "isSameProvider",
    value: function isSameProvider(provider) {
      if (isObject(provider)) {
        if (this.currentProvider && this.currentProvider.constructor.name === provider.constructor.name) {
          return this.currentProvider.host === provider.host;
        }
        return false;
      }
      return this.currentProvider.host === provider;
    }
  }, {
    key: "clearSubscriptions",
    value: function clearSubscriptions(unsubscribeMethod) {
      if (this.currentProvider.supportsSubscriptions()) {
        return this.currentProvider.clearSubscriptions(unsubscribeMethod);
      }
      return Promise.resolve(true);
    }
  }, {
    key: "defaultBlock",
    get: function get() {
      return this._defaultBlock;
    }
    ,
    set: function set(value) {
      this._defaultBlock = value;
    }
  }, {
    key: "transactionBlockTimeout",
    get: function get() {
      return this._transactionBlockTimeout;
    }
    ,
    set: function set(value) {
      this._transactionBlockTimeout = value;
    }
  }, {
    key: "transactionConfirmationBlocks",
    get: function get() {
      return this._transactionConfirmationBlocks;
    }
    ,
    set: function set(value) {
      this._transactionConfirmationBlocks = value;
    }
  }, {
    key: "transactionPollingTimeout",
    get: function get() {
      return this._transactionPollingTimeout;
    }
    ,
    set: function set(value) {
      this._transactionPollingTimeout = value;
    }
  }, {
    key: "defaultGasPrice",
    get: function get() {
      return this._defaultGasPrice;
    }
    ,
    set: function set(value) {
      this._defaultGasPrice = value;
    }
  }, {
    key: "defaultGas",
    get: function get() {
      return this._defaultGas;
    }
    ,
    set: function set(value) {
      this._defaultGas = value;
    }
  }, {
    key: "defaultAccount",
    get: function get() {
      return this._defaultAccount;
    }
    ,
    set: function set(value) {
      this._defaultAccount = web3Utils.toChecksumAddress(value);
    }
  }, {
    key: "currentProvider",
    get: function get() {
      return this._currentProvider;
    }
    ,
    set: function set(value) {
      throw new Error('The property currentProvider is read-only!');
    }
  }], [{
    key: "providers",
    get: function get() {
      return {
        HttpProvider: web3Providers.HttpProvider,
        WebsocketProvider: web3Providers.WebsocketProvider,
        IpcProvider: web3Providers.IpcProvider
      };
    }
  }]);
  return AbstractWeb3Module;
}();

exports.AbstractWeb3Module = AbstractWeb3Module;
