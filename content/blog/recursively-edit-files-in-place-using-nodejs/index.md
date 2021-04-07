---
title: "Recursively Edit Files In-Place Using NodeJS"
date: 2021-03-12T00:08:35-06:00
toc: false
---

I recently converted all my blog post titles to title-case with a [little NodeJS script](https://github.com/zwbetz-gh/zwbetz/blob/master/task_title_case.js). So, am taking the teachable bits and sharing them here.

Let's pretend you have a file tree that looks like this:

```
└── dir-1
    ├── dir-2
    │   ├── dir-3
    │   │   └── file-3.txt
    │   └── file-2.txt
    └── file-1.txt
```

Then let's pretend in each of these files, you need to replace the string `BEFORE` with the string `AFTER`. It can be done with the following NodeJS code:

```js
const fs = require('fs');
const path = require('path');

const walk = dir => {
  try {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        // Recurse into subdir
        results = [...results, ...walk(file)];
      } else {
        // Is a file
        results.push(file);
      }
    });
    return results;
  } catch (error) {
    console.error(`Error when walking dir ${dir}`, error);
  }
};

const edit = filePath => {
  const oldContent = fs.readFileSync(filePath, {encoding: 'utf8'});
  const regex = /BEFORE/;
  const replaceVal = 'AFTER';
  const newContent = oldContent.replace(regex, replaceVal);
  fs.writeFileSync(filePath, newContent, {encoding: 'utf-8'});
  console.log(`Edited file: ${filePath}`);
};

const main = () => {
  const dir = 'dir-1';
  const filePaths = walk(dir);
  filePaths.forEach(filePath => edit(filePath));
};

main();
```

Sample output:

```
$ node script.js
Edited file: dir-1/dir-2/dir-3/file-3.txt
Edited file: dir-1/dir-2/file-2.txt
Edited file: dir-1/file-1.txt
```
