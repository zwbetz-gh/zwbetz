---
title: "Apache Groovy Tidbits"
date: 2022-02-04T20:05:47-06:00
toc: true
draft: false
---

Lately I've been dabbling in [JSL (Jenkins Shared Libraries)](https://www.jenkins.io/doc/book/pipeline/shared-libraries/). The JSL is usually written in Groovy, so I thought it'd be interesting to read the [Groovy Language Documentation](https://docs.groovy-lang.org/docs/groovy-3.0.9/html/documentation/). Here are some of the tidbits I learned:

<!--more-->

## List Literal

An empty list:

```groovy
def list = []
```

A populated list:

```groovy
def list = ['a', 'b']
```

## Map Literal

An empty map:

```groovy
def map = [:]
```

A populated map:

```groovy
def map = [firstName: 'Jane', lastName: 'Doe']
```

## Spread List Elements

```groovy
def list1 = ['a', 'b']
def list2 = ['c', 'd']
def list3 = [*list1, *list2]

assert ['a', 'b', 'c', 'd'] == list3
```

## Spread Map Elements

```groovy
def map1 = [firstName: 'Jane']
def map2 = [lastName: 'Doe']
def map3 = [*:map1, *:map2]

assert [firstName: 'Jane', lastName: 'Doe'] == map3
```

## Expando

From the docs:

> The `Expando` class can be used to create a dynamically expandable object.

You can add any field or method you want:

```groovy
def expando = new Expando();

expando.name = 'Jane'
expando.add = { a, b -> a + b}

assert 'Jane' == expando.name
assert 4 == expando.add(2, 2)
```

## Elvis Operator

It's like a shortened ternary when you want a sensible default.

This:

```groovy
def map = [:]

assert 'Unknown' == map.name ? map.name : 'Unknown'
```

Is the same as this:

```groovy
def map = [:]

assert 'Unknown' == map.name ?: 'Unknown'
```

## Safe Navigation Operator

This throws a `NullPointerException`:

```groovy
def map = null

assert null == map.name
```

This doesn't:

```groovy
def map = null

assert null == map?.name
```

## Safe Index Operator

This throws a `NullPointerException`:

```groovy
def list = null

assert null == list[0]
```

This doesn't:

```groovy
def list = null

assert null == list?[0]
```

## Truth

Use `!!` (bang bang boolean) to coerce an expression to a boolean:

```groovy
assert false == !! []
assert false == !! [:]
assert false == !! 0
assert false == !! ''
assert false == !! null

assert true == !! ['a', 'b']
assert true == !! [firstName: 'Jane']
assert true == !! 1
assert true == !! 'Jane'
assert true == !! new Expando()
```
