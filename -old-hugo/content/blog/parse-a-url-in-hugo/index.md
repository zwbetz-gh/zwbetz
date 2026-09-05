---
title: "Parse a URL in Hugo"
date: 2019-01-25T12:10:08-06:00
toc: false
---

Need to parse a URL in your Hugo templates? Thanks to the [`urls.Parse`](https://gohugo.io/functions/urls.parse/#readout) function, you don't have to do a bunch of string manipulation. Here's a quick example. 

<!--more-->

We'll start with this code:

```
{{ $url := "https://zwbetz.com/make-a-hugo-blog-from-scratch/#wrap-up" }}
{{ $url = urls.Parse $url }}
```

The `urls.Parse` function returns a [URL struct](https://godoc.org/net/url#URL), so the value of each struct field would be:

{{< table >}}
| Field           | Value                             |
|-----------------|-----------------------------------|
| `$url.Scheme`   | `https`                           |
| `$url.Host`     | `zwbetz.com`                      |
| `$url.Path`     | `/make-a-hugo-blog-from-scratch/` |
| `$url.Fragment` | `wrap-up`                         |
{{< /table >}}
