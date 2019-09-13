---
title: "Run hugo server with custom config options"
date: 2018-10-24T22:58:24-05:00
publishdate: 2018-10-25
draft: false
tags: ["hugo", "command-line"]
toc: false
show_comments: true
---

The idea originally came from this [hugo discussion forum post](https://discourse.gohugo.io/t/help-test-upcoming-hugo-0-50/14880). 

There was a commit (it has since been reverted) that removed the `disableFastRender` flag from the `config.toml` options. So instead of running `hugo server` and it picking up the flag from your config file, you'd now have to run `hugo server --disableFastRender`. 

I figured there had to be a way to alias this command in bash, and of course, there was. After reading through many examples of how others accomplished this with a bash function, the following did the trick for me. 

## Bash Function

For Mac users, add this to your `.bash_profile`. For Linux users, add this to your `.bashrc`. 

```
hugo() {
    if [[ "$@" == server* ]]; then
        options="${@#'server'}"
        command hugo server --disableFastRender "$options"
    else
        command hugo "$@"
    fi
}
```

## Explained

Anytime a command that starts with `hugo` is entered, this function will run:

```
hugo()
```

If the first word after `hugo` is `server`, then go into the `if` block. This way, you could still run something like `hugo new post/server.md` without issue:

```
if [[ "$@" == server* ]]; then
```

Use parameter substitution to remove `server` from the list of options passed in, so that it isn't incorrectly appended to the end of the command:

```
options="${@#'server'}"
```

Run `hugo server` with the `--disableFastRender` flag, then append any additional options passed in. You can add more default options, such as `--buildDrafts` to include content marked as draft, or `--verbose` for verbose output:

```
command hugo server --disableFastRender "$options"
```

If the first word after `hugo` is not `server`, then run the `hugo` command, and any additional options passed in, as usual:

```
command hugo "$@"
```
