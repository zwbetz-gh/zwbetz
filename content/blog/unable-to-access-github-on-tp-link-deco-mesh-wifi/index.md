---
title: "Unable to Access GitHub on a TP-Link Deco Mesh WiFi"
date: 2022-09-27T20:19:18-05:00
toc: false
draft: false
---

I keyword-loaded the title in hopes that the next person who runs into this issue can save themselves a few hours of investigation.

<!--more-->

There I was on the couch, it was a normal Monday night, just chipping away at a side project for fun. I attempted to go to github.com. Hmm, weird, the page was just hanging. Almost as if the domain couldn't resolve.

We have AT&T fiber and it's stable for the most part. There's a fiber box in the corner of our backyard, and every time a new neighbor gets service, the technician inevitably disconnects us by accident. But it was late, way past technician work hours.

I checked a few other websites, and my go-to speed test site, <https://fast.com/>, all worked fine. So, it seemed specific to GitHub. I popped into a vscode terminal and did a `git pull`, sure enough, it hung too. So, not only HTTPS, but SSH was affected too. Was GitHub down? This was getting weirder.

SSH uses port 22 by default. Was some process messing with it? You can find all processes using a specific port on Mac with `sudo lsof -i :22`, so I tried that, but no cigar.

I disconnected from WiFi and tried by phone's hotspot. Boom, github.com loaded fine, and I could `git pull` as normal. Was AT&T messing with me? I chalked it up to residential internet flakiness and called it a night.

The next morning, I tried github.com again on WiFi... same issue. Okay, time to investigate my WiFi.

I've had a [TP-Link Deco M5 Mesh WiFi](https://www.tp-link.com/us/deco-mesh-wifi/product-family/deco-m5/) for a few years now and it's been great. Seriously, no complaints.

Yet, I took a shot in the dark and googled _tp link deco unable access github.com_ and [this forum post](https://community.tp-link.com/us/home/forum/topic/239880) was the first hit. I read through it, and by golly, this was exactly what I was experiencing.

Member @Meshed75 said they resolved the issue by setting [Cloudflare's](https://www.cloudflare.com/learning/dns/what-is-1.1.1.1/) `1.1.1.1` as their DNS. I had no other ideas, so why not, it was worth a shot.

Before making the change, I was curious what my current DNS was. Did a quick search and found out you can check it on Mac with `scutil --dns`. Here it was:

```
resolver #1
  nameserver[0] : 2600:1700:c04:1f00::1
  nameserver[1] : 192.168.1.254
  nameserver[2] : 192.168.68.1
```

Those are internal addresses, so maybe the Deco hides which DNS it actually uses? I wasn't sure.

Regardless, I wanted to experiment with the Cloudflare DNS change. Deco has an iOS app, so I followed their [docs](https://www.tp-link.com/us/support/faq/1855/) and made the DNS change for both WAN and LAN settings.

I reran the command and my new resolver was:

```
resolver #1
  nameserver[0] : 2600:1700:c04:1f00::1
  nameserver[1] : 1.1.1.1
```

Okay, now the real test. I went to github.com and... yep, it worked! I could `git pull` too.

What in the heck?

Why, all of a sudden, was this an issue with my Deco? I had never encountered this before. I had a recent firmware update, but that was back in May 2022, so it seemed unrelated.

A few hours later I removed the Cloudflare DNS change and retested things. It worked... which didn't give me a fuzzy feeling.

In the end, I added the Cloudflare DNS change back because I've been reading about them and I just plain like what they're doing as a company and what they stand for.
