---
title: "File Variables in Hugo"
date: 2018-11-27T11:35:43-06:00
publishdate: 2018-11-27
draft: false
toc: false
---

Hugo's `.File` variables ([see the docs](https://gohugo.io/variables/files/)) are useful for getting filesystem data on your content files. 

For example, this shortcode:

```
<p>
  <strong>.Page.File.Path</strong><br>
  <code>{{ .Page.File.Path }}</code>
</p>
<p>
  <strong>.Page.File.LogicalName</strong><br>
  <code>{{ .Page.File.LogicalName }}</code>
</p>
<p>
  <strong>.Page.File.TranslationBaseName</strong><br>
  <code>{{ .Page.File.TranslationBaseName }}</code>
</p>
<p>
  <strong>.Page.File.BaseFileName</strong><br>
  <code>{{ .Page.File.BaseFileName }}</code>
</p>
<p>
  <strong>.Page.File.Ext</strong><br>
  <code>{{ .Page.File.Ext }}</code>
</p>
<p>
  <strong>.Page.File.Lang</strong><br>
  <code>{{ .Page.File.Lang }}</code>
</p>
<p>
  <strong>.Page.File.Dir</strong><br>
  <code>{{ .Page.File.Dir }}</code>
</p>
```

Gives this output:

{{< file-var >}}
