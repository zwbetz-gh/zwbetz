---
title: "Log docker stats to a file"
date: 2019-10-01T00:10:13-05:00
toc: false
show_comments: true
---

Recently I needed to log the output of `docker stats` for a few of my containers in order to compare. The following snippet will log container stats to a file (`stats.txt`), and to stdout, every 1 second. Tweak it to your liking.

```
while true; do docker stats --no-stream | tee --append stats.txt; sleep 1; done
```
