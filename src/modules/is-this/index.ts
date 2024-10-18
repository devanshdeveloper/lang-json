class IsThis {
  // ------------------ Primitive Type Checks ------------------

  isString(value: any): value is string {
    return typeof value === "string";
  }

  isNumber(value: any): value is number {
    return typeof value === "number" && !isNaN(value);
  }

  isBoolean(value: any): value is boolean {
    return typeof value === "boolean";
  }

  isNull(value: any): value is null {
    return value === null;
  }

  isUndefined(value: any): value is undefined {
    return typeof value === "undefined";
  }

  isNullOrUndefined(value: any): boolean {
    return this.isNull(value) || this.isUndefined(value);
  }

  isBigInt(value: any): value is bigint {
    return typeof value === "bigint";
  }

  isSymbol(value: any): value is symbol {
    return typeof value === "symbol";
  }

  // ------------------ Collection Type Checks ------------------

  isArray(value: any): value is any[] {
    return Array.isArray(value);
  }

  isObject(value: any): value is object {
    return value !== null && typeof value === "object" && !this.isArray(value);
  }

  isArrayOrObject(value: any) {
    return this.isArray(value) || this.isObject(value);
  }

  isFunction(value: any): value is Function {
    return typeof value === "function";
  }

  isHTMLElement(value: any): boolean {
    return value instanceof HTMLElement;
  }

  isMap(value: any): boolean {
    return value instanceof Map;
  }

  isSet(value: any): boolean {
    return value instanceof Set;
  }

  isWeakMap(value: any): value is WeakMap<any, any> {
    return value instanceof WeakMap;
  }

  isWeakSet(value: any): value is WeakSet<any> {
    return value instanceof WeakSet;
  }

  // ------------------ Data Structure Checks ------------------

  isPromise(value: any): boolean {
    return (
      this.isObject(value) &&
      typeof (value as { then?: Function }).then === "function"
    );
  }

  isArrayBuffer(value: any): value is ArrayBuffer {
    return value instanceof ArrayBuffer;
  }

  isTypedArray(value: any): boolean {
    return (
      value instanceof Int8Array ||
      value instanceof Uint8Array ||
      value instanceof Uint8ClampedArray ||
      value instanceof Int16Array ||
      value instanceof Uint16Array ||
      value instanceof Int32Array ||
      value instanceof Uint32Array ||
      value instanceof Float32Array ||
      value instanceof Float64Array ||
      value instanceof BigInt64Array ||
      value instanceof BigUint64Array
    );
  }

  isBlob(value: any): value is Blob {
    return value instanceof Blob;
  }

  isFile(value: any): value is File {
    return value instanceof File;
  }

  isDataView(value: any): value is DataView {
    return value instanceof DataView;
  }

  // ------------------ Number Checks ------------------

  isInt(value: any): boolean {
    return this.isNumber(value) && Number.isInteger(value);
  }

  isFloat(value: any): boolean {
    return this.isNumber(value) && !Number.isInteger(value);
  }

  isFiniteNumber(value: any): boolean {
    return this.isNumber(value) && Number.isFinite(value);
  }

  isInfinity(value: any): boolean {
    return this.isNumber(value) && (value === Infinity || value === -Infinity);
  }

  isEven(value: any): boolean {
    return this.isInt(value) && value % 2 === 0;
  }

  isOdd(value: any): boolean {
    return this.isInt(value) && value % 2 !== 0;
  }

  isPositive(value: any): boolean {
    return this.isNumber(value) && value > 0;
  }

  isNegative(value: any): boolean {
    return this.isNumber(value) && value < 0;
  }

  isPrime(value: any): boolean {
    if (!this.isInt(value) || value < 2) return false;
    for (let i = 2; i <= Math.sqrt(value); i++) {
      if (value % i === 0) return false;
    }
    return true;
  }

  isSafeInteger(value: any): boolean {
    return this.isInt(value) && Number.isSafeInteger(value);
  }

  isDivisibleBy(value: any, divisor: number): boolean {
    return (
      this.isNumber(value) && this.isNumber(divisor) && value % divisor === 0
    );
  }

  isPerfectSquare(value: any): boolean {
    return this.isNumber(value) && Math.sqrt(value) % 1 === 0;
  }

  isFibonacci(value: any): boolean {
    if (!this.isInt(value) || value < 0) return false;
    const isPerfectSquare = (x: number) => Math.sqrt(x) % 1 === 0;
    return (
      isPerfectSquare(5 * value * value + 4) ||
      isPerfectSquare(5 * value * value - 4)
    );
  }

  // ------------------ String Checks ------------------

  isEmptyString(value: any): boolean {
    return this.isString(value) && value.trim().length === 0;
  }

  isNumberString(value: any): boolean {
    return this.isString(value) && !this.isEmptyString(value) && !isNaN(+value);
  }

  isBooleanString(value: any): boolean {
    return this.isString(value) && (value === "true" || value === "false");
  }

  isNullString(value: any): boolean {
    return this.isString(value) && value === "null";
  }

  isUndefinedString(value: any): boolean {
    return this.isString(value) && value === "undefined";
  }

  isNullOrUndefinedString(value: any): boolean {
    return this.isString(value) && (value === "null" || value === "undefined");
  }

  isDateString(value: any): boolean {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  isUUID(value: any): boolean {
    return (
      this.isString(value) &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        value
      )
    );
  }

  isHexColor(value: any): boolean {
    return (
      this.isString(value) && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
    );
  }

  isPhoneNumber(value: any): boolean {
    return this.isString(value) && /^\+?[1-9]\d{1,14}$/.test(value);
  }

  isValidEmail(value: any): boolean {
    return this.isString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  isAlpha(value: any): boolean {
    return this.isString(value) && /^[A-Za-z]+$/.test(value);
  }

  isAlphanumeric(value: any): boolean {
    return this.isString(value) && /^[A-Za-z0-9]+$/.test(value);
  }

  isLowerCase(value: any): boolean {
    return this.isString(value) && value === value.toLowerCase();
  }

  isUpperCase(value: any): boolean {
    return this.isString(value) && value === value.toUpperCase();
  }

  isJSONString(value: any): boolean {
    if (!this.isString(value)) return false;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }

  isIPv4(value: any): boolean {
    return (
      this.isString(value) &&
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        value
      )
    );
  }

  isIPv6(value: any): boolean {
    return (
      this.isString(value) &&
      /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/.test(value)
    );
  }

  isMACAddress(value: any): boolean {
    return (
      this.isString(value) &&
      /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value)
    );
  }

  isBase64(value: any): boolean {
    return (
      this.isString(value) &&
      /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(
        value
      )
    );
  }

  isCreditCard(value: any): boolean {
    return (
      this.isString(value) &&
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(
        value
      )
    );
  }

  isPalindrome(value: any): boolean {
    return this.isString(value) && value === value.split("").reverse().join("");
  }

  // ------------------ Object Checks ------------------

  isEmptyObject(value: any): boolean {
    return this.isObject(value) && Object.keys(value).length === 0;
  }

  isObjectWithKeys(value: any, keys: string[]): boolean {
    return this.isObject(value) && keys.every((key) => key in value);
  }

  isPlainObject(value: any): boolean {
    return this.isObject(value) && value.constructor === Object;
  }

  isInstanceOf(value: any, classRef: Function): boolean {
    return value instanceof classRef;
  }

  hasProperty(value: any, prop: string | symbol): boolean {
    return value != null && prop in value;
  }

  hasMethod(value: any, methodName: string): boolean {
    return (
      this.hasProperty(value, methodName) && this.isFunction(value[methodName])
    );
  }

  hasKeys(value: any, keys: string[]): boolean {
    return this.isObject(value) && keys.every((key) => key in value);
  }

  isPrototypeOf(value: any, prototype: any): boolean {
    return this.isObject(value) && prototype.isPrototypeOf(value);
  }

  isFrozen(value: any): boolean {
    return Object.isFrozen(value);
  }

  isSealed(value: any): boolean {
    return Object.isSealed(value);
  }

  isExtensible(value: any): boolean {
    return Object.isExtensible(value);
  }

  // ------------------ Array Checks ------------------

  isEmptyArray(value: any): boolean {
    return this.isArray(value) && value.length === 0;
  }

  isNonEmptyArray(value: any): boolean {
    return this.isArray(value) && value.length > 0;
  }

  isArrayLike(value: any): boolean {
    return (
      value != null &&
      typeof value === "object" &&
      "length" in value &&
      Number.isInteger(value.length)
    );
  }

  isArrayOfType(value: any, typeCheck: (item: any) => boolean): boolean {
    return this.isArray(value) && value.every(typeCheck);
  }

  isArrayOfStrings(value: any): boolean {
    return this.isArrayOfType(value, this.isString.bind(this));
  }

  isArrayOfNumbers(value: any): boolean {
    return this.isArrayOfType(value, this.isNumber.bind(this));
  }

  isArrayOfBooleans(value: any): boolean {
    return this.isArrayOfType(value, this.isBoolean.bind(this));
  }

  isArrayOfObjects(value: any): boolean {
    return this.isArrayOfType(value, this.isObject.bind(this));
  }

  isArrayOfPrimitives(value: any): boolean {
    const isPrimitive = (item: any) => item !== Object(item);
    return this.isArray(value) && value.every(isPrimitive);
  }

  isSubset(subset: any[], superset: any[]): boolean {
    return (
      this.isArray(subset) && subset.every((value) => superset.includes(value))
    );
  }

  isArrayOfUniqueElements(value: any): boolean {
    return this.isArray(value) && new Set(value).size === value.length;
  }

  // ------------------ Comparison Checks ------------------

  isDeepEqual(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  isShallowEqual(a: any, b: any): boolean {
    return a === b;
  }

  isGreaterThan(a: any, b: any): boolean {
    return this.isNumber(a) && this.isNumber(b) && a > b;
  }

  isLessThan(a: any, b: any): boolean {
    return this.isNumber(a) && this.isNumber(b) && a < b;
  }

  isBetween(value: number, min: number, max: number): boolean {
    return this.isNumber(value) && value >= min && value <= max;
  }

  isInstanceOfAll(value: any, constructors: Function[]): boolean {
    return constructors.every((constructor) => value instanceof constructor);
  }

  isInstanceOfAny(value: any, constructors: Function[]): boolean {
    return constructors.some((constructor) => value instanceof constructor);
  }

  isSimilarObject(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    return keys1.every((key) => key in obj2 && obj1[key] === obj2[key]);
  }

  isApproxEqual(
    value: number,
    comparison: number,
    tolerance: number = 0.00001
  ): boolean {
    return (
      this.isNumber(value) &&
      this.isNumber(comparison) &&
      Math.abs(value - comparison) <= tolerance
    );
  }

  isNonStrictEqual(a: any, b: any): boolean {
    return a == b;
  }

  // ------------------ Miscellaneous Checks ------------------

  isRegExp(value: any): boolean {
    return value instanceof RegExp;
  }

  isURL(value: any): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  isDomain(value: any): boolean {
    return (
      this.isString(value) &&
      /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,6}$/.test(value)
    );
  }

  isRelativeURL(value: any): boolean {
    return (
      this.isString(value) && !this.isURL(value) && /^[\/.][^:]*$/.test(value)
    );
  }

  isAbsoluteURL(value: any): boolean {
    return this.isURL(value) && /^https?:\/\//.test(value);
  }

  isSecureURL(value: any): boolean {
    return this.isAbsoluteURL(value) && value.startsWith("https://");
  }

  isTruthy(value: any): boolean {
    return !!value;
  }

  isFalsy(value: any): boolean {
    return !value;
  }

  isInRange(value: any, min: number, max: number): boolean {
    return this.isNumber(value) && value >= min && value <= max;
  }

  isFileSizeInRange(value: File, minBytes: number, maxBytes: number): boolean {
    return (
      this.isFile(value) && value.size >= minBytes && value.size <= maxBytes
    );
  }

  isBrowser(): boolean {
    return (
      typeof window !== "undefined" && typeof window.document !== "undefined"
    );
  }

  isNode(): boolean {
    return (
      typeof process !== "undefined" &&
      process.versions != null &&
      process.versions.node != null
    );
  }

  isUserDefinedType(value: any, constructor: Function): boolean {
    return value instanceof constructor;
  }

  isWeakRef(value: any): boolean {
    return value instanceof WeakRef;
  }

  isNativeFunction(value: any): boolean {
    return this.isFunction(value) && /\[native code\]/.test(value.toString());
  }

  isMimeType(value: any): boolean {
    return this.isString(value) && /^[a-z]+\/[a-z0-9\-\+]+$/i.test(value);
  }

  isMobileDevice(): boolean {
    return this.isBrowser() && /Mobi|Android/i.test(navigator.userAgent);
  }

  isDevEnvironment(): boolean {
    return process.env.NODE_ENV === "development";
  }

  isProdEnvironment(): boolean {
    return process.env.NODE_ENV === "production";
  }

  // ------------------ Iterable and Collection Checks ------------------

  isIterable(value: any): boolean {
    return value != null && typeof value[Symbol.iterator] === "function";
  }

  isEmptyIterable(value: any): boolean {
    return this.isIterable(value) && Array.from(value).length === 0;
  }

  isNonEmptyIterable(value: any): boolean {
    return this.isIterable(value) && Array.from(value).length > 0;
  }

  isNonEmptyMap(value: any): boolean {
    return this.isMap(value) && value.size > 0;
  }

  isNonEmptySet(value: any): boolean {
    return this.isSet(value) && value.size > 0;
  }

  // ------------------ Function Checks ------------------

  isAsyncFunction(value: any): boolean {
    return (
      value instanceof Function && value.constructor.name === "AsyncFunction"
    );
  }

  isPromiseLike(value: any): boolean {
    return (
      value && typeof value === "object" && typeof value.then === "function"
    );
  }

  isFunctionType(value: any, constructor: Function): boolean {
    return typeof value === "function" && value.constructor === constructor;
  }

  isGeneratorFunction(value: any): boolean {
    return (
      this.isFunction(value) && value.constructor.name === "GeneratorFunction"
    );
  }

  isArrowFunction(value: any): boolean {
    return this.isFunction(value) && !value.hasOwnProperty("prototype");
  }

  isAsyncGeneratorFunction(value: any): boolean {
    return (
      this.isFunction(value) &&
      value.constructor.name === "AsyncGeneratorFunction"
    );
  }

  // ------------------ Date Checks ------------------

  isDate(value: any): value is Date {
    return value instanceof Date && !isNaN(value.getTime());
  }

  isPastDate(value: any): boolean {
    return this.isDate(value) && value.getTime() < Date.now();
  }

  isFutureDate(value: any): boolean {
    return this.isDate(value) && value.getTime() > Date.now();
  }

  isValidDate(value: any): boolean {
    return !isNaN(new Date(value).getTime());
  }

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  isWeekend(value: any): boolean {
    const date = new Date(value);
    return this.isDate(date) && (date.getDay() === 0 || date.getDay() === 6);
  }

  isToday(value: any): boolean {
    if (!this.isDate(value)) return false;
    const today = new Date();
    const date = new Date(value);
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  isTomorrow(value: any): boolean {
    if (!this.isDate(value)) return false;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = new Date(value);
    return (
      date.getFullYear() === tomorrow.getFullYear() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getDate() === tomorrow.getDate()
    );
  }

  // ------------------ Extended Error Checks ------------------

  isError(value: any): boolean {
    return value instanceof Error;
  }

  isTypeError(value: any): boolean {
    return value instanceof TypeError;
  }

  isSyntaxError(value: any): boolean {
    return value instanceof SyntaxError;
  }

  isRangeError(value: any): boolean {
    return value instanceof RangeError;
  }
}
const isThis = new IsThis();
export default isThis;
