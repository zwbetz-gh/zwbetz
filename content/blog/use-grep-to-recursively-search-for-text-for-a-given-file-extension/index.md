---
title: "Use Grep to Recursively Search for Text for a Given File Extension"
date: 2018-08-22T14:19:00-05:00
publishdate: 2018-08-22
draft: false
aliases:
  - /2018/08/use-grep-to-recursively-search-for-text-for-a-given-file-extension/
toc: false
---

Ran into a scenario at work where I needed to search for a piece of text, but only in files with a certain extension, and in all subdirectories (and their subdirectories, and so on).

I knew of `grep`, but had only used it to search for text in a single file. Well, turns out it can do _way_ more than that.

<!--more-->

After peeking at the manual (`man grep`) and consulting the google machine for more examples, here's the command that did what I needed.

Note: `.txt` should be replaced with the desired extension.

```
grep -i -r --include '*.txt' 'some text' .
```

The breakdown:

- `grep` -- Searches any given input files, selecting lines that match one or more patterns
- `-i` -- Perform case insensitive matching
- `-r` -- Recursively search subdirectories listed
- `--include '*.txt'` -- Only include files with this extension
- `'some text'` -- The text to search for
- `.` -- Start searching in the current working directory
