---
title: "Discreet Drafts in Hugo"
date: 2021-11-26T14:41:50-06:00
toc: false
draft: true
---

I sometimes pass around blog post drafts to friends and family for review. It's usually by email or text, which is fine. Yet it would be cool if I could give them a live link. A _discreet draft_, if you will.

<!--more-->

I did a bit of searching on the Hugo Discourse forums, and of course, I was not the first person with this idea. A few others had implemented custom solutions, but I didn't see a writeup of how to do it from scratch. When encountering a knowledge gap like this, my tutorial-spidey-sense tingles, and I knew it was time to take a stab.

I made a [minimal, reproducible example on GitHub](https://github.com/zwbetz-gh/hugo-discreet-drafts), so if you're a "show me the money" type person, feel free to check that out first. 

Before we dive into _how_ to do it, let's talk about _what_ I wanted. My existing `/blog/` list should remain unchanged, and would still show "ready for the world" posts. I wanted a new `/drafts/` list, which would show only draft posts. I didn't 