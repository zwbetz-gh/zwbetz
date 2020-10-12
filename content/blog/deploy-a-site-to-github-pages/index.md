---
title: "Deploy a site to GitHub Pages"
date: 2020-10-11T22:12:49-05:00
tags: [git, github, python, bash]
toc: false
show_comments: false
---

GitHub has a cool feature called GitHub Pages. It's basically free web hosting for your repo. Your site is served from branch `gh-pages`. And the url becomes `https://USER_NAME.github.io/REPO_NAME/`

There's a python package called `ghp-import` that does the heavy lifting for you. All you have to do is build your site as normal. 

The following is a stripped-down version of necessary steps. For a more fleshed-out version, see <https://github.com/zwbetz-gh/github-pages-deploy-pleasejs>

## Demo

<https://zwbetz-gh.github.io/github-pages-deploy-pleasejs/>

## Steps

1. Install Python version 3.8 or higher
1. Install package `GitHub Pages Import`

        pip install ghp-import

1. Build your site. This assumes the built site is under `DIR`
1. Deploy your site

        ghp-import -n -m COMMIT_MSG -p -f DIR

## ghp-import arguments

```
Usage: ghp-import [OPTIONS] DIRECTORY

Options:
  -n, --no-jekyll       Include a .nojekyll file in the branch.
  -c CNAME, --cname=CNAME
                        Write a CNAME file with the given CNAME.
  -m MESG, --message=MESG
                        The commit message to use on the target branch.
  -p, --push            Push the branch to origin/{branch} after committing.
  -x PREFIX, --prefix=PREFIX
                        The prefix to add to each file that gets pushed to the
                        remote. [none]
  -f, --force           Force the push to the repository
  -r REMOTE, --remote=REMOTE
                        The name of the remote to push to. [origin]
  -b BRANCH, --branch=BRANCH
                        Name of the branch to write to. [gh-pages]
  -s, --shell           Use the shell when invoking Git. [False]
  -l, --follow-links    Follow symlinks when adding files. [False]
  -h, --help            show this help message and exit
```

## Serve

Optionally preview your site locally before you deploy it, with python's built-in HTTP server:

    python -m http.server PORT --bind HOST --directory DIR
