---
title: "Fix the White Flash on Page Load When Using a Dark Theme on a Static Site"
date: 2021-01-17T19:24:27-06:00
tags: []
toc: false
show_comments: false
---

I maintain a few Hugo themes, one of them named Cupper. Recently a [GitHub issue](https://github.com/zwbetz-gh/cupper-hugo-theme/issues/47) was opened that described a white flash on page load when the dark theme was active. After some investigation, the bug was indeed real. A boy was it a tricky one.

Roughly speaking, these events were happening:

- Request is made for a page
- Browser parses the file from top to bottom: if present, CSS is applied from the `<head>`, then the `<body>` is parsed and shown
- First few paints of the page are visible
- JS is run. Local Storage is checked. The dark theme is applied if it's active

So, the user was seeing an early iteration of the page before the dark theme had been applied.

I needed a way to hide the page, then only show it once the dark theme had been applied. Also, the user experience had to remain smooth, or at least not jarring. 

Here's what I settled on: the user still sees the previous page until the newly requested page's `DOMContentLoaded` event fires. This event sequentially calls two functions: the first handles the dark theme logic, the seconds shows the page.

# Step 1
Use inlined CSS in the `<head>` to immediately hide the `body`.

```html
<style>
  body {
    visibility: hidden;
    opacity: 0;
  }
</style>
```

# Step 2

Show the `body` only after the dark theme is applied.

```js
function showTheme() {
  // Check Local Storage then apply dark theme if it's active
}

function showContent() {
  document.body.style.visibility = 'visible';
  document.body.style.opacity = 1;
}

window.addEventListener('DOMContentLoaded', function () {
  showTheme();
  showContent();
});
```

# Step 3

On the off-chance the user has JavaScript disabled, still show the page.

```html
<noscript>
  <style>
    body {
      visibility: visible;
      opacity: 1;
    }
  </style>
</noscript>
```
