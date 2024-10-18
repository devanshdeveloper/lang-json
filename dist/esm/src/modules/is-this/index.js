class IsThis {
    // ------------------ Primitive Type Checks ------------------
    isString(value) {
        return typeof value === "string";
    }
    isNumber(value) {
        return typeof value === "number" && !isNaN(value);
    }
    isBoolean(value) {
        return typeof value === "boolean";
    }
    isNull(value) {
        return value === null;
    }
    isUndefined(value) {
        return typeof value === "undefined";
    }
    isNullOrUndefined(value) {
        return this.isNull(value) || this.isUndefined(value);
    }
    isBigInt(value) {
        return typeof value === "bigint";
    }
    isSymbol(value) {
        return typeof value === "symbol";
    }
    // ------------------ Collection Type Checks ------------------
    isArray(value) {
        return Array.isArray(value);
    }
    isObject(value) {
        return value !== null && typeof value === "object" && !this.isArray(value);
    }
    isArrayOrObject(value) {
        return this.isArray(value) || this.isObject(value);
    }
    isFunction(value) {
        return typeof value === "function";
    }
    isHTMLElement(value) {
        return value instanceof HTMLElement;
    }
    isMap(value) {
        return value instanceof Map;
    }
    isSet(value) {
        return value instanceof Set;
    }
    isWeakMap(value) {
        return value instanceof WeakMap;
    }
    isWeakSet(value) {
        return value instanceof WeakSet;
    }
    // ------------------ Data Structure Checks ------------------
    isPromise(value) {
        return (this.isObject(value) &&
            typeof value.then === "function");
    }
    isArrayBuffer(value) {
        return value instanceof ArrayBuffer;
    }
    isTypedArray(value) {
        return (value instanceof Int8Array ||
            value instanceof Uint8Array ||
            value instanceof Uint8ClampedArray ||
            value instanceof Int16Array ||
            value instanceof Uint16Array ||
            value instanceof Int32Array ||
            value instanceof Uint32Array ||
            value instanceof Float32Array ||
            value instanceof Float64Array ||
            value instanceof BigInt64Array ||
            value instanceof BigUint64Array);
    }
    isBlob(value) {
        return value instanceof Blob;
    }
    isFile(value) {
        return value instanceof File;
    }
    isDataView(value) {
        return value instanceof DataView;
    }
    // ------------------ Number Checks ------------------
    isInt(value) {
        return this.isNumber(value) && Number.isInteger(value);
    }
    isFloat(value) {
        return this.isNumber(value) && !Number.isInteger(value);
    }
    isFiniteNumber(value) {
        return this.isNumber(value) && Number.isFinite(value);
    }
    isInfinity(value) {
        return this.isNumber(value) && (value === Infinity || value === -Infinity);
    }
    isEven(value) {
        return this.isInt(value) && value % 2 === 0;
    }
    isOdd(value) {
        return this.isInt(value) && value % 2 !== 0;
    }
    isPositive(value) {
        return this.isNumber(value) && value > 0;
    }
    isNegative(value) {
        return this.isNumber(value) && value < 0;
    }
    isPrime(value) {
        if (!this.isInt(value) || value < 2)
            return false;
        for (let i = 2; i <= Math.sqrt(value); i++) {
            if (value % i === 0)
                return false;
        }
        return true;
    }
    isSafeInteger(value) {
        return this.isInt(value) && Number.isSafeInteger(value);
    }
    isDivisibleBy(value, divisor) {
        return (this.isNumber(value) && this.isNumber(divisor) && value % divisor === 0);
    }
    isPerfectSquare(value) {
        return this.isNumber(value) && Math.sqrt(value) % 1 === 0;
    }
    isFibonacci(value) {
        if (!this.isInt(value) || value < 0)
            return false;
        const isPerfectSquare = (x) => Math.sqrt(x) % 1 === 0;
        return (isPerfectSquare(5 * value * value + 4) ||
            isPerfectSquare(5 * value * value - 4));
    }
    // ------------------ String Checks ------------------
    isEmptyString(value) {
        return this.isString(value) && value.trim().length === 0;
    }
    isNumberString(value) {
        return this.isString(value) && !this.isEmptyString(value) && !isNaN(+value);
    }
    isBooleanString(value) {
        return this.isString(value) && (value === "true" || value === "false");
    }
    isNullString(value) {
        return this.isString(value) && value === "null";
    }
    isUndefinedString(value) {
        return this.isString(value) && value === "undefined";
    }
    isNullOrUndefinedString(value) {
        return this.isString(value) && (value === "null" || value === "undefined");
    }
    isDateString(value) {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }
    isUUID(value) {
        return (this.isString(value) &&
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value));
    }
    isHexColor(value) {
        return (this.isString(value) && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value));
    }
    isPhoneNumber(value) {
        return this.isString(value) && /^\+?[1-9]\d{1,14}$/.test(value);
    }
    isValidEmail(value) {
        return this.isString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    isAlpha(value) {
        return this.isString(value) && /^[A-Za-z]+$/.test(value);
    }
    isAlphanumeric(value) {
        return this.isString(value) && /^[A-Za-z0-9]+$/.test(value);
    }
    isLowerCase(value) {
        return this.isString(value) && value === value.toLowerCase();
    }
    isUpperCase(value) {
        return this.isString(value) && value === value.toUpperCase();
    }
    isJSONString(value) {
        if (!this.isString(value))
            return false;
        try {
            JSON.parse(value);
            return true;
        }
        catch {
            return false;
        }
    }
    isIPv4(value) {
        return (this.isString(value) &&
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value));
    }
    isIPv6(value) {
        return (this.isString(value) &&
            /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/.test(value));
    }
    isMACAddress(value) {
        return (this.isString(value) &&
            /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value));
    }
    isBase64(value) {
        return (this.isString(value) &&
            /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(value));
    }
    isCreditCard(value) {
        return (this.isString(value) &&
            /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(value));
    }
    isPalindrome(value) {
        return this.isString(value) && value === value.split("").reverse().join("");
    }
    // ------------------ Object Checks ------------------
    isEmptyObject(value) {
        return this.isObject(value) && Object.keys(value).length === 0;
    }
    isObjectWithKeys(value, keys) {
        return this.isObject(value) && keys.every((key) => key in value);
    }
    isPlainObject(value) {
        return this.isObject(value) && value.constructor === Object;
    }
    isInstanceOf(value, classRef) {
        return value instanceof classRef;
    }
    hasProperty(value, prop) {
        return value != null && prop in value;
    }
    hasMethod(value, methodName) {
        return (this.hasProperty(value, methodName) && this.isFunction(value[methodName]));
    }
    hasKeys(value, keys) {
        return this.isObject(value) && keys.every((key) => key in value);
    }
    isPrototypeOf(value, prototype) {
        return this.isObject(value) && prototype.isPrototypeOf(value);
    }
    isFrozen(value) {
        return Object.isFrozen(value);
    }
    isSealed(value) {
        return Object.isSealed(value);
    }
    isExtensible(value) {
        return Object.isExtensible(value);
    }
    // ------------------ Array Checks ------------------
    isEmptyArray(value) {
        return this.isArray(value) && value.length === 0;
    }
    isNonEmptyArray(value) {
        return this.isArray(value) && value.length > 0;
    }
    isArrayLike(value) {
        return (value != null &&
            typeof value === "object" &&
            "length" in value &&
            Number.isInteger(value.length));
    }
    isArrayOfType(value, typeCheck) {
        return this.isArray(value) && value.every(typeCheck);
    }
    isArrayOfStrings(value) {
        return this.isArrayOfType(value, this.isString.bind(this));
    }
    isArrayOfNumbers(value) {
        return this.isArrayOfType(value, this.isNumber.bind(this));
    }
    isArrayOfBooleans(value) {
        return this.isArrayOfType(value, this.isBoolean.bind(this));
    }
    isArrayOfObjects(value) {
        return this.isArrayOfType(value, this.isObject.bind(this));
    }
    isArrayOfPrimitives(value) {
        const isPrimitive = (item) => item !== Object(item);
        return this.isArray(value) && value.every(isPrimitive);
    }
    isSubset(subset, superset) {
        return (this.isArray(subset) && subset.every((value) => superset.includes(value)));
    }
    isArrayOfUniqueElements(value) {
        return this.isArray(value) && new Set(value).size === value.length;
    }
    // ------------------ Comparison Checks ------------------
    isDeepEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    isShallowEqual(a, b) {
        return a === b;
    }
    isGreaterThan(a, b) {
        return this.isNumber(a) && this.isNumber(b) && a > b;
    }
    isLessThan(a, b) {
        return this.isNumber(a) && this.isNumber(b) && a < b;
    }
    isBetween(value, min, max) {
        return this.isNumber(value) && value >= min && value <= max;
    }
    isInstanceOfAll(value, constructors) {
        return constructors.every((constructor) => value instanceof constructor);
    }
    isInstanceOfAny(value, constructors) {
        return constructors.some((constructor) => value instanceof constructor);
    }
    isSimilarObject(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length)
            return false;
        return keys1.every((key) => key in obj2 && obj1[key] === obj2[key]);
    }
    isApproxEqual(value, comparison, tolerance = 0.00001) {
        return (this.isNumber(value) &&
            this.isNumber(comparison) &&
            Math.abs(value - comparison) <= tolerance);
    }
    isNonStrictEqual(a, b) {
        return a == b;
    }
    // ------------------ Miscellaneous Checks ------------------
    isRegExp(value) {
        return value instanceof RegExp;
    }
    isURL(value) {
        try {
            new URL(value);
            return true;
        }
        catch {
            return false;
        }
    }
    isDomain(value) {
        return (this.isString(value) &&
            /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,6}$/.test(value));
    }
    isRelativeURL(value) {
        return (this.isString(value) && !this.isURL(value) && /^[\/.][^:]*$/.test(value));
    }
    isAbsoluteURL(value) {
        return this.isURL(value) && /^https?:\/\//.test(value);
    }
    isSecureURL(value) {
        return this.isAbsoluteURL(value) && value.startsWith("https://");
    }
    isTruthy(value) {
        return !!value;
    }
    isFalsy(value) {
        return !value;
    }
    isInRange(value, min, max) {
        return this.isNumber(value) && value >= min && value <= max;
    }
    isFileSizeInRange(value, minBytes, maxBytes) {
        return (this.isFile(value) && value.size >= minBytes && value.size <= maxBytes);
    }
    isBrowser() {
        return (typeof window !== "undefined" && typeof window.document !== "undefined");
    }
    isNode() {
        return (typeof process !== "undefined" &&
            process.versions != null &&
            process.versions.node != null);
    }
    isUserDefinedType(value, constructor) {
        return value instanceof constructor;
    }
    isWeakRef(value) {
        return value instanceof WeakRef;
    }
    isNativeFunction(value) {
        return this.isFunction(value) && /\[native code\]/.test(value.toString());
    }
    isMimeType(value) {
        return this.isString(value) && /^[a-z]+\/[a-z0-9\-\+]+$/i.test(value);
    }
    isMobileDevice() {
        return this.isBrowser() && /Mobi|Android/i.test(navigator.userAgent);
    }
    isDevEnvironment() {
        return process.env.NODE_ENV === "development";
    }
    isProdEnvironment() {
        return process.env.NODE_ENV === "production";
    }
    // ------------------ Iterable and Collection Checks ------------------
    isIterable(value) {
        return value != null && typeof value[Symbol.iterator] === "function";
    }
    isEmptyIterable(value) {
        return this.isIterable(value) && Array.from(value).length === 0;
    }
    isNonEmptyIterable(value) {
        return this.isIterable(value) && Array.from(value).length > 0;
    }
    isNonEmptyMap(value) {
        return this.isMap(value) && value.size > 0;
    }
    isNonEmptySet(value) {
        return this.isSet(value) && value.size > 0;
    }
    // ------------------ Function Checks ------------------
    isAsyncFunction(value) {
        return (value instanceof Function && value.constructor.name === "AsyncFunction");
    }
    isPromiseLike(value) {
        return (value && typeof value === "object" && typeof value.then === "function");
    }
    isFunctionType(value, constructor) {
        return typeof value === "function" && value.constructor === constructor;
    }
    isGeneratorFunction(value) {
        return (this.isFunction(value) && value.constructor.name === "GeneratorFunction");
    }
    isArrowFunction(value) {
        return this.isFunction(value) && !value.hasOwnProperty("prototype");
    }
    isAsyncGeneratorFunction(value) {
        return (this.isFunction(value) &&
            value.constructor.name === "AsyncGeneratorFunction");
    }
    // ------------------ Date Checks ------------------
    isDate(value) {
        return value instanceof Date && !isNaN(value.getTime());
    }
    isPastDate(value) {
        return this.isDate(value) && value.getTime() < Date.now();
    }
    isFutureDate(value) {
        return this.isDate(value) && value.getTime() > Date.now();
    }
    isValidDate(value) {
        return !isNaN(new Date(value).getTime());
    }
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    isWeekend(value) {
        const date = new Date(value);
        return this.isDate(date) && (date.getDay() === 0 || date.getDay() === 6);
    }
    isToday(value) {
        if (!this.isDate(value))
            return false;
        const today = new Date();
        const date = new Date(value);
        return (date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate());
    }
    isTomorrow(value) {
        if (!this.isDate(value))
            return false;
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const date = new Date(value);
        return (date.getFullYear() === tomorrow.getFullYear() &&
            date.getMonth() === tomorrow.getMonth() &&
            date.getDate() === tomorrow.getDate());
    }
    // ------------------ Extended Error Checks ------------------
    isError(value) {
        return value instanceof Error;
    }
    isTypeError(value) {
        return value instanceof TypeError;
    }
    isSyntaxError(value) {
        return value instanceof SyntaxError;
    }
    isRangeError(value) {
        return value instanceof RangeError;
    }
}
const isThis = new IsThis();
export default isThis;
//# sourceMappingURL=index.js.map