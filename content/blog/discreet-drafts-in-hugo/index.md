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

We'll start by telling Hugo to build drafts. Do one of the following steps:

- Pass the `-D` or `--buildDrafts` flag to `hugo`
- Set the `buildDrafts` param to `true` in your site config file (this is my personal preference)
- Set the `HUGO_BUILD_DRAFTS` environment variable to `true`

## Branch Bundles

Your `content/posts/_index.md` file likely already exists, since this lets you define the title for the post list template. But if it doesn't, create it.

Create a `content/drafts/_index.md` file as well. The `_index.md` should be the **only** file in the `content/drafts` directory. We just need it there so that Hugo will render the drafts template correctly.

## List Templates

The `layouts/drafts/list.html` and `layouts/posts/list.html` list templates will be the same since they both reference the partial.

```html
{{ define "main" }}
  {{ partial "posts-list.html" . }}
{{ end }}
```

## Partial Posts List Template

Create a partial template at `layouts/partials/posts-list.html`. We use a partial here because the layout logic for the post vs draft list is virtually the same. The only difference is whether drafts are shown.

Okay, let's break it down. We start by defining an `$isPosts` variable. If `$isPosts` is true, we know the current context is the posts list. Otherwise, we know the drafts list is the current context.

Then we define a `$pages` variable which gets all the pages in the posts section.

Then we do our filtering. If `$isPosts` is true, we reassign `$pages` with all **non-draft** posts. Otherwise, we reassign `$pages` with all **draft** posts.

Finally, we do some things you're used to: show the page title, and iterate the `$pages` to create a list of posts.

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

## RSS Feed

When writing this tutorial, an unexpected, but pleasant [issue](https://github.com/zwbetz-gh/zwbetz/issues/9) was opened 🙂. Since drafts are now built by Hugo, we must tell the RSS feed template to exclude them.

Don't let this code scare you. It's the [default Hugo RSS template](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/_default/rss.xml), and I copied it as-is. I only added this line:

```xml
{{- $pages = where $pages "Draft" "==" false -}}
```

```xml
{{- $pctx := . -}}
{{- if .IsHome -}}{{ $pctx = .Site }}{{- end -}}
{{- $pages := slice -}}
{{- if or $.IsHome $.IsSection -}}
{{- $pages = $pctx.RegularPages -}}
{{- else -}}
{{- $pages = $pctx.Pages -}}
{{- end -}}
{{- $pages = where $pages "Draft" "==" false -}}
{{- $limit := .Site.Config.Services.RSS.Limit -}}
{{- if ge $limit 1 -}}
{{- $pages = $pages | first $limit -}}
{{- end -}}
{{- printf "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>" | safeHTML }}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{{ if eq  .Title  .Site.Title }}{{ .Site.Title }}{{ else }}{{ with .Title }}{{.}} on {{ end }}{{ .Site.Title }}{{ end }}</title>
    <link>{{ .Permalink }}</link>
    <description>Recent content {{ if ne  .Title  .Site.Title }}{{ with .Title }}in {{.}} {{ end }}{{ end }}on {{ .Site.Title }}</description>
    <generator>Hugo -- gohugo.io</generator>{{ with .Site.LanguageCode }}
    <language>{{.}}</language>{{end}}{{ with .Site.Author.email }}
    <managingEditor>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</managingEditor>{{end}}{{ with .Site.Author.email }}
    <webMaster>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</webMaster>{{end}}{{ with .Site.Copyright }}
    <copyright>{{.}}</copyright>{{end}}{{ if not .Date.IsZero }}
    <lastBuildDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700" | safeHTML }}</lastBuildDate>{{ end }}
    {{- with .OutputFormats.Get "RSS" -}}
    {{ printf "<atom:link href=%q rel=\"self\" type=%q />" .Permalink .MediaType | safeHTML }}
    {{- end -}}
    {{ range $pages }}
    <item>
      <title>{{ .Title }}</title>
      <link>{{ .Permalink }}</link>
      <pubDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700" | safeHTML }}</pubDate>
      {{ with .Site.Author.email }}<author>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</author>{{end}}
      <guid>{{ .Permalink }}</guid>
      <description>{{ .Summary | html }}</description>
    </item>
    {{ end }}
  </channel>
</rss>
```

## Closing Thoughts

The `draft` front matter param is arbitrary in this case. You could have picked a new param, like `preview`, and maybe even saved yourself some trouble. (I'm looking at you, RSS feed).

With this setup, the drafts are still public, in the sense that anyone with the right URL can read them. The idea is that you _don't advertise_ the drafts list, and only share it as needed.

You could take it further and sprinkle a little JavaScript to add password-protection. But if someone really wants to read it, they will open DevTools and tinker their way in.

Another potential solution for this problem is to deploy your draft posts to a different environment. Platforms like Netlify give you this option, as you can specify different build configuration per environment.

Anyways, I hope this was helpful. If only I would spend more time writing, and less time tweaking. Alas, ha.
