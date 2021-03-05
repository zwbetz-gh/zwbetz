---
title: "Aliases in Windows Command Prompt"
date: 2018-03-13T15:54:30-05:00
publishdate: 2018-03-13
draft: false
aliases:
  - /2018/03/aliases-in-windows-command-prompt/
toc: false
show_comments: true
---

Unix-like operating systems make it easy to add command aliases, e.g. adding a line to `.bashrc`, `.bash_profile`, or `.bash_aliases`. But what about Windows command prompt users?

Well, we have [doskey](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/doskey). For example, entering `doskey ls=dir` will allow you to list directories with `ls`. While this is nice, you have to run your doskey commands every time you open command prompt, which... isn't nice. Fortunately, there's a way to load your aliases when command prompt starts up. 

First, create a file to hold your aliases. For example `C:\cmd\aliases.cmd`.

```
@echo off

doskey ls=dir
doskey rr=ruby bin\rails $*
```

Next, create a new shortcut to command prompt. Right-click the shortcut and set the _Target_ to 

```
C:\WINDOWS\system32\cmd.exe /K C:\cmd\aliases.cmd
```

Now when you open command prompt from the shortcut, your aliases will be loaded. 

## Passing args

If you alias a command that you plan to pass arguments too (like `rr` above), place `$*` at the end. This allows the alias to accept zero, one, or more args. 

So instead of typing

```
ruby bin\rails generate model user
```

I can now type

```
rr generate model user
```
