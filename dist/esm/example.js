export class JsonTemplateEngine {
    helpers = {};
    constructor() {
        console.log("registering helpers");
        this.registerHelper("each", this.eachHelper.bind(this));
        this.registerHelper("if", this.ifHelper.bind(this));
        this.registerHelper("var", this.varHelper.bind(this));
    }
    // Register a custom helper
    registerHelper(name, fn) {
        this.helpers[name] = fn;
    }
    // Core function to parse and apply template (now fully recursive)
    applyTemplate(template, data) {
        console.log("template : ", template);
        if (typeof template === "string") {
            console.log("string template");
            return this.replaceVars(template, data); // Replace string variables (dynamic)
        }
        else if (Array.isArray(template)) {
            console.log("Array template");
            return template.map((item) => this.applyTemplate(item, data)); // Handle arrays recursively
        }
        else if (typeof template === "object") {
            console.log("object template");
            const result = {};
            for (const key in template) {
                if (key.startsWith("{{#")) {
                    const helperName = key.slice(3, key.indexOf("}}"));
                    const helperArg = key.slice(key.indexOf(" ") + 1, -2).trim();
                    if (this.helpers[helperName]) {
                        const helperFn = this.helpers[helperName];
                        console.log("applying helper", helperName);
                        const helperResult = helperFn(template[key], { ...data, helperArg }, this);
                        console.log("helperRe", helperResult);
                    }
                }
                else if (key.includes("{{else}}")) {
                    const elseKey = key.replace("{{else}}", "").trim();
                    result[elseKey] = this.applyTemplate(template[key], data);
                }
                else {
                    console.log("going deep down");
                    result[key] = this.applyTemplate(template[key], data);
                }
            }
            return result;
        }
        return template;
    }
    // Helper function to replace {{var}} with values from data
    replaceVars(template, data) {
        if (typeof template === "string") {
            return template.replace(/{{\s*([\w.]+)\s*}}/g, (match, varPath) => {
                return this.lookup(varPath, data) || "";
            });
        }
        return template;
    }
    // Lookup a variable in data (supports nested keys like 'menu.name')
    lookup(varPath, data) {
        console.log("looking up", varPath, data);
        return varPath.split(".").reduce((acc, part) => acc?.[part], data);
    }
    // Each helper {{#each}}
    eachHelper(context, data, engine) {
        const array = engine.lookup(data.helperArg, data);
        if (!Array.isArray(array)) {
            throw new Error(`${data.helperArg} is not an array`);
        }
        // Recursively apply template for each item in the array
        return array.map((item) => engine.applyTemplate(context, { ...data, ...item }));
    }
    // If/else helper {{#if}}
    ifHelper(context, data, engine) {
        const condition = engine.lookup(data.helperArg, data);
        if (condition) {
            return engine.applyTemplate(context, data);
        }
        else {
            const elseKey = Object.keys(context).find((key) => key.includes("{{else}}"));
            if (elseKey) {
                return engine.applyTemplate(context[elseKey.replace("{{else}}", "").trim()], data);
            }
        }
        return null;
    }
    // Variable helper {{var}}
    varHelper(context, data) {
        return this.lookup(data.helperArg, data);
    }
}
//# sourceMappingURL=example.js.map