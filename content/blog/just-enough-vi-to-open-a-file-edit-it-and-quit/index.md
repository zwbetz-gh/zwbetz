---
title: "Just Enough vi to Open a File, Edit It, and Quit"
date: 2018-09-19T23:19:26-05:00
publishdate: 2018-09-19
draft: false
aliases:
  - /2018/09/just-enough-vi-to-open-a-file-edit-it-and-quit/
toc: false
---

`vi` is something I use rarely, usually when I don't have access to a GUI text editor. For those times, here's just enough to do what I need: 

1. `vi <file>` to open the file
1. Press `i` for "INSERT" mode
1. Make changes
1. Press `esc` then enter `:x` to quit and save changes. To quit without saving changes enter `:q!`
