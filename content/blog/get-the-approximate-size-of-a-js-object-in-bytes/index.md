---
title: "Get the Approximate Size of a JavaScript Object in Bytes"
date: 2021-04-06T20:33:43-05:00
toc: false
---

Sure, I can look at the Chrome DevTools Network tab to see the size of a resource. But what if I wanted to get the approximate size of a JS object programmatically? Well, it can be done. See the following:

## JavaScript

```js
const getSizeInBytes = (obj) => {
  let str = null;
  if (typeof obj === 'string') {
    // If obj is a string, then use it
    str = obj;
  } else {
    // Else, make obj into a string
    str = JSON.stringify(obj);
  }
  // Get the length of the Uint8Array
  const bytes = new TextEncoder().encode(str).length;
  return bytes;
};

const logSizeInBytes = (description, obj) => {
  const bytes = getSizeInBytes(obj);
  console.log(`${description} is approximately ${bytes} bytes`);
};

const logSizeInKilobytes = (description, obj) => {
  const bytes = getSizeInBytes(obj);
  const kb = (bytes / 1000).toFixed(2);
  console.log(`${description} is approximately ${kb} kb`);
};
```

## Usage

```js
const str = 'foo';

const obj = {
  name: 'Jane',
  age: 28,
  dateOfBirth: '1992-12-01',
};

logSizeInBytes('str', str);
// => str is approximately 3 bytes

logSizeInBytes('obj', obj);
// => obj is approximately 51 bytes

logSizeInKilobytes('obj', obj);
// => obj is approximately 0.05 kb
```

## Notes

When writing this post, I fell into the rabbit hole of whether 1000 or 1024 bytes are in a kilobyte (or should I say _kibibyte_ ...). Mr. Atwood has a nice [summary](https://blog.codinghorror.com/gigabyte-decimal-vs-binary/).
