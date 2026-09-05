---
title: "Generate a Random String in Hugo"
date: 2020-06-17T22:58:08-05:00
toc: false
---

I recently fixed an [issue](https://github.com/zwbetz-gh/cupper-hugo-theme/issues/36) where I needed to generate a random string. The string had to be random, even if given the same input seed. 

<!--more-->

In short, the cupper theme (which had the issue) has a shortcode that creates "expandables" with a little JavaScript. Each expandable generates its html id based off the md5 hash of the shortcode's `.Inner` content (which is whatever text you want to show when the expandable is clicked). Well, if two expandables had the same inner content, then things would break. My solution was:

- Get the md5 hash of the seed string (in this case, the inner content of the expandable)
- Split that into an array
- Shuffle the array
- Convert the array back into a string

```
{{ $seed := "foo" }}
{{ $random := delimit (shuffle (split (md5 $seed) "" )) "" }}
{{ $random }}
```

This will generate a new string each time you build the site:

```
5b16c8cffebcc48ac4d2ad4dcfc54ed8
d45ac5c6ce8c8fdcff8dbdbace44421c
...
```
