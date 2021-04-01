---
title: "Git Reference"
date: 2021-03-31T15:59:19-05:00
toc: false
---

| Task                                   | Syntax                                       |
| -------------------------------------- | -------------------------------------------- |
| Init new repo                          | `git init`                                   |
| Configure local user name              | `git config --local user.name "USER_NAME"`   |
| Configure local user email             | `git config --local user.email "USER_EMAIL"` |
| List local configuration               | `git config --local --list`                  |
| Create new branch                      | `git checkout -b BRANCH`                     |
| Create remote branch from local branch | `git push --set-upstream origin BRANCH`      |
| Checkout existing branch               | `git checkout BRANCH`                        |
| Delete local branch                    | `git branch -D BRANCH`                       |
| Delete remote branch                   | `git push --delete --force origin BRANCH`    |
| List local branches                    | `git branch`                                 |
| List remote branches                   | `git branch -r`                              |
| List status                            | `git status`                                 |
| Stage all changes                      | `git add .`                                  |
| Commit staged changes                  | `git commit -m "MESSAGE"`                    |
| Push local branch to remote branch     | `git push`                                   |
| Merge remote branch into local branch  | `git pull origin BRANCH`                     |
| Unstage all changes                    | `git reset`                                  |
| Undo all modified files                | `git checkout .`                             |
| Delete untracked files                 | `git clean -f -d`                            |
| Interactively rebase last `n` commits  | `git rebase -i HEAD~n`                       |
| Cleanup local repo                     | `git gc`                                     |
| Recognize case-only filename changes   | `git mv -f OLD_FILE_PATH NEW_FILE_PATH`      |
