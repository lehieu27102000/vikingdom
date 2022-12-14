import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import isNull from 'lodash/isNull';
import numberToBN from 'number-to-bn';
import utf8 from 'utf8';
import Hash from 'eth-lib/lib/hash';
import BN from 'bn.js';
export { default as BN } from 'bn.js';
import { unitMap, fromWei as fromWei$1, toWei as toWei$1 } from 'ethjs-unit';
import randombytes from 'randombytes';
import map from 'lodash/map';

const isBN = object => {
  return BN.isBN(object);
};
const isBigNumber = object => {
  return object && object.constructor && object.constructor.name === 'BigNumber';
};
const toBN = number => {
  try {
    return numberToBN(number);
  } catch (error) {
    throw new Error(`${error} Given value: "${number}"`);
  }
};
const toTwosComplement = number => {
  return `0x${toBN(number).toTwos(256).toString(16, 64)}`;
};
const isAddress = (address, chainId = null) => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
    return true;
  } else {
    return checkAddressChecksum(address, chainId);
  }
};
const stripHexPrefix = string => {
  return string.startsWith('0x') || string.startsWith('0X') ? string.slice(2) : string;
};
const checkAddressChecksum = (address, chainId = null) => {
  const stripAddress = stripHexPrefix(address).toLowerCase();
  const prefix = chainId != null ? chainId.toString() + '0x' : '';
  const keccakHash = Hash.keccak256(prefix + stripAddress).toString('hex').replace(/^0x/i, '');
  for (let i = 0; i < stripAddress.length; i++) {
    let output = parseInt(keccakHash[i], 16) >= 8 ? stripAddress[i].toUpperCase() : stripAddress[i];
    if (stripHexPrefix(address)[i] !== output) {
      return false;
    }
  }
  return true;
};
const leftPad = (string, chars, sign) => {
  const hasPrefix = /^0x/i.test(string) || typeof string === 'number';
  string = string.toString(16).replace(/^0x/i, '');
  const padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;
  return (hasPrefix ? '0x' : '') + new Array(padding).join(sign || '0') + string;
};
const rightPad = (string, chars, sign) => {
  const hasPrefix = /^0x/i.test(string) || typeof string === 'number';
  string = string.toString(16).replace(/^0x/i, '');
  const padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;
  return (hasPrefix ? '0x' : '') + string + new Array(padding).join(sign || '0');
};
const utf8ToHex = value => {
  value = utf8.encode(value);
  let hex = '';
  value = value.replace(/^(?:\u0000)*/, '');
  value = value.split('').reverse().join('');
  value = value.replace(/^(?:\u0000)*/, '');
  value = value.split('').reverse().join('');
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    const n = code.toString(16);
    hex += n.length < 2 ? `0${n}` : n;
  }
  return `0x${hex}`;
};
const hexToUtf8 = hex => {
  if (!isHexStrict(hex)) throw new Error(`The parameter "${hex}" must be a valid HEX string.`);
  let string = '';
  let code = 0;
  hex = hex.replace(/^0x/i, '');
  hex = hex.replace(/^(?:00)*/, '');
  hex = hex.split('').reverse().join('');
  hex = hex.replace(/^(?:00)*/, '');
  hex = hex.split('').reverse().join('');
  const l = hex.length;
  for (let i = 0; i < l; i += 2) {
    code = parseInt(hex.substr(i, 2), 16);
    string += String.fromCharCode(code);
  }
  return utf8.decode(string);
};
const hexToNumber = value => {
  if (!value) {
    return value;
  }
  return toBN(value).toNumber();
};
const hexToNumberString = value => {
  if (!value) return value;
  if (isString(value)) {
    if (!isHexStrict(value)) throw new Error(`Given value "${value}" is not a valid hex string.`);
  }
  return toBN(value).toString(10);
};
const numberToHex = value => {
  if (isNull(value) || typeof value === 'undefined') {
    return value;
  }
  if (!isFinite(value) && !isHexStrict(value)) {
    throw new Error(`Given input "${value}" is not a number.`);
  }
  const number = toBN(value);
  const result = number.toString(16);
  return number.lt(new BN(0)) ? `-0x${result.substr(1)}` : `0x${result}`;
};
const bytesToHex = bytes => {
  let hex = [];
  for (let i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xf).toString(16));
  }
  return `0x${hex.join('').replace(/^0+/, '')}`;
};
const hexToBytes = hex => {
  hex = hex.toString(16);
  if (!isHexStrict(hex)) {
    throw new Error(`Given value "${hex}" is not a valid hex string.`);
  }
  hex = hex.replace(/^0x/i, '');
  hex = hex.length % 2 ? '0' + hex : hex;
  let bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
};
const toHex = (value, returnType) => {
  if (isAddress(value)) {
    return returnType ? 'address' : `0x${value.toLowerCase().replace(/^0x/i, '')}`;
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
const isHexStrict = hex => {
  return (isString(hex) || isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
};
const isHex = hex => {
  return (isString(hex) || isNumber(hex)) && /^(-0x|0x)?[0-9a-f]*$/i.test(hex);
};
const isBloom = bloom => {
  if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
    return false;
  } else if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
    return true;
  }
  return false;
};
const isTopic = topic => {
  if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
    return false;
  } else if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
    return true;
  }
  return false;
};
const KECCAK256_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
const keccak256 = value => {
  if (isHexStrict(value) && /^0x/i.test(value.toString())) {
    value = hexToBytes(value);
  }
  const returnValue = Hash.keccak256(value);
  if (returnValue === KECCAK256_NULL_S) {
    return null;
  } else {
    return returnValue;
  }
};
keccak256._Hash = Hash;
const getSignatureParameters = signature => {
  if (!isHexStrict(signature)) {
    throw new Error(`Given value "${signature}" is not a valid hex string.`);
  }
  const r = signature.slice(0, 66);
  const s = `0x${signature.slice(66, 130)}`;
  let v = `0x${signature.slice(130, 132)}`;
  v = hexToNumber(v);
  if (![27, 28].includes(v)) v += 27;
  return {
    r,
    s,
    v
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

const _elementaryName = name => {
  if (name.startsWith('int[')) {
    return `int256${name.slice(3)}`;
  }
  if (name === 'int') {
    return 'int256';
  }
  if (name.startsWith('uint[')) {
    return `uint256${name.slice(4)}`;
  }
  if (name === 'uint') {
    return 'uint256';
  }
  if (name.startsWith('fixed[')) {
    return `fixed128x128${name.slice(5)}`;
  }
  if (name === 'fixed') {
    return 'fixed128x128';
  }
  if (name.startsWith('ufixed[')) {
    return `ufixed128x128${name.slice(6)}`;
  }
  if (name === 'ufixed') {
    return 'ufixed128x128';
  }
  return name;
};
const _parseTypeN = type => {
  const typesize = /^\D+(\d+).*$/.exec(type);
  return typesize ? parseInt(typesize[1], 10) : null;
};
const _parseTypeNArray = type => {
  const arraySize = /^\D+\d*\[(\d+)\]$/.exec(type);
  return arraySize ? parseInt(arraySize[1], 10) : null;
};
const _parseNumber = argument => {
  const type = typeof argument;
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
    throw new Error(`${argument} is not a number`);
  }
};
const _solidityPack = (type, value, arraySize) => {
  let size, number;
  type = _elementaryName(type);
  if (type === 'bytes') {
    if (value.replace(/^0x/i, '').length % 2 !== 0) {
      throw new Error(`Invalid bytes characters ${value.length}`);
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
      throw new Error(`${value} is not a valid address, or the checksum is invalid.`);
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
      throw new Error(`Invalid bytes${size} for ${value}`);
    }
    return rightPad(value, size * 2);
  } else if (type.startsWith('uint')) {
    if (size % 8 || size < 8 || size > 256) {
      throw new Error(`Invalid uint${size} size`);
    }
    number = _parseNumber(value);
    if (number.bitLength() > size) {
      throw new Error(`Supplied uint exceeds width: ${size} vs ${number.bitLength()}`);
    }
    if (number.lt(new BN(0))) {
      throw new Error(`Supplied uint ${number.toString()} is negative`);
    }
    return size ? leftPad(number.toString('hex'), size / 8 * 2) : number;
  } else if (type.startsWith('int')) {
    if (size % 8 || size < 8 || size > 256) {
      throw new Error(`Invalid int${size} size`);
    }
    number = _parseNumber(value);
    if (number.bitLength() > size) {
      throw new Error(`Supplied int exceeds width: ${size} vs ${number.bitLength()}`);
    }
    if (number.lt(new BN(0))) {
      return number.toTwos(size).toString('hex');
    } else {
      return size ? leftPad(number.toString('hex'), size / 8 * 2) : number;
    }
  } else {
    throw new Error(`Unsupported or invalid type: ${type}`);
  }
};
const _processSoliditySha3Arguments = argument => {
  if (isArray(argument)) {
    throw new Error('Autodetection of array types is not supported.');
  }
  let type;
  let value = '';
  let hexArgument, arraySize;
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
      throw new Error(`${type} is not matching the given array ${JSON.stringify(value)}`);
    } else {
      arraySize = value.length;
    }
  }
  if (isArray(value)) {
    hexArgument = value.map(value_ => {
      return _solidityPack(type, value_, arraySize).toString('hex').replace('0x', '');
    });
    return hexArgument.join('');
  } else {
    hexArgument = _solidityPack(type, value, arraySize);
    return hexArgument.toString('hex').replace('0x', '');
  }
};
const soliditySha3 = function () {
  const arguments_ = Array.prototype.slice.call(arguments);
  const hexArguments = map(arguments_, _processSoliditySha3Arguments);
  return keccak256(`0x${hexArguments.join('')}`);
};

const randomHex = size => {
  return '0x' + randombytes(size).toString('hex');
};
const jsonInterfaceMethodToString = json => {
  if (isObject(json) && json.name && json.name.includes('(')) {
    return json.name;
  }
  return `${json.name}(${_flattenTypes(false, json.inputs).join(',')})`;
};
const _flattenTypes = (includeTuple, puts) => {
  const types = [];
  puts.forEach(param => {
    if (typeof param.components === 'object') {
      if (param.type.substring(0, 5) !== 'tuple') {
        throw new Error('components found but type is not tuple; report on GitHub');
      }
      let suffix = '';
      const arrayBracket = param.type.indexOf('[');
      if (arrayBracket >= 0) {
        suffix = param.type.substring(arrayBracket);
      }
      const result = _flattenTypes(includeTuple, param.components);
      if (isArray(result) && includeTuple) {
        types.push(`tuple(${result.join(',')})${suffix}`);
      } else if (!includeTuple) {
        types.push(`(${result.join(',')})${suffix}`);
      } else {
        types.push(`(${result})`);
      }
    } else {
      types.push(param.type);
    }
  });
  return types;
};
const hexToAscii = hex => {
  if (!isHexStrict(hex)) throw new Error('The parameter must be a valid HEX string.');
  let value = '';
  let i = 0;
  const l = hex.length;
  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }
  for (; i < l; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16);
    value += String.fromCharCode(code);
  }
  return value;
};
const asciiToHex = (value, length = 32) => {
  let hex = '';
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    const n = code.toString(16);
    hex += n.length < 2 ? `0${n}` : n;
  }
  return '0x' + rightPad(hex, length * 2);
};
const getUnitValue = unit => {
  unit = unit ? unit.toLowerCase() : 'ether';
  if (!unitMap[unit]) {
    throw new Error(`This unit "${unit}" doesn't exist, please use the one of the following units${JSON.stringify(unitMap, null, 2)}`);
  }
  return unit;
};
const fromWei = (number, unit) => {
  unit = getUnitValue(unit);
  if (!isBN(number) && !isString(number)) {
    throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
  }
  return isBN(number) ? fromWei$1(number, unit) : fromWei$1(number, unit).toString(10);
};
const toWei = (number, unit) => {
  unit = getUnitValue(unit);
  if (!isBN(number) && !isString(number)) {
    throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
  }
  return isBN(number) ? toWei$1(number, unit) : toWei$1(number, unit).toString(10);
};
const toChecksumAddress = (address, chainId = null) => {
  if (typeof address !== 'string') {
    return '';
  }
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) throw new Error(`Given address "${address}" is not a valid Ethereum address.`);
  const stripAddress = stripHexPrefix$1(address).toLowerCase();
  const prefix = chainId != null ? chainId.toString() + '0x' : '';
  const keccakHash = Hash.keccak256(prefix + stripAddress).toString('hex').replace(/^0x/i, '');
  let checksumAddress = '0x';
  for (let i = 0; i < stripAddress.length; i++) checksumAddress += parseInt(keccakHash[i], 16) >= 8 ? stripAddress[i].toUpperCase() : stripAddress[i];
  return checksumAddress;
};
const keccak256$1 = keccak256;
const sha3 = keccak256;
const toDecimal = hexToNumber;
const hexToNumber$1 = hexToNumber;
const fromDecimal = numberToHex;
const numberToHex$1 = numberToHex;
const hexToUtf8$1 = hexToUtf8;
const hexToString = hexToUtf8;
const toUtf8 = hexToUtf8;
const stringToHex = utf8ToHex;
const fromUtf8 = utf8ToHex;
const utf8ToHex$1 = utf8ToHex;
const toAscii = hexToAscii;
const fromAscii = asciiToHex;
const padLeft = leftPad;
const padRight = rightPad;
const getSignatureParameters$1 = getSignatureParameters;
const isAddress$1 = isAddress;
const isBN$1 = isBN;
const checkAddressChecksum$1 = checkAddressChecksum;
const toBN$1 = toBN;
const toHex$1 = toHex;
const hexToNumberString$1 = hexToNumberString;
const toTwosComplement$1 = toTwosComplement;
const isHex$1 = isHex;
const isHexStrict$1 = isHexStrict;
const isBloom$1 = isBloom;
const isTopic$1 = isTopic;
const bytesToHex$1 = bytesToHex;
const hexToBytes$1 = hexToBytes;
const stripHexPrefix$1 = stripHexPrefix;
const isBigNumber$1 = isBigNumber;

export { asciiToHex, bytesToHex$1 as bytesToHex, checkAddressChecksum$1 as checkAddressChecksum, fromAscii, fromDecimal, fromUtf8, fromWei, getSignatureParameters$1 as getSignatureParameters, getUnitValue, hexToAscii, hexToBytes$1 as hexToBytes, hexToNumber$1 as hexToNumber, hexToNumberString$1 as hexToNumberString, hexToString, hexToUtf8$1 as hexToUtf8, isAddress$1 as isAddress, isBN$1 as isBN, isBigNumber$1 as isBigNumber, isBloom$1 as isBloom, isHex$1 as isHex, isHexStrict$1 as isHexStrict, isTopic$1 as isTopic, jsonInterfaceMethodToString, keccak256$1 as keccak256, numberToHex$1 as numberToHex, padLeft, padRight, randomHex, sha3, soliditySha3, stringToHex, stripHexPrefix$1 as stripHexPrefix, toAscii, toBN$1 as toBN, toChecksumAddress, toDecimal, toHex$1 as toHex, toTwosComplement$1 as toTwosComplement, toUtf8, toWei, utf8ToHex$1 as utf8ToHex };
