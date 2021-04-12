---
title: "Bash Shell Script Template"
date: 2020-12-08T19:16:23-06:00
toc: false
---

Bash is one of my favorite scripting languages. I often find myself doing a task many times, only to turn it into a shell script for easy usage.

One area where Bash really shines is "gluing" tools together. I usually have to check for the existence of tools before running the script body. Say, for example, my script depended on `git` and `python`. I would add them as a space-separated-array like `REQUIRED_TOOLS=(git python)`. Then that array is iterated and each tool is checked for existence. If it doesn't exist, the script logs an error message and exits.

After the script runs, it's nice to know how long it took. This is done by logging the [SECONDS](https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html) Bash variable.

Happy scripting.

```shell
#!/usr/bin/env bash

REQUIRED_TOOLS=()

for tool in ${REQUIRED_TOOLS[@]}; do
  if ! command -v ${tool} >/dev/null; then
    echo "${tool} is required... "
    exit 1
  fi
done

# Content goes here

echo "Completed in ${SECONDS}s"
```
