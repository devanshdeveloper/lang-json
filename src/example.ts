type HelperFunction = (
  context: any,
  data: any,
  engine: JsonTemplateEngine
) => any;

export class JsonTemplateEngine {
  private helpers: Record<string, HelperFunction> = {};

  constructor() {
    console.log("registering helpers");
    this.registerHelper("each", this.eachHelper.bind(this));
    this.registerHelper("if", this.ifHelper.bind(this));
    this.registerHelper("var", this.varHelper.bind(this));
  }

  // Register a custom helper
  registerHelper(name: string, fn: HelperFunction) {
    this.helpers[name] = fn;
  }

  // Core function to parse and apply template (now fully recursive)
  applyTemplate(template: any, data: any): any {
    console.log("template : ", template);

    if (typeof template === "string") {
      console.log("string template");
      return this.replaceVars(template, data); // Replace string variables (dynamic)
    } else if (Array.isArray(template)) {
      console.log("Array template");
      return template.map((item) => this.applyTemplate(item, data)); // Handle arrays recursively
    } else if (typeof template === "object") {
      console.log("object template");
      const result: any = {};
      for (const key in template) {
        if (key.startsWith("{{#")) {
          const helperName = key.slice(3, key.indexOf("}}"));
          const helperArg = key.slice(key.indexOf(" ") + 1, -2).trim();

          if (this.helpers[helperName]) {
            const helperFn = this.helpers[helperName];
            console.log("applying helper", helperName);
            const helperResult = helperFn(
              template[key],
              { ...data, helperArg },
              this
            );
            console.log("helperRe", helperResult);
          }
        } else if (key.includes("{{else}}")) {
          const elseKey = key.replace("{{else}}", "").trim();
          result[elseKey] = this.applyTemplate(template[key], data);
        } else {
          console.log("going deep down");
          result[key] = this.applyTemplate(template[key], data);
        }
      }
      return result;
    }
    return template;
  }

  // Helper function to replace {{var}} with values from data
  private replaceVars(template: any, data: any): any {
    if (typeof template === "string") {
      return template.replace(/{{\s*([\w.]+)\s*}}/g, (match, varPath) => {
        return this.lookup(varPath, data) || "";
      });
    }
    return template;
  }

  // Lookup a variable in data (supports nested keys like 'menu.name')
  private lookup(varPath: string, data: any): any {
    console.log("looking up", varPath, data);
    return varPath.split(".").reduce((acc, part) => acc?.[part], data);
  }

  // Each helper {{#each}}
  private eachHelper(context: any, data: any, engine: JsonTemplateEngine): any {
    const array = engine.lookup(data.helperArg, data);
    if (!Array.isArray(array)) {
      throw new Error(`${data.helperArg} is not an array`);
    }

    // Recursively apply template for each item in the array
    return array.map((item: any) =>
      engine.applyTemplate(context, { ...data, ...item })
    );
  }

  // If/else helper {{#if}}
  private ifHelper(context: any, data: any, engine: JsonTemplateEngine): any {
    const condition = engine.lookup(data.helperArg, data);

    if (condition) {
      return engine.applyTemplate(context, data);
    } else {
      const elseKey = Object.keys(context).find((key) =>
        key.includes("{{else}}")
      );
      if (elseKey) {
        return engine.applyTemplate(
          context[elseKey.replace("{{else}}", "").trim()],
          data
        );
      }
    }
    return null;
  }

  // Variable helper {{var}}
  private varHelper(context: any, data: any): any {
    return this.lookup(data.helperArg, data);
  }
}
