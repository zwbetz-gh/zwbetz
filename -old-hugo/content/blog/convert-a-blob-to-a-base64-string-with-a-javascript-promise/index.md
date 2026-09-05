---
title: "Convert a Blob to a Base64 String With a JavaScript Promise"
date: 2021-06-23T21:51:52-05:00
toc: false
---

Sometimes you need to do this in the browser. Here's how.

<!--more-->

## Function

```js
const convertBlobToBase64Async = (blob, mimeType) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrlPrefix = `data:${mimeType};base64,`;
      const base64WithDataUrlPrefix = reader.result;
      const base64 = base64WithDataUrlPrefix.replace(dataUrlPrefix, '');
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
```

## Usage

```js
const obj = { hello: 'world' };
const mimeType = 'application/json';
const blob = new Blob([JSON.stringify(obj, null, 2)], { type: mimeType });

// With await ...
const base64 = await convertBlobToBase64Async(blob, mimeType);
console.log(base64);
// Outputs: ewogICJoZWxsbyI6ICJ3b3JsZCIKfQ==

// With Promise.prototype.then() ...
convertBlobToBase64Async(blob, mimeType).then((base64) => {
  console.log(base64);
  // Outputs: ewogICJoZWxsbyI6ICJ3b3JsZCIKfQ==
});
```

## References

- [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
