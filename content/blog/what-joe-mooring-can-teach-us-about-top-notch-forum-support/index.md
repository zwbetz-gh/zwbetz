---
title: "What Joe Mooring Can Teach Us About Top-Notch Forum Support"
date: 2022-02-22T00:00:00-06:00
toc: false
draft: false
---

[Joe Mooring](https://discourse.gohugo.io/u/jmooring/summary) is a contributor (among other useful things) over at the Hugo forum. At the time of this writing, if you look at [all-time users ordered by likes received](https://discourse.gohugo.io/u?order=likes_received&period=all), you'll see he's in 3rd place. 

<!--more-->

I used to be in 3rd place (the bulk of my contributions were from 2018 to early 2021), but I've been out of the game lately, and he's been _very much in_ the game. It's quite fun to watch, actually.

If you do your due diligence and ask a sincere question, he'll often reply in kind. He is, in my estimation, the king of creating a [minimal, reproducible example](https://stackoverflow.com/help/minimal-reproducible-example). Here are a few samples from the top of his activity feed: [one](https://discourse.gohugo.io/t/disable-page-from-sitemap/37213/4), [two](https://discourse.gohugo.io/t/content-mount-problem-for-single-language-multilingual-site/37215/7), [three](https://discourse.gohugo.io/t/how-to-have-custom-single-html-post-for-each-individual-product-post/37085/6), [four](https://discourse.gohugo.io/t/create-a-filter-by-taxonomy-terms-in-the-section-page/36998/14), [five](https://discourse.gohugo.io/t/create-a-filter-by-taxonomy-terms-in-the-section-page/36998/4), [six](https://discourse.gohugo.io/t/is-there-some-pre-packaged-way-to-use-kroki-from-markdown/36924/5). I could go on.

Notice what he does. He's got a GitHub repo, [hugo-testing](https://github.com/jmooring/hugo-testing), that's dedicated to, well, hugo testing. And man it's nifty. The flow is roughly:

1. Determine that a forum question, or github issue, is worthy of reproducing
1. Cut a new [branch](https://github.com/jmooring/hugo-testing/branches/all/) and do the work
1. Post the steps to test it

```
git clone --single-branch -b <branch-name> https://github.com/jmooring/hugo-testing <branch-name>
cd <branch-name>
hugo server
```

How convenient is that?! It's white-glove treatment as far as I'm concerned.
