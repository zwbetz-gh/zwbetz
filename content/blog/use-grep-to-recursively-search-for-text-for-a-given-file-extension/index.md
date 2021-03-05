---
title: "Use grep to recursively search for text for a given file extension"
date: 2018-08-22T14:19:00-05:00
publishdate: 2018-08-22
draft: false
aliases:
  - /2018/08/use-grep-to-recursively-search-for-text-for-a-given-file-extension/
toc: false
show_comments: true
---

Ran into a scenario at work where I needed to search for a piece of text, but only in files with a certain extension, and in all subdirectories (and their subdirectories, and so on). 

I knew of `grep`, but had only used it to search for text in a single file. Well, turns out it can do _way_ more than that. 

After peeking at the manual (`man grep`) and consulting the google machine for more examples, here's the command that did what I needed. 

Note: `.txt` should be replaced with the desired extension.

```
grep -i -r "piece of text" --include \*.txt *
```

The breakdown: 

`grep` -- Searches any given input files, selecting lines that match one or more patterns

`-i` -- Perform case insensitive matching

`-r` -- Recursively search subdirectories listed

`"piece of text"` -- The text to search for

`--include \*.txt` -- Only search in files with this extension

`*` -- Search through all input files
