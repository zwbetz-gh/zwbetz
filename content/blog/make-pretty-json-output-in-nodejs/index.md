---
title: "Make pretty JSON output in NodeJS"
date: 2020-07-16T13:45:27-05:00
toc: false
---

By default, the `JSON.stringify` function outputs minified JSON, see [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). When logging or writing JSON, I usually like to make it look pretty. This can be done by tweaking the function arguments. The first argument is the data to convert. The second (optional) argument is a replacer function, we'll leave this null. The third (optional) argument is the space to use when formatting the JSON, we'll use 2 spaces. 

## Sample

```js
const fs = require('fs');
const path = require('path');
const process = require('process');

const makePrettyJson = (data) => {
  const string = JSON.stringify(data, null, 2);
  return string;
};

const writeDataToFile = (data, filePath) => {
  try {
    console.log(`Writing file ${filePath}`);
    fs.writeFileSync(filePath, data);
  } catch (error) {
    console.error(`Error when writing file ${filePath}`, error);
  }
};

const main = () => {
  const todoItem = {
    id: 1,
    text: 'Buy milk and eggs',
    done: false
  };
  // Make it pretty
  const string = makePrettyJson(todoItem);
  // Log it
  console.log(string);
  // Write it
  const filePath = path.resolve(process.cwd(), 'output.json');
  writeDataToFile(string, filePath);
};

main();
```

## Output

```json
{
  "id": 1,
  "text": "Buy milk and eggs",
  "done": false
}
```
