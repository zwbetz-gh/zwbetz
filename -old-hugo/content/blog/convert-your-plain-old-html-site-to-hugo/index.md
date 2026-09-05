---
title: "Convert Your Plain Old HTML Site to Hugo"
date: 2019-05-19T20:48:38-05:00
toc: true
---

Once you have a grasp of HTML and CSS, we all know how easy it is to throw together a simple site: create your homepage, copy that HTML to other pages, then change the content. This process isn't too bad if your site only has a few pages. But things get out of hand quickly once the number of pages grow.

<!--more-->

This is where the static site generator, Hugo, comes in handy. Its templating language keeps things DRY, and its built-in HTTP server allows you to preview local changes instantly. 

## Original HTML

As an example, let's say your original HTML looks like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="/css/some-style.css">
    <title>
      <!-- some title, which differs per page -->
    </title>
  </head>
  <body>
    <header>
      <!-- some header -->
    </header>
    <main>
      <!-- some content, which differs per page -->
    </main>
    <footer>
      <!-- some footer -->
    </footer>
  </body>
</html>
```

## Create the site skeleton

First, create the site skeleton by running:

```
hugo new site <your-site>
```

## Template: baseof

The baseof template is, well, the "base" template, and we'll configure the other templates to inherit from it. 

Notice the only HTML that differs per page are the `<title>` and `<main>` elements.

For the `<title>` element, we'll display it as `Page Title | Site Title` for regular pages, then as `Site Title` for the homepage. 

For the `<main>` element, we'll use a block, which means individual pages can define what goes here.  

Create file: `layouts/_default/baseof.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="/css/some-style.css">
    {{ $title := site.Title }}
    {{ if not .IsHome }}
      {{ $title = printf "%s | %s" .Title site.Title }}
    {{ end }}
    <title>
      {{ $title }}
    </title>
  </head>
  <body>
    <header>
      <!-- some header -->
    </header>
    <main>
      {{ block "main" . }}{{ end }}
    </main>
    <footer>
      <!-- some footer -->
    </footer>
  </body>
</html>
```

## Template: single

The single template is for regular pages, e.g. About, Contact, etc.

Create file: `layouts/_default/single.html`

```html
{{ define "main" }}

<h1>{{ .Title }}</h1>
{{ .Content }}

{{ end }}
```

## Template: index

The index template is for your homepage. 

Create file: `layouts/index.html`

```
{{ define "main" }}

{{ .Content }}

{{ end }}
```

## Migrate CSS

You'll notice a `static` folder in your project. Everything in that folder gets copied as-is to the root of your site once it's generated. So copy your CSS file to `static/css/some-style.css`. 

## Migrate content

Now that your templates are setup, you'll need to migrate the `<main>` element content from each page into an HTML file. Let's say your current site has a homepage and a few regular pages. You can generate these files by running:

```
hugo new _index.html
hugo new page-1.html
hugo new page-2.html
hugo new page-3.html
```

`_index.html` is your homepage content. The other pages will be regular page content. 


## Edit config file

Open `config.toml` then edit the `baseURL` and `title` variables as desired. Then add this line, which will prevent taxonomy files from being generated:

```toml
disableKinds = ["taxonomy", "term"]
```

## Preview, then generate the site

Preview your site with `hugo server -D`. Then once you're satisfied, generate it with `hugo -D`. The output files will be under the `public` folder. 

## Project structure

Once you're finished, your project structure will look like:

```
$ tree
.
├── archetypes
│   └── default.md
├── config.toml
├── content
│   ├── _index.html
│   ├── page-1.html
│   ├── page-2.html
│   └── page-3.html
├── data
├── layouts
│   ├── _default
│   │   ├── baseof.html
│   │   └── single.html
│   └── index.html
├── public
│   ├── css
│   │   └── some-style.css
│   ├── index.html
│   ├── index.xml
│   ├── page-1
│   │   └── index.html
│   ├── page-2
│   │   └── index.html
│   ├── page-3
│   │   └── index.html
│   └── sitemap.xml
├── resources
│   └── _gen
│       ├── assets
│       └── images
├── static
│   └── css
│       └── some-style.css
└── themes

17 directories, 17 files
```

## Fixes

- Thanks to [@stefan-scholl](https://github.com/stefan-scholl) for [pointing out](https://github.com/zwbetz-gh/zwbetz/issues/6) that HTML-in-Markdown is disabled by default in newer versions of Hugo. You _could_ enable this in your config file. But since Hugo supports `.html` as a content type, I prefer to use that.
