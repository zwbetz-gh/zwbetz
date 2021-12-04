---
title: "Site Redesign: Every Kilobyte Counts"
date: 2021-12-04T00:00:00-06:00
toc: false
draft: false
---

One of the cool things (curses?) of maintaining your own site is that you have total control over the frontend assets. Don't need those JavaScript widgets? Remove them. That CSS library has a bunch of unused classes? Remove them. You get the idea.

<!--more-->

There's a movement (dare I call it that?) to create websites with less bloat. Some participants even set fun goals, like every page must be [less than 1 megabyte](https://github.com/bradleytaunt/1mb-club).

The idea seemed fun. So, I set out to redesign the site as lightweight as possible, while keeping a few niceties. (p.s. I'm constantly tweaking things, so by the time you read this, the design has probably changed again. I'll stick to how things are at the time of this writing).

For the style foundation, I went with [Bootstrap Reboot](https://getbootstrap.com/docs/5.1/content/reboot/). My favorite part of Reboot is the native font stack. I no longer need to download external fonts, yay. The major fonts of each operating system are targeted, so it looks good (although slightly different on each operating system) and is fast. A few extra classes are sprinkled in for custom page layout and typography. The resulting CSS file is about 9 kilobytes.

Next up is JavaScript. The only JavaScript included on every page is the count script required by [GoatCounter](https://www.goatcounter.com/). It's about 9 kilobytes.

The blog list page is special. It requires an extra script that enables searching by title. It's about 2 kilobytes. A JSON index is also required and it's currently 29 kilobytes. At 184 posts, that comes to about 0.16 kilobyte per post entry in the JSON index. If I ever get to 1,000 posts one day, that's about 160 kilobytes for the JSON index, which I may tolerate, or I may find a different "search" approach at the point.

You may be wondering, why bother writing your own search? Well, it's mostly for mobile usage. I can `Command` + `F` in a desktop browser, but I still need a way to search on mobile. Plus, my search matches on multiple substrings, which is useful when you only know a few keywords of the thing you're looking for.

The HTML size will obviously differ per page. But let's pick [one of the most text-heavy pages]({{< relref "make-a-hugo-blog-from-scratch" >}}), which weighs in at 70 kilobytes.

Going with the worst-case scenario (for a text-heavy page, not a page with many images, which is not the norm for this blog), that comes to about 88 kilobytes per page (9 kilobytes CSS + 9 kilobytes JavaScript + 70 kilobytes HTML). Not too bad. Keep in mind this is raw file size. It doesn't consider web server compression.
