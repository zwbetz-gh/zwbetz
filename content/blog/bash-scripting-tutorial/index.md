---
title: "Bash Scripting Tutorial"
date: 2022-01-15T21:57:44-06:00
toc: true
draft: true
summary: "Shell scripts are the glue of the software world. If you work in tech, you've likely ran some, maybe read some, and maybe even written some."
---

## 1. Preface

Shell scripts are the glue of the software world. If you work in tech, you've likely ran some, maybe read some, and maybe even written some.

As for preference, my shell of choice is Bash. Why? It's installed on virtually every machine. It's mature (created in 1989). And there are many examples in the wild to learn from.

Bash tutorials exist. So, why create another one? Well, I've yet to read one that has the right mix of theory + application + relevance. I aim to remedy that.

Once completed, if you've learned enough to become dangerous, I'm satisfied. You can always use the [references](#references) to dive deeper. Plus, you'll know the right keywords to improve your google-fu.

Okay, let's go!

## 2. Prerequisites

- You'll need a text editor. If you already use one, great. If not, I recommend [Visual Studio Code](https://code.visualstudio.com/).
- Command-line experience is nice to have, but not required.
- Code from this tutorial is compatible with Bash version `3.2.x` and higher. Bash is currently on version `5.x`, so, why limit ourselves to an earlier version? Because, allegedly, Apple. Long story short, Bash version `4.x` switched to the GPLv3 license, and some folks on the interwebs [suspect](https://apple.stackexchange.com/a/197172) this makes it (legally) complicated for Apple to update Bash. So, why should you care? Well, if you're a Mac user, and you haven't manually updated Bash, then it's very likely at version `3.2.x`. You can check by running `bash --version`. Nothing like a limitation to get the creativity juices flowing!

## 3. Intro

### 3.1 Hello World

Okay, enough talk, let's write our first script. Do these steps, then we'll breakdown what's happening.

1. Create a file named `hello_world.sh`
1. Make it executable by running:
    ```
    chmod 755 hello_world.sh
    ```
1. Add the following contents:
    ```bash
    #!/usr/bin/env bash

    echo "Hello world"
    ```
1. Execute it by running:
    ```
    ./hello_world.sh
    ```

Expected output:

```
$ ./hello_world.sh
Hello world
```

### 3.2 Breakdown

Naming convention: Lowercase underscores
Why .sh ext?
Make it executable
What does chmod 755 mean?
Why ./ vs PATH
Shebang variants

## Variables

Quoting
Saving command output (substitution)
Special variables

## Control Flow

If statements
test vs [ vs [[
Integer comparison operators
String comparison operators
Logical operators
File testing
Case statements
Command exit code

## Loops

Loops:
Arrays

## Functions

Local scope
Return code

## Input

Prompts
Parsing positional arguments
Parsing options

## Math

## Error Handling

set -e
Trap

## Recipes

Loop a file line by line
Check for required programs

## References

gnu ref
google style
bash bible
Shellcheck
