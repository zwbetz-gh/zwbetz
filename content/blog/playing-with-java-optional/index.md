---
title: "Playing With Java Optional"
date: 2021-10-01T00:08:29-05:00
toc: false
---

`Optional` has been around since Java 8. And while I've heard of this magic box for some time, I've only recently explored it in-depth.

I stumbled upon the video [Optional - The Mother of All Bikesheds by Stuart Marks](https://youtu.be/Ej0sss6cq14) and quite liked it. I'll adapt some of Stuart's snippets in this post to give a gentle introduction.

<!--more-->

Okay, let's write a method that gets an animal name by id. It'll accept a list of animals and the id to search on. It should always returns a string: either the animal name, or unknown.

## Sister Links

- <https://github.com/zwbetz-gh/playing-with-java-optional>

## Attempt 1

Imperative style with a trusty foreach loop.

```java
private String getAnimalNameById(List<Animal> animals, Integer id) {
  for (Animal animal : animals) {
    if (animal.getId().equals(id)) {
      return animal.getName();
    }
  }

  return "unknown";
}
```

## Attempt 2

Now we're getting our feet wet with `Optional`. But the `isPresent()` check isn't much better than a plain `null` check. Let's improve it.

```java
private String getAnimalNameById(List<Animal> animals, Integer id) {
  Optional<Animal> animal = animals
    .stream()
    .filter(a -> a.getId().equals(id))
    .findFirst();

  return animal.isPresent() ? animal.get().getName() : "unknown";
}
```

## Attempt 3

Cool, now we're using `map()` which will transform the value if it's present. Then, we use `orElse()` which will return the value if present, otherwise it'll return our fallback value. We can still improve it though.

```java
private String getAnimalNameById(List<Animal> animals, Integer id) {
  Optional<Animal> animal = animals
    .stream()
    .filter(a -> a.getId().equals(id))
    .findFirst();

  return animal.map(Animal::getName).orElse("unknown");
}
```
## Attempt 4

Nice, I like the way this reads. Now all of our work is done via method chaining.

```java
private String getAnimalNameById(List<Animal> animals, Integer id) {
  return animals
    .stream()
    .filter(a -> a.getId().equals(id))
    .findFirst()
    .map(Animal::getName)
    .orElse("unknown");
}
```
