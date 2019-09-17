---
title: "Open a new Google Chrome tab (or window) via command line on Mac"
date: 2019-09-16T20:34:33-05:00
tags: [mac, command-line, chrome]
toc: false
show_comments: false
---

Ever been in your terminal and wanted to open a new chrome tab (or window), without actually switching to chrome? Well, it's possible. Checkout these examples:
```bash
# Open URL in new tab
open --new -a "Google Chrome" --args "duckduckgo.com"

# Open URL in new window
open --new -a "Google Chrome" --args --new-window "duckduckgo.com"
```

I prefer to wrap these commands in bash functions so that I don't have to remember their syntax:
```bash
chrome_open_tab() {
  open --new -a "Google Chrome" --args $@
}

chrome_open_window() {
  open --new -a "Google Chrome" --args --new-window $@
}
```

You can pass multiple URLs:
```bash
chrome_open_tab "duckduckgo.com" "mozilla.org" "wikipedia.org"
```
