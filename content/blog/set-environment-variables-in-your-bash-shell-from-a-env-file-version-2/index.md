---
title: "Set Environment Variables in Your Bash Shell From a .env File (Version 2)"
date: 2021-01-14T13:17:50-06:00
toc: false
---

This post is version 2 of [Set Environment Variables in Your Bash Shell From a Env File]({{< relref "set-environment-variables-in-your-bash-shell-from-a-env-file" >}}).

The advantage is it supports quoted values that contain spaces.

<!--more-->

## .env file

```shell
# Some comment
FULL_NAME="First Middle Last"
FOO=bar
```

## setenv.sh script

```shell
#!/usr/bin/env bash

# Show env vars
grep -v '^#' .env

# Export env vars
set -o allexport
source .env
set +o allexport
```

## Usage
1. Unset env vars

        unset FULL_NAME; unset FOO;

1. Set env vars in your Bash shell

        source setenv.sh;

1. Confirm env vars

        echo ${FULL_NAME}; echo ${FOO};
