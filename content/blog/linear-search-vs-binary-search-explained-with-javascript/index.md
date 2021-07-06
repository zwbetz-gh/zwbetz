---
title: "Linear Search vs Binary Search: Explained With JavaScript"
date: 2021-07-05T22:44:13-05:00
toc: true
---

How's that Latin proverb go again? "By teaching, we learn".

<!--more-->

## Sample Problem

Write a function that accepts a sorted array and an item to find. The function should return an object with the found index and the number of iterations taken. If the item is not found, the index should be set to -1.

## Linear Search

```js
const linearSearch = (sortedArr, item) => {
  let iterations = 0;

  for (let i = 0; i < sortedArr.length; i++) {
    iterations++;

    if (item === sortedArr[i]) {
      return {index: i, iterations};
    }
  }

  return {index: -1, iterations};
};
```

## Binary Search

```js
const binarySearch = (sortedArr, item) => {
  let iterations = 0;
  let low = 0;
  let high = sortedArr.length - 1;

  while (low <= high) {
    iterations++;
    const middle = Math.floor((low + high) / 2);
    const guess = sortedArr[middle];

    if (guess === item) {
      return {index: middle, iterations};
    } else if (guess > item) {
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }

  return {index: -1, iterations};
};
```

## Usage

```js
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

console.log(linearSearch(alphabet, 'z'));
// => { index: 25, iterations: 26 }

console.log(binarySearch(alphabet, 'z'));
// => { index: 25, iterations: 5 }
```

## Explained

Linear search must check every item:

- Is it a? No
- Is it b? No
- ...
- Is it z? Yes

So, if the item to be found is the last item in the array, then the **whole** array must be iterated.

Contrast this with binary search:

- Range of a-z. Is it m? No
- Range of n-z. Is it t? No
- Range of u-z. Is it w? No
- Range of x-z. Is it y? No
- Range of z-z. Is it z? Yes

On each iteration we guess the middle item. If it's not the middle item, then we narrow our search to **half** of the list items. Since the list is sorted, if our guess is too high, then we search the bottom half, and if our guess is too low, then we search the top half. Rinse and repeat.

## Hammer it Home

The difference is even more apparent as the array size grows. For an array with 1 million items, linear search takes, well, 1 million iterations, while binary search only takes 20 ...

```js
const bigArr = [];

for (let i = 1; i <= 1_000_000; i++) {
  bigArr.push(i);
}

console.log(linearSearch(bigArr, 1_000_000));
// => { index: 999999, iterations: 1000000 }

console.log(binarySearch(bigArr, 1_000_000));
// => { index: 999999, iterations: 20 }
```
