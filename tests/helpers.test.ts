import LangJSON from "../src/index";

describe("LangJSON Helpers", () => {
  const langJson = new LangJSON();

  // String Helpers
  test("uppercase", () => {
    const template = "{{#uppercase 'hello'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("HELLO");
  });

  test("lowercase", () => {
    const template = "{{#lowercase 'HELLO'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("hello");
  });

  test("capitalize", () => {
    const template = "{{#capitalize 'hello'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("Hello");
  });

  test("trim", () => {
    const template = "{{#trim '  hello  '}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("hello");
  });

  test("concat", () => {
    const template = "{{#concat 'Hello' ' ' 'World'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("Hello World");
  });

  test("replace", () => {
    const template = "{{#replace 'hello world' 'world' 'jest'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("hello jest");
  });

  test("split", () => {
    const template = "{{#split 'a,b,c' ','}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toEqual(["a", "b", "c"]);
  });

  test("join", () => {
    const template = "{{#join (split 'a,b,c' ',') '-'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("a-b-c");
  });

  test("reverseString", () => {
    const template = "{{#reverseString 'jest'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("tsej");
  });

  test("toTitleCase", () => {
    const template = "{{#toTitleCase 'hello world'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("Hello World");
  });

  // Mathematical Helpers
  test("add", () => {
    const template = "{{#add 1 2}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(3);
  });

  test("subtract", () => {
    const template = "{{#subtract 5 3}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(2);
  });

  test("multiply", () => {
    const template = "{{#multiply 2 3}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(6);
  });

  test("divide", () => {
    const template = "{{#divide 6 3}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(2);
  });

  test("modulo", () => {
    const template = "{{#modulo 5 2}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(1);
  });

  test("max", () => {
    const template = "{{#max 1 2 3 4}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(4);
  });

  test("min", () => {
    const template = "{{#min 1 2 3 4}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(1);
  });

  test("round", () => {
    const template = "{{#round 4.7}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(5);
  });

  test("floor", () => {
    const template = "{{#floor 4.7}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(4);
  });

  test("ceil", () => {
    const template = "{{#ceil 4.1}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(5);
  });

  // Logical Helpers
  test("if", () => {
    const template = "{{#if true 'yes' 'no'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("yes");
  });

  test("and", () => {
    const template = "{{#and true true}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(true);
  });

  test("or", () => {
    const template = "{{#or false true}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(true);
  });

  test("not", () => {
    const template = "{{#not false}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(true);
  });

  // Array Helpers
  test("arrayLength", () => {
    const template = "{{#arrayLength (split '1,2,3' ',')}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(3);
  });

  test("arrayIncludes", () => {
    const template = "{{#arrayIncludes (split '1,2,3' ',') '2'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(true);
  });

  test("arrayJoin", () => {
    const template = "{{#arrayJoin (split '1,2,3' ',') '-'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("1-2-3");
  });

  test("uniqueArray", () => {
    const template = "{{#uniqueArray (split '1,1,2,3' ',')}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toEqual(["1", "2", "3"]);
  });

  test("shuffleArray", () => {
    const template = "{{#shuffleArray (split '1,2,3' ',')}}";
    const result = langJson.applyTemplate(template, {});
    expect(result.sort()).toEqual(["1", "2", "3"]);
  });

  // Object Helpers
  test("objectKeys", () => {
    const template = "{{#objectKeys data}}";
    const result = langJson.applyTemplate(template, {
      data: { a: 1, b: 2 },
    });
    expect(result).toEqual(["a", "b"]);
  });

  test("objectValues", () => {
    const template = "{{#objectValues data}}";
    const result = langJson.applyTemplate(template, {
      data: { a: 1, b: 2 },
    });
    expect(result).toEqual([1, 2]);
  });

  test("mergeObjects", () => {
    const template = "{{#mergeObjects data}}";
    const result = langJson.applyTemplate(template, {
      data: { a: 1, b: 2 },
    });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  // Date Helpers
  test("getCurrentDate", () => {
    const template = "{{#getCurrentDate}}";
    const result = langJson.applyTemplate(template, {});
    const currentDate = new Date().toISOString().split("T")[0];
    expect(result).toBe(currentDate);
  });

  test("getCurrentTime", () => {
    const template = "{{#getCurrentTime}}";
    const result = langJson.applyTemplate(template, {});
    const currentTime = new Date().toLocaleTimeString();
    expect(result).toBe(currentTime);
  });

  // Miscellaneous Helpers
  test("jsonStringify", () => {
    const template = "{{#jsonStringify data}}";
    const result = langJson.applyTemplate(template, {
      data: { a: 1, b: 2 },
    });
    expect(result).toBe('{"a":1,"b":2}');
  });

  test("deepEqual", () => {
    const template = "{{#deepEqual { a: 1 } { a: 1 }}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe(true);
  });

  test("delay", async () => {
    const template = "{{#delay 100}}";
    const start = Date.now();
    await langJson.applyTemplate(template, {});
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  // Additional Helpers
  test("camelToSnake", () => {
    const template = "{{#camelToSnake 'camelCase'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("camel_case");
  });

  test("snakeToCamel", () => {
    const template = "{{#snakeToCamel 'snake_case'}}";
    const result = langJson.applyTemplate(template, {});
    expect(result).toBe("snakeCase");
  });
});
