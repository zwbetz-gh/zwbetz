---
title: "Check if a Program Exists From Your Bash Script"
date: 2019-04-12T13:55:35-05:00
toc: false
---

Lately I've had the Bash bug... and I'm continually impressed at what can be accomplished with this tool. Just the other day, I needed to check for the existence of some programs before doing the rest of my scripting work. Originally I was doing this with `which`, but after reading this [detailed stackoverflow answer](https://stackoverflow.com/a/677212), I'm now using the more portable `command -v`. A sample script follows.

Replace `program` with whatever you want to check.

```shell
if ! command -v program >/dev/null; then
  echo "program is required ... "
  exit 1
fi
```
