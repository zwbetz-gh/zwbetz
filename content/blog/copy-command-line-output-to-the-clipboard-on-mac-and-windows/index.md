---
title: "Copy command line output to the clipboard on Mac and Windows"
date: 2018-10-12T20:07:57-05:00
publishdate: 2018-10-12
draft: false
toc: false
show_comments: true
---

In each example below, the contents of a file are copied to the clipboard. 

## Mac

```
cat <file> | pbcopy
```

## Windows

```
type <file> | clip
```
