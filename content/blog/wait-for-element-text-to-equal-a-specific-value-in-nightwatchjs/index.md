---
title: "Wait for element text to equal a specific value in NightwatchJS"
date: 2020-08-01T13:58:47-05:00
tags: [nightwatchjs, nodejs, javascript]
toc: false
show_comments: false
---

It can be useful to wait for an element's text to equal a specific value before doing the rest of your test steps. This is possible in NightwatchJS, you just have to dig in the docs a little. **Note:** Instead of `text`, you can also wait for an element's `attribute` to equal something. And instead of `equal`, you can do `contain`, or use `not` to check the inverse. Many other variants are available in the [Expect API docs](https://nightwatchjs.org/api/expect/).

## Sample

The sample test below does the following things:
1. Navigates to the example URL
1. Waits 10 seconds for the `h1` element text to equal `Example Domain`
1. Ends the browser session

```js
module.exports = {
  'Wait for element text to equal': (browser) => {
    browser.url('https://example.com');

    browser.expect
      .element('h1')
      .text.to.equal('Example Domain')
      .before(10 * 1000);

    // The rest of your test steps...

    browser.end();
  }
};
```

## Acknowledgements

Shoutout to this [GitHub issue answer](https://github.com/nightwatchjs/nightwatch/issues/246#issuecomment-285727236) for the tip.
