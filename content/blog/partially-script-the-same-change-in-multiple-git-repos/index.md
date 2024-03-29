---
title: "Partially Script the Same Change in Multiple Git Repos"
date: 2021-12-09T22:19:26-06:00
toc: false
draft: false
---

One of the disadvantages of a micro-service architecture is the config situation. Say you have 15 micro-services. Then say want to make the same change in each one. Well, now you have the pleasure of opening 15 pull requests.

<!--more-->

This is one of those weird tasks where the time it takes to automate the thing [outweighs](https://xkcd.com/1319/) the time it takes to do it manually.

[Partially](https://blog.danslimmon.com/2019/07/15/do-nothing-scripting-the-key-to-gradual-automation/) scripting the task can help, though. The first and last parts are copy-pasted into terminal. The middle part obviously varies per task.

1. Set the main branch, feature branch, and commit message variables. Then make a branch off your main branch
1. Make a checklist of things to do. Don't hold this info in your head, you're bound to forget something. Then do the things
1. Commit and push the changes. Git will output a pull request URL for you. Profit

```sh
export main_branch="develop" && \
export feature_branch="some-name" && \
export commit_message="some message" && \
git checkout "${main_branch}" ; \
git pull origin "${main_branch}" && \
git checkout -b "${feature_branch}"


# CHECKLIST
# thing 1
# thing 2
# ...


git add --all && \
git commit -m "${commit_message}" && \
git push --set-upstream origin "${feature_branch}"
```
