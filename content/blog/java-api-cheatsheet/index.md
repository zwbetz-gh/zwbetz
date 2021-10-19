---
title: "Java API Cheatsheet"
date: 2021-10-17T21:58:46-05:00
toc: true
draft: true
---

While at the hospital for the birth of our second child, I was reading [Java by Comparison](https://pragprog.com/titles/javacomp/java-by-comparison/) and liked their approach. Fast-forward to our last day there, taking a scalding hot shower, I thought, "Hey, it would be cool if there was a cheatsheet on how to do common stuff in Java". The thing you're reading is my go at that.

<!--more-->

## Rules

1. Only the Java API can be used to solve problems. No external libraries allowed
1. All code samples must work with Java 11

## Build it

The samples live at [src/App.java](src/App.java). You can build them with:

```sh
javac src/*.java && java -cp src App
```

## Search list with for loop (linear)

```java
static int searchListWithForLoop(List<String> letters, String letterToFind) {
  for (int i = 0; i < letters.size(); i++) {
    if (letters.get(i).equals(letterToFind)) {
      return i;
    }
  }
  return -1;
}
```

## Search list with int stream (linear)

```java
static int searchListWithIntStream(List<String> letters, String letterToFind) {
  return IntStream.range(0, letters.size())
    .filter(i -> letters.get(i).equals(letterToFind))
    .findFirst()
    .orElse(-1);
}
```

## Search list with binary search

```java
static int searchListWithBinarySearch(List<String> sortedLetters, String letterToFind) {
  return Collections.binarySearch(sortedLetters, letterToFind);
}
```

## Filter list with foreach loop

```java
static List<String> filterListWithForEachLoop(List<String> letters, String letterToExclude) {
  List<String> filtered = new ArrayList<>();
  for (String letter : letters) {
    if (!letter.equals(letterToExclude)) {
      filtered.add(letter);
    }
  }
  return filtered;
}
```

## Filter list with stream

```java
static List<String> filterListWithStream(List<String> letters, String letterToExclude) {
  return letters
    .stream()
    .filter(letter -> !letter.equals(letterToExclude))
    .collect(Collectors.toList());
}
```

## Transform list with foreach loop

```java
static List<String> transformListWithForEachLoop(List<String> letters) {
  List<String> transformed = new ArrayList<>();
  for (String letter : letters) {
    transformed.add(letter.toUpperCase());
  }
  return transformed;
}
```

## Transform list with stream

```java
static List<String> transformListWithStream(List<String> letters) {
  return letters
    .stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());
}
```
