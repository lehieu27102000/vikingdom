'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var web3Net = require('web3-net');
var Utils = require('web3-utils');
var web3CoreHelpers = require('web3-core-helpers');
var web3Providers = require('web3-providers');
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var web3CoreMethod = require('web3-core-method');
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _set = _interopDefault(require('@babel/runtime/helpers/set'));
var _get = _interopDefault(require('@babel/runtime/helpers/get'));
var web3Core = require('web3-core');

var MethodFactory =
function (_AbstractMethodFactor) {
  _inherits(MethodFactory, _AbstractMethodFactor);
  function MethodFactory(utils, formatters) {
    var _this;
    _classCallCheck(this, MethodFactory);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(MethodFactory).call(this, utils, formatters));
    _this.methods = {
      addPeer: web3CoreMethod.AddPeerMethod,
      getDataDirectory: web3CoreMethod.DataDirectoryMethod,
      getNodeInfo: web3CoreMethod.NodeInfoMethod,
      getPeers: web3CoreMethod.PeersMethod,
      setSolc: web3CoreMethod.SetSolcMethod,
      startRPC: web3CoreMethod.StartRpcMethod,
      startWS: web3CoreMethod.StartWsMethod,
      stopRPC: web3CoreMethod.StopRpcMethod,
      stopWS: web3CoreMethod.StopWsMethod
    };
    return _this;
  }
  return MethodFactory;
}(web3CoreMethod.AbstractMethodFactory);

var Admin =
function (_AbstractWeb3Module) {
  _inherits(Admin, _AbstractWeb3Module);
  function Admin(provider, methodFactory, net, utils, formatters, options, nodeNet) {
    var _this;
    _classCallCheck(this, Admin);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Admin).call(this, provider, options, methodFactory, nodeNet));
    _this.utils = utils;
    _this.formatters = formatters;
    _this.net = net;
    return _this;
  }
  _createClass(Admin, [{
    key: "setProvider",
    value: function setProvider(provider, net) {
      return !!(_get(_getPrototypeOf(Admin.prototype), "setProvider", this).call(this, provider, net) && this.net.setProvider(provider, net));
    }
  }, {
    key: "defaultGasPrice",
    set: function set(value) {
      _set(_getPrototypeOf(Admin.prototype), "defaultGasPrice", value, this, true);
      this.net.defaultGasPrice = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Admin.prototype), "defaultGasPrice", this);
    }
  }, {
    key: "defaultGas",
    set: function set(value) {
      _set(_getPrototypeOf(Admin.prototype), "defaultGas", value, this, true);
      this.net.defaultGas = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Admin.prototype), "defaultGas", this);
    }
  }, {
    key: "transactionBlockTimeout",
    set: function set(value) {
      _set(_getPrototypeOf(Admin.prototype), "transactionBlockTimeout", value, this, true);
      this.net.transactionBlockTimeout = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Admin.prototype), "transactionBlockTimeout", this);
    }
  }, {
    key: "transactionConfirmationBlocks",
    set: function set(value) {
      _set(_getPrototypeOf(Admin.prototype), "transactionConfirmationBlocks", value, this, true);
      this.net.transactionConfirmationBlocks = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Admin.prototype), "transactionConfirmationBlocks", this);
    }
  }, {
    key: "transactionPollingTimeout",
    set: function set(value) {
      _set(_getPrototypeOf(Admin.prototype), "transactionPollingTimeout", value, this, true);
      this.net.transactionPollingTimeout = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Admin.prototype), "transactionPollingTimeout", this);
    }
  }, {
    key: "defaultAccount",
    set: function set(value) {
      _set(_getPrototypeOf(Admin.prototype), "defaultAccount", value, this, true);
      this.net.defaultAccount = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Admin.prototype), "defaultAccount", this);
    }
  }, {
    key: "defaultBlock",
    set: function set(value) {
      _set(_getPrototypeOf(Admin.prototype), "defaultBlock", value, this, true);
      this.net.defaultBlock = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Admin.prototype), "defaultBlock", this);
    }
  }]);
  return Admin;
}(web3Core.AbstractWeb3Module);

function Admin$1(provider) {
  var net = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var resolvedProvider = new web3Providers.ProviderResolver().resolve(provider, net);
  return new Admin(resolvedProvider, new MethodFactory(Utils, web3CoreHelpers.formatters), new web3Net.Network(resolvedProvider, null, options), Utils, web3CoreHelpers.formatters, options, null);
}

exports.Admin = Admin$1;
