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

Once completed, if you've learned enough to be dangerous, I'm satisfied. You can always use the [references](#references) to dive deeper. Plus, you'll know the right keywords to improve your google-fu.

Okay, let's go!

## 2. Prerequisites

### 2.1 Text Editor

You'll need a text editor. If you already use one, great. Otherwise, I recommend [Visual Studio Code](https://code.visualstudio.com/).

### 2.2 Bash Version

Code from this tutorial is compatible with Bash version `3.2.x` and higher. Bash is currently on version `5.x`, so, why limit ourselves to an earlier version?

Because, allegedly, Apple. Bash version `4.x` switched to the GPLv3 license, and some folks on the interwebs [suspect](https://apple.stackexchange.com/a/197172) this makes it legally complicated for Apple to update Bash.

So, why should you care? Well, if you're a Mac user, and you haven't manually updated Bash, then it's very likely at version `3.2.x`. You can check by running `bash --version`. Nothing like a limitation to get the creative juices flowing!

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

    echo "Hello world :)"
    ```
1. Execute it by running:
    ```
    ./hello_world.sh
    ```

Expected output:

```
$ ./hello_world.sh
Hello world :)
```

### 3.2 Naming

Notice how we named the script. Everything before the extension, `hello_world`, is lowercase, separated by underscores. We call this [snake_case](https://en.wikipedia.org/wiki/Snake_case). We could've used [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case) or [camelCase](https://en.wikipedia.org/wiki/Camel_case). But I prefer snake_case.

The extension, `.sh`, needs a bit of explanation. The predecessor to Bash was a shell called `sh`, or [Bourne shell](https://en.wikipedia.org/wiki/Bourne_shell). The name [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) is a play on that:

{{< blockquote author="Wikipedia" >}}
The shell's name is an acronym for Bourne Again Shell, a pun on the name of the Bourne shell that it replaces and the notion of being "born again".
{{< /blockquote >}}

### 3.3 File Permissions

What's the deal with that `chmod 755 hello_world.sh` command? In a nutshell, we needed to make the file executable, otherwise we wouldn't be able to execute, or run, the script.

A deep dive into [chmod](https://www.linode.com/docs/guides/modify-file-permissions-with-chmod/) is outside the scope of this tutorial. But, here's the gist:

{{< table >}}
| Octal | Who? | Meaning |
| --- | --- | --- |
| `7` | User | The current user (you) can read, write, and execute the file |
| `5` | Group | The group can read and execute, but not write, the file |
| `5` | Global | Everyone else can read and execute, but not write, the file |
{{< /table >}}

### 3.4 Shebang

What's the `#!/usr/bin/env bash` at the top of the file?

We call the `#!` a [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)).

The part that follows, `/usr/bin/env bash`, is called the interpretor.

In a nutshell, when you execute the script, it tells your computer how to "interpret" it. Which, in our case, is via `bash`.

You'll likely see another variant in the wild: `#!/bin/bash`. Though, my preference is `#!/usr/bin/env bash`.

Unfortunately, much [bikeshedding](https://en.wikipedia.org/wiki/Law_of_triviality) has been spent on this. So, don't die on this hill. Either way will do.

Let's breakdown the differences.

#### 3.4.1 Find the First Bash on the PATH

```bash
#!/usr/bin/env bash
```

This way will execute the script with the first `bash` found on the `PATH`. It's useful when someone has installed a higher version of Bash and you'd like to target it. And, even if they only have the default installation at `/bin/bash`, it still works.

#### 3.4.2 Absolute Path to Bash

```bash
#!/bin/bash
```

This way will execute the script using `bash` at the absolute path `/bin/bash`.

### 3.5 Local vs PATH

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
