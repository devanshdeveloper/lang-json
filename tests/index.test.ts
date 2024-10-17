import LangJSON from "../src/index";

const langJson = new LangJSON();

describe("LangJSON Test Suite", () => {
  /**
   * -------------------------
   * Test: lookup method
   * -------------------------
   */
  test("Basic lookup", () => {
    expect(langJson.lookup("key", { key: "value" })).toBe("value");
  });

  test("Nested lookup", () => {
    const data = { nested: { key: "value" } };
    expect(langJson.lookup("nested.key", data)).toBe("value");
  });

  test("Non-existent key in lookup", () => {
    expect(langJson.lookup("missingKey", { key: "value" })).toBe(undefined);
  });

  test("Lookup with array index access", () => {
    const data = { items: ["first", "second", "third"] };
    expect(langJson.lookup("items[1]", data)).toBe("second");
  });

  test("Lookup for deeply nested paths", () => {
    const data = { a: { b: { c: { d: "deepValue" } } } };
    expect(langJson.lookup("a.b.c.d", data)).toBe("deepValue");
  });

  test("Lookup with array and non-existent index", () => {
    const data = { items: ["first", "second", "third"] };
    expect(langJson.lookup("items[10]", data)).toBe(undefined);
  });

  test("Lookup with non-string keys", () => {
    const data = { 1: "one", 2: "two" };
    expect(langJson.lookup("1", data)).toBe("one");
  });

  test("Lookup with undefined or null values", () => {
    const data = { key: null, anotherKey: undefined };
    expect(langJson.lookup("key", data)).toBe(null);
    expect(langJson.lookup("anotherKey", data)).toBe(undefined);
  });

  test("Lookup with nested key and array mix", () => {
    const data = { items: [{ name: "first" }, { name: "second" }] };
    expect(langJson.lookup("items[1].name", data)).toBe("second");
  });

  test("Lookup with complex keys containing spaces", () => {
    const data = { "key with spaces": { "another key": "value" } };
    expect(langJson.lookup("key with spaces.another key", data)).toBe("value");
  });

  test("Lookup with deeply nested array of objects", () => {
    const data = {
      level1: [{ level2: [{ level3: { key: "deepValue" } }] }],
    };
    expect(langJson.lookup("level1[0].level2[0].level3.key", data)).toBe(
      "deepValue"
    );
  });

  test("Lookup with special characters and symbols in the key", () => {
    const data = { "key@#": "specialValue" };
    expect(langJson.lookup("key@#", data)).toBe("specialValue");
  });

  test("Lookup with circular reference in data", () => {
    const data: any = {};
    data.self = data; // Circular reference
    expect(langJson.lookup("self.self.self", data)).toBe(data);
  });

  test("Lookup with an empty string as key", () => {
    const data = { "": "emptyKey" };
    expect(langJson.lookup("", data)).toBe("emptyKey");
  });

  test("Lookup with mixed object and array access in key", () => {
    const data = {
      list: [{ nested: { key: "arrayObjectValue" } }],
    };
    expect(langJson.lookup("list[0].nested.key", data)).toBe(
      "arrayObjectValue"
    );
  });

  /**
   * -------------------------
   * Test: processHelper method
   * -------------------------
   */
  test("processHelper with zero arguments", () => {
    langJson.registerHelper("returnHello", () => "Hello");
    expect(langJson.processHelper("{{#returnHello}}", { key: "value" })).toBe(
      "Hello"
    );
  });

  test("processHelper with valid var key", () => {
    expect(langJson.processHelper("{{#var key}}", { key: "value" })).toBe(
      "value"
    );
  });

  test("processHelper with missing key in data", () => {
    expect(
      langJson.processHelper("{{#var missingKey}}", { key: "value" })
    ).toBe(undefined);
  });

  test("processHelper with missing helper", () => {
    expect(() => {
      langJson.processHelper("{{#unknown key}}", { key: "value" });
    }).toThrow("Missing helper : unknown"); // Or you can specify the error message with toThrow("error message")
  });

  test("processHelper with nested helper call", () => {
    expect(
      langJson.processHelper("{{#var (var key)}}", {
        key: "nestedKey",
        nestedKey: "result",
      })
    ).toBe("result");
  });

  test("processHelper with escaped variable", () => {
    expect(
      langJson.processHelper("This is {{#var key}}!", { key: "value" })
    ).toBe("This is value!");
  });

  test("processHelper with escaping inside helper", () => {
    expect(
      langJson.processHelper("{{#var key}} is {{#var anotherKey}}", {
        key: "value",
        anotherKey: "escapedValue",
      })
    ).toBe("value is escapedValue");
  });

  test("processHelper with boolean handling", () => {
    const data = { isTrue: true, isFalse: false };
    expect(langJson.processHelper("{{#var isTrue}}", data)).toBe(true);
    expect(langJson.processHelper("{{#var isFalse}}", data)).toBe(false);
  });

  test("processHelper with multiple variables in one template", () => {
    const template = "Hello, {{#var firstName}} {{#var lastName}}!";
    const data = { firstName: "John", lastName: "Doe" };
    expect(langJson.processHelper(template, data)).toBe("Hello, John Doe!");
  });

  test("processHelper with nested variable in object", () => {
    const template = "{{#var user.details.name}}";
    const data = { user: { details: { name: "Jane" } } };
    expect(langJson.processHelper(template, data)).toBe("Jane");
  });

  test("processHelper with array passed as argument", () => {
    langJson.registerHelper("join", ([arr]) => arr.join(", "));
    expect(
      langJson.processHelper("{{#join items}}", {
        items: ["apple", "banana", "cherry"],
      })
    ).toBe("apple, banana, cherry");
  });

  // test("processHelper with complex nesting of helpers", () => {
  //   langJson.registerHelper("outer", ([arg]) => `outer(${arg})`);
  //   langJson.registerHelper("inner", ([arg]) => `inner(${arg})`);
  //   expect(
  //     langJson.processHelper("{{#outer (inner key)}}", { key: "value" })
  //   ).toBe("outer(inner(value))");
  // });

  test("processHelper with variable inside a helper argument", () => {
    langJson.registerHelper("wrap", (arg) => `[${arg}]`);
    expect(
      langJson.processHelper("{{#wrap (var key)}}", { key: "content" })
    ).toBe("[content]");
  });

  // test("processHelper with escaped special characters", () => {
  //   expect(
  //     langJson.processHelper("Use \\{{#var key}} to access value", {
  //       key: "data",
  //     })
  //   ).toBe("Use {{#var key}} to access value");
  // });

  test("processHelper with an empty helper name", () => {
    expect(langJson.processHelper("{{# key}}", { key: "value" })).toBe(
      "{{# key}}"
    );
  });

  test("processHelper with incorrect data types for variables", () => {
    expect(langJson.processHelper("{{#var key}}", { key: 123 })).toBe(123);
    expect(langJson.processHelper("{{#var key}}", { key: true })).toBe(true);
    expect(langJson.processHelper("{{#var key}}", { key: null })).toBe(null);
  });

  test("processHelper with non-terminating helper expressions", () => {
    expect(langJson.processHelper("{{#var key", { key: "value" })).toBe(
      "{{#var key"
    );
  });

  test("processHelper with special characters in variable names", () => {
    const data = {
      "key-with-dash": "valueWithDash",
      "key@symbol": "valueWithSymbol",
    };
    expect(langJson.processHelper("{{#var key-with-dash}}", data)).toBe(
      "valueWithDash"
    );
    expect(langJson.processHelper("{{#var key@symbol}}", data)).toBe(
      "valueWithSymbol"
    );
  });

  test("processHelper with helper functions throwing errors", () => {
    langJson.registerHelper("errorHelper", () => {
      throw new Error("Helper error");
    });
    expect(() => langJson.processHelper("{{#errorHelper}}", {})).toThrow(
      "Helper error"
    );
  });
  /**
   * -------------------------
   * Test: applyTemplate method
   * -------------------------
   */
  test("applyTemplate with object template", () => {
    const template = { "{{#var firstName}}": "{{#var lastName}}" };
    const data = { firstName: "John", lastName: "Doe" };
    expect(langJson.applyTemplate(template, data)).toEqual({ John: "Doe" });
  });

  test("applyTemplate with array of strings", () => {
    const template = ["{{#var key}}", "{{#var value}}"];
    const data = { key: "first", value: "second" };
    expect(langJson.applyTemplate(template, data)).toEqual(["first", "second"]);
  });

  test("applyTemplate with nested objects", () => {
    const template = {
      "{{#var user.name}}": { age: "{{#var user.age}}" },
    };
    const data = { user: { name: "Alice", age: 30 } };
    expect(langJson.applyTemplate(template, data)).toEqual({
      Alice: { age: 30 },
    });
  });

  test("applyTemplate with array of objects", () => {
    const template = [
      { "{{#var firstName}}": "{{#var lastName}}" },
      { "{{#var firstName}}": "{{#var age}}" },
    ];
    const data = { firstName: "John", lastName: "Doe", age: 30 };
    expect(langJson.applyTemplate(template, data)).toEqual([
      { John: "Doe" },
      { John: 30 },
    ]);
  });

  test("applyTemplate with boolean values", () => {
    const template = { "{{#var isActive}}": "Active" };
    const data = { isActive: true };
    expect(langJson.applyTemplate(template, data)).toEqual({ true: "Active" });
  });

  test("applyTemplate with deeply nested object structures", () => {
    const template = {
      "{{#var user.name}}": {
        "{{#var user.details.age}}": "{{#var user.details.address}}",
      },
    };
    const data = {
      user: { name: "John", details: { age: 30, address: "NY" } },
    };
    expect(langJson.applyTemplate(template, data)).toEqual({
      John: { 30: "NY" },
    });
  });

  test("applyTemplate with mixed arrays and objects", () => {
    const template = [
      { "{{#var firstName}}": "{{#var lastName}}" },
      "{{#var age}}",
      ["{{#var city}}", "{{#var country}}"],
    ];
    const data = {
      firstName: "John",
      lastName: "Doe",
      age: 30,
      city: "New York",
      country: "USA",
    };
    expect(langJson.applyTemplate(template, data)).toEqual([
      { John: "Doe" },
      30,
      ["New York", "USA"],
    ]);
  });

  test("applyTemplate with missing keys in template", () => {
    const template = { "{{#var firstName}}": "{{#var lastName}}" };
    const data = { firstName: "John" }; // missing lastName
    expect(langJson.applyTemplate(template, data)).toEqual({
      John: undefined,
    });
  });

  test("applyTemplate with escaping in template", () => {
    const template = { escapedVar: "{{#var key}}" };
    const data = { key: "value" };
    expect(langJson.applyTemplate(template, data)).toEqual({
      escapedVar: "value",
    });
  });

  test("applyTemplate with undefined data values", () => {
    const template = { "{{#var key}}": "value" };
    const data = { key: undefined };
    expect(langJson.applyTemplate(template, data)).toEqual({
      undefined: "value",
    });
  });

  test("applyTemplate with conditional logic in templates", () => {
    langJson.registerHelper("ifEquals", ([a, b]) => (a === b ? "Yes" : "No"));
    const template = { "{{#ifEquals user.role 'admin'}}": "Is Admin" };
    expect(
      langJson.applyTemplate(template, { user: { role: "admin" } })
    ).toEqual({
      Yes: "Is Admin",
    });
    expect(
      langJson.applyTemplate(template, { user: { role: "user" } })
    ).toEqual({
      No: "Is Admin",
    });
  });

  test("applyTemplate with circular references in data", () => {
    const data: any = { key: "value" };
    data.self = data; // Create circular reference
    const template = { "{{#var key}}": "{{#var self.key}}" };
    expect(langJson.applyTemplate(template, data)).toEqual({ value: "value" });
  });

  test("applyTemplate with keys that are numbers", () => {
    const template = { "{{#var 1}}": "{{#var 2}}" };
    const data = { 1: "one", 2: "two" };
    expect(langJson.applyTemplate(template, data)).toEqual({ one: "two" });
  });

  test("applyTemplate with deeply nested structures and template resolution", () => {
    const template = {
      "{{#var user.name}}": {
        "{{#var user.job.title}}": {
          "{{#var user.job.department}}": "{{#var user.job.level}}",
        },
      },
    };
    const data = {
      user: {
        name: "John",
        job: {
          title: "Manager",
          department: "Sales",
          level: "Senior",
        },
      },
    };
    expect(langJson.applyTemplate(template, data)).toEqual({
      John: { Manager: { Sales: "Senior" } },
    });
  });

  /**
   * -------------------------
   * Test: Registering custom helper functions
   * -------------------------
   */
  test("registerHelper with custom helper", () => {
    langJson.registerHelper("custom", ([arg]) => arg.toUpperCase());
    expect(langJson.processHelper("{{#custom key}}", { key: "value" })).toBe(
      "VALUE"
    );
  });

  test("registerHelpers with multiple custom helpers", () => {
    langJson.registerHelpers({
      upper: ([arg]) => arg.toUpperCase(),
      lower: ([arg]) => arg.toLowerCase(),
    });
    expect(langJson.processHelper("{{#upper key}}", { key: "Value" })).toBe(
      "VALUE"
    );
    expect(langJson.processHelper("{{#lower key}}", { key: "VALUE" })).toBe(
      "value"
    );
  });

  test("registerHelper with no arguments", () => {
    langJson.registerHelper("noArgs", () => "No Args!");
    expect(langJson.processHelper("{{#noArgs}}", {})).toBe("No Args!");
  });

  test("registerHelper with multiple arguments", () => {
    langJson.registerHelper("concat", ([arg1, arg2]) => arg1 + arg2);
    expect(
      langJson.processHelper("{{#concat first second}}", {
        first: "Hello",
        second: "World",
      })
    ).toBe("HelloWorld");
  });

  test("registerHelper for formatting or computation", () => {
    langJson.registerHelper("add", ([a, b]) => a + b);
    expect(langJson.processHelper("{{#add 5 10}}", {})).toBe(15);
  });

  test("registerHelper with string manipulation", () => {
    langJson.registerHelper("reverse", ([arg]) =>
      arg.split("").reverse().join("")
    );
    expect(langJson.processHelper("{{#reverse word}}", { word: "hello" })).toBe(
      "olleh"
    );
  });
});

test("registerHelper for conditional formatting", () => {
  langJson.registerHelper("isAdult", ([age]) =>
    age >= 18 ? "Adult" : "Minor"
  );
  expect(langJson.processHelper("{{#isAdult age}}", { age: 20 })).toBe("Adult");
  expect(langJson.processHelper("{{#isAdult age}}", { age: 15 })).toBe("Minor");
});

test("registerHelper with arguments having special characters", () => {
  langJson.registerHelper("sanitize", ([str]) =>
    str.replace(/[^a-zA-Z ]/g, "")
  );
  expect(
    langJson.processHelper("{{#sanitize key}}", { key: "Hello@World!" })
  ).toBe("HelloWorld");
});

test("registerHelper for handling empty input", () => {
  langJson.registerHelper("isEmpty", ([str]) =>
    str === "" ? "Empty" : "Not Empty"
  );
  expect(langJson.processHelper("{{#isEmpty key}}", { key: "" })).toBe("Empty");
  expect(langJson.processHelper("{{#isEmpty key}}", { key: "Value" })).toBe(
    "Not Empty"
  );
});

test("registerHelper that throws an error", () => {
  langJson.registerHelper("throwError", () => {
    throw new Error("Something went wrong!");
  });
  expect(() => langJson.processHelper("{{#throwError}}", {})).toThrow(
    "Something went wrong!"
  );
});

test("registerHelper with default values for missing arguments", () => {
  langJson.registerHelper("defaultArg", ([arg = "default"]) => arg);
  expect(langJson.processHelper("{{#defaultArg}}", {})).toBe("default");
  expect(
    langJson.processHelper("{{#defaultArg key}}", { key: "provided" })
  ).toBe("provided");
});

test("registerHelper with multiple arguments passed dynamically", () => {
  langJson.registerHelper("concat", ([...args]) => args.join("-"));
  expect(
    langJson.processHelper("{{#concat key1 key2 key3}}", {
      key1: "first",
      key2: "second",
      key3: "third",
    })
  ).toBe("first-second-third");
});

test("registerHelper that returns an object instead of a string", () => {
  langJson.registerHelper("createUser", ([name, age]) => ({ name, age }));
  expect(
    langJson.processHelper("{{#createUser name age}}", {
      name: "Alice",
      age: 30,
    })
  ).toEqual({
    name: "Alice",
    age: 30,
  });
});

// test("registerHelper with asynchronous operation (promise)", async () => {
//   langJson.registerHelper("fetchData", async () => {
//     return new Promise((resolve) => setTimeout(() => resolve("data"), 100));
//   });
//   const result = await langJson.processHelper("{{#fetchData}}", {});
//   expect(result).toBe("data");
// });

test("registerHelper with fallback value if input is missing", () => {
  langJson.registerHelper("default", ([value, fallback]) => value || fallback);
  expect(
    langJson.processHelper("{{#default key 'defaultValue'}}", { key: null })
  ).toBe("defaultValue");
});

test("registerHelper with helpers that modify objects", () => {
  langJson.registerHelper("addProperty", ([obj, key, value]) => {
    obj[key] = value;
    return obj;
  });
  expect(
    langJson.processHelper("{{#addProperty obj key value}}", {
      obj: {},
      key: "newKey",
      value: "newValue",
    })
  ).toEqual({
    newKey: "newValue",
  });
});

test("registerHelper that uses an internal state", () => {
  let state = 0;
  langJson.registerHelper("increment", () => {
    state += 1;
    return state;
  });
  expect(langJson.processHelper("{{#increment}}", {})).toBe(1);
  expect(langJson.processHelper("{{#increment}}", {})).toBe(2);
  expect(langJson.processHelper("{{#increment}}", {})).toBe(3);
});

test("registerHelper for formatting dates", () => {
  langJson.registerHelper("formatDate", ([date, format]) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  });
  expect(
    langJson.processHelper("{{#formatDate date 'YYYY-MM-DD'}}", {
      date: "2023-01-01",
    })
  ).toBe("2023-01-01");
});

test("registerHelper that accepts multiple arguments and returns an object", () => {
  langJson.registerHelper("createUser", ([name, age, role]) => ({
    name,
    age,
    role,
  }));
  expect(
    langJson.processHelper("{{#createUser name age role}}", {
      name: "Alice",
      age: 30,
      role: "Engineer",
    })
  ).toEqual({
    name: "Alice",
    age: 30,
    role: "Engineer",
  });
});

test("Complex integration test for LangJSON functionality", () => {
  // Register multiple helpers
  langJson.registerHelpers({
    upper: ([str]) => str.toUpperCase(),
    lower: ([str]) => str.toLowerCase(),
    concat: ([arg1, arg2]) => `${arg1} ${arg2}`,
    isTrue: ([arg]) => arg === "true",
    getLength: ([arr]) => arr.length,
    repeat: ([str, times]) => str.repeat(times),
  });

  // Define a complex data structure
  const data = {
    user: {
      name: "Alice",
      age: 30,
      roles: ["admin", "editor"],
      address: {
        city: "Wonderland",
        zip: "12345",
        coordinates: { lat: 51.5074, long: -0.1278 },
      },
      preferences: {
        notifications: { email: true, sms: false },
        theme: "dark",
      },
    },
    isActive: "true",
    items: [
      { id: 1, name: "Item1", description: "First Item" },
      { id: 2, name: "Item2", description: "Second Item" },
      { id: 3, name: "Item3", description: "Third Item" },
    ],
  };

  // Define a complex template
  const template = {
    "{{#upper user.name}}": {
      age: "{{#var user.age}}",
      active: "{{#isTrue isActive}}",
      address: {
        city: "{{#var user.address.city}}",
        zip: "{{#var user.address.zip}}",
        coordinates:
          "{{#var user.address.coordinates.lat}}, {{#var user.address.coordinates.long}}",
      },
      roles: {
        "{{#arrayJoin (var user.roles) ', '}}": {
          roleCount: "{{#getLength user.roles}}",
          roleList: "{{#var user.roles[0]}} and {{#var user.roles[1]}}",
        },
      },
      items: "{{#repeat (concat 'Item: ' (var items[0].name)) 3}}",
      preferences: {
        theme: "{{#var user.preferences.theme}}",
        notificationStatus: {
          email: "{{#var user.preferences.notifications.email}}",
          sms: "{{#var user.preferences.notifications.sms}}",
        },
      },
    },
  };

  // Apply the template with the complex data
  const result = langJson.applyTemplate(template, data);

  // Validate the output
  expect(result).toEqual({
    ALICE: {
      age: 30,
      active: true,
      address: {
        city: "Wonderland",
        zip: "12345",
        coordinates: "51.5074, -0.1278",
      },
      roles: {
        "admin, editor": {
          roleCount: 2,
          roleList: "admin and editor",
        },
      },
      items: "Item:  Item1Item:  Item1Item:  Item1",
      preferences: {
        theme: "dark",
        notificationStatus: {
          email: true,
          sms: false,
        },
      },
    },
  });
});
