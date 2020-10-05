---
title: "How to add an Apple Touch Icon to a Squarespace site"
date: 2020-10-04T22:33:10-05:00
tags: [apple, icon, squarespace]
toc: false
show_comments: false
---

Normally, on say a static site, this would be a matter of uploading files to a server then calling it a day. But, Squarespace makes you jump through hoops. So, documenting this here in case I or someone else has to do this again.

## Steps

1. Navigate to <https://realfavicongenerator.net>
    1. Upload your image
    1. Follow the steps to tweak the icon design. For example, I went with a white background color of `#ffffff`
    1. Download the generated favicon files and the generated `head` HTML
1. Navigate to **Squarespace** => **Design** => **Custom CSS** => **Manage Custom Files** => **Add images or fonts**. From here, you'll upload each of these images:
    1. `apple-touch-icon.png`
    1. `favicon-16x16.png`
    1. `favicon-32x32.png`
1. Once uploaded, click each image individually to get its link. When you upload an image, Squarespace saves it to a CDN (a Content Delivery Network). So the link it gives you will be the CDN link
1. In the "Real Favicon" generated `head` HTML, replace each `href` attribute with its corresponding CDN link
1. Navigate to **Squarespace** => **Settings** => **Advanced** => **Code Injection**. From here, you'll paste the `head` HTML you just edited. See below for a sample
1. Now it's time to test your Apple Touch Icon
    1. Navigate to <https://realfavicongenerator.net/favicon_checker>, paste in your site URL, then run the check. Confirm that the iOS Safari image looks how you want it to. 
    1. Or, you could just navigate to your site from your iPhone then save it to your homescreen, the real test

## Sample `head` HTML

```html
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="https://static1.squarespace.com/static/hash/t/hash/number/apple-touch-icon.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="https://static1.squarespace.com/static/hash/t/hash/number/favicon-32x32.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="16x16"
  href="https://static1.squarespace.com/static/hash/t/hash/number/favicon-16x16.png"
/>
<meta name="theme-color" content="#ffffff" />
```
