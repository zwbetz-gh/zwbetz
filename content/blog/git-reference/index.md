---
title: "Git Reference"
date: 2021-03-31T15:59:19-05:00
toc: false
---

| Task                                               | Syntax                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| Check for existing SSH key pair (Mac)              | `ls -al ~/.ssh`                                                  |
| Generate new SSH key pair (Mac)                    | `ssh-keygen -t ed25519 -C "<USER_EMAIL>"`                          |
| Start the ssh-agent in the background (Mac)        | `eval "$(ssh-agent -s)"`                                         |
| Add SSH private key to the ssh-agent (Mac)         | `ssh-add -K ~/.ssh/id_ed25519`                                   |
| Show SSH public key (Mac)                          | `cat ~/.ssh/id_ed25519.pub`                                      |
| Init new repo                                      | `git init`                                                       |
| Configure local user name                          | `git config --local user.name "<USER_NAME>"`                       |
| Configure local user email                         | `git config --local user.email "<USER_EMAIL>"`                     |
| List local configuration                           | `git config --local --list`                                      |
| Create new branch                                  | `git checkout -b <BRANCH>`                                         |
| Create remote branch from local branch             | `git push --set-upstream origin <BRANCH>`                          |
| Checkout existing branch                           | `git checkout <BRANCH>`                                            |
| Delete local branch                                | `git branch -D <BRANCH>`                                           |
| Delete all local branches except for current banch | <code>git branch \| grep -v \'^*\' \| xargs git branch -D</code> |
| Delete remote branch                               | `git push --delete --force origin <BRANCH>`                        |
| List local branches                                | `git branch`                                                     |
| List remote branches                               | `git branch -r`                                                  |
| Show status                                        | `git status`                                                     |
| Show diff                                          | `git diff`                                                       |
| Stage all changes                                  | `git add .`                                                      |
| Commit staged changes                              | `git commit -m "<MESSAGE>"`                                        |
| Push local branch to remote branch                 | `git push`                                                       |
| Merge remote branch into local branch              | `git pull origin <BRANCH>`                                         |
| Show commit log                                    | `git log`                                                        |
| Show pretty commit log                             | `git log --oneline`                                              |
| Unstage all changes                                | `git reset`                                                      |
| Undo all modified files                            | `git checkout .`                                                 |
| Delete untracked files                             | `git clean -f -d`                                                |
| Interactively rebase last `n` commits              | `git rebase -i HEAD~n`                                           |
| Cleanup local repo                                 | `git gc`                                                         |
| Recognize case-only filename changes               | `git mv -f <OLD_FILE_PATH> <NEW_FILE_PATH>`                          |
