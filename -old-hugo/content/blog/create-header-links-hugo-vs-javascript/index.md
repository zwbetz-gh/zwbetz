---
title: "Create Header Links: Hugo vs JavaScript"
date: 2019-04-11T22:07:22-05:00
toc: false
---

**Update:** As of Hugo `v0.62.0` this can now be done with [Markdown Render Hooks](https://gohugo.io/getting-started/configuration-markup/#heading-link-example). Thanks to [@ulab](https://github.com/ulab) for the [heads up](https://github.com/zwbetz-gh/zwbetz/issues/1).

---

GitHub adds header links to markdown documents by default. I like the way this looks and how it makes sharing link fragments easier, so I added the feature to my [lil boot](https://github.com/zwbetz-gh/lil-boot-hugo-theme) theme.

<!--more-->

The first iteration was with JavaScript.

```js
let icon = '<i data-feather="link"></i>';
let headings = document.getElementsByTagName('h2');
for (let i = 0; i < headings.length; i++) {
  let id = headings[i].id;
  let iconLink = '<a class="header-icon-link" href="#' + id + '">' + icon + '</a> ';
  let headingWithIconLink = iconLink + headings[i].innerHTML;
  headings[i].innerHTML = headingWithIconLink;
}
```

What the above does:

- Create an `<i>` element, that [feather](https://feathericons.com/) will convert to an SVG icon later on
- Get all `<h2>` headers
- For each header, wrap the `<i>` in an anchor that links to the header `id`, then add that before the header's `innerHTML`
- Note: Hugo adds an `id` to all headers by default, which is nice, and makes my life easier

This code worked just fine. But I wanted to do as much with Hugo as possible, so I asked the folks over on the [forums](https://discourse.gohugo.io/t/put-a-header-link-before-all-h2-elements/17966) for assistance. The helpful [kaushalmodi](https://discourse.gohugo.io/u/kaushalmodi) replied with just the solution I needed. With a few tweaks to adapt it to my needs, here's what the Hugo iteration looks like:

```
{{ . | replaceRE "(<h[2-9] id=\"([^\"]+)\">)(.+)(</h[2-9]+>)" `${1}<a class="header-icon-link" href="#${2}"><i data-feather="link"></i></a> ${3}${4}` | safeHTML }}
```

If you're like me, you're thinking "wtf did I just read?" Yes. That was my initial response as well. I had to plug that regex into an [online playground](https://regex101.com/) (don't forget to choose the GoLang flavor) to figure out what was going on. So, let's break it down:

I will assume you're already familiar with the "dot", `replaceRE`, and `safeHTML`, since they're things from Hugo-land. But if not, search the [docs](https://gohugo.io/documentation/) for each of those things and read up. 

`(<h[2-9] id=\"([^\"]+)\">)(.+)(</h[2-9]+>)` is a regular expression. Each set of parentheses is a "group" and will return a "match". Given the header `<h2 id="some-header">Some Header</h2>`, see the following table for how it will be parsed. 

{{< table >}}

| Group | Regex                       | Match                   |
| ----- | --------------------------- | ----------------------- |
| 1     | `(<h[2-9] id=\"([^\"]+)\">)` | `<h2 id="some-header">` |
| 2     | `([^\"]+)`                  | `some-header`           |
| 3     | `(.+)`                      | `Some Header`           |
| 4     | `(</h[2-9]+>)`              | `</h2>`                 |

{{< /table >}}

When building the replacement string, each group match can be referenced by its number. Say you want to use the value of group 1's match, you'd do `${1}`. 

And there you have it. To see the code in action, checkout this [demo](https://lil-boot-hugo-theme.netlify.com/hugo-template-primer/). 
