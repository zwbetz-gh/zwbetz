---
title: "Personal docs on the find command"
date: 2018-09-17T11:52:00-05:00
publishdate: 2018-09-17
draft: false
aliases:
  - /2018/09/brief-documentation-on-the-unix-find-command/
  - /2018/09/personal-docs-on-the-find-command/
toc: false
---

`find` command options that I care about.

```
find . -type f -name ".*keep"
```

The breakdown:

`.` -- The directory to start the recursive search in. Use `/` to start in the root directory

`-type f` -- Specify the file type as regular file. Another common usage would be `-type d` for directory

`-name ".*keep"` -- Pass a regex pattern for the file name. The `*` here is used as a wildcard. To literally search for a file name containing `*` then escape it like `\*` 
