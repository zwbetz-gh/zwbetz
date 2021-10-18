---
title: "Java API Reference"
date: 2021-10-17T21:58:46-05:00
toc: true
draft: true
---

While at the hospital for the birth of our second child, I was reading [Java by Comparison](https://pragprog.com/titles/javacomp/java-by-comparison/) and liked how they taught using "okay" vs "better" code samples, hence the book title. On our last day there, taking a scalding hot shower, I thought, "Hey, it would be cool if there was a cheatsheet on how to do common stuff in Java". The thing you're reading is my go at that.

<!--more-->

## Rules

1. Only the Java API can be used to solve problems. No external libraries allowed
1. All code samples must work with Java 11

## Build it

The samples live at [src/App.java](src/App.java). You can build them with:

```sh
javac src/*.java && java -cp src App
```

## Search a List

Write a method that accepts a list and an element to find. If the element is found, return its index. Otherwise, return `-1`.

Given list `["a", "b", "c"]` and element to find `"c"` then the method should return index `2`.

### Linear Search via for Loop

```java
int searchList(List<String> letters, String letterToFind) {
  for (int i = 0; i < letters.size(); i++) {
    if (letters.get(i).equals(letterToFind)) {
      return i;
    }
  }
  return -1;
}
```

### Linear Search via IntStream

```java
int searchList(List<String> letters, String letterToFind) {
  return IntStream.range(0, letters.size())
    .filter(i -> letters.get(i).equals(letterToFind))
    .findFirst()
    .orElse(-1);
}
```

### Binary Search

```java
int searchList(List<String> sortedLetters, String letterToFind) {
  int i = Collections.binarySearch(sortedLetters, letterToFind);
  return i >= 0 ? i : -1;
}
```

## Filter a List

Write a method that accepts a list and an element to exclude. Return the filtered list.

Given list `["a", "b", "c"]` and element to exclude `"c"` then the method should return list `["a", "b"]`.

### Filter List via Iterator

```java
List<String> filterList(List<String> letters, String letterToExclude) {
  String[] lettersArray = (String[]) letters.toArray(String[]::new);
  List<String> lettersCopy = new ArrayList<String>(Arrays.asList(lettersArray));
  Iterator<String> iterator = lettersCopy.iterator();
  while (iterator.hasNext()) {
    String letter = iterator.next();
    if (letter.equals(letterToExclude)) {
      iterator.remove();
    }
  }
  return lettersCopy;
}
```

### Filter List via Stream

```java
List<String> filterList(List<String> letters, String letterToExclude) {
  return letters
    .stream()
    .filter(letter -> !letter.equals(letterToExclude))
    .collect(Collectors.toList());
}
```
