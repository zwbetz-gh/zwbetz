const fs = require("fs");
const path = require("path");
const process = require("process");

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
    text: "Buy milk and eggs",
    done: false,
  };
  // Make it pretty
  const string = makePrettyJson(todoItem);
  // Log it
  console.log(string);
  // Write it
  const filePath = path.resolve(process.cwd(), "output.json");
  writeDataToFile(string, filePath);
};

main();

// Run this script with
// node content/blog/make-pretty-json-output-in-nodejs/script.js
