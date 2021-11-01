---
title: "Get Your Feet Wet With Java Parallel Streams"
date: 2021-10-28T09:21:37-05:00
toc: true
---

Parallelism in Java can be spooky, but it doesn't have to be. Let's see how streams look when they're not sequential.

<!--more-->

## Run it

These samples are also available in [src/App.java](src/App.java). You can run them with:

```sh
javac App.java && java App
```

## Boilerplate

To reduce boilerplate, the following functions will be used. You can see their definitions in [src/App.java](src/App.java).

- `log` -- an easy logger
- `sleep` -- sleep the current thread
- `time` -- time a function
- `logAvailableProcessors` -- log available processors
- `logCommonPoolParallelism` -- log available threads from the ForkJoinPool

## Sequential Streams

Let's start with a list of numbers:

```java
static List<Integer> createNumbers() {
  return Arrays.asList(1, 2, 3);
}
```

Then let's simulate a costly mapper. We'll log the current thread name, sleep for 1 second, then multiply the arg by 1 just for kicks.

```java
static Integer costlyMapper(Integer i) {
  log("costlyMapper | val: %s | thread: %s", i, Thread.currentThread().getName());
  sleep(1000);
  return i * 1;
}
```

Then let's use a stream to call our costly mapper and get the sum of the numbers. A stream is sequential by default, I just tacked on `sequential()` here to make it explicit.

```java
static void sumSequential() {
  int sum = createNumbers()
    .stream()
    .sequential()
    .mapToInt(App::costlyMapper)
    .sum();
  log("Sum: %s", sum);
}
```

What do you think will happen when timing the function?

```java
time("sumSequential", App::sumSequential);
```

Which thread(s) will be used? How long will it take?

Note that:

- The main thread was used
- It took about 3 seconds
- The stream pipeline honored the order of the list elements

```
Started sumSequential
costlyMapper | val: 1 | thread: main
costlyMapper | val: 2 | thread: main
costlyMapper | val: 3 | thread: main
Sum: 6
Completed sumSequential in 3.01 second(s)
```

## Parallel Streams

Okay, now onto the main event. This is what you came for, right?

Let's sum the numbers again, but this time, in parallel:

```java
static void sumParallel() {
  int sum = createNumbers()
    .stream()
    .parallel()
    .mapToInt(App::costlyMapper)
    .sum();
    log("Sum: %s", sum);
}
```

Then time it:

```java
time("sumParallel", App::sumParallel);
```

Again: Which thread(s) will be used? How long will it take?

Note that:

- The main thread was used, along with threads from the ForkJoinPool
- It took about 1 second! 🔥
- The stream pipeline did **not** honor the order of the list elements

```
Started sumParallel
costlyMapper | val: 2 | thread: main
costlyMapper | val: 3 | thread: ForkJoinPool.commonPool-worker-5
costlyMapper | val: 1 | thread: ForkJoinPool.commonPool-worker-19
Sum: 6
Completed sumParallel in 1.01 second(s)
```

There are 3 elements in the list, so 3 threads were used during the parallel run.

Let's compare the available processors on my current machine to the available threads for parallelism.

```java
logAvailableProcessors();
```

This outputs:

```
Available processors: 12
```

So, this means there must be 12 available threads, right?

```java
logCommonPoolParallelism();
```

The answer may surprise you:

```
Common pool parallelism: 11
```

11 threads? What?! Did they short us? Nope. The _missing_ thread is actually the main thread.

I hope this little exploration gave you more confidence with parallel streams. See the below references for deeper dives as well as Do's and Don'ts. Happy computing.

## References

- This most excellent [talk](https://youtu.be/0hQvWIdwnw4) by Venkat Subramaniam. I've yet to listen to a talk by Venkat that did not keep my attention
- The Java tutorials on [parallelism](https://docs.oracle.com/javase/tutorial/collections/streams/parallelism.html)
- The [BaseStream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/BaseStream.html) and [Stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html) docs
- The [ForkJoinPool](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ForkJoinPool.html) docs
