---
title: "Node.js Scripting Reference"
date: 2024-02-16T21:42:38-06:00
toc: true
draft: false
---

I like a good shell script. But there are times when I need something more. For example, parsing structured data or working with arrays of objects can get hairy in shell-land. This is where Node.js comes into the picture. It gives me the convenience of quick shell things, plus the programming power of JavaScript. Enjoy.

<!--more-->

## Rules

1. Node.js version 20.11 or higher is required
1. Only the standard library is allowed
1. Scripts are written as ES Modules and run like `node script.mjs`

## Read a file

```js
import fs from 'node:fs';

const thePath = 'file-1.txt';
console.log(`Reading ${thePath}`);
const contents = fs.readFileSync(thePath, { encoding: 'utf-8' });
```

## Write a file

```js
import fs from 'node:fs';

const thePath = 'file-1.txt';
const theData = 'one\ntwo\n';
console.log(`Writing ${thePath}`);
fs.writeFileSync(thePath, theData, { encoding: 'utf-8' });
```

## Copy a file

```js
import fs from 'node:fs';

const srcPath = 'file-1.txt';
const destPath = 'file-2.txt';
console.log(`Copying ${srcPath} to ${destPath}`);
fs.copyFileSync(srcPath, destPath);
```

## Copy a dir recursively

```js
import fs from 'node:fs';

const srcPath = 'dir-1';
const destPath = 'dir-2';
console.log(`Copying ${srcPath} to ${destPath}`);
fs.cpSync(srcPath, destPath, { recursive: true });
```

## Make a dir recursively

```js
import fs from 'node:fs';

const thePath = 'dir-3/dir-4/dir-5';
console.log(`Making ${thePath}`);
fs.mkdirSync(thePath, { recursive: true });
```

## Remove a file

```js
import fs from 'node:fs';

const thePath = 'file-2.txt';
console.log(`Removing ${thePath}`);
fs.rmSync(thePath);
```

## Remove a dir recursively

```js
import fs from 'node:fs';

const thePath = 'dir-2';
console.log(`Removing ${thePath}`);
fs.rmSync(thePath, { recursive: true });
```

## Check if a file exists

```js
import fs from 'node:fs';

const thePath = 'file-1.txt';

if (fs.existsSync(thePath)) {
  console.log(`It exists: ${thePath}`);
}
```

## Create a UUID

```js
import crypto from 'node:crypto';

const uuid = crypto.randomUUID();
console.log(uuid);
```

## Get the current working dir

```js
import process from 'node:process';

console.log(process.cwd());
```

## Get the dir name of this script

```js
console.log(import.meta.dirname);
```

## Get the full path of this script

```js
console.log(import.meta.filename);
```

## Get the file name of this script

```js
import path from 'node:path';

const theFilename = path.basename(import.meta.filename);
console.log(theFilename);
```

## Format date and time

```js
const date = new Date();
const locale = 'en-US';

const yyyy = date.toLocaleDateString(locale, { year: 'numeric' });
const MM = date.toLocaleDateString(locale, { month: '2-digit' });
const dd = date.toLocaleDateString(locale, { day: '2-digit' });

const timeParts = date
  .toLocaleTimeString(locale, {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: '2-digit'
  })
  .split(':');

const [HH, mm, ss] = timeParts;

const allParts = {
  yyyy,
  MM,
  dd,
  HH,
  mm,
  ss
};

console.log(allParts);
```
