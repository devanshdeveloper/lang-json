import LangJSON from "../src/index";

// Create an instance of LangJSON
const langJSON = new LangJSON();

describe("LangJSON Templating Tests", () => {
  test("String Manipulation - Uppercase", () => {
    const template = {
      greeting: "{{#uppercase 'hello'}} world",
    };
    const data = {};
    const result = langJSON.applyTemplate(template, data);
    expect(result).toEqual({ greeting: "HELLO world" });
  });

  test("Conditional Statements - Active Status", () => {
    const template = {
      status: "{{#if isActive 'Active' 'Inactive'}}",
    };
    const data = { isActive: true };
    const result = langJSON.applyTemplate(template, data);
    expect(result).toEqual({ status: "Active" });
  });

  test("Looping Through Arrays - Users List", () => {
    const template = {
      users: {
        "{{#each users}}": {
          name: "{{#var item.name}}",
          age: "{{#var item.age}}",
        },
      },
    };
    const data = {
      users: [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
        { name: "Doe", age: 40 },
      ],
    };
    const result = langJSON.applyTemplate(template, data);
    expect(result).toEqual({
      users: [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
        { name: "Doe", age: 40 },
      ],
    });
  });

  test("Chaining Helpers - Concatenation and Uppercase", () => {
    const template = {
      message: "{{#uppercase (concat 'hello' ', world')}}",
    };
    const data = {};
    const result = langJSON.applyTemplate(template, data);
    expect(result).toEqual({ message: "HELLO, WORLD" });
  });

  test("Performance Tips - Large Data", () => {
    const largeData = {
      users: Array.from({ length: 1000 }, (_, index) => ({
        name: `User${index + 1}`,
        age: 20 + (index % 50),
      })),
    };
    const template = {
      users: {
        "{{#each users}}": {
          name: "{{#var item.name}}",
          age: "{{#var item.age}}",
        },
      },
    };
    const result = langJSON.applyTemplate(template, largeData);
    expect(result.users.length).toBe(1000);
  });
});
