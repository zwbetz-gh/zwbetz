---
title: "Open a New Google Chrome Tab (Or Window) via Command Line on Mac"
date: 2019-09-16
aliases: ["/open-a-new-google-chrome-tab-or-window-via-command-line-on-mac/"]
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
