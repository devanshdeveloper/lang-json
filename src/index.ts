import isThis from "@devanshdeveloper/is-this";
// import isThis from "./modules/is-this/index";

type HelperFunction = (args: any, data: any, innerTemplate: any) => any;

class MemoryAddresses {
  private storage: { [key: string]: any } = {};

  // Helper function to generate a random string key
  private generateKey(length: number = 4): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let key = "";
    for (let i = 0; i < length; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  // Store data with a random key
  storeData(data: any): string {
    const key = this.generateKey();
    this.storage[key] = data;
    return key;
  }

  getData(key: string): any | null {
    return this.storage[key] !== undefined ? this.storage[key] : null;
  }

  removeData(key: string): void {
    if (this.storage[key]) {
      delete this.storage[key];
    }
  }
}

export default class LangJSON {
  helpers: Record<string, HelperFunction> = {};
  private memory: { [key: string]: any } = {};
  constructor() {
    // Registering Default Helpers

    this.registerHelpers({
      var: ([string]: any, data: any): any => {
        return this.lookup(string, data);
      },

      // manupilating helpers
      each: ([arr], data, innerTemplate): any => {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i];
          result.push(
            this.applyTemplate(innerTemplate, {
              ...data,
              item: element,
              index: i,
            })
          );
        }
        return result;
      },

      loop: ([number], data, innerTemplate): any => {
        const result = [];
        for (let i = 0; i < number; i++) {
          result.push(
            this.applyTemplate(innerTemplate, {
              ...data,
              index: i,
            })
          );
        }
        return result;
      },

      // String Helpers
      uppercase: ([str]): any => str.toUpperCase(),
      lowercase: ([str]): any => str.toLowerCase(),
      capitalize: ([str]): any => str.charAt(0).toUpperCase() + str.slice(1),
      trim: ([str]): any => str.trim(),
      substring: ([str, start, length]): any =>
        str.substring(start, start + length),
      concat: ([...args]: any[]): any => args.join(""),
      replace: ([str, search, replacement]): any =>
        str.replace(new RegExp(search, "g"), replacement),
      split: ([str, separator]): any => str.split(separator),
      join: ([arr, separator]): any => arr.join(separator),
      contains: ([str, substring]): any => str.includes(substring),
      length: ([str]): any => str.length,
      startsWith: ([str, prefix]): any => str.startsWith(prefix),
      endsWith: ([str, suffix]): any => str.endsWith(suffix),
      reverseString: ([str]): any => str.split("").reverse().join(""),
      isEmpty: ([str]): any => !str || str.length === 0,
      repeat: ([str, times]) => str.repeat(times),
      // Mathematical Helpers
      add: ([a, b]): any => a + b,
      subtract: ([a, b]): any => a - b,
      multiply: ([a, b]): any => a * b,
      divide: ([a, b]): any => a / b,
      modulo: ([a, b]): any => a % b,
      max: ([...args]: any[]): any => Math.max(...args),
      min: ([...args]: any[]): any => Math.min(...args),
      round: ([num]): any => Math.round(num),
      floor: ([num]): any => Math.floor(num),
      ceil: ([num]): any => Math.ceil(num),

      // Logical Helpers
      if: ([condition, trueValue, falseValue]): any =>
        condition ? trueValue : falseValue,
      and: ([...conditions]: any[]): any => conditions.every(Boolean),
      or: ([...conditions]: any[]): any => conditions.some(Boolean),
      not: ([condition]: any): any => !condition,

      // Date and Time Helpers
      getCurrentDate: (): any => new Date().toISOString().split("T")[0],
      getCurrentTime: (): any => new Date().toLocaleTimeString(),

      // Array Helpers
      arrayLength: ([arr]): any => arr.length,
      arrayIncludes: ([arr, item]): any => arr.includes(item),
      arrayJoin: ([arr, separator]): any => arr.join(separator),
      // arrayMap: ([arr, fn]): any => arr.map(fn),
      // arrayFilter: ([arr, fn]): any => arr.filter(fn),
      // arrayReduce: ([arr, fn, initial]): any => arr.reduce(fn, initial),
      uniqueArray: ([arr]): any => [...new Set(arr)],
      flattenArray: ([arr]): any => arr.flat(),
      // arraySort: ([arr, compareFn]): any => arr.sort(compareFn),
      // arrayFind: ([arr, fn]): any => arr.find(fn),
      // arrayEvery: ([arr, fn]): any => arr.every(fn),
      // arraySome: ([arr, fn]): any => arr.some(fn),

      // Object Helpers
      objectKeys: ([obj]): any => Object.keys(obj),
      objectValues: ([obj]): any => Object.values(obj),
      objectEntries: ([obj]): any => Object.entries(obj),
      objectHasKey: ([obj, key]): any =>
        Object.prototype.hasOwnProperty.call(obj, key),
      mergeObjects: ([obj1, obj2]): any => ({ ...obj1, ...obj2 }),
      deepClone: ([obj]): any => JSON.parse(JSON.stringify(obj)),
      objectFreeze: ([obj]): any => Object.freeze(obj),
      objectMergeDeep: ([obj1, obj2]): any => {
        function mergeDeep(obj1: any, obj2: any): any {
          const result = { ...obj1 };
          for (const key in obj2) {
            if (obj2[key] instanceof Object && !Array.isArray(obj2[key])) {
              result[key] = mergeDeep(obj1[key], obj2[key]); // Use the named function 'mergeDeep'
            } else {
              result[key] = obj2[key];
            }
          }
          return result;
        }
        return mergeDeep(obj1, obj2);
      },

      // Random Helpers
      randomNumber: ([min, max]): any =>
        Math.floor(Math.random() * (max - min + 1)) + min,
      randomElement: ([arr]): any =>
        arr[Math.floor(Math.random() * arr.length)],

      // Formatting Helpers
      currency: ([amount, currencySymbol]): any =>
        `${currencySymbol}${amount.toFixed(2)}`,
      percent: ([num]): any => `${(num * 100).toFixed(2)}%`,

      // Miscellaneous Helpers
      jsonStringify: ([obj]): any => JSON.stringify(obj),
      jsonParse: ([str]): any => JSON.parse(str),
      delay: ([ms]): any => new Promise((resolve) => setTimeout(resolve, ms)),
      noop: (): any => {}, // No operation function
      deepEqual: ([obj1, obj2]): any =>
        JSON.stringify(obj1) === JSON.stringify(obj2), // Deep equality check

      // Additional String Manipulation Helpers
      snakeToCamel: ([str]): any =>
        str.replace(/([-_]\w)/g, (g: any) => g[1].toUpperCase()),
      camelToSnake: ([str]): any =>
        str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase(),

      // Additional Array Helpers
      chunkArray: ([arr, size]): any =>
        Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
          arr.slice(i * size, i * size + size)
        ),
      shuffleArray: ([arr]): any => arr.sort(() => Math.random() - 0.5),
      removeDuplicates: ([arr]): any =>
        arr.filter((item: any, index: any) => arr.indexOf(item) === index),

      // Additional Object Helpers
      objectMap: ([obj, fn]): any =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [key, fn(value)])
        ),
    });

    this.memory = new MemoryAddresses();
  }

  // Managing Helpers
  registerHelper(name: string, fn: HelperFunction) {
    this.helpers[name] = fn;
  }

  registerHelpers(helpers: { [key: string]: HelperFunction }) {
    for (const [name, fn] of Object.entries(helpers)) {
      this.registerHelper(name, fn);
    }
  }

  getHelper(name: string): HelperFunction | undefined {
    return this.lookup(name, this.helpers);
  }

  applyTemplate(template: any, data: any, innerTemplate?: any): any {
    if (typeof template === "string") {
      const stringResult = this.processHelper(template, data);
      // console.log({ stringResult });
      return stringResult;
    } else if (Array.isArray(template)) {
      return template.map((item, index) =>
        this.applyTemplate(item, { ...data, currentItem: item, index })
      );
    } else if (typeof template === "object") {
      let result: any = {};
      for (const key in template) {
        if (Object.prototype.hasOwnProperty.call(template, key)) {
          const value = template[key];

          const currentKeyResult = this.processHelper(key, data, value);
          // console.log({ currentKeyResult });

          if (isThis.isArrayOrObject(currentKeyResult)) {
            result = this.applyTemplate(currentKeyResult, data);
          } else {
            if (value) {
              result[`${currentKeyResult}`] = this.applyTemplate(value, data);
            } else {
              result = currentKeyResult;
            }
          }
        }
      }
      return result;
    }
    return template;
  }

  lookup(varPath: string | number, data: any): any {
    // console.log({ varPath });

    if (typeof varPath !== "string") return varPath;
    let normalizedPath = varPath.replace(/\[(\d+)\]|\["(.*?)"\]/g, ".$1$2");
    if (normalizedPath.startsWith(".")) {
      normalizedPath = normalizedPath.slice(1);
    }

    let path = normalizedPath.split(".");
    const returnValue = path.reduce((acc, part) => {
      part = part.replace(
        /^(['"])([\s\S]*?)\1$/g,
        (_: any, __: any, innerText: any) => innerText
      );
      // console.log({ path, acc, part });

      return acc?.[part];
    }, data);
    // console.log({ returnValue });

    return returnValue;
  }

  sanitizeArg(arg: any, helperName: any, data: any) {
    const isString = arg.match(/^(['"])([\s\S]*?)\1$/g);

    if (helperName === "var" && !isString) return arg;
    if (isString) {
      // console.log({ arg, message: "into qoutes string" });
      return arg.replace(
        /^(['"])([\s\S]*?)\1$/g,
        (_: any, __: any, innerText: any) => innerText
      );
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

  handleSpitStringArgs(stringArg: string) {
    let currentQuote: string | null = null;
    let result: string[] = [];
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
        } else if (currentQuote === null) {
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

  processHelperArgs(helperArgs: string, data: any, innerTemplate: any): any {
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
      const splittedArgs = helperArgsArray.map((e: any) =>
        this.sanitizeArg(e, helperName, data)
      ) as any[];
      // console.log({ helperName, helperArgs, helperArgsArray, splittedArgs });
      let helperResult = helper(splittedArgs, data, innerTemplate);
      // console.log({ helperResult });
      let memorykey = null;
      if (isThis.isArrayOrObject(helperResult)) {
        memorykey = this.memory.storeData(helperResult);
      }
      const returnValue = helperArgs.replace(
        helperArgsMatches[0],
        memorykey ? memorykey : `"${helperResult}"`
      );
      return this.processHelperArgs(returnValue, data, innerTemplate);
    } else {
      return helperArgs;
    }
  }

  processHelper(
    string: string,
    data: any,
    innerTemplate?: any,
    stringMatches?: any
  ): any {
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
        const processedHelperArgs = this.processHelperArgs(
          helperArgs,
          data,
          innerTemplate
        );

        splitedArgs = this.handleSpitStringArgs(processedHelperArgs).map(
          (e: any) => this.sanitizeArg(e, helperName, data)
        ) as any[];
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
        return this.processHelper(
          resultString,
          data,
          innerTemplate,
          stringMatches
        );
      } else {
        if (
          isThis.isBooleanString(resultString) &&
          isThis.isBoolean(helperResult)
        ) {
          return helperResult;
        }
        if (isThis.isNullString(resultString) && isThis.isNull(helperResult)) {
          return null;
        }
        if (
          isThis.isUndefinedString(resultString) ||
          isThis.isUndefined(helperResult)
        ) {
          return undefined;
        }
        if (
          (isThis.isNumberString(resultString) ||
            isThis.isNumber(helperResult)) &&
          helperResult === parseFloat(resultString)
        ) {
          return helperResult;
        }
        return resultString;
      }
    } else {
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
