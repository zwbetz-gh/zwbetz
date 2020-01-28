---
title: "Massage a JSON file with a NodeJS script"
date: 2020-01-28T03:42:42-05:00
tags: [json, nodejs]
---

At work, some of our projects keep test data in large JSON files. These files are usually structured as an array of objects, which can be thousands of lines long. When I need to make changes, manually find-and-replacing can only get me so far. I can get cleverer with vscode's regex mode, but still, I am limited. 

I need an object-oriented way to massage these JSON files. Most languages these days support working with JSON, but I find JavaScript's syntax to be the most pleasant. Enter NodeJS -- it's JavaScript, for your local filesystem, and so much more. 

Given a JSON file named `input.json` that is an array of objects. 

```json
[
  {
    "id": 1,
    "firstName": "Bruce",
    "lastName": "Wayne",
    "powers": [
      "Indomitable Will",
      "Peak Human Conditioning",
      "Martial Arts Master"
    ]
  },
  {
    "id": 2,
    "firstName": "Clark",
    "lastName": "Kent",
    "powers": [
      "Flight",
      "Superhuman Strenth",
      "Heat Vision"
    ]
  },
  {
    "id": 3,
    "firstName": "Oliver",
    "lastName": "Queen",
    "powers": [
      "Acrobatics",
      "Archery",
      "Swordsmanship"
    ]
  }
]
```

The following NodeJS script loops through each object and shows how to add a node, delete a node, and change the data type of a node. These changes are arbitrary, but they give you an example to go off of. Run the script with something like `node ./script.js`.

```js
const fs = require('fs');

function readJsonFile(filePath) {
  console.log(`Reading JSON file from [${filePath}]`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJsonFile(filePath, json) {
  console.log(`Writing JSON file to [${filePath}]`);
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
}

function main() {
  const inputFilePath = './input.json';
  const outputFilePath = './output.json';
  const json = readJsonFile(inputFilePath);
  console.log(`JSON file has [${json.length}] objects`);

  json.forEach(object => {
    // add a node name which combines the firstName and lastName nodes
    object.name = `${object.firstName} ${object.lastName}`;

    // delete the firstName and lastName nodes
    delete object.firstName;
    delete object.lastName;

    // delete the first power
    object.powers.splice(0, 1);

    // convert the id node from a number to a string
    object.id = object.id.toString();
  });

  writeJsonFile(outputFilePath, json);
}

main();
```

The script will output the result to a file named `output.json`.

```json
[
  {
    "id": "1",
    "powers": [
      "Peak Human Conditioning",
      "Martial Arts Master"
    ],
    "name": "Bruce Wayne"
  },
  {
    "id": "2",
    "powers": [
      "Superhuman Strenth",
      "Heat Vision"
    ],
    "name": "Clark Kent"
  },
  {
    "id": "3",
    "powers": [
      "Archery",
      "Swordsmanship"
    ],
    "name": "Oliver Queen"
  }
]
```

For more massaging power, use the [Lodash](https://lodash.com/) library. For working with dates in any format you can think of, checkout the [Moment.js](https://momentjs.com/) library.
