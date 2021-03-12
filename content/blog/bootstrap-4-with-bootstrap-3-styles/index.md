---
title: "Bootstrap 4 With Bootstrap 3 Code Styles"
date: 2018-03-30T00:10:54-05:00
publishdate: 2018-03-30
draft: false
aliases: 
  - /2018/03/bootstrap-4-with-bootstrap-3-styles/
  - /2018/03/bootstrap-4-with-bootstrap-3-code-styles/
toc: false
---

I recently moved this site to [Bootstrap 4](https://getbootstrap.com/docs/4.0/content/code/). Some of my favorite things about v4: `margin-top` is avoided, `margin-bottom` uses `rem` instead of `px`, a native font stack is used, and base `font-size` is 16px (a good thing for mobile readers, and accessibility). I feel the typography in v4 is better spaced and the text can "breathe".

However, I missed how [Bootstrap 3](http://getbootstrap.com/docs/3.3/css/#code) styled inline code and code blocks. I find v3 styling of those items easier to read. 

Optimally you would want to edit the actual bootstrap css, but here is a quick-n-dirty way to use v3 styles. Just paste this in your custom css.

```
pre {
  display: block;
  padding: 9.5px;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}

pre code {
  padding: 0;
  font-size: inherit;
  color: inherit; 
  white-space: pre-wrap;
  background-color: transparent;
  border-radius: 0;
}

code {
  padding: 2px 4px;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
}
```
