---
title: "Shell Config File on Mac"
date: 2022-02-28T20:11:07-06:00
toc: false
draft: false
---

When writing about tool installation or environment setup on Mac, I often need to mention shell config files. So, instead of doing that each time, I'm going to (hopefully) write about it once, then reference it as needed.

<!--more-->

## Which Shell Am I Currently Running?

[Starting with Catalina, zsh is the default shell](https://support.apple.com/en-us/HT208050).

You can check which shell you're currently running with the below command.

```
ps -p $$
```

**Explained:** `ps` is a tool for checking the status of a process. The `-p` option accepts a comma-separated list of process ids. `$$` is a special variable that holds the process id of the currently running shell.

## Which Config File Should I Use?

**On Mac, the Terminal app defaults to a login shell**. So, assuming you haven't messed with the Terminal settings, you can make changes to the login config file, then expect those changes to show up in new Terminal windows or tabs.

**Note:** If the login config file for your shell doesn't yet exist, **create it**.

## Reference

{{< table >}}
| Shell | Location | Login Config File | Interactive Config File |
| --- | --- | --- | --- |
| Bash | `/bin/bash` | `~/.bash_profile` | `~/.bashrc` |
| Zsh | `/bin/zsh` | `~/.zprofile` | `~/.zshrc` |
{{< /table >}}

[Read more about login vs interactive config files](https://apple.stackexchange.com/questions/51036/what-is-the-difference-between-bash-profile-and-bashrc).
