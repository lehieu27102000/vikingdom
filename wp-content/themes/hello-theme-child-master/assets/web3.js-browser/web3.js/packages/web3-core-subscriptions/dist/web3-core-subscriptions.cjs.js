'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var EventEmitter = _interopDefault(require('eventemitter3'));
var _get = _interopDefault(require('@babel/runtime/helpers/get'));
var isFunction = _interopDefault(require('lodash/isFunction'));

var AbstractSubscription =
function (_EventEmitter) {
  _inherits(AbstractSubscription, _EventEmitter);
  function AbstractSubscription(type, method) {
    var _this;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var utils = arguments.length > 3 ? arguments[3] : undefined;
    var formatters = arguments.length > 4 ? arguments[4] : undefined;
    var moduleInstance = arguments.length > 5 ? arguments[5] : undefined;
    _classCallCheck(this, AbstractSubscription);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(AbstractSubscription).call(this));
    _this.type = type;
    _this.method = method;
    _this.options = options;
    _this.utils = utils;
    _this.formatters = formatters;
    _this.moduleInstance = moduleInstance;
    _this.id = null;
    return _this;
  }
  _createClass(AbstractSubscription, [{
    key: "beforeSubscription",
    value: function beforeSubscription(moduleInstance) {}
  }, {
    key: "onNewSubscriptionItem",
    value: function onNewSubscriptionItem(subscriptionItem) {
      return subscriptionItem;
    }
  }, {
    key: "subscribe",
    value: function subscribe() {
      var _this2 = this;
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.callback = callback;
      this.beforeSubscription(this.moduleInstance);
      var subscriptionParameters = [];
      if (this.options !== null) {
        subscriptionParameters = [this.options];
      }
      this.moduleInstance.currentProvider.subscribe(this.type, this.method, subscriptionParameters).then(function (subscriptionId) {
        _this2.id = subscriptionId;
        _this2.moduleInstance.currentProvider.on('error', _this2.errorListener.bind(_this2));
        _this2.moduleInstance.currentProvider.on(_this2.id, _this2.subscriptionListener.bind(_this2));
      }).catch(function (error) {
        if (_this2.callback) {
          _this2.callback(error, null);
          return;
        }
        _this2.emit('error', error);
        _this2.removeAllListeners();
      });
      return this;
    }
  }, {
    key: "errorListener",
    value: function errorListener(error) {
      if (this.callback) {
        this.callback(error, false);
        return;
      }
      this.emit('error', error);
    }
  }, {
    key: "subscriptionListener",
    value: function subscriptionListener(response) {
      var formattedOutput = this.onNewSubscriptionItem(response.result);
      if (this.callback) {
        this.callback(false, formattedOutput);
        return;
      }
      this.emit('data', formattedOutput);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(callback) {
      var _this3 = this;
      return this.moduleInstance.currentProvider.unsubscribe(this.id, this.type.slice(0, 3) + '_unsubscribe').then(function (response) {
        if (!response) {
          var error = new Error('Error on unsubscribe!');
          if (callback) {
            callback(error, null);
          }
          throw error;
        }
        _this3.moduleInstance.currentProvider.removeListener('error', _this3.errorListener);
        _this3.moduleInstance.currentProvider.removeListener(_this3.id, _this3.subscriptionListener);
        _this3.id = null;
        _this3.removeAllListeners();
        if (callback) {
          callback(false, true);
        }
        return true;
      });
    }
  }]);
  return AbstractSubscription;
}(EventEmitter);

var LogSubscription =
function (_AbstractSubscription) {
  _inherits(LogSubscription, _AbstractSubscription);
  function LogSubscription(options, utils, formatters, moduleInstance, getPastLogsMethod) {
    var _this;
    _classCallCheck(this, LogSubscription);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(LogSubscription).call(this, 'eth_subscribe', 'logs', options, utils, formatters, moduleInstance));
    _this.getPastLogsMethod = getPastLogsMethod;
    return _this;
  }
  _createClass(LogSubscription, [{
    key: "subscribe",
    value: function subscribe(callback) {
      var _this2 = this;
      if (this.options.fromBlock && this.options.fromBlock !== 'latest' || this.options.fromBlock === 0) {
        this.getPastLogsMethod.parameters = [this.formatters.inputLogFormatter(this.options)];
        this.getPastLogsMethod.execute().then(function (logs) {
          logs.forEach(function (log) {
            var formattedLog = _this2.onNewSubscriptionItem(log);
            if (isFunction(callback)) {
              callback(false, formattedLog);
            }
            _this2.emit('data', formattedLog);
          });
          delete _this2.options.fromBlock;
          _get(_getPrototypeOf(LogSubscription.prototype), "subscribe", _this2).call(_this2, callback);
        }).catch(function (error) {
          if (isFunction(callback)) {
            callback(error, null);
          }
          _this2.emit('error', error);
        });
        return this;
      }
      _get(_getPrototypeOf(LogSubscription.prototype), "subscribe", this).call(this, callback);
      return this;
    }
  }, {
    key: "onNewSubscriptionItem",
    value: function onNewSubscriptionItem(subscriptionItem) {
      var log = this.formatters.outputLogFormatter(subscriptionItem);
      if (log.removed) {
        this.emit('changed', log);
      }
      return log;
    }
  }]);
  return LogSubscription;
}(AbstractSubscription);

var NewHeadsSubscription =
function (_AbstractSubscription) {
  _inherits(NewHeadsSubscription, _AbstractSubscription);
  function NewHeadsSubscription(utils, formatters, moduleInstance) {
    _classCallCheck(this, NewHeadsSubscription);
    return _possibleConstructorReturn(this, _getPrototypeOf(NewHeadsSubscription).call(this, 'eth_subscribe', 'newHeads', null, utils, formatters, moduleInstance));
  }
  _createClass(NewHeadsSubscription, [{
    key: "onNewSubscriptionItem",
    value: function onNewSubscriptionItem(subscriptionItem) {
      return this.formatters.outputBlockFormatter(subscriptionItem);
    }
  }]);
  return NewHeadsSubscription;
}(AbstractSubscription);

var NewPendingTransactionsSubscription =
function (_AbstractSubscription) {
  _inherits(NewPendingTransactionsSubscription, _AbstractSubscription);
  function NewPendingTransactionsSubscription(utils, formatters, moduleInstance) {
    _classCallCheck(this, NewPendingTransactionsSubscription);
    return _possibleConstructorReturn(this, _getPrototypeOf(NewPendingTransactionsSubscription).call(this, 'eth_subscribe', 'newPendingTransactions', null, utils, formatters, moduleInstance));
  }
  return NewPendingTransactionsSubscription;
}(AbstractSubscription);

var SyncingSubscription =
function (_AbstractSubscription) {
  _inherits(SyncingSubscription, _AbstractSubscription);
  function SyncingSubscription(utils, formatters, moduleInstance) {
    var _this;
    _classCallCheck(this, SyncingSubscription);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(SyncingSubscription).call(this, 'eth_subscribe', 'syncing', null, utils, formatters, moduleInstance));
    _this.isSyncing = null;
    return _this;
  }
  _createClass(SyncingSubscription, [{
    key: "onNewSubscriptionItem",
    value: function onNewSubscriptionItem(subscriptionItem) {
      if (typeof subscriptionItem !== 'boolean') {
        var isSyncing = subscriptionItem.syncing;
        if (this.isSyncing === null) {
          this.isSyncing = isSyncing;
          this.emit('changed', this.isSyncing);
          return subscriptionItem.status;
        }
        if (this.isSyncing !== isSyncing) {
          this.isSyncing = isSyncing;
          this.emit('changed', this.isSyncing);
        }
        return subscriptionItem.status;
      }
      this.isSyncing = subscriptionItem;
      this.emit('changed', subscriptionItem);
      return subscriptionItem;
    }
  }]);
  return SyncingSubscription;
}(AbstractSubscription);

var MessagesSubscription =
function (_AbstractSubscription) {
  _inherits(MessagesSubscription, _AbstractSubscription);
  function MessagesSubscription(options, utils, formatters, moduleInstance) {
    _classCallCheck(this, MessagesSubscription);
    return _possibleConstructorReturn(this, _getPrototypeOf(MessagesSubscription).call(this, 'shh_subscribe', 'messages', options, utils, formatters, moduleInstance));
  }
  return MessagesSubscription;
}(AbstractSubscription);

exports.AbstractSubscription = AbstractSubscription;
exports.LogSubscription = LogSubscription;
exports.MessagesSubscription = MessagesSubscription;
exports.NewHeadsSubscription = NewHeadsSubscription;
exports.NewPendingTransactionsSubscription = NewPendingTransactionsSubscription;
exports.SyncingSubscription = SyncingSubscription;
