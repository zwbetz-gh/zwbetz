---
title: "Use Hugo Templating in Your External CSS"
date: 2019-02-18T15:40:29-06:00
toc: false
---

[Hugo Pipes](https://gohugo.io/hugo-pipes/resource-from-template/) allows resource creation from an asset file that contains templating. As an example, let's say you want to make your site's background color and text color configurable. In your `config.toml` file, you would have the below: 

<!--more-->

```toml
[params]
  backgroundColor = "#fff"
  textColor = "#000"
```

Since the external CSS file uses templating, instead of living under the `static` folder, it needs to live under the `assets` folder. For this example, let's say the full path is `assets/css/template-style.css` and the file contents are: 

```css
body {
  background-color: {{ .Site.Params.backgroundColor }};
  color: {{ .Site.Params.textColor }};
}
```

In your HTML, you would then execute the CSS resource as a template like so: 

```html
{{ $templateStyle := resources.Get "css/template-style.css" }}
{{ $style := $templateStyle | resources.ExecuteAsTemplate "css/style.css" . }}
<link rel="stylesheet" type="text/css" href="{{ $style.Permalink }}">
```

After running `hugo` to generate your site, the CSS file would be created at `public/css/style.css`. 
