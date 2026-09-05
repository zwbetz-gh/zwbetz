---
title: "NightwatchJS Template"
date: 2020-08-28T22:37:24-05:00
toc: false
---

The following are README excerpts from a repo I've been working on. If you do end-to-end testing on your project, check it out, it's a good resource. And, I'm quite happy with it.

<!--more-->

<https://github.com/zwbetz-gh/nightwatchjs-template>

## Summary

[Nightwatch](https://nightwatchjs.org/) is a fun, robust end-to-end testing framework. As with any popular framework, inevitably there are opinions of how things should be organized, and what you should or should not do.

This repo is a distillation of personal lessons learned, providing a template to jump start your own end-to-end testing project. It comes with sensible defaults, but you can configure it however you like.

## Highlights

- Sample templates for how to structure your page objects and tests
- Custom `beforeEach` and `afterEach` hooks to do common operations
- Built-in WebDriver environments for ChromeDriver, ChromeDriver headless, GeckoDriver, and GeckoDriver headless
- Custom reporting in JSON, XML, and HTML formats
    - By default, Nightwatch generates a XML file for each test file. This repo parses them all into a single, sleek report
    - HTML reports are fully portable, since their CSS is inlined, and their screenshots are Base64 encoded
- Custom commands
    - Assert accessibility via [axe](https://github.com/dequelabs/axe-core)
    - Clear element value via BACK_SPACE keys
    - Get element hex color
    - Get browser console logs
- Customize configuration via a `.env` file
    - Set the Launch URL to use
    - Set which WebDriver to use
    - If using WebDriver headless mode, set the browser window width and height
    - Set the output folder
    - Set whether to run in parallel mode
    - If using parallel mode, set how many workers to use
    - Set extra WebDriver args
    - If you don't want to use the one specified in `package.json`, set the GeckoDriver or ChromeDriver path
