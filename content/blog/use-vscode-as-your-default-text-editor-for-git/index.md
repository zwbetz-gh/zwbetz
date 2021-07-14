---
title: "Use Visual Studio Code as Your Default Text Editor for Git"
date: 2018-10-24T14:49:17-05:00
publishdate: 2018-10-24
draft: false
toc: false
---

Single-line commit messages in git are easy from the command line:

```
git commit -m "<SOME_MESSAGE>"
```

But what about multi-line commit messages?

<!--more-->

If you're comfortable with vi, which is what git uses by default when you run `git commit`, then that's fine. But I prefer to use a GUI text editor such as [vscode](https://code.visualstudio.com/).

I stumbled upon this [stackoverflow thread](https://stackoverflow.com/questions/30024353/how-to-use-visual-studio-code-as-default-editor-for-git) recently that did just what I needed. I've consolidated the top answer and relevant comments.

This line will make git use vscode as the default text editor. The `--wait` option will wait for the vscode window to be closed before returning control to the command line.

```
git config --global core.editor "code --wait"
```

Then, use this snippet to edit your global config settings in vscode.

```
git config --global -e
```
