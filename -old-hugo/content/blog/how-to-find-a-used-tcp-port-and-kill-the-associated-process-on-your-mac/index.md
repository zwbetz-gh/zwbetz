---
title: "How to Find a Used TCP Port and Kill the Associated Process on Your Mac"
date: 2019-01-30T14:34:44-06:00
toc: false
---

Sometimes the port you need is already used by another process. To find the offending process:

<!--more-->

```
sudo lsof -i tcp:<port>
```

Now, usually you'd just close out the app that was using the port. But let's say you're feeling destructive and you wanna kill the process:

```
sudo kill <pid>
```

For fun, the above commands can be combined into this one-liner:

```
sudo kill $(sudo lsof -i tcp:<port> | tr -s " " | cut -d " " -f 2 | sed -n 2p)
```

Credits to this [stackoverflow](https://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac) post. 
