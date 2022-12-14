(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('web3-utils'), require('web3-core-helpers'), require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/possibleConstructorReturn'), require('@babel/runtime/helpers/getPrototypeOf'), require('@babel/runtime/helpers/inherits'), require('web3-core-method'), require('@babel/runtime/regenerator'), require('@babel/runtime/helpers/asyncToGenerator'), require('@babel/runtime/helpers/createClass'), require('@babel/runtime/helpers/assertThisInitialized'), require('lodash/isFunction'), require('lodash/isObject'), require('eth-lib/lib/hash'), require('eth-lib/lib/rlp'), require('eth-lib/lib/bytes'), require('eth-lib/lib/account'), require('web3-core'), require('scryptsy'), require('lodash/isString'), require('uuid'), require('randombytes'), require('pbkdf2'), require('browserify-cipher')) :
    typeof define === 'function' && define.amd ? define(['exports', 'web3-utils', 'web3-core-helpers', '@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/possibleConstructorReturn', '@babel/runtime/helpers/getPrototypeOf', '@babel/runtime/helpers/inherits', 'web3-core-method', '@babel/runtime/regenerator', '@babel/runtime/helpers/asyncToGenerator', '@babel/runtime/helpers/createClass', '@babel/runtime/helpers/assertThisInitialized', 'lodash/isFunction', 'lodash/isObject', 'eth-lib/lib/hash', 'eth-lib/lib/rlp', 'eth-lib/lib/bytes', 'eth-lib/lib/account', 'web3-core', 'scryptsy', 'lodash/isString', 'uuid', 'randombytes', 'pbkdf2', 'browserify-cipher'], factory) :
    (global = global || self, factory(global.Web3EthAccounts = {}, global.Utils, global.web3CoreHelpers, global._classCallCheck, global._possibleConstructorReturn, global._getPrototypeOf, global._inherits, global.web3CoreMethod, global._regeneratorRuntime, global._asyncToGenerator, global._createClass, global._assertThisInitialized, global.isFunction, global.isObject, global.Hash, global.RLP, global.Bytes, global.EthLibAccount, global.web3Core, global.scryptsy, global.isString, global.uuid, global.randomBytes, global.pbkdf2, global.browserifyCipher));
}(this, function (exports, Utils, web3CoreHelpers, _classCallCheck, _possibleConstructorReturn, _getPrototypeOf, _inherits, web3CoreMethod, _regeneratorRuntime, _asyncToGenerator, _createClass, _assertThisInitialized, isFunction, isObject, Hash, RLP, Bytes, EthLibAccount, web3Core, scryptsy, isString, uuid, randomBytes, pbkdf2, browserifyCipher) { 'use strict';

    _classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;
    _possibleConstructorReturn = _possibleConstructorReturn && _possibleConstructorReturn.hasOwnProperty('default') ? _possibleConstructorReturn['default'] : _possibleConstructorReturn;
    _getPrototypeOf = _getPrototypeOf && _getPrototypeOf.hasOwnProperty('default') ? _getPrototypeOf['default'] : _getPrototypeOf;
    _inherits = _inherits && _inherits.hasOwnProperty('default') ? _inherits['default'] : _inherits;
    _regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
    _asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
    _createClass = _createClass && _createClass.hasOwnProperty('default') ? _createClass['default'] : _createClass;
    _assertThisInitialized = _assertThisInitialized && _assertThisInitialized.hasOwnProperty('default') ? _assertThisInitialized['default'] : _assertThisInitialized;
    isFunction = isFunction && isFunction.hasOwnProperty('default') ? isFunction['default'] : isFunction;
    isObject = isObject && isObject.hasOwnProperty('default') ? isObject['default'] : isObject;
    Hash = Hash && Hash.hasOwnProperty('default') ? Hash['default'] : Hash;
    RLP = RLP && RLP.hasOwnProperty('default') ? RLP['default'] : RLP;
    Bytes = Bytes && Bytes.hasOwnProperty('default') ? Bytes['default'] : Bytes;
    scryptsy = scryptsy && scryptsy.hasOwnProperty('default') ? scryptsy['default'] : scryptsy;
    isString = isString && isString.hasOwnProperty('default') ? isString['default'] : isString;
    uuid = uuid && uuid.hasOwnProperty('default') ? uuid['default'] : uuid;
    randomBytes = randomBytes && randomBytes.hasOwnProperty('default') ? randomBytes['default'] : randomBytes;

    var MethodFactory =
    function (_AbstractMethodFactor) {
      _inherits(MethodFactory, _AbstractMethodFactor);
      function MethodFactory(utils, formatters) {
        var _this;
        _classCallCheck(this, MethodFactory);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(MethodFactory).call(this, utils, formatters));
        _this.methods = {
          getChainId: web3CoreMethod.ChainIdMethod,
          getGasPrice: web3CoreMethod.GetGasPriceMethod,
          getTransactionCount: web3CoreMethod.GetTransactionCountMethod
        };
        return _this;
      }
      return MethodFactory;
    }(web3CoreMethod.AbstractMethodFactory);

    var scrypt;
    var isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
    if (isNode) {
      var NODE_MIN_VER_WITH_BUILTIN_SCRYPT = '10.5.0';
      var NODE_MIN_VER_INCOMPAT_SCRYPT_PKG = '12.0.0';
      var semver = require('semver');
      var useNodeBuiltin = isNode && semver.Range('>=' + NODE_MIN_VER_WITH_BUILTIN_SCRYPT).test(process.version);
      var tryScryptPackage = function () {
        var scryptPackage;
        return function () {
          if (scryptPackage !== undefined) {
            return scryptPackage;
          }
          try {
            scryptPackage = require('scrypt');
          } catch (error) {
            if (/was compiled against a different/.test(error.message)) {
              throw error;
            }
            scryptPackage = null;
          }
          return scryptPackage;
        };
      }();
      var canImprove = function canImprove(nodeVer) {
        return "can improve web3's peformance when running Node.js versions older than ".concat(nodeVer, " by installing the (deprecated) scrypt package in your project");
      };
      if (useNodeBuiltin) {
        var crypto = require('crypto');
        var fallbackCount = 0;
        scrypt = function scrypt(key, salt, N, r, p, dkLength) {
          try {
            return crypto.scryptSync(key, salt, dkLength, {
              N: N,
              r: r,
              p: p
            });
          } catch (error) {
            if (/scrypt:memory limit exceeded/.test(error.message)) {
              var scryptPackage = tryScryptPackage();
              if (scryptPackage) {
                return scryptPackage.hashSync(key, {
                  N: N,
                  r: r,
                  p: p
                }, dkLength, salt);
              }
              fallbackCount += 1;
              console.warn("\x1B[33m%s\x1B[0m", "Memory limit exceeded for Node's built-in crypto.scrypt, falling back to scryptsy (times: ".concat(fallbackCount, "), if this happens frequently you ").concat(canImprove(NODE_MIN_VER_INCOMPAT_SCRYPT_PKG)));
              return scryptsy(key, salt, N, r, p, dkLength);
            }
            throw error;
          }
        };
      } else {
        var scryptPackage = tryScryptPackage();
        if (scryptPackage) {
          scrypt = function scrypt(key, salt, N, r, p, dkLength) {
            return scryptPackage.hashSync(key, {
              N: N,
              r: r,
              p: p
            }, dkLength, salt);
          };
        } else {
          console.warn("\x1B[33m%s\x1B[0m", "You ".concat(canImprove(NODE_MIN_VER_WITH_BUILTIN_SCRYPT)));
        }
      }
    }
    scrypt = scrypt || scryptsy;
    var scrypt$1 = scrypt;

    var Account =
    function () {
      function Account(options) {
        var accounts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        _classCallCheck(this, Account);
        this.address = options.address;
        this.privateKey = options.privateKey;
        this.nonce = options.nonce;
        this.accounts = accounts;
      }
      _createClass(Account, [{
        key: "signTransaction",
        value: function signTransaction(tx, callback) {
          return this.accounts.signTransaction(tx, this.privateKey, callback);
        }
      }, {
        key: "sign",
        value: function sign(data) {
          if (Utils.isHexStrict(data)) {
            data = Utils.hexToBytes(data);
          }
          var messageBuffer = Buffer.from(data);
          var preamble = "\x19Ethereum Signed Message:\n".concat(data.length);
          var preambleBuffer = Buffer.from(preamble);
          var ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
          var hash = Hash.keccak256s(ethMessage);
          var signature = EthLibAccount.sign(hash, this.privateKey);
          var vrs = EthLibAccount.decodeSignature(signature);
          return {
            message: data,
            messageHash: hash,
            v: vrs[0],
            r: vrs[1],
            s: vrs[2],
            signature: signature
          };
        }
      }, {
        key: "encrypt",
        value: function encrypt(password, options) {
          return Account.fromPrivateKey(this.privateKey, this.accounts).toV3Keystore(password, options);
        }
      }, {
        key: "toV3Keystore",
        value: function toV3Keystore(password, options) {
          options = options || {};
          var salt = options.salt || randomBytes(32);
          var iv = options.iv || randomBytes(16);
          var derivedKey;
          var kdf = options.kdf || 'scrypt';
          var kdfparams = {
            dklen: options.dklen || 32,
            salt: salt.toString('hex')
          };
          if (kdf === 'pbkdf2') {
            kdfparams.c = options.c || 262144;
            kdfparams.prf = 'hmac-sha256';
            derivedKey = pbkdf2.pbkdf2Sync(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');
          } else if (kdf === 'scrypt') {
            kdfparams.n = options.n || 8192;
            kdfparams.r = options.r || 8;
            kdfparams.p = options.p || 1;
            derivedKey = scrypt$1(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
          } else {
            throw new Error('Unsupported kdf');
          }
          var cipher = browserifyCipher.createCipheriv(options.cipher || 'aes-128-ctr', derivedKey.slice(0, 16), iv);
          if (!cipher) {
            throw new Error('Unsupported cipher');
          }
          var ciphertext = Buffer.concat([cipher.update(Buffer.from(this.privateKey.replace('0x', ''), 'hex')), cipher.final()]);
          var mac = Utils.keccak256(Buffer.concat([derivedKey.slice(16, 32), Buffer.from(ciphertext, 'hex')])).replace('0x', '');
          return {
            version: 3,
            id: uuid.v4({
              random: options.uuid || randomBytes(16)
            }),
            address: this.address.toLowerCase().replace('0x', ''),
            crypto: {
              ciphertext: ciphertext.toString('hex'),
              cipherparams: {
                iv: iv.toString('hex')
              },
              cipher: options.cipher || 'aes-128-ctr',
              kdf: kdf,
              kdfparams: kdfparams,
              mac: mac.toString('hex')
            }
          };
        }
      }], [{
        key: "from",
        value: function from(entropy) {
          var accounts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return new Account(EthLibAccount.create(entropy || Utils.randomHex(32)), accounts);
        }
      }, {
        key: "fromPrivateKey",
        value: function fromPrivateKey(privateKey) {
          var accounts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          if (!privateKey.startsWith('0x')) {
            privateKey = '0x' + privateKey;
          }
          if (privateKey.length !== 66) {
            throw new Error('Private key must be 32 bytes long');
          }
          return new Account(EthLibAccount.fromPrivate(privateKey), accounts);
        }
      }, {
        key: "fromV3Keystore",
        value: function fromV3Keystore(v3Keystore, password) {
          var nonStrict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var accounts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
          if (!isString(password)) {
            throw new Error('No password given.');
          }
          var json = isObject(v3Keystore) ? v3Keystore : JSON.parse(nonStrict ? v3Keystore.toLowerCase() : v3Keystore);
          if (json.version !== 3) {
            throw new Error('Not a valid V3 wallet');
          }
          var derivedKey;
          var kdfparams;
          if (json.crypto.kdf === 'scrypt') {
            kdfparams = json.crypto.kdfparams;
            derivedKey = scrypt$1(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
          } else if (json.crypto.kdf === 'pbkdf2') {
            kdfparams = json.crypto.kdfparams;
            if (kdfparams.prf !== 'hmac-sha256') {
              throw new Error('Unsupported parameters to PBKDF2');
            }
            derivedKey = pbkdf2.pbkdf2Sync(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');
          } else {
            throw new Error('Unsupported key derivation scheme');
          }
          var ciphertext = Buffer.from(json.crypto.ciphertext, 'hex');
          var mac = Utils.keccak256(Buffer.concat([derivedKey.slice(16, 32), ciphertext])).replace('0x', '');
          if (mac !== json.crypto.mac) {
            throw new Error('Key derivation failed - possibly wrong password');
          }
          var decipher = browserifyCipher.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), Buffer.from(json.crypto.cipherparams.iv, 'hex'));
          var seed = "0x".concat(Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('hex'));
          return Account.fromPrivateKey(seed, accounts);
        }
      }]);
      return Account;
    }();

    var Wallet =
    function () {
      function Wallet(utils, accountsModule) {
        _classCallCheck(this, Wallet);
        this.utils = utils;
        this.accountsModule = accountsModule;
        this.defaultKeyName = 'web3js_wallet';
        this.accounts = {};
        this.accountsIndex = 0;
        return new Proxy(this, {
          get: function get(target, name) {
            if (target.accounts[name]) {
              return target.accounts[name];
            }
            if (name === 'length') {
              return target.accountsIndex;
            }
            return target[name];
          }
        });
      }
      _createClass(Wallet, [{
        key: "create",
        value: function create(numberOfAccounts, entropy) {
          for (var i = 0; i < numberOfAccounts; ++i) {
            this.add(Account.from(entropy || this.utils.randomHex(32), this.accountsModule));
          }
          return this;
        }
      }, {
        key: "get",
        value: function get(account) {
          return this.accounts[account];
        }
      }, {
        key: "add",
        value: function add(account) {
          if (isString(account)) {
            account = Account.fromPrivateKey(account, this.accountsModule);
          }
          if (!this.accounts[account.address]) {
            this.accounts[this.accountsIndex] = account;
            this.accounts[account.address] = account;
            this.accounts[account.address.toLowerCase()] = account;
            this.accountsIndex++;
            return account;
          }
          return this.accounts[account.address];
        }
      }, {
        key: "remove",
        value: function remove(addressOrIndex) {
          var account = this.accounts[addressOrIndex];
          if (account) {
            delete this.accounts[account.address];
            delete this.accounts[account.address.toLowerCase()];
            delete this.accounts[account.index];
            return true;
          }
          return false;
        }
      }, {
        key: "clear",
        value: function clear() {
          for (var i = 0; i <= this.accountsIndex; i++) {
            this.remove(i);
          }
          this.accountsIndex = 0;
          return this;
        }
      }, {
        key: "encrypt",
        value: function encrypt(password, options) {
          var encryptedAccounts = [];
          for (var i = 0; i < this.accountsIndex; i++) {
            encryptedAccounts.push(this.accounts[i].encrypt(password, options));
          }
          return encryptedAccounts;
        }
      }, {
        key: "decrypt",
        value: function decrypt(encryptedWallet, password) {
          var _this = this;
          encryptedWallet.forEach(function (keystore) {
            var account = Account.fromV3Keystore(keystore, password, false, _this.accountsModule);
            if (!account) {
              throw new Error("Couldn't decrypt accounts. Password wrong?");
            }
            _this.add(account);
          });
          return this;
        }
      }, {
        key: "save",
        value: function save(password, keyName) {
          console.warn('SECURITY WARNING: Storing of accounts in the localStorage is highly insecure!');
          if (typeof localStorage === 'undefined') {
            throw new TypeError('window.localStorage is undefined.');
          }
          try {
            localStorage.setItem(keyName || this.defaultKeyName, JSON.stringify(this.encrypt(password)));
          } catch (error) {
            if (error.code === 18) {
              return true;
            }
            throw new Error(error);
          }
          return true;
        }
      }, {
        key: "load",
        value: function load(password, keyName) {
          console.warn('SECURITY WARNING: Storing of accounts in the localStorage is highly insecure!');
          if (typeof localStorage === 'undefined') {
            throw new TypeError('window.localStorage is undefined.');
          }
          var keystore;
          try {
            keystore = localStorage.getItem(keyName || this.defaultKeyName);
            if (keystore) {
              keystore = JSON.parse(keystore);
            }
          } catch (error) {
            if (error.code === 18) {
              keystore = this.defaultKeyName;
            } else {
              throw new Error(error);
            }
          }
          return this.decrypt(keystore || [], password);
        }
      }]);
      return Wallet;
    }();

    var Accounts =
    function (_AbstractWeb3Module) {
      _inherits(Accounts, _AbstractWeb3Module);
      function Accounts(provider, utils, formatters, methodFactory, options, net) {
        var _this;
        _classCallCheck(this, Accounts);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(Accounts).call(this, provider, options, methodFactory, net));
        _this.utils = utils;
        _this.formatters = formatters;
        _this._transactionSigner = options.transactionSigner;
        _this.defaultKeyName = 'web3js_wallet';
        _this.accounts = {};
        _this.accountsIndex = 0;
        _this.wallet = new Wallet(utils, _assertThisInitialized(_this));
        return _this;
      }
      _createClass(Accounts, [{
        key: "create",
        value: function create(entropy) {
          return Account.from(entropy, this);
        }
      }, {
        key: "privateKeyToAccount",
        value: function privateKeyToAccount(privateKey) {
          return Account.fromPrivateKey(privateKey, this);
        }
      }, {
        key: "hashMessage",
        value: function hashMessage(data) {
          if (this.utils.isHexStrict(data)) {
            data = this.utils.hexToBytes(data);
          }
          var messageBuffer = Buffer.from(data);
          var preambleBuffer = Buffer.from("\x19Ethereum Signed Message:\n".concat(data.length));
          var ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
          return Hash.keccak256s(ethMessage);
        }
      }, {
        key: "signTransaction",
        value: function () {
          var _signTransaction = _asyncToGenerator(
          _regeneratorRuntime.mark(function _callee(tx, privateKey, callback) {
            var account, signedTransaction;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    account = Account.fromPrivateKey(privateKey, this);
                    if (tx.chainId) {
                      _context.next = 6;
                      break;
                    }
                    _context.next = 5;
                    return this.getChainId();
                  case 5:
                    tx.chainId = _context.sent;
                  case 6:
                    if (tx.gasPrice) {
                      _context.next = 10;
                      break;
                    }
                    _context.next = 9;
                    return this.getGasPrice();
                  case 9:
                    tx.gasPrice = _context.sent;
                  case 10:
                    if (!(!tx.nonce && tx.nonce !== 0)) {
                      _context.next = 14;
                      break;
                    }
                    _context.next = 13;
                    return this.getTransactionCount(account.address);
                  case 13:
                    tx.nonce = _context.sent;
                  case 14:
                    _context.next = 16;
                    return this.transactionSigner.sign(this.formatters.inputCallFormatter(tx, this), account.privateKey);
                  case 16:
                    signedTransaction = _context.sent;
                    if (isFunction(callback)) {
                      callback(false, signedTransaction);
                    }
                    return _context.abrupt("return", signedTransaction);
                  case 21:
                    _context.prev = 21;
                    _context.t0 = _context["catch"](0);
                    if (!isFunction(callback)) {
                      _context.next = 26;
                      break;
                    }
                    callback(_context.t0, null);
                    return _context.abrupt("return");
                  case 26:
                    throw _context.t0;
                  case 27:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[0, 21]]);
          }));
          function signTransaction(_x, _x2, _x3) {
            return _signTransaction.apply(this, arguments);
          }
          return signTransaction;
        }()
      }, {
        key: "recoverTransaction",
        value: function recoverTransaction(rawTx) {
          var values = RLP.decode(rawTx);
          var signature = EthLibAccount.encodeSignature(values.slice(6, 9));
          var recovery = Bytes.toNumber(values[6]);
          var extraData = recovery < 35 ? [] : [Bytes.fromNumber(recovery - 35 >> 1), '0x', '0x'];
          var signingData = values.slice(0, 6).concat(extraData);
          var signingDataHex = RLP.encode(signingData);
          return EthLibAccount.recover(Hash.keccak256(signingDataHex), signature);
        }
      }, {
        key: "sign",
        value: function sign(data, privateKey) {
          if (this.utils.isHexStrict(data)) {
            data = this.utils.hexToBytes(data);
          }
          return Account.fromPrivateKey(privateKey, this).sign(data);
        }
      }, {
        key: "recover",
        value: function recover(message, signature, preFixed) {
          if (isObject(message)) {
            return this.recover(message.messageHash, EthLibAccount.encodeSignature([message.v, message.r, message.s]), true);
          }
          if (!preFixed) {
            message = this.hashMessage(message);
          }
          if (arguments.length >= 4) {
            return this.recover(arguments[0], EthLibAccount.encodeSignature([arguments[1], arguments[2], arguments[3]]), !!arguments[4]);
          }
          return EthLibAccount.recover(message, signature);
        }
      }, {
        key: "decrypt",
        value: function decrypt(v3Keystore, password, nonStrict) {
          return Account.fromV3Keystore(v3Keystore, password, nonStrict, this);
        }
      }, {
        key: "encrypt",
        value: function encrypt(privateKey, password, options) {
          return Account.fromPrivateKey(privateKey, this).toV3Keystore(password, options);
        }
      }, {
        key: "transactionSigner",
        get: function get() {
          return this._transactionSigner;
        }
        ,
        set: function set(transactionSigner) {
          if (transactionSigner.type && transactionSigner.type === 'TransactionSigner') {
            throw new Error('Invalid TransactionSigner given!');
          }
          this._transactionSigner = transactionSigner;
        }
      }]);
      return Accounts;
    }(web3Core.AbstractWeb3Module);

    function Accounts$1(provider) {
      var net = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return new Accounts(provider, Utils, web3CoreHelpers.formatters, new MethodFactory(Utils, web3CoreHelpers.formatters), options, net);
    }

    exports.Accounts = Accounts$1;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
