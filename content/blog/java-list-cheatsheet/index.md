---
title: "Java List Cheatsheet"
date: 2021-10-17T21:58:46-05:00
toc: true
draft: false
---

While at the hospital for the birth of our second child, I was reading [Java by Comparison](https://pragprog.com/titles/javacomp/java-by-comparison/), and liked their teaching style. Fast-forward to our last day there, I was taking a quick, scalding-hot shower, and thought, "Hey, it would be cool if there was a cheatsheet on how to do common list operations in Java". The thing you're reading is my go at that.

<!--more-->

## Rules

1. Only the Java API can be used. No external libraries allowed
1. All code samples must work with Java 11

## Run it

These samples are also available in [src/App.java](src/App.java). You can run them with:

```sh
javac App.java && java App
```

## Boilerplate

To reduce boilerplate, the following functions will be used:

```java
static void log(String format, Object... args) {
  System.out.println(String.format(format, args));
}

static List<String> createLetters() {
  return Arrays.asList("a", "b", "c", "c");
}

static List<Integer> createNumbers() {
  return Arrays.asList(1, 2, 3);
}
```

## Linear search a list

```java
List<String> letters = createLetters();

int index = IntStream.range(0, letters.size())
  .filter(i -> letters.get(i).equals("c"))
  .findFirst()
  .orElse(-1);

log("The first index of c in %s is %s", letters, index);
// The first index of c in [a, b, c, c] is 2
```

## Binary search a list

```java
List<String> letters = createLetters();

// Reminder that binarySearch requires a sorted list.
// For this sample, letters is already sorted.
// Collections.sort(letters);

int index = Collections.binarySearch(letters, "c");

log("The first index of c in %s is %s", letters, index);
// The first index of c in [a, b, c, c] is 2
```

## Sort a list

```java
List<String> letters = createLetters();

List<String> reversed = letters
  .stream()
  .sorted(Comparator.reverseOrder())
  .collect(Collectors.toList());

log("When %s is reversed it becomes %s", letters, reversed);
// When [a, b, c, c] is reversed it becomes [c, c, b, a]
```

## Filter a list

```java
List<Integer> numbers = createNumbers();

List<Integer> evenNumbers = numbers
  .stream()
  .filter(number -> number % 2 == 0)
  .collect(Collectors.toList());

log("The even numbers in %s are %s", numbers, evenNumbers);
// The even numbers in [1, 2, 3] are [2]
```

## Transform a list

```java
List<String> letters = createLetters();

List<String> uppercasedLetters = letters
  .stream()
  .map(String::toUpperCase)
  .collect(Collectors.toList());

log("When %s is uppercased it becomes %s", letters, uppercasedLetters);
// When [a, b, c, c] is uppercased it becomes [A, B, C, C]
```

## Remove duplicate values from a list

```java
List<String> letters = createLetters();

List<String> uniqueLetters = letters
  .stream()
  .distinct()
  .collect(Collectors.toList());

log("These are duplicated %s but these are unique %s", letters, uniqueLetters);
// These are duplicated [a, b, c, c] but these are unique [a, b, c]
```

## Count how many times a value appears in a list

```java
List<String> letters = createLetters();

 long count = letters
  .stream()
  .filter(letter -> letter.equals("c"))
  .count();

log("%s appears %s times in %s", "c", count, letters);
// c appears 2 times in [a, b, c, c]
```

## Sum a list

```java
List<Integer> numbers = createNumbers();

int sum = numbers
  .stream()
  .reduce(0, Integer::sum);

log("The sum of %s is %s", numbers, sum);
// The sum of [1, 2, 3] is 6
```

## Find the max value in a list

```java
List<Integer> numbers = createNumbers();

int max = numbers
  .stream()
  .mapToInt(Integer::valueOf)
  .max()
  .orElseThrow();

log("The max of %s is %s", numbers, max);
// The max of [1, 2, 3] is 3
```

## Find the min value in a list

```java
List<Integer> numbers = createNumbers();

int min = numbers
  .stream()
  .mapToInt(Integer::valueOf)
  .min()
  .orElseThrow();

log("The min of %s is %s", numbers, min);
// The min of [1, 2, 3] is 1
```

## Does any list value meet the condition?

```java
List<Integer> numbers = createNumbers();

boolean result = numbers
  .stream()
  .anyMatch(number -> number % 2 == 0);

log("Some numbers in %s are even? %s", numbers, result);
// Some numbers in [1, 2, 3] are even? true
```

## Do all list values meet the condition?

```java
List<Integer> numbers = createNumbers();

boolean result = numbers
  .stream()
  .allMatch(number -> number % 2 == 0);

log("All numbers in %s are even? %s", numbers, result);
// All numbers in [1, 2, 3] are even? false
```
