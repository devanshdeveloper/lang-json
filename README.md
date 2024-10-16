# LangJSON

`LangJSON` is a lightweight templating engine designed for JavaScript applications, allowing you to create dynamic JSON structures using helper functions and template strings. It offers built-in helpers for string manipulation, mathematical operations, logical conditions, and much more.

## Installation

You can install `lang-json` via npm:

```bash
npm install lang-json
```

## Basic Initialization & Setup

To start using LangJSON, import it into your project and create an instance of the class:

```javascript
import LangJSON from "lang-json";

const langJSON = new LangJSON();
```

## Using Built-in Helpers

### Example 1: String Manipulation
You can manipulate strings using built-in helpers. Here’s how to convert a string to uppercase:

```javascript
const template = {
  "greeting": "{{#uppercase 'hello'}} world"
};

const data = {};
const result = langJSON.applyTemplate(template, data);
console.log(result);
/*
Output:
{
  "greeting": "HELLO world"
}
*/
```

### Example 2: Conditional Statements
Utilize the if helper to conditionally render values based on a variable:

```javascript
const template = {
  "status": "{{#if isActive 'Active' 'Inactive'}}"
};

const data = { isActive: true };
const result = langJSON.applyTemplate(template, data);
console.log(result);
/*
Output:
{
  "status": "Active"
}
*/
```


### Example 3: Looping Through Arrays

You can iterate through arrays using the each helper:

```javascript
const template = {
  "users": {
    "{{#each users}}": {
      "name": "{{#var item.name}}",
      "age": "{{#var item.age}}"
    }
  }
};

const data = {
  users: [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Doe", age: 40 }
  ]
};

const result = langJSON.applyTemplate(template, data);
console.log(result);
/*
Output:
{
  "users": [
    {
      "name": "John",
      "age": 30
    },
    {
      "name": "Jane",
      "age": 25
    },
    {
      "name": "Doe",
      "age": 40
    }
  ]
}
*/
```

### Example 4: Chaining Helpers
You can chain multiple helpers together for more complex operations:

```javascript
const template = {
  "message": "{{#uppercase (concat 'hello' ', world')}}"
};

const data = {};
const result = langJSON.applyTemplate(template, data);
console.log(result);
/*
Output:
{
  "message": "HELLO, WORLD"
}
*/
```

## Performance Tips for Large Data

- When working with large datasets, consider these performance tips:

 - Use Efficient Data Structures: Choose data structures that are optimized for the operations you need, such as arrays for ordered collections and objects for key-value pairs.

 - Limit Helper Calls: Reduce the number of helper calls inside loops or large templates. Preprocess data if possible to pass simplified data to the template.

 - Avoid Deep Nesting: Keep templates flat when possible to enhance readability and reduce processing complexity.

## Available Helpers
LangJSON includes a variety of built-in helpers for different purposes:

### String Helpers
 - uppercase: Converts a string to uppercase.
 - lowercase: Converts a string to lowercase.
 - trim: Removes whitespace from both ends of a string.
 - substring: Extracts a substring from a string.
 - concat: Concatenates multiple strings.

### Mathematical Helpers

 - add: Adds two numbers.
 - subtract: Subtracts one number from another.
 - multiply: Multiplies two numbers.
 - divide: Divides one number by another.

### Logical Helpers

 - if: Evaluates a condition and returns one of two values.
 - and: Returns true if all conditions are true.
 - or: Returns true if at least one condition is true.

### Date and Time Helpers
 - getCurrentDate: Returns the current date in ISO format.
 - getCurrentTime: Returns the current time in local format.

### Array Helpers

 - arrayLength: Returns the length of an array.
 - arrayIncludes: Checks if an array includes a certain item.

### Object Helpers

 - objectKeys: Returns the keys of an object.
 - objectValues: Returns the values of an object.

## Conclusion
LangJSON provides a powerful way to dynamically generate JSON structures using a flexible templating system. Whether you're working with simple strings or complex data structures, LangJSON offers a range of built-in helpers to streamline your development process.