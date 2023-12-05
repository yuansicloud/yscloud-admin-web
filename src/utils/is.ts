export {
  isArguments,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBuffer,
  // isBoolean,
  // isDate,
  isElement,
  // isEmpty,
  isEqual,
  isEqualWith,
  isError,
  // isFunction,
  isFinite,
  isLength,
  isMap,
  // isMatch,
  isMatchWith,
  isNative,
  isNil,
  // isNumber,
  // isNull,
  isObjectLike,
  isPlainObject,
  // isRegExp,
  isSafeInteger,
  isSet,
  // isString,
  isSymbol,
  isTypedArray,
  isUndefined,
  isWeakMap,
  isWeakSet,
} from 'lodash-es';
const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

// TODO 此处 isObject 存在歧义
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}
// TODO 此处 isArray 存在歧义
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export function isHttpUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(path);
}

export function isMatch(reg: RegExp, val: string) {
  return reg.test(val);
}

export function isEmail(val: string) {
  const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  return isMatch(reg, val);
}

export function isPhone(val: string) {
  const reg = /^(13[0-9]|14[5|7]|15[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
  return isMatch(reg, val);
}

export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  return isMatch(reg, path);
}

export function isSortUrl(path: string) {
  const reg1 = /^[a-zA-Z]+:\d{1,5}$/;
  const reg2 = /^([a-zA-Z\-\d+]+\.){1,}[a-z\-\d]+:\d{1,5}$/;
  return isMatch(reg1, path) || isMatch(reg2, path);
}

export function isIpPort(path: string): boolean {
  const reg =
    /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}:([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  return isMatch(reg, path);
}

export function isDigit(val: string) {
  return val.split('').some(_isDigit);
}

export function isLower(val: string) {
  return val.split('').some(_isLower);
}

export function isUpper(val: string) {
  return val.split('').some(_isUpper);
}

export function isLetterOrDigit(val: string) {
  const arr = val.split('');
  return !arr.some(_isLetterOrDigit);
}

function _isDigit(char: string) {
  return isMatch(/[0-9]/g, char);
}

function _isLower(char: string) {
  return isMatch(/[a-z]/g, char);
}

function _isUpper(char: string) {
  return isMatch(/[A-Z]/g, char);
}

function _isLetterOrDigit(char: string) {
  return isMatch(/[^ A-Za-z0-9_]/g, char);
}
