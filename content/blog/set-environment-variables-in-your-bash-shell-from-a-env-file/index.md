---
title: "Set Environment Variables in Your Bash Shell From a .env File"
date: 2020-07-28T23:13:02-05:00
tags: [bash, env, command-line]
toc: false
show_comments: false
---

I experimented with many ways of doing this, but my favorite solution was from this [stackoverflow answer](https://stackoverflow.com/a/20909045/11499871). It keeps the `.env` file syntax clean so that it can be used across projects. Here's a minimal, reproducible example.

Also see [Version 2]({{< relref "set-environment-variables-in-your-bash-shell-from-a-env-file-version-2" >}}) of this post.

## .env file

```shell
# Some comment
FIRST_NAME=Agnes
LAST_NAME=Obel
```

## setenv.sh script

```shell
#!/usr/bin/env bash

# Show env vars
grep -v '^#' .env

# Export env vars
export $(grep -v '^#' .env | xargs)
```

## Usage

1. Set env vars in your Bash shell

        source setenv.sh

1. Confirm env vars

        echo "${FIRST_NAME} ${LAST_NAME}"
