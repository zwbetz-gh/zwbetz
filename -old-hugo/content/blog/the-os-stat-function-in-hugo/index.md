---
title: "The os.Stat Function in Hugo"
date: 2018-10-29T14:53:11-05:00
publishdate: 2018-10-29
draft: false
toc: false
---

The `os.Stat` function in Hugo ([see the docs](https://gohugo.io/functions/os.stat/)) is useful for getting info on a file. 

<!--more-->

For example, say I wanted to get the info on this page. The following shortcode:

```
{{ $file := .Get 0 }}
{{ $stat := os.Stat $file }}

<p>
  <strong>Name</strong><br>
  <code>{{ $stat.Name }}</code>
</p>
<p>
  <strong>Size</strong><br>
  <code>{{ $stat.Size }}</code> bytes
</p>
<p>
  <strong>Mode</strong><br>
  <code>{{ $stat.Mode }}</code>
</p>
<p>
  <strong>ModTime</strong><br>
  <code>{{ $stat.ModTime }}</code>
</p>
<p>
  <strong>IsDir</strong><br>
  <code>{{ $stat.IsDir }}</code>
</p>
```

Would give this output:

{{< os-stat "content/blog/the-os-stat-function-in-hugo/index.md" >}}
