type HelperFunction = (context: any, data: any, engine: JsonTemplateEngine) => any;
export declare class JsonTemplateEngine {
    private helpers;
    constructor();
    registerHelper(name: string, fn: HelperFunction): void;
    applyTemplate(template: any, data: any): any;
    private replaceVars;
    private lookup;
    private eachHelper;
    private ifHelper;
    private varHelper;
}
export {};
