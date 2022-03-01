---
title: "Shell Config File on Mac"
date: 2022-02-28T20:11:07-06:00
toc: false
draft: false
---

When writing about things like tool installation or environment setup on Mac, I often need to mention shell config files. So, instead of doing that each time, I'm going to (hopefully) write about it once, then reference it as needed.

<!--more-->

## Which Shell Am I Currently Running?

[Starting with Catalina](https://support.apple.com/en-us/HT208050), Zsh is the default shell. (You can change it back to Bash if you like).

You can check which shell you're currently running with the below command [^explained].

```
ps -p $$
```

## Which Config File Should I Use?

**On Mac, the Terminal app defaults to a login shell** [^login_vs_interactive]. So, assuming you haven't messed with the Terminal settings, **you can make changes to the login config file**, then expect those changes to show up in new Terminal windows or tabs.

**Note:** If the login config file for your shell doesn't yet exist, **create it**.

## Reference

{{< table >}}
| Shell | Location | Login Config File | Interactive Config File |
| --- | --- | --- | --- |
| Bash | `/bin/bash` | `${HOME}/.bash_profile` | `${HOME}/.bashrc` |
| Zsh | `/bin/zsh` | `${HOME}/.zprofile` | `${HOME}/.zshrc` |
{{< /table >}}

[^explained]: Explained: `ps` is a tool for checking the status of a process. The `-p` option accepts a comma-separated list of process ids. `$$` is a special variable that holds the process id of the currently running shell.

[^login_vs_interactive]: Read more about [login vs interactive config files](https://apple.stackexchange.com/questions/51036/what-is-the-difference-between-bash-profile-and-bashrc).
