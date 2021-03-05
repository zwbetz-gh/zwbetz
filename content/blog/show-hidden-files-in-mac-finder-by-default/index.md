---
title: "Show hidden files in Mac Finder by default"
date: 2019-10-11T20:55:48-05:00
toc: false
show_comments: true
---

## A one-time thing

1. Press `Command` - `Shift` - `.`  to toggle hidden files when in Finder

## Make it permanent

1. Set the default

        defaults write com.apple.finder AppleShowAllFiles YES

1. Confirm that the default is set

        defaults read com.apple.finder AppleShowAllFiles

1. Hold `Option` key, right-click Finder, then click **Relaunch** to pick up the new default

## Revert it

1. In the `write` command above, replace `YES` with `NO`

        defaults write com.apple.finder AppleShowAllFiles NO
