---
title: "Wait for an element to be enabled in NightwatchJS"
date: 2020-07-16T13:31:21-05:00
toc: false
show_comments: false
---

In NightwatchJS, you can wait for an element to be [present](https://nightwatchjs.org/api/commands/#waitForElementPresent), or to be [visible](https://nightwatchjs.org/api/commands/#waitForElementVisible). But there is no built-in command to wait for an element to be enabled. Luckily, this can be done by using the `:enabled` CSS pseudo-class, see [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/:enabled).

## Sample

The sample test below does the following things:

1. Maximizes the browser window
1. Navigates to the DuckDuckGo URL
1. Waits for the search bar to be enabled and visible for up to 10 seconds
1. Sets the search bar value
1. Sends the RETURN key
1. Saves a screenshot
1. Ends the browser session

```js
module.exports = {
  'Search DuckDuckGo': (browser) => {
    const selector = '#search_form_input_homepage:enabled';
    const wait = 10 * 1000;

    browser
      .maximizeWindow()
      .url('https://duckduckgo.com')
      .waitForElementVisible(selector, wait)
      .setValue(selector, 'NightwatchJS')
      .keys(browser.Keys.RETURN)
      .saveScreenshot('./screenshot.png')
      .end();
  }
};
```

## Acknowledgements

Shoutout to this [stackoverflow answer](https://stackoverflow.com/a/49897914/11499871) for the tip.
