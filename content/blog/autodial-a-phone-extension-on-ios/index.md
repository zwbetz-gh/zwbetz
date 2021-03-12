---
title: "Autodial a Phone Extension on iOS"
date: 2018-09-14T20:52:09-05:00
publishdate: 2018-09-14
draft: false
aliases:
  - /2018/09/autodial-a-phone-extension-on-ios/
toc: false
---

For lines that you often call into, e.g. Daily Standup, it can be annoying to type the extension each time. Fortunately, there is a way to automate this.

In the examples below, `111-222-3333` is the line number, and `12345#` is the extension.

## Option 1

Save the number in your contacts as `111-222-3333;12345#`. To get the `;` press `wait`.

When calling this number, you will be prompted with a button that, if tapped, will dial the extension.

## Option 2

Save the number in your contacts as `111-222-3333,,12345#`. To get the `,,` press `pause` twice. 

When calling this number, your phone will do two short pauses (each `,` is a pause), then automatically dial the extension. I prefer this option. 
