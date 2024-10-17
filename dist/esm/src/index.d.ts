type HelperFunction = (args: any, data: any, innerTemplate: any) => any;
export default class LangJSON {
    helpers: Record<string, HelperFunction>;
    private memory;
    constructor();
    registerHelper(name: string, fn: HelperFunction): void;
    registerHelpers(helpers: {
        [key: string]: HelperFunction;
    }): void;
    getHelper(name: string): HelperFunction | undefined;
    applyTemplate(template: any, data: any, innerTemplate?: any): any;
    lookup(varPath: string | number, data: any): any;
    sanitizeArg(arg: any, helperName: any, data: any): any;
    handleSpitStringArgs(stringArg: string): string[];
    processHelperArgs(helperArgs: string, data: any, innerTemplate: any): any;
    processHelper(string: string, data: any, innerTemplate?: any, stringMatches?: any): any;
}
export {};
