---
title: "JavaScript Array vs Java List: Common Actions"
date: 2021-05-02T22:16:39-05:00
toc: true
---

I've found myself doing more Java-related work lately (project duty calls). So, with JS being as friendly as it is, thought it'd be fun to write a little comparison post.

<!--more-->

The Java language sometimes gets a bad rap for being verbose. And look, I get it, it's not my first pick. Yet, it's not so bad. Things have come a long way over the years. (And who can argue with Java's maturity). Just to prove it, checkout these common actions.

## Sister Links

<https://github.com/zwbetz-gh/javascript-array-vs-java-list-common-actions>

## For Each

JavaScript:
```js
test('forEach', () => {
  const arr = [1, 2, 3];
  arr.forEach((el) => console.log(el));
});
```

Java:
```java
@Test
void forEach() {
  List<Integer> list = List.of(1, 2, 3);
  list.forEach(System.out::println);
}
```

## Filter

JavaScript:
```js
test('filter', () => {
  const arr = [1, 2, 3];
  const actual = arr.filter((el) => el === 3);
  const expected = [3];
  expect(actual).toEqual(expected);
});
```

Java:
```java
@Test
void filter() {
  List<Integer> list = List.of(1, 2, 3);
  List<Integer> actual = list
    .stream()
    .filter(el -> el == 3)
    .collect(toList());
  List<Integer> expected = List.of(3);
  assertEquals(expected, actual);
}
```

## Map

JavaScript:
```js
test('map', () => {
  const arr = [1, 2, 3];
  const actual = arr.map((el) => el * 2);
  const expected = [2, 4, 6];
  expect(actual).toEqual(expected);
});
```

Java:
```java
@Test
void map() {
  List<Integer> list = List.of(1, 2, 3);
  List<Integer> actual = list
    .stream()
    .map(el -> el * 2)
    .collect(toList());
  List<Integer> expected = List.of(2, 4, 6);
  assertEquals(expected, actual);
}
```

## Reduce

JavaScript:
```js
test('reduce', () => {
  const arr = [1, 2, 3];
  const actual = arr.reduce((subtotal, el) => subtotal + el);
  const expected = 6;
  expect(actual).toEqual(expected);
});
```

Java:
```java
@Test
void reduce() {
  List<Integer> list = List.of(1, 2, 3);
  int actual = list
    .stream()
    .reduce(0, (subtotal, el) -> subtotal + el);
  int expected = 6;
  assertEquals(expected, actual);
}
```


## Some or Any Match

JavaScript:
```js
test('some', () => {
  const arr = [1, 2, 3];
  const actual = arr.some((el) => el === 3);
  const expected = true;
  expect(actual).toEqual(expected);
});
```

Java:
```java
@Test
void anyMatch() {
  List<Integer> list = List.of(1, 2, 3);
  boolean actual = list
    .stream()
    .anyMatch(el -> el == 3);
  boolean expected = true;
  assertEquals(expected, actual);
}
```

## Every or All Match

JavaScript:
```js
test('every', () => {
  const arr = [1, 2, 3];
  const actual = arr.every((el) => el === 3);
  const expected = false;
  expect(actual).toEqual(expected);
});
```

Java:
```java
@Test
void allMatch() {
  List<Integer> list = List.of(1, 2, 3);
  boolean actual = list
    .stream()
    .allMatch(el -> el == 3);
  boolean expected = false;
  assertEquals(expected, actual);
}
```
