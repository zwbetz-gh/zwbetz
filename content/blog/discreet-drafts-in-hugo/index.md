---
title: "Discreet Drafts in Hugo"
date: 2021-11-26T14:41:50-06:00
toc: true
draft: true
---

I sometimes pass around blog post drafts to friends and family for review. It's usually by email or text, which is fine. Yet it would be cool if I could give them a real link. A _discreet draft_, if you will.

<!--more-->

I did a bit of searching on the Hugo Discourse forums, and of course, I was not the first person with this idea. A few others had implemented custom solutions, but I didn't see a writeup of how to do it from scratch. When encountering a knowledge gap like this, my tutorial-spidey-sense tingles, and I knew it was time to take a stab.

## Demo

I made a [minimal, reproducible example on GitHub](https://github.com/zwbetz-gh/hugo-discreet-drafts), so if you're a "show me the money" type person, feel free to check that out first.

## Requirements

Before we dive into _how_ to do it, let's talk about _what_ it would look like. Also, note that my blog list relative URL is `/blog/`, but to keep things generic, we'll use `/posts/` since that is more common in Hugo-land. Okay, the requirements:

- The existing relative URL for the `/posts/` list would remain unchanged, and would still show "ready for the world" posts
- A new relative URL for the `/drafts/` list would be created, which would show only draft posts
- The actual markdown files would still live under the `content/posts` directory, and only the `draft` front matter param would be toggled as `true` or `false`

## Build Drafts

We'll start by telling Hugo to build drafts. You can do this one of a few ways:

- Pass the `-D` or `--buildDrafts` flag to `hugo`
- Set the `buildDrafts` param to `true` in your site config file (this is my personal preference)
- Set the `HUGO_BUILD_DRAFTS` environment variable to `true`

## Branch Bundles

Your `content/posts/_index.md` file likely already exists, since this lets you define the title for the post list template. But if it doesn't, create it.

Create a `content/drafts/_index.md` file as well. The `_index.md` should be the **only** file in the `content/drafts` directory. We just need it there so that Hugo will render the drafts template correctly.

## List Templates

The `layouts/drafts/list.html` and `layouts/posts/list.html` list templates will be the same, since they both reference the partial.

```html
{{ define "main" }}
  {{ partial "posts-list.html" . }}
{{ end }}
```

## Partial Posts List Template

Create a partial template at `layouts/partials/posts-list.html`. We use a partial because the layout logic for post vs draft list is virtually the same. The only difference is whether drafts are shown.

```html
{{ $isPosts := eq .RelPermalink "/posts/" }}

{{ $pages := where site.RegularPages.ByPublishDate.Reverse "Section" "==" "posts" }}

{{ if $isPosts }}
  {{ $pages = where $pages "Draft" "==" false }}
{{ else }}
  {{ $pages = where $pages "Draft" "==" true }}
{{ end }}

<h1>{{ .Title }}</h1>

<ul>
{{ range $pages }}
  <li>
    <a href="{{ .RelPermalink }}">{{ .Title }}</a>
  </li>
{{ end }}
</ul>
```
