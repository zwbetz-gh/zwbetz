---
title: "How to Use PurgeCSS With Hugo"
date: 2022-03-29T23:04:02-05:00
toc: true
draft: false
---

If you haven't heard yet, [PurgeCSS](https://purgecss.com/) is awesome. Say you wanna use [Bootstrap](https://getbootstrap.com/), but you only need _some_ of the classes? You can do that!

Instead of serving the _full_ CSS file with your site, you can use PurgeCSS to _purge_ the unused classes, which results in a much smaller CSS file. This tutorial shows you how to do that with my favorite static site generator, [Hugo](https://gohugo.io/).

<!--more-->

## Minimal, Reproducible Example

If you get stuck, refer to this [GitHub repo](https://github.com/zwbetz-gh/hugo-purgecss). It's a minimal, reproducible example of this tutorial.

## Tooling

1. Install Hugo
1. Install Node.js

## Write Stats

In your `config.toml` file, add this:

```toml
[build]
  writeStats = true
```

Or, If using a `config.yaml` file, add this:

```yaml
build:
  writeStats: true
```

This tells Hugo to write a `hugo_stats.json` file to the project root as part of the build. It includes all tags, classes, and ids from your `*.html` templates.

## Node Packages

Run this to install the necessary packages:

```
npm install postcss postcss-cli @fullhuman/postcss-purgecss
```

If the `package.json` file at the project root doesn't exist yet, this will create it.

If it's not already there, add `node_modules/` to your `.gitignore` file.

## PostCSS Config File

Create a `postcss.config.js` file at the project root with these contents:

```js
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./hugo_stats.json'],
  defaultExtractor: content => {
    const els = JSON.parse(content).htmlElements;
    return [
      ...(els.tags || []),
      ...(els.classes || []),
      ...(els.ids || []),
    ];
  }
});

module.exports = {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : [])
  ]
};
```

## HTML Template

In the HTML Template for your `<head>`, add this:

```html
{{ $css := resources.Get "css/bootstrap.css" | resources.PostCSS }}

{{ if hugo.IsProduction }}
  {{ $css = $css | minify | fingerprint | resources.PostProcess }}
{{ end }}

<link
  rel="stylesheet"
  href="{{ $css.RelPermalink }}"
  integrity="{{ $css.Data.Integrity }}"
>
```

This assumes:

- Your CSS file is at `assets/css/bootstrap.css`
- You want to minify and fingerprint the production version of this file

If these assumptions aren't true for you, modify the code accordingly.

## Use it

Cool, now we can use it.

Serve your site in development mode, which is the default:

```
hugo serve
```

Open your browser DevTools, go to the Network tab, then note the size of the CSS file.

Now, `Control` + `C` to stop it, then serve your site in production mode:

```
hugo serve --environment production
```

Notice the CSS file now has a _much smaller_ size.

## Environment

If you don't want to pass the `--environment production` option, you can set this env var:

```
HUGO_ENVIRONMENT=production
```

## Results

At the time of this writing, I bundle Bootstrap with some custom styles. When serving locally, the un-minified, un-purged size of the bundle is about 209 kB. The minified, purged size is about 14 kB. It's even smaller when served from the live site, about 4 kB, because it's compressed with [Brotli](https://en.wikipedia.org/wiki/Brotli).

## References

- <https://gohugo.io/hugo-pipes/postprocess/>
