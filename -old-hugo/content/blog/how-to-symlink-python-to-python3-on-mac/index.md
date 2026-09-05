---
title: "How to Symlink Python to Python3 on Mac"
date: 2022-05-21T12:22:43-05:00
toc: false
draft: false
---

I had a... problem. I was working with shell scripts that I didn't own. These scripts happened to use python. But, my Mac didn't have python, it only had python3 (which was still compatible).

<!--more-->

So, you may ask, why not just change the shell scripts to use python3? That wasn't an option. _Why_ it wasn't an option is irrelevant. Just roll with me, okay.

Next up, I tried making a shell alias that pointed python to python3. No luck there either.

What finally worked was making a symlink from python to python3. I added this idempotent code to my [shell config file]({{< relref "shell-config-file-on-mac" >}}) then was off to the races.

```sh
if [[ ! -a '/Library/Frameworks/Python.framework/Versions/3.9/bin/python' ]] ; then
  ln -s -v \
  '/Library/Frameworks/Python.framework/Versions/3.9/bin/python3' \
  '/Library/Frameworks/Python.framework/Versions/3.9/bin/python'
fi
```

Assumptions:

- You don't have an existing python installation
- You're on a Mac
- Your python3 installation was done via a "macOS 64-bit universal2 installer" or similar installer
