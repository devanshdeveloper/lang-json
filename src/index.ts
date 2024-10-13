type HelperFunction = (context: any, data: any, innerTemplate: any) => any;
export class JsonTemplateEngine {
  helpers: Record<string, HelperFunction> = {};

  constructor() {
    this.registerHelper("each", this.eachHelper.bind(this));
    this.registerHelper("loop", this.loopHelper.bind(this));
    this.registerHelper("if", this.ifHelper.bind(this));
    this.registerHelper("with", this.withHelper.bind(this));
    this.registerHelper("set", this.setHelper.bind(this));
    this.registerHelper("unless", this.unlessHelper.bind(this));
    this.registerHelper("log", this.logHelper.bind(this));
    this.registerHelper("concat", this.concatHelper.bind(this));
    this.registerHelper("length", this.lengthHelper.bind(this));
    this.registerHelper("math", this.mathHelper.bind(this));
    this.registerHelper("var", this.varHelper.bind(this));
    this.registerHelper("compare", this.compareHelper.bind(this));
    this.registerHelper("upperCase", this.upperCaseHelper.bind(this));
    this.registerHelper("lowerCase", this.lowerCaseHelper.bind(this));
    this.registerHelper("jsonStringify", this.jsonStringifyHelper.bind(this));
    this.registerHelper("jsonParse", this.jsonParseHelper.bind(this));
    this.registerHelper("date", this.dateHelper.bind(this));
    this.registerHelper("repeat", this.repeatHelper.bind(this));
    this.registerHelper("slice", this.sliceHelper.bind(this));
    this.registerHelper("join", this.joinHelper.bind(this));
    this.registerHelper("find", this.findHelper.bind(this));
    this.registerHelper("map", this.mapHelper.bind(this));
    this.registerHelper("unique", this.uniqueHelper.bind(this));
    this.registerHelper("random", this.randomHelper.bind(this));
    this.registerHelper("reverse", this.reverseHelper.bind(this));
    this.registerHelper("exists", this.existsHelper.bind(this));
  }

  // Register a custom helper
  registerHelper(name: string, fn: HelperFunction) {
    this.helpers[name] = fn;
  }

  applyTemplate(template: any, data: any): any {
    if (typeof template === "string") {
      return this.proccessHelper(template, data);
    } else if (Array.isArray(template)) {
      return template.map((item, index) =>
        this.applyTemplate(item, { ...data, currentItem: item, index })
      );
    } else if (typeof template === "object") {
      let result: any = {};
      for (const key in template) {
        if (Object.prototype.hasOwnProperty.call(template, key)) {
          const value = template[key];

          const currentKeyResult = this.proccessHelper(key, data, value);

          if (typeof currentKeyResult === "string") {
            if (value) {
              result[currentKeyResult] = this.applyTemplate(value, data);
            } else {
              result = currentKeyResult;
            }
          } else if (Array.isArray(currentKeyResult)) {
            result = this.applyTemplate(currentKeyResult, data);
          } else if (typeof currentKeyResult === "object") {
            result = this.applyTemplate(currentKeyResult, data);
          } else if (typeof currentKeyResult === "boolean") {
            if (currentKeyResult) {
              result = this.applyTemplate(value, data);
            }
          }
        }
      }
      return result;
    }
    return template;
  }

  lookup(varPath: string, data: any): any {
    if (typeof varPath !== "string") return varPath;
    let normalizedPath = varPath.replace(/\[(\d+)\]/g, ".$1");
    if (normalizedPath.startsWith(".")) {
      normalizedPath = normalizedPath.slice(1);
    }
    const returnValue = normalizedPath.split(".").reduce((acc, part) => {
      return acc?.[part];
    }, data);
    if (returnValue) {
      return returnValue;
    } else {
      return varPath;
    }
  }

  proccessHelper(string: string, data: any, innerTemplate?: any) {
    const helperMatch = string.match(/{{#(\w+)\s+(.*?)}}/);
    if (helperMatch) {
      const [helperString, helperName, helperArg] = helperMatch;
      const helperFn = this.helpers[helperName];
      if (helperFn) {
        // Check if there's an inner expression (e.g., compare user.age 30)
        const innerExpressionMatch = helperArg.match(/\((.*?)\)/);
        if (innerExpressionMatch) {
          const innerExpression = innerExpressionMatch[1]; // e.g., 'compare user.age 30'
          const [innerHelperName, ...innerArgs] = innerExpression.split(" "); // ['compare', 'user.age', '30']
          const innerHelperFn = this.helpers[innerHelperName];

          if (innerHelperFn) {
            // Look up values for arguments, treat them as variables
            const evaluatedArgs = innerArgs.map(
              (arg) => this.lookup(arg, data) || arg
            );
            console.log(evaluatedArgs);

            // Ensure innerHelperFn can handle an array directly or accept rest parameters
            const innerResult = innerHelperFn(
              evaluatedArgs.join(" "),
              data,
              innerTemplate
            );

            // Apply the outer helper (e.g., ifHelper) with the result of the inner expression
            const outerResult = helperFn(innerResult, data, innerTemplate);

            if (
              typeof outerResult === "string" ||
              typeof outerResult === "number"
            ) {
              return string.replace(helperString, `${outerResult}`);
            } else {
              return outerResult;
            }
          }
        } else {
          // Handle the normal case where there is no inner expression
          const result = helperFn(helperArg, data, innerTemplate);
          if (typeof result === "string" || typeof result === "number") {
            return string.replace(helperString, `${result}`);
          } else {
            return result;
          }
        }
      }
    } else {
      return string;
    }
  }

  // helpers
  logHelper(varPath: string, data: any, innerTemplate: any) {
    const value = this.lookup(varPath, data);
    console.log(value);

    return innerTemplate;
  }

  varHelper(string: any, data: any): any {
    return this.lookup(string, data);
  }
  lengthHelper(varPath: string, data: any) {
    const value = this.lookup(varPath, data);
    return Array.isArray(value) || typeof value === "string" ? value.length : 0;
  }

  eachHelper(string: any, data: any, innerTemplate: any) {
    const array = this.lookup(string, data);
    if (!Array.isArray(array)) {
      throw new Error(`${data.helperArg} is not an array`);
    }

    return array.map((item: any) =>
      this.applyTemplate(innerTemplate, { ...data, item })
    );
  }
  loopHelper(string: any, data: any, innerTemplate: any) {
    const count = this.lookup(string, data);

    return Array(+count)
      .fill(null)
      .map((item: any) => this.applyTemplate(innerTemplate, { ...data, item }));
  }

  ifHelper(condition: string, data: any, innerTemplate: any) {
    console.log(condition, data);

    return !!this.lookup(condition, data);
  }
  unlessHelper(condition: string, data: any, innerTemplate: any) {
    return !!this.lookup(condition, data);
  }

  withHelper(scopePath: string, data: any, innerTemplate: any) {
    const newContext = this.lookup(scopePath, data);
    return this.applyTemplate(innerTemplate, { ...data, ...newContext });
  }
  setHelper(varName: string, data: any, innerTemplate: any) {
    const [key, valuePath] = varName.split(" ");

    const value = this.lookup(valuePath, data);

    return this.applyTemplate(innerTemplate, { ...data, [key]: value });
  }
  concatHelper(args: string, data: any) {
    const values = args.split(" ").map((arg) => this.lookup(arg, data) || arg);
    return values.join(" ");
  }
  mathHelper(expression: string, data: any) {
    const [left, operator, right] = expression.split(" ");
    const leftValue = parseFloat(this.lookup(left, data));
    const rightValue = parseFloat(this.lookup(right, data));
    switch (operator) {
      case "+":
        return leftValue + rightValue;
      case "-":
        return leftValue - rightValue;
      case "*":
        return leftValue * rightValue;
      case "/":
        return leftValue / rightValue;
      default:
        return 0;
    }
  }
  compareHelper(expression: string, data: any) {
    const [left, operator, right] = expression.split(" ");
    const leftValue = this.lookup(left, data);
    const rightValue = this.lookup(right, data);

    switch (operator) {
      case "==":
        return leftValue == rightValue;
      case "===":
        return leftValue === rightValue;
      case "!=":
        return leftValue != rightValue;
      case "!==":
        return leftValue !== rightValue;
      case ">":
        return leftValue > rightValue;
      case "<":
        return leftValue < rightValue;
      case ">=":
        return leftValue >= rightValue;
      case "<=":
        return leftValue <= rightValue;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }
  upperCaseHelper(varPath: string, data: any) {
    const value = this.lookup(varPath, data);
    return typeof value === "string" ? value.toUpperCase() : value;
  }
  lowerCaseHelper(varPath: string, data: any) {
    const value = this.lookup(varPath, data);
    return typeof value === "string" ? value.toLowerCase() : value;
  }
  jsonStringifyHelper(varPath: string, data: any) {
    const value = this.lookup(varPath, data);
    return JSON.stringify(value);
  }
  jsonParseHelper(varPath: string, data: any) {
    const value = this.lookup(varPath, data);
    return typeof value === "string" ? JSON.parse(value) : value;
  }
  dateHelper(varPath: string, data: any) {
    const dateString = varPath.split(" ");
    const date = new Date(dateString[0]);
    return date.toISOString(); // Default format YYYY-MM-DD
  }
  repeatHelper(args: string, data: any) {
    const [str, count] = args.split(" ");
    const repeatData = this.lookup(str, data) || str;
    const repeatCount = parseInt(count);
    console.log(repeatCount, repeatData);

    if (typeof repeatData === "string") {
      return repeatData.repeat(repeatCount);
    } else if (typeof repeatData === "object") {
      return Array(repeatCount).fill(repeatData);
    }
  }
  sliceHelper(args: string, data: any) {
    console.log(args);

    const [varPath, start, end] = args
      .split(" ")
      .map((arg) => this.lookup(arg, data));
    const value = this.lookup(varPath, data);
    console.log(start, end, value);

    if (Array.isArray(value)) {
      return value.slice(start, end);
    } else if (typeof value === "string") {
      return value.slice(start, end);
    }
    return value;
  }
  joinHelper(args: string, data: any) {
    const [varPath, separator] = args.split(" ");
    const value = this.lookup(varPath, data);

    if (Array.isArray(value)) {
      return value.join(separator);
    }
    return value;
  }
  findHelper(args: string, data: any) {
    const [arrayPath, property, value] = args.split(" ");
    const array = this.lookup(arrayPath, data);

    if (Array.isArray(array)) {
      return array.find((item) => this.lookup(property, item) === value);
    }
    return null;
  }
  mapHelper(args: string, data: any, innerTemplate: any) {
    const [arrayPath] = args.split(" ");
    const array = this.lookup(arrayPath, data);

    if (!Array.isArray(array)) {
      throw new Error(`${arrayPath} is not an array`);
    }
    console.log(innerTemplate);

    return array.map((item) =>
      this.applyTemplate(innerTemplate, { ...data, item })
    );
  }
  uniqueHelper(varPath: string, data: any) {
    const value = this.lookup(varPath, data);

    if (Array.isArray(value)) {
      return Array.from(new Set(value));
    }
    return value;
  }
  randomHelper(varPath: string, data: any) {
    const array = this.lookup(varPath, data);

    if (Array.isArray(array)) {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
    return null;
  }
  reverseHelper(varPath: string, data: any) {
    const value = this.lookup(varPath, data);

    if (Array.isArray(value)) {
      return value.reverse();
    } else if (typeof value === "string") {
      return value.split("").reverse().join("");
    }
    return value;
  }
  existsHelper(varPath: string, data: any) {
    const value = this.lookup(varPath, data);
    return value !== undefined && value !== null;
  }
}
