---
title: "Bash Reference"
date: 2021-04-04T00:32:44-05:00
toc: false
draft: true
---

A mirror of [Bash Reference Manual | 6.4 Bash Conditional Expressions](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Bash-Conditional-Expressions), with other gems sprinkled in.

| Task | Syntax |
| --- | --- |
| Shebang | `#!/usr/bin/env bash` |
| True if `file` exists | `-a file` |
| True if `file` exists and is a block special file | `-b file` |
| True if `file` exists and is a character special file | `-c file` |
| True if `file` exists and is a directory | `-d file` |
| True if `file` exists | `-e file` |
| True if `file` exists and is a regular file | `-f file` |
| True if `file` exists and its set-group-id bit is set | `-g file` |
| True if `file` exists and is a symbolic link | `-h file` |
| True if `file` exists and its "sticky" bit is set | `-k file` |
| True if `file` exists and is a named pipe (FIFO) | `-p file` |
| True if `file` exists and is readable | `-r file` |
| True if `file` exists and has a size greater than zero | `-s file` |
| True if `file` descriptor `fd` is open and refers to a terminal | `-t fd` |
| True if `file` exists and its set-user-id bit is set | `-u file` |
| True if `file` exists and is writable | `-w file` |
| True if `file` exists and is executable | `-x file` |
| True if `file` exists and is owned by the effective group id | `-G file` |
| True if `file` exists and is a symbolic link | `-L file` |
| True if `file` exists and has been modified since it was last read | `-N file` |
| True if `file` exists and is owned by the effective user id | `-O file` |
| True if `file` exists and is a socket | `-S file` |
| True if `file1` and `file2` refer to the same device and inode numbers | `file1 -ef file2` |
| True if `file1` has newer mod date than `file2`, or if `file1` exists and `file2` does not | `file1 -nt file2` |
| True if `file1` has older mod date than `file2`, or if `file2` exists and `file1` does not | `file1 -ot file2` |
| True if the shell option optname is enabled. See [The Set Builtin](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#The-Set-Builtin) | `-o optname` |
| True if the shell variable varname is set (has been assigned a value) | `-v varname` |
| True if the shell variable varname is set and is a name reference | `-R varname` |
| True if the length of string is zero | `-z string` |
| True if the length of string is non-zero | `-n string` |
| True if the strings are equal | `string1 == string2` |
| True if the strings are not equal | `string1 != string2` |
| True if `string1` sorts before `string2` lexicographically | `string1 < string2` |
| True if `string1` sorts after `string2` lexicographically | `string1 > string2` |
| `OP` is one of `-eq`, `-ne`, `-lt`, `-le`, `-gt`, `-ge` | `arg1 OP arg2` |
| TODO | `TODO` |
| TODO | `TODO` |
| TODO | `TODO` |
| TODO | `TODO` |
| TODO | `TODO` |
| TODO | `TODO` |
| TODO | `TODO` |
