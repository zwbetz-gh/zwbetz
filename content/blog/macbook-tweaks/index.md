---
title: "MacBook tweaks"
date: 2018-08-06T15:55:49-05:00
publishdate: 2018-08-06
draft: false
aliases:
  - /2018/08/macbook-tweaks/
toc: false
---

Got a new MacBook for work about two weeks ago (macOS High Sierra, 15 inch screen, 16 GB memory). I've been a Windows guy most of my life, so it's been a fun switch. As I was settling in, here are a few tweaks I made so things would feel more homey. 

I didn't like how minimized apps took up additional space in the dock, so I set them to minimze into the app icon.

_System Preferences_ > _Dock_ > check _Minimize windows into application icon_

I like the default black background and white text in Windows Command Prompt, so I changed Terminal accordingly. 

_Terminal_ > _Preferences_ > _Profiles_ tab > set _Pro_ as default, change font to 12 pt, change background color opacity to 100%

I like to keep my desktop tidy, so I changed the default screenshot save location to a folder in my home.  

```
mkdir ~/Screenshots
defaults write com.apple.screencapture location ~/Screenshots
```

When clicking maximize on a window, you'd expect it to, well, maximize, but instead it goes full screen. After some googling I learned `option` + `shift` + _maximize button_ would maximize windows while still keeping the menu bar visible. 

Then a friend told me about [Spectacle](https://www.spectacleapp.com/). This tool allowed me to "pin" windows to the right or left of my screen like I could in Windows, as well as center, maximize (as intended), and more. 
