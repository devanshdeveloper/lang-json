import isThis from "@devanshdeveloper/is-this";
class MemoryAddresses {
    storage = {};
    // Helper function to generate a random string key
    generateKey(length = 4) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let key = "";
        for (let i = 0; i < length; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    }
    // Store data with a random key
    storeData(data) {
        const key = this.generateKey();
        this.storage[key] = data;
        return key;
    }
    getData(key) {
        return this.storage[key] !== undefined ? this.storage[key] : null;
    }
    removeData(key) {
        if (this.storage[key]) {
            delete this.storage[key];
        }
    }
}
export default class LangJSON {
    helpers = {};
    memory = {};
    constructor() {
        // Registering Default Helpers
        this.registerHelpers({
            var: ([string], data) => {
                return this.lookup(string, data);
            },
            // manupilating helpers
            each: ([arr], data, innerTemplate) => {
                const result = [];
                for (let i = 0; i < arr.length; i++) {
                    const element = arr[i];
                    result.push(this.applyTemplate(innerTemplate, {
                        ...data,
                        item: element,
                        index: i,
                    }));
                }
                return result;
            },
            loop: ([number], data, innerTemplate) => {
                const result = [];
                for (let i = 0; i < number; i++) {
                    result.push(this.applyTemplate(innerTemplate, {
                        ...data,
                        index: i,
                    }));
                }
                return result;
            },
            // String Helpers
            uppercase: ([str]) => str.toUpperCase(),
            lowercase: ([str]) => str.toLowerCase(),
            capitalize: ([str]) => str.charAt(0).toUpperCase() + str.slice(1),
            trim: ([str]) => str.trim(),
            substring: ([str, start, length]) => str.substring(start, start + length),
            concat: ([...args]) => args.join(""),
            replace: ([str, search, replacement]) => str.replace(new RegExp(search, "g"), replacement),
            split: ([str, separator]) => str.split(separator),
            join: ([arr, separator]) => arr.join(separator),
            contains: ([str, substring]) => str.includes(substring),
            length: ([str]) => str.length,
            startsWith: ([str, prefix]) => str.startsWith(prefix),
            endsWith: ([str, suffix]) => str.endsWith(suffix),
            reverseString: ([str]) => str.split("").reverse().join(""),
            isEmpty: ([str]) => !str || str.length === 0,
            repeat: ([str, times]) => str.repeat(times),
            // Mathematical Helpers
            add: ([a, b]) => a + b,
            subtract: ([a, b]) => a - b,
            multiply: ([a, b]) => a * b,
            divide: ([a, b]) => a / b,
            modulo: ([a, b]) => a % b,
            max: ([...args]) => Math.max(...args),
            min: ([...args]) => Math.min(...args),
            round: ([num]) => Math.round(num),
            floor: ([num]) => Math.floor(num),
            ceil: ([num]) => Math.ceil(num),
            // Logical Helpers
            if: ([condition, trueValue, falseValue]) => condition ? trueValue : falseValue,
            and: ([...conditions]) => conditions.every(Boolean),
            or: ([...conditions]) => conditions.some(Boolean),
            not: ([condition]) => !condition,
            // Date and Time Helpers
            getCurrentDate: () => new Date().toISOString().split("T")[0],
            getCurrentTime: () => new Date().toLocaleTimeString(),
            // Array Helpers
            arrayLength: ([arr]) => arr.length,
            arrayIncludes: ([arr, item]) => arr.includes(item),
            arrayJoin: ([arr, separator]) => arr.join(separator),
            // arrayMap: ([arr, fn]): any => arr.map(fn),
            // arrayFilter: ([arr, fn]): any => arr.filter(fn),
            // arrayReduce: ([arr, fn, initial]): any => arr.reduce(fn, initial),
            uniqueArray: ([arr]) => [...new Set(arr)],
            flattenArray: ([arr]) => arr.flat(),
            // arraySort: ([arr, compareFn]): any => arr.sort(compareFn),
            // arrayFind: ([arr, fn]): any => arr.find(fn),
            // arrayEvery: ([arr, fn]): any => arr.every(fn),
            // arraySome: ([arr, fn]): any => arr.some(fn),
            // Object Helpers
            objectKeys: ([obj]) => Object.keys(obj),
            objectValues: ([obj]) => Object.values(obj),
            objectEntries: ([obj]) => Object.entries(obj),
            objectHasKey: ([obj, key]) => Object.prototype.hasOwnProperty.call(obj, key),
            mergeObjects: ([obj1, obj2]) => ({ ...obj1, ...obj2 }),
            deepClone: ([obj]) => JSON.parse(JSON.stringify(obj)),
            objectFreeze: ([obj]) => Object.freeze(obj),
            objectMergeDeep: ([obj1, obj2]) => {
                function mergeDeep(obj1, obj2) {
                    const result = { ...obj1 };
                    for (const key in obj2) {
                        if (obj2[key] instanceof Object && !Array.isArray(obj2[key])) {
                            result[key] = mergeDeep(obj1[key], obj2[key]); // Use the named function 'mergeDeep'
                        }
                        else {
                            result[key] = obj2[key];
                        }
                    }
                    return result;
                }
                return mergeDeep(obj1, obj2);
            },
            // Random Helpers
            randomNumber: ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min,
            randomElement: ([arr]) => arr[Math.floor(Math.random() * arr.length)],
            // Formatting Helpers
            currency: ([amount, currencySymbol]) => `${currencySymbol}${amount.toFixed(2)}`,
            percent: ([num]) => `${(num * 100).toFixed(2)}%`,
            // Miscellaneous Helpers
            jsonStringify: ([obj]) => JSON.stringify(obj),
            jsonParse: ([str]) => JSON.parse(str),
            delay: ([ms]) => new Promise((resolve) => setTimeout(resolve, ms)),
            noop: () => { }, // No operation function
            deepEqual: ([obj1, obj2]) => JSON.stringify(obj1) === JSON.stringify(obj2), // Deep equality check
            // Additional String Manipulation Helpers
            snakeToCamel: ([str]) => str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase()),
            camelToSnake: ([str]) => str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase(),
            // Additional Array Helpers
            chunkArray: ([arr, size]) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size)),
            shuffleArray: ([arr]) => arr.sort(() => Math.random() - 0.5),
            removeDuplicates: ([arr]) => arr.filter((item, index) => arr.indexOf(item) === index),
            // Additional Object Helpers
            objectMap: ([obj, fn]) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)])),
        });
        this.memory = new MemoryAddresses();
    }
    // Managing Helpers
    registerHelper(name, fn) {
        this.helpers[name] = fn;
    }
    registerHelpers(helpers) {
        for (const [name, fn] of Object.entries(helpers)) {
            this.registerHelper(name, fn);
        }
    }
    getHelper(name) {
        return this.lookup(name, this.helpers);
    }
    applyTemplate(template, data, innerTemplate) {
        if (typeof template === "string") {
            const stringResult = this.processHelper(template, data);
            // console.log({ stringResult });
            return stringResult;
        }
        else if (Array.isArray(template)) {
            return template.map((item, index) => this.applyTemplate(item, { ...data, currentItem: item, index }));
        }
        else if (typeof template === "object") {
            let result = {};
            for (const key in template) {
                if (Object.prototype.hasOwnProperty.call(template, key)) {
                    const value = template[key];
                    const currentKeyResult = this.processHelper(key, data, value);
                    // console.log({ currentKeyResult });
                    if (isThis.isArrayOrObject(currentKeyResult)) {
                        result = this.applyTemplate(currentKeyResult, data);
                    }
                    else {
                        if (value) {
                            result[`${currentKeyResult}`] = this.applyTemplate(value, data);
                        }
                        else {
                            result = currentKeyResult;
                        }
                    }
                }
            }
            return result;
        }
        return template;
    }
    lookup(varPath, data) {
        // console.log({ varPath });
        if (typeof varPath !== "string")
            return varPath;
        let normalizedPath = varPath.replace(/\[(\d+)\]|\["(.*?)"\]/g, ".$1$2");
        if (normalizedPath.startsWith(".")) {
            normalizedPath = normalizedPath.slice(1);
        }
        let path = normalizedPath.split(".");
        const returnValue = path.reduce((acc, part) => {
            part = part.replace(/^(['"])([\s\S]*?)\1$/g, (_, __, innerText) => innerText);
            // console.log({ path, acc, part });
            return acc?.[part];
        }, data);
        // console.log({ returnValue });
        return returnValue;
    }
    sanitizeArg(arg, helperName, data) {
        const isString = arg.match(/^(['"])([\s\S]*?)\1$/g);
        if (helperName === "var" && !isString)
            return arg;
        if (isString) {
            // console.log({ arg, message: "into qoutes string" });
            return arg.replace(/^(['"])([\s\S]*?)\1$/g, (_, __, innerText) => innerText);
        }
        if (isThis.isNumberString(arg)) {
            // console.log({ arg, message: "into number string" });
            return Number(arg);
        }
        if (isThis.isBooleanString(arg)) {
            return arg === "true";
        }
        const lookUpValue = this.lookup(arg, data);
        const memoryValue = this.memory.getData(arg);
        // console.log({ lookUpValue, memoryValue, arg });
        if (!isThis.isNullOrUndefined(memoryValue)) {
            return memoryValue;
        }
        if (!isThis.isUndefined(lookUpValue)) {
            return lookUpValue;
        }
        return arg;
    }
    handleSpitStringArgs(stringArg) {
        let currentQuote = null;
        let result = [];
        let currentPart = "";
        for (let i = 0; i < stringArg.length; i++) {
            const char = stringArg[i];
            if (char === " " && currentQuote === null) {
                if (currentPart) {
                    result.push(currentPart);
                    currentPart = "";
                }
                continue;
            }
            if (char === '"' || char === "'") {
                if (currentQuote === char) {
                    currentQuote = null;
                }
                else if (currentQuote === null) {
                    currentQuote = char;
                }
            }
            currentPart += char;
        }
        if (currentPart) {
            result.push(currentPart);
        }
        return result;
    }
    processHelperArgs(helperArgs, data, innerTemplate) {
        const helperArgsMatches = [...helperArgs.matchAll(/\(([^()]+)\)/g)]?.[0];
        if (helperArgsMatches) {
            const innerString = helperArgsMatches[1];
            const splitedInnerArgs = this.handleSpitStringArgs(innerString);
            const helperName = splitedInnerArgs[0];
            const helperArgsArray = splitedInnerArgs.slice(1);
            const helper = this.getHelper(helperName);
            if (!helper) {
                throw new Error("Missing helper: " + helperName);
            }
            const splittedArgs = helperArgsArray.map((e) => this.sanitizeArg(e, helperName, data));
            // console.log({ helperName, helperArgs, helperArgsArray, splittedArgs });
            let helperResult = helper(splittedArgs, data, innerTemplate);
            // console.log({ helperResult });
            let memorykey = null;
            if (isThis.isArrayOrObject(helperResult)) {
                memorykey = this.memory.storeData(helperResult);
            }
            const returnValue = helperArgs.replace(helperArgsMatches[0], memorykey ? memorykey : `"${helperResult}"`);
            return this.processHelperArgs(returnValue, data, innerTemplate);
        }
        else {
            return helperArgs;
        }
    }
    processHelper(string, data, innerTemplate, stringMatches) {
        stringMatches = stringMatches
            ? stringMatches
            : [...string.matchAll(/{{#(\w+)\s*([^}]*)}}/g)]?.[0];
        if (stringMatches) {
            const capturedString = stringMatches[0];
            const helperName = stringMatches[1];
            const helperArgs = stringMatches[2];
            const helper = this.getHelper(helperName);
            if (!helper) {
                throw new Error("Missing helper : " + helperName);
            }
            let splitedArgs = [];
            if (!isThis.isEmptyString(helperArgs)) {
                const processedHelperArgs = this.processHelperArgs(helperArgs, data, innerTemplate);
                splitedArgs = this.handleSpitStringArgs(processedHelperArgs).map((e) => this.sanitizeArg(e, helperName, data));
                // console.log({
                //   string,
                //   helperName,
                //   helperArgs,
                //   processedHelperArgs,
                //   splitedArgs,
                // });
            }
            const helperResult = helper(splitedArgs, data, innerTemplate);
            // console.log({ helperResult });
            if (isThis.isArrayOrObject(helperResult)) {
                return helperResult;
            }
            const resultString = string.replace(capturedString, helperResult);
            stringMatches = [...resultString.matchAll(/{{#(\w+)\s*([^}]*)}}/g)]?.[0];
            // console.log({ resultString, stringMatches });
            if (stringMatches) {
                return this.processHelper(resultString, data, innerTemplate, stringMatches);
            }
            else {
                if (isThis.isBooleanString(resultString) &&
                    isThis.isBoolean(helperResult)) {
                    return helperResult;
                }
                if (isThis.isNullString(resultString) && isThis.isNull(helperResult)) {
                    return null;
                }
                if (isThis.isUndefinedString(resultString) ||
                    isThis.isUndefined(helperResult)) {
                    return undefined;
                }
                if ((isThis.isNumberString(resultString) ||
                    isThis.isNumber(helperResult)) &&
                    helperResult === parseFloat(resultString)) {
                    return helperResult;
                }
                return resultString;
            }
        }
        else {
            return string;
        }
    }
}
// const langJson = new LangJSON();
// const template = {
//   "{{#loop items.length}}": { name: "{{#var items[(var index)]}}" },
// };
// const result = langJson.applyTemplate(template, {
//   items: ["Apple", "Banana", "Grapes"],
// });
// const returnValue = {
//   1: result,
// };
// console.log(JSON.stringify(returnValue, null, 2));
//# sourceMappingURL=index.js.map