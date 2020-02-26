---
title: "By value vs by reference in JavaScript"
date: 2020-02-25T00:00:00-05:00
tags: [javascript]
toc: false
show_comments: false
---

Was having a fun debate with my cubicle mate the other day on what happens when you declare a variable with `const` and then assign its value to something else. I said that a plain assignment would copy it by reference, not by value. My words only go so far, so had to whip up a quick example. Maybe you knew this already about JavaScript, but if not, TYL (today you learned?).

```js
const mom = {
  name: 'Jane',
};

const son = {
  momByReference: mom,
  momByValue: {...mom},
};

console.log(son.momByReference);
// { name: 'Jane' }

console.log(son.momByValue);
// { name: 'Jane' }

mom.name = 'Susy';

console.log(son.momByReference);
// { name: 'Susy' }

console.log(son.momByValue);
// { name: 'Jane' }
```

Other ways to assign by value (aka clone):

```js
const mom = {
  name: 'Jane',
};

// shallow clone
const way1 = {...mom};

// shallow clone
const way2 = Object.assign({}, mom);

// deep clone
const way3 = JSON.parse(JSON.stringify(mom));
```
