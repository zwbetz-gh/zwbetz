---
title: "Revive Your Old Computer With Lubuntu Linux"
date: 2022-06-20T15:30:35-05:00
toc: false
draft: false
---

My father-in-law has an old Dell Inspiron 660s desktop computer from 2012. The hard drive crapped out, so he started looking for a new computer, planning to throw this one away.

<!--more-->

Here are the specs, which aren't too shabby for a 10 year old machine: OS: Windows 7, CPU: Dual-core Intel i3-2120 @ 3.3 GHz, Memory: 6 GB DDR3 1600 MHz.

If he paid for a new hard drive, I offered to replace it and install [Lubuntu Linux](https://lubuntu.me/). So, he ordered a new one for about $50, a Western Digital 1 TB 7200 RPM (model WD10EZEX), and we were off to the races.

There are a bunch of Linux distributions, so why Lubuntu? Well, I wanted a lightweight OS, a simple UI, and for it to be Ubuntu-like. Lubuntu meets those criteria. He uses a Chromebook every day, so learning a non-Windows UI wasn't an issue.

The install wasn't too bad:

- Replace the physical hard drive
- On another computer: [Download the Lubuntu ISO](https://lubuntu.me/downloads/), preferably an LTS one, then [burn it to a USB stick](https://manual.lubuntu.me/stable/1/1.2/booting_the_image.html#writing-burning-the-image)
- Reboot the desktop and mash `F12` until the boot menu comes up
- Select the USB stick, then follow the [GUI install steps](https://manual.lubuntu.me/stable/1/1.3/installation.html)
- After the install, connect to WiFi, then run `lubuntu-upgrader` to check for further OS updates
- Run the [Driver Install Tool](https://support.brother.com/g/b/downloadlist.aspx?c=us&lang=en&prod=mfc9130cw_us&_ga=2.20608440.1251293199.1655778919-1095957745.1655778914&_gl=1*7z7drs*_ga*mta5ntk1nzc0ns4xnju1nzc4ote0*_ga_ncew43sj8w*mty1ntc3odkxny4xljeumty1ntc3otawoc41ng..&os=128) for his Brother MFC-9130CW printer. It's a shell script and you just follow the prompts

My initial reaction was shock... I couldn't believe how "snappy" everything felt. The LXQt (Lightweight Qt) Desktop Environment was, well, lightweight. Opening a Firefox window, and subsequent tabs, was quick. LibreOffice was responsive. Terminal even felt zippier. It made the previous Windows 7 experience feels like wading through mud (no disrespect, I've got some good Win7 memories).

There you go. Don't throw your old hardware away just yet, you can squeeze a few more years out of it.
