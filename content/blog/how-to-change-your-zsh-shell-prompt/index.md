---
title: "How to Change Your Zsh Shell Prompt"
date: 2022-12-02T21:18:06-06:00
toc: false
draft: false
---

I've written about this kind of thing before with [Bash]({{< relref "change-terminal-prompt-on-mac" >}}). Fast forward to now -- I'm setting up a new MacBook Pro for work and the [default shell](https://support.apple.com/en-us/HT208050) for macOS Catalina, and onwards, is zsh.

<!--more-->

I decided to give it a chance. Yes... I'm aware of [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) and all the cool themes. But I'm the weird fella that likes to do things by hand to understand them first, then let myself get fancy. Okay, let's jump in.

The default prompt config lives in the file `/etc/zshrc` as:

```
PS1="%n@%m %1~ %# "
```

Which shows a prompt like this:

```
username@hostname partial_current_dir %
```

I _wanted_ a prompt like this, so that the full current dir and current git branch show, followed by a newline:

```
username@hostname full_current_dir (current_git_branch)
%
```

After a bunch of googling and doc reading, here's what I ended up with. This lives in my `~/.zshrc` file as:

```sh
setopt PROMPT_SUBST

format_current_git_branch() {
  local BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
  if [[ -n ${BRANCH} ]] ; then
    echo "(${BRANCH})"
  fi
}

export NEWLINE=$'\n'

export PROMPT='%n@%m %~ $(format_current_git_branch) ${NEWLINE}%# '
```

Let's break it down:

- `setopt PROMPT_SUBST` -- Copied straight from the [docs](https://zsh.sourceforge.io/Doc/Release/Prompt-Expansion.html): _If the PROMPT_SUBST option is set, the prompt string is first subjected to parameter expansion, command substitution and arithmetic expansion. See [Expansion](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Expansion)_. We need command substitution enabled for the `format_current_git_branch` function
- `format_current_git_branch` -- A custom function that formats the current git branch by wrapping it in parentheses. If the current dir is not a git repo, it doesn't echo anything
- `NEWLINE` -- The `$'\n'` is a way to _delay_ the expansion of the newline per this [answer](https://unix.stackexchange.com/a/126316)
- `PROMPT` -- The actual variable that sets the prompt. `PS1` can also be used. It's important for this value to be wrapped in **single quotes**, not double quotes. Otherwise, the `format_current_git_branch` function will not be called on each Terminal "change", like when you change to a new dir

Bonus: You can make the `full_current_dir` cyan, and the `(current_git_branch)` yellow, by using the zsh text color syntax:

```sh
export PROMPT='%n@%m %F{cyan}%~%F{reset_color} %F{yellow}$(format_current_git_branch)%F{reset_color} ${NEWLINE}%# '
```

Start a color with `%F{cyan}` then reset it with `%F{reset_color}`. See [supported colors](https://stackoverflow.com/a/2534676).

See the [Prompt Expansion docs](https://zsh.sourceforge.io/Doc/Release/Prompt-Expansion.html) for all possible config.
