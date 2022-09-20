---
title: "Bash Shell Scripting for Developers"
date: 2022-09-17T10:13:17-05:00
toc: true
draft: true
---

SUMMARY

<!--more-->

## Assumptions

## Data Structures and Types

> Everything is a string, until it's not.

### String

### Number

### Array

## Control Flow

### If Statement

```bash
if [[ expression ]] ; then
  # Do something if expression is true
fi
```

### If Else Statement

If-Else:

```bash
if [[ expression ]] ; then
  # Do something if expression is true
else
  # Do something if expression is false
fi
```

### If Elif Else Statement

```bash
if [[ expression1 ]] ; then
  # Do something if expression1 is true
elif [[ expression2 ]] ; then
  # Do something if expression2 is true
else
  # Do something if neither of the expressions are true
fi
```

### Switch Statement

## Loops and Iteration

## Functions

## Expressions and Operators

## Error Handling

## References

- [GNU Bash Reference Manual](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html) - The official Bash Manual. It's worth the read on a rainy day
- [Pure Bash Bible](https://github.com/dylanaraps/pure-bash-bible) - This gentlemen pushed Bash to its limits when developing [neofetch](https://github.com/dylanaraps/neofetch). He summarized his learnings in this nice repo. Warning: Some snippets require Bash version 4 or higher
