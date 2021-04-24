---
title: "Override a Hugo Theme"
date: 2019-01-21T08:16:32-06:00
publishdate: 2019-01-20
toc: false
---

We've all been there. You're browsing through the [Hugo themes](https://themes.gohugo.io/) and find one that you really like. It meets all your criteria, except for that _one small thing_. So, what are your options?

Well, thanks to Hugo's [lookup order](https://gohugo.io/templates/lookup-order/), you can override any part of a theme that you want. The following is a quick example. 

Let's say you really like theme `foo`, but you wish the homepage was different. All you have to do is copy the homepage template:

```
themes/foo/layouts/index.html
```

And paste it under your own `layouts` folder:

```
layouts/index.html
```

Then you're free to make any changes you want to the homepage. When Hugo builds your site, your copy of `index.html` will be used instead of the theme's `index.html`. 
