'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
var isObject = _interopDefault(require('lodash/isObject'));
var isString = _interopDefault(require('lodash/isString'));
var isArray = _interopDefault(require('lodash/isArray'));
var isBoolean = _interopDefault(require('lodash/isBoolean'));
var isNumber = _interopDefault(require('lodash/isNumber'));
var isNull = _interopDefault(require('lodash/isNull'));
var numberToBN = _interopDefault(require('number-to-bn'));
var utf8 = _interopDefault(require('utf8'));
var Hash = _interopDefault(require('eth-lib/lib/hash'));
var BN = _interopDefault(require('bn.js'));
var ethjsUnit = require('ethjs-unit');
var randombytes = _interopDefault(require('randombytes'));
var map = _interopDefault(require('lodash/map'));

var isBN = function isBN(object) {
  return BN.isBN(object);
};
var isBigNumber = function isBigNumber(object) {
  return object && object.constructor && object.constructor.name === 'BigNumber';
};
var toBN = function toBN(number) {
  try {
    return numberToBN(number);
  } catch (error) {
    throw new Error("".concat(error, " Given value: \"").concat(number, "\""));
  }
};
var toTwosComplement = function toTwosComplement(number) {
  return "0x".concat(toBN(number).toTwos(256).toString(16, 64));
};
var isAddress = function isAddress(address) {
  var chainId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
    return true;
  } else {
    return checkAddressChecksum(address, chainId);
  }
};
var stripHexPrefix = function stripHexPrefix(string) {
  return string.startsWith('0x') || string.startsWith('0X') ? string.slice(2) : string;
};
var checkAddressChecksum = function checkAddressChecksum(address) {
  var chainId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var stripAddress = stripHexPrefix(address).toLowerCase();
  var prefix = chainId != null ? chainId.toString() + '0x' : '';
  var keccakHash = Hash.keccak256(prefix + stripAddress).toString('hex').replace(/^0x/i, '');
  for (var i = 0; i < stripAddress.length; i++) {
    var output = parseInt(keccakHash[i], 16) >= 8 ? stripAddress[i].toUpperCase() : stripAddress[i];
    if (stripHexPrefix(address)[i] !== output) {
      return false;
    }
  }
  return true;
};
var leftPad = function leftPad(string, chars, sign) {
  var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
  string = string.toString(16).replace(/^0x/i, '');
  var padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;
  return (hasPrefix ? '0x' : '') + new Array(padding).join(sign || '0') + string;
};
var rightPad = function rightPad(string, chars, sign) {
  var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
  string = string.toString(16).replace(/^0x/i, '');
  var padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;
  return (hasPrefix ? '0x' : '') + string + new Array(padding).join(sign || '0');
};
var utf8ToHex = function utf8ToHex(value) {
  value = utf8.encode(value);
  var hex = '';
  value = value.replace(/^(?:\u0000)*/, '');
  value = value.split('').reverse().join('');
  value = value.replace(/^(?:\u0000)*/, '');
  value = value.split('').reverse().join('');
  for (var i = 0; i < value.length; i++) {
    var code = value.charCodeAt(i);
    var n = code.toString(16);
    hex += n.length < 2 ? "0".concat(n) : n;
  }
  return "0x".concat(hex);
};
var hexToUtf8 = function hexToUtf8(hex) {
  if (!isHexStrict(hex)) throw new Error("The parameter \"".concat(hex, "\" must be a valid HEX string."));
  var string = '';
  var code = 0;
  hex = hex.replace(/^0x/i, '');
  hex = hex.replace(/^(?:00)*/, '');
  hex = hex.split('').reverse().join('');
  hex = hex.replace(/^(?:00)*/, '');
  hex = hex.split('').reverse().join('');
  var l = hex.length;
  for (var i = 0; i < l; i += 2) {
    code = parseInt(hex.substr(i, 2), 16);
    string += String.fromCharCode(code);
  }
  return utf8.decode(string);
};
var hexToNumber = function hexToNumber(value) {
  if (!value) {
    return value;
  }
  return toBN(value).toNumber();
};
var hexToNumberString = function hexToNumberString(value) {
  if (!value) return value;
  if (isString(value)) {
    if (!isHexStrict(value)) throw new Error("Given value \"".concat(value, "\" is not a valid hex string."));
  }
  return toBN(value).toString(10);
};
var numberToHex = function numberToHex(value) {
  if (isNull(value) || typeof value === 'undefined') {
    return value;
  }
  if (!isFinite(value) && !isHexStrict(value)) {
    throw new Error("Given input \"".concat(value, "\" is not a number."));
  }
  var number = toBN(value);
  var result = number.toString(16);
  return number.lt(new BN(0)) ? "-0x".concat(result.substr(1)) : "0x".concat(result);
};
var bytesToHex = function bytesToHex(bytes) {
  var hex = [];
  for (var i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xf).toString(16));
  }
  return "0x".concat(hex.join('').replace(/^0+/, ''));
};
var hexToBytes = function hexToBytes(hex) {
  hex = hex.toString(16);
  if (!isHexStrict(hex)) {
    throw new Error("Given value \"".concat(hex, "\" is not a valid hex string."));
  }
  hex = hex.replace(/^0x/i, '');
  hex = hex.length % 2 ? '0' + hex : hex;
  var bytes = [];
  for (var c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
};
var toHex = function toHex(value, returnType) {
  if (isAddress(value)) {
    return returnType ? 'address' : "0x".concat(value.toLowerCase().replace(/^0x/i, ''));
  }
  if (isBoolean(value)) {
    return returnType ? 'bool' : value ? '0x01' : '0x00';
  }
  if (isObject(value) && !isBigNumber(value) && !isBN(value)) {
    return returnType ? 'string' : utf8ToHex(JSON.stringify(value));
  }
  if (isString(value)) {
    if (value.indexOf('-0x') === 0 || value.indexOf('-0X') === 0) {
      return returnType ? 'int256' : numberToHex(value);
    } else if (value.indexOf('0x') === 0 || value.indexOf('0X') === 0) {
      return returnType ? 'bytes' : value;
    } else if (!isFinite(value)) {
      return returnType ? 'string' : utf8ToHex(value);
    }
  }
  return returnType ? value < 0 ? 'int256' : 'uint256' : numberToHex(value);
};
var isHexStrict = function isHexStrict(hex) {
  return (isString(hex) || isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
};
var isHex = function isHex(hex) {
  return (isString(hex) || isNumber(hex)) && /^(-0x|0x)?[0-9a-f]*$/i.test(hex);
};
var isBloom = function isBloom(bloom) {
  if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
    return false;
  } else if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
    return true;
  }
  return false;
};
var isTopic = function isTopic(topic) {
  if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
    return false;
  } else if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
    return true;
  }
  return false;
};
var KECCAK256_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
var keccak256 = function keccak256(value) {
  if (isHexStrict(value) && /^0x/i.test(value.toString())) {
    value = hexToBytes(value);
  }
  var returnValue = Hash.keccak256(value);
  if (returnValue === KECCAK256_NULL_S) {
    return null;
  } else {
    return returnValue;
  }
};
keccak256._Hash = Hash;
var getSignatureParameters = function getSignatureParameters(signature) {
  if (!isHexStrict(signature)) {
    throw new Error("Given value \"".concat(signature, "\" is not a valid hex string."));
  }
  var r = signature.slice(0, 66);
  var s = "0x".concat(signature.slice(66, 130));
  var v = "0x".concat(signature.slice(130, 132));
  v = hexToNumber(v);
  if (![27, 28].includes(v)) v += 27;
  return {
    r: r,
    s: s,
    v: v
  };
};

var utils = /*#__PURE__*/Object.freeze({
    isBN: isBN,
    isBigNumber: isBigNumber,
    toBN: toBN,
    toTwosComplement: toTwosComplement,
    isAddress: isAddress,
    stripHexPrefix: stripHexPrefix,
    checkAddressChecksum: checkAddressChecksum,
    leftPad: leftPad,
    rightPad: rightPad,
    utf8ToHex: utf8ToHex,
    hexToUtf8: hexToUtf8,
    hexToNumber: hexToNumber,
    hexToNumberString: hexToNumberString,
    numberToHex: numberToHex,
    bytesToHex: bytesToHex,
    hexToBytes: hexToBytes,
    toHex: toHex,
    isHexStrict: isHexStrict,
    isHex: isHex,
    isBloom: isBloom,
    isTopic: isTopic,
    keccak256: keccak256,
    getSignatureParameters: getSignatureParameters
});

var _elementaryName = function _elementaryName(name) {
  if (name.startsWith('int[')) {
    return "int256".concat(name.slice(3));
  }
  if (name === 'int') {
    return 'int256';
  }
  if (name.startsWith('uint[')) {
    return "uint256".concat(name.slice(4));
  }
  if (name === 'uint') {
    return 'uint256';
  }
  if (name.startsWith('fixed[')) {
    return "fixed128x128".concat(name.slice(5));
  }
  if (name === 'fixed') {
    return 'fixed128x128';
  }
  if (name.startsWith('ufixed[')) {
    return "ufixed128x128".concat(name.slice(6));
  }
  if (name === 'ufixed') {
    return 'ufixed128x128';
  }
  return name;
};
var _parseTypeN = function _parseTypeN(type) {
  var typesize = /^\D+(\d+).*$/.exec(type);
  return typesize ? parseInt(typesize[1], 10) : null;
};
var _parseTypeNArray = function _parseTypeNArray(type) {
  var arraySize = /^\D+\d*\[(\d+)\]$/.exec(type);
  return arraySize ? parseInt(arraySize[1], 10) : null;
};
var _parseNumber = function _parseNumber(argument) {
  var type = _typeof(argument);
  if (type === 'string') {
    if (isHexStrict(argument)) {
      return new BN(argument.replace(/0x/i, ''), 16);
    } else {
      return new BN(argument, 10);
    }
  } else if (type === 'number') {
    return new BN(argument);
  } else if (isBigNumber(argument)) {
    return new BN(argument.toString(10));
  } else if (isBN(argument)) {
    return argument;
  } else {
    throw new Error("".concat(argument, " is not a number"));
  }
};
var _solidityPack = function _solidityPack(type, value, arraySize) {
  var size, number;
  type = _elementaryName(type);
  if (type === 'bytes') {
    if (value.replace(/^0x/i, '').length % 2 !== 0) {
      throw new Error("Invalid bytes characters ".concat(value.length));
    }
    return value;
  } else if (type === 'string') {
    return utf8ToHex(value);
  } else if (type === 'bool') {
    return value ? '01' : '00';
  } else if (type.startsWith('address')) {
    if (arraySize) {
      size = 64;
    } else {
      size = 40;
    }
    if (!isAddress(value)) {
      throw new Error("".concat(value, " is not a valid address, or the checksum is invalid."));
    }
    return leftPad(value.toLowerCase(), size);
  }
  size = _parseTypeN(type);
  if (type.startsWith('bytes')) {
    if (!size) {
      throw new Error('bytes[] not yet supported in solidity');
    }
    if (arraySize) {
      size = 32;
    }
    if (size < 1 || size > 32 || size < value.replace(/^0x/i, '').length / 2) {
      throw new Error("Invalid bytes".concat(size, " for ").concat(value));
    }
    return rightPad(value, size * 2);
  } else if (type.startsWith('uint')) {
    if (size % 8 || size < 8 || size > 256) {
      throw new Error("Invalid uint".concat(size, " size"));
    }
    number = _parseNumber(value);
    if (number.bitLength() > size) {
      throw new Error("Supplied uint exceeds width: ".concat(size, " vs ").concat(number.bitLength()));
    }
    if (number.lt(new BN(0))) {
      throw new Error("Supplied uint ".concat(number.toString(), " is negative"));
    }
    return size ? leftPad(number.toString('hex'), size / 8 * 2) : number;
  } else if (type.startsWith('int')) {
    if (size % 8 || size < 8 || size > 256) {
      throw new Error("Invalid int".concat(size, " size"));
    }
    number = _parseNumber(value);
    if (number.bitLength() > size) {
      throw new Error("Supplied int exceeds width: ".concat(size, " vs ").concat(number.bitLength()));
    }
    if (number.lt(new BN(0))) {
      return number.toTwos(size).toString('hex');
    } else {
      return size ? leftPad(number.toString('hex'), size / 8 * 2) : number;
    }
  } else {
    throw new Error("Unsupported or invalid type: ".concat(type));
  }
};
var _processSoliditySha3Arguments = function _processSoliditySha3Arguments(argument) {
  if (isArray(argument)) {
    throw new Error('Autodetection of array types is not supported.');
  }
  var type;
  var value = '';
  var hexArgument, arraySize;
  if (isObject(argument) && (argument.hasOwnProperty('v') || argument.hasOwnProperty('t') || argument.hasOwnProperty('value') || argument.hasOwnProperty('type'))) {
    type = argument.hasOwnProperty('t') ? argument.t : argument.type;
    value = argument.hasOwnProperty('v') ? argument.v : argument.value;
  } else {
    type = toHex(argument, true);
    value = toHex(argument);
    if (!type.startsWith('int') && !type.startsWith('uint')) {
      type = 'bytes';
    }
  }
  if ((type.startsWith('int') || type.startsWith('uint')) && typeof value === 'string' && !/^(-)?0x/i.test(value)) {
    value = new BN(value);
  }
  if (isArray(value)) {
    arraySize = _parseTypeNArray(type);
    if (arraySize && value.length !== arraySize) {
      throw new Error("".concat(type, " is not matching the given array ").concat(JSON.stringify(value)));
    } else {
      arraySize = value.length;
    }
  }
  if (isArray(value)) {
    hexArgument = value.map(function (value_) {
      return _solidityPack(type, value_, arraySize).toString('hex').replace('0x', '');
    });
    return hexArgument.join('');
  } else {
    hexArgument = _solidityPack(type, value, arraySize);
    return hexArgument.toString('hex').replace('0x', '');
  }
};
var soliditySha3 = function soliditySha3() {
  var arguments_ = Array.prototype.slice.call(arguments);
  var hexArguments = map(arguments_, _processSoliditySha3Arguments);
  return keccak256("0x".concat(hexArguments.join('')));
};

var randomHex = function randomHex(size) {
  return '0x' + randombytes(size).toString('hex');
};
var jsonInterfaceMethodToString = function jsonInterfaceMethodToString(json) {
  if (isObject(json) && json.name && json.name.includes('(')) {
    return json.name;
  }
  return "".concat(json.name, "(").concat(_flattenTypes(false, json.inputs).join(','), ")");
};
var _flattenTypes = function _flattenTypes(includeTuple, puts) {
  var types = [];
  puts.forEach(function (param) {
    if (_typeof(param.components) === 'object') {
      if (param.type.substring(0, 5) !== 'tuple') {
        throw new Error('components found but type is not tuple; report on GitHub');
      }
      var suffix = '';
      var arrayBracket = param.type.indexOf('[');
      if (arrayBracket >= 0) {
        suffix = param.type.substring(arrayBracket);
      }
      var result = _flattenTypes(includeTuple, param.components);
      if (isArray(result) && includeTuple) {
        types.push("tuple(".concat(result.join(','), ")").concat(suffix));
      } else if (!includeTuple) {
        types.push("(".concat(result.join(','), ")").concat(suffix));
      } else {
        types.push("(".concat(result, ")"));
      }
    } else {
      types.push(param.type);
    }
  });
  return types;
};
var hexToAscii = function hexToAscii(hex) {
  if (!isHexStrict(hex)) throw new Error('The parameter must be a valid HEX string.');
  var value = '';
  var i = 0;
  var l = hex.length;
  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }
  for (; i < l; i += 2) {
    var code = parseInt(hex.substr(i, 2), 16);
    value += String.fromCharCode(code);
  }
  return value;
};
var asciiToHex = function asciiToHex(value) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;
  var hex = '';
  for (var i = 0; i < value.length; i++) {
    var code = value.charCodeAt(i);
    var n = code.toString(16);
    hex += n.length < 2 ? "0".concat(n) : n;
  }
  return '0x' + rightPad(hex, length * 2);
};
var getUnitValue = function getUnitValue(unit) {
  unit = unit ? unit.toLowerCase() : 'ether';
  if (!ethjsUnit.unitMap[unit]) {
    throw new Error("This unit \"".concat(unit, "\" doesn't exist, please use the one of the following units").concat(JSON.stringify(ethjsUnit.unitMap, null, 2)));
  }
  return unit;
};
var fromWei = function fromWei(number, unit) {
  unit = getUnitValue(unit);
  if (!isBN(number) && !isString(number)) {
    throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
  }
  return isBN(number) ? ethjsUnit.fromWei(number, unit) : ethjsUnit.fromWei(number, unit).toString(10);
};
var toWei = function toWei(number, unit) {
  unit = getUnitValue(unit);
  if (!isBN(number) && !isString(number)) {
    throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
  }
  return isBN(number) ? ethjsUnit.toWei(number, unit) : ethjsUnit.toWei(number, unit).toString(10);
};
var toChecksumAddress = function toChecksumAddress(address) {
  var chainId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (typeof address !== 'string') {
    return '';
  }
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) throw new Error("Given address \"".concat(address, "\" is not a valid Ethereum address."));
  var stripAddress = stripHexPrefix$1(address).toLowerCase();
  var prefix = chainId != null ? chainId.toString() + '0x' : '';
  var keccakHash = Hash.keccak256(prefix + stripAddress).toString('hex').replace(/^0x/i, '');
  var checksumAddress = '0x';
  for (var i = 0; i < stripAddress.length; i++) {
    checksumAddress += parseInt(keccakHash[i], 16) >= 8 ? stripAddress[i].toUpperCase() : stripAddress[i];
  }
  return checksumAddress;
};
var keccak256$1 = keccak256;
var sha3 = keccak256;
var toDecimal = hexToNumber;
var hexToNumber$1 = hexToNumber;
var fromDecimal = numberToHex;
var numberToHex$1 = numberToHex;
var hexToUtf8$1 = hexToUtf8;
var hexToString = hexToUtf8;
var toUtf8 = hexToUtf8;
var stringToHex = utf8ToHex;
var fromUtf8 = utf8ToHex;
var utf8ToHex$1 = utf8ToHex;
var toAscii = hexToAscii;
var fromAscii = asciiToHex;
var padLeft = leftPad;
var padRight = rightPad;
var getSignatureParameters$1 = getSignatureParameters;
var isAddress$1 = isAddress;
var isBN$1 = isBN;
var checkAddressChecksum$1 = checkAddressChecksum;
var toBN$1 = toBN;
var toHex$1 = toHex;
var hexToNumberString$1 = hexToNumberString;
var toTwosComplement$1 = toTwosComplement;
var isHex$1 = isHex;
var isHexStrict$1 = isHexStrict;
var isBloom$1 = isBloom;
var isTopic$1 = isTopic;
var bytesToHex$1 = bytesToHex;
var hexToBytes$1 = hexToBytes;
var stripHexPrefix$1 = stripHexPrefix;
var isBigNumber$1 = isBigNumber;

exports.BN = BN;
exports.asciiToHex = asciiToHex;
exports.bytesToHex = bytesToHex$1;
exports.checkAddressChecksum = checkAddressChecksum$1;
exports.fromAscii = fromAscii;
exports.fromDecimal = fromDecimal;
exports.fromUtf8 = fromUtf8;
exports.fromWei = fromWei;
exports.getSignatureParameters = getSignatureParameters$1;
exports.getUnitValue = getUnitValue;
exports.hexToAscii = hexToAscii;
exports.hexToBytes = hexToBytes$1;
exports.hexToNumber = hexToNumber$1;
exports.hexToNumberString = hexToNumberString$1;
exports.hexToString = hexToString;
exports.hexToUtf8 = hexToUtf8$1;
exports.isAddress = isAddress$1;
exports.isBN = isBN$1;
exports.isBigNumber = isBigNumber$1;
exports.isBloom = isBloom$1;
exports.isHex = isHex$1;
exports.isHexStrict = isHexStrict$1;
exports.isTopic = isTopic$1;
exports.jsonInterfaceMethodToString = jsonInterfaceMethodToString;
exports.keccak256 = keccak256$1;
exports.numberToHex = numberToHex$1;
exports.padLeft = padLeft;
exports.padRight = padRight;
exports.randomHex = randomHex;
exports.sha3 = sha3;
exports.soliditySha3 = soliditySha3;
exports.stringToHex = stringToHex;
exports.stripHexPrefix = stripHexPrefix$1;
exports.toAscii = toAscii;
exports.toBN = toBN$1;
exports.toChecksumAddress = toChecksumAddress;
exports.toDecimal = toDecimal;
exports.toHex = toHex$1;
exports.toTwosComplement = toTwosComplement$1;
exports.toUtf8 = toUtf8;
exports.toWei = toWei;
exports.utf8ToHex = utf8ToHex$1;
