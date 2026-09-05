---
title: "Client-Side vs Server-Side Analytics: Data Comparison"
date: 2022-01-14T00:22:59-06:00
toc: false
draft: false
---

I currently use GoatCounter for client-side analytics and am pleased with it. Shout-out to [Martin Tournoij](https://github.com/arp242) for creating it -- Google Analytics needed some quality competition.

<!--more-->

Netlify currently hosts my site. They happen to collect analytics, which they'll show you for $9 a month. I figured, why not, I'll pay it once just to compare.

I compared data for the last month: Dec 14, 2021 to Jan 14, 2022. The results were interesting.

Seemingly 1483 visitors went under the client-side analytics radar. Why? Who knows. It could be any number of things: they're behind a (strict) VPN or proxy, they use browser extensions that block the counter script, they navigated away before the counter script loaded, etc.

Regardless, now I feel like I can safely overestimate total unique visits reported by client-side analytics. Zing!

{{< table >}}
| Metric | Client-Side | Server-Side | Diff |
| --- | --- | --- | --- |
| Total Unique Visits | 15,182 | 16,665 | 9.8% |
| Source: Google | 10,232 | 10,465 | 2.3% |
| Source: DuckDuckGo | 436 | 931 | 113.5% |
{{< /table >}}
