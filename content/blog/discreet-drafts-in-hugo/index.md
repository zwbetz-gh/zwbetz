---
title: "Discreet Drafts in Hugo"
date: 2021-11-26T14:41:50-06:00
toc: true
draft: false
---

I sometimes pass around blog post drafts to friends and family for review. It's usually by email or text, which is fine. Yet, it would be cool if I could give them a real link, a _discreet draft_, if you will.

<!--more-->

I did a bit of searching on the Hugo Discourse forums, and of course, I was not the first person with this idea. A few others had implemented custom solutions, but I didn't see a writeup of how to do it from scratch. When encountering a knowledge gap like this, my tutorial-spidey-sense tingles, and I knew it was time to take a stab.

## Demo

I made a [minimal, reproducible example on GitHub](https://github.com/zwbetz-gh/hugo-discreet-drafts), so if you're a "show me the money" type person, feel free to check that out first.

## Requirements

Before we dive into _how_ to do it, let's talk about _what_ it would look like. Also, note that my blog list relative URL is `/blog/`, but to keep things generic, we'll use `/posts/` since that's more common in Hugo-land. Okay, the requirements:

- The existing relative URL for the `/posts/` list would remain unchanged, and would still show "ready for the world" posts
- A new relative URL for the `/drafts/` list would be created, which would show only draft posts
- The actual markdown files would still live under the `content/posts` directory, and only the `draft` front matter param would be toggled as `true` or `false`

## Build Drafts

We'll start by telling Hugo to build drafts. Do one of the following steps:

- Pass the `-D` or `--buildDrafts` flag to `hugo`
- Set the `buildDrafts` param to `true` in your site config file (this is my personal preference)
- Set the `HUGO_BUILD_DRAFTS` environment variable to `true`

## Branch Bundles

Your `content/posts/_index.md` file _likely_ already exists, since this lets you define the title for the post list template. But if it doesn't, create it.

Create a `content/drafts/_index.md` file. Then in the front matter set `draft` to `true`. This `_index.md` file should be the **only** file in the `content/drafts` directory. We just need it there so that Hugo will render the drafts template correctly.

```markdown
---
title: "Drafts"
draft: true
---

```

## List Template

The following list templates will be the **same** because they both reference the partial.

- `layouts/drafts/list.html`
- `layouts/posts/list.html`

Create **each** file with the following:

```html
{{ define "main" }}
  {{ partial "posts-list.html" . }}
{{ end }}
```

We use a partial here because the layout logic for the post vs draft list is virtually the same. The only difference is whether drafts are shown.

Okay, let's break it down. We start by defining an `$isPosts` variable. If `$isPosts` is true, we know the current context is the posts list. Otherwise, we know the drafts list is the current context.

Then we define a `$pages` variable which gets all the pages in the posts section.

Then we do our filtering. If `$isPosts` is true, we reassign `$pages` with all **non-draft** posts. Otherwise, we reassign `$pages` with all **draft** posts.

Finally, we do some things you're used to: show the page title, and iterate the `$pages` to create a list of posts.

Create file `layouts/partials/posts-list.html` with the following:

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

## RSS Feed Template

When writing this tutorial, an unexpected, but pleasant [issue](https://github.com/zwbetz-gh/zwbetz/issues/9) was opened 🙂. Since drafts are now built by Hugo, we must tell the RSS feed template to exclude them.

Don't let this code scare you. It's the [default Hugo RSS template](https://github.com/gohugoio/hugo/blob/5f42590144579c318a444ea2ce46d5c3fbbbfe6e/tpl/tplimpl/embedded/templates/_default/rss.xml), and I copied it as-is. I only added this line:

```xml
{{- $pages = where $pages "Draft" "==" false -}}
```

The following list templates will be the **same** because they both reference the partial.

- `layouts/rss.xml`
- `layouts/posts/rss.xml`

Create **each** file with the following:

```xml
{{- partial "rss.xml" . -}}
```

We use a partial again because for the RSS template, the code is actually the same, and only the context is different.

Create file `layouts/partials/rss.xml` with the following:

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

## Sitemap Template

I posted this tutorial on the [forums](https://discourse.gohugo.io/t/discreet-drafts/35779) and [@davidsneighbour](https://discourse.gohugo.io/u/davidsneighbour) pointed out that the sitemap template would need updating as well.

So let's fix that. Similarly to the previous section, we can tweak the [default Hugo sitemap template](https://github.com/gohugoio/hugo/blob/5f42590144579c318a444ea2ce46d5c3fbbbfe6e/tpl/tplimpl/embedded/templates/_default/sitemap.xml).

I changed this:

```
{{ range .Data.Pages }}
```

To be this:

```
{{ $pages := where .Data.Pages "Draft" "==" false }}
{{ range $pages }}
```

Create file `layouts/sitemap.xml` with the following:

```xml
{{ printf "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>" | safeHTML }}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  {{ $pages := where .Data.Pages "Draft" "==" false }}
  {{ range $pages }}
  <url>
    <loc>{{ .Permalink }}</loc>{{ if not .Lastmod.IsZero }}
    <lastmod>{{ safeHTML ( .Lastmod.Format "2006-01-02T15:04:05-07:00" ) }}</lastmod>{{ end }}{{ with .Sitemap.ChangeFreq }}
    <changefreq>{{ . }}</changefreq>{{ end }}{{ if ge .Sitemap.Priority 0.0 }}
    <priority>{{ .Sitemap.Priority }}</priority>{{ end }}{{ if .IsTranslated }}{{ range .Translations }}
    <xhtml:link
                rel="alternate"
                hreflang="{{ .Language.Lang }}"
                href="{{ .Permalink }}"
                />{{ end }}
    <xhtml:link
                rel="alternate"
                hreflang="{{ .Language.Lang }}"
                href="{{ .Permalink }}"
                />{{ end }}
  </url>
  {{ end }}
</urlset>
```

## Block Search Indexing

We don't want search engines to index draft pages, so let's use a [noindex meta tag](https://developers.google.com/search/docs/advanced/crawling/block-indexing) to prevent this.

Edit file `layouts/_default/baseof.html` with the following. Add it within the `head` element:

```html
{{ if eq .Draft true }}
  <meta name="robots" content="noindex">
{{ end }}
```

## Password Protection

For fun, let's add (naive) password protection. This will keep out nontechnical folks. But savvy readers will be able to bypass this with DevTools.

This little sprinkling of vanilla JavaScript does the job:

- Create `div`, `form`, and `input` elements
- Append the `input` to the `form`, the `form` to the `div`, and the `div` to the `body`
- Listen for the `submit` event of the `form`
- If the password is `please` then _"open sesame"_

Create file `assets/js/draft.js` with the following:

```js
(function () {
  const PASSWORD = 'please';
  const DIV_BACKGROUND_COLOR = '#fcfcfc';
  const DIV_ID = 'draft_div';
  const INPUT_ID = 'draft_input';

  const createDiv = () => {
    const div = document.createElement('div');
    div.id = DIV_ID;
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.left = 0;
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.backgroundColor = DIV_BACKGROUND_COLOR;
    return div;
  };

  const removeDiv = () => {
    const div = document.getElementById(DIV_ID);
    div.remove();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const inputPassword = document.getElementById(INPUT_ID).value;
    if (inputPassword === PASSWORD) {
      removeDiv();
    }
  };

  const createForm = () => {
    const form = document.createElement('form');
    form.addEventListener('submit', handleSubmit);
    return form;
  };

  const createInput = () => {
    const input = document.createElement('input');
    input.id = INPUT_ID;
    input.type = 'password';
    input.autocomplete = 'one-time-code';
    input.placeholder = 'Password';
    return input;
  };

  const main = () => {
    const div = createDiv();
    const form = createForm();
    const input = createInput();
    form.appendChild(input);
    div.appendChild(form);
    document.body.appendChild(div);
  };

  main();
})();
```

Edit file `layouts/_default/baseof.html` with the following. Add it to the end of the `body` element:

```html
{{ if eq .Draft true }}
  {{ $draftJs := resources.Get "js/draft.js"
    | minify
    | fingerprint }}
  <script
    src="{{ $draftJs.RelPermalink }}"
    integrity="{{ $draftJs.Data.Integrity }}"
  ></script>
{{ end }}
```

## Closing Thoughts

The `draft` front matter param is personal preference in this case. You could have created a new param, like `preview`. I chose to use `draft` since its meaning is clear.

With this setup, the drafts are still public, in the sense that anyone with the right URL can read them. The idea is that you _don't advertise_ the drafts list, and only share it as needed.

Anyways, I hope this was helpful. If only I would spend more time writing, and less time tweaking. Alas, ha.

## Alternatives

Rereading this tutorial, I admit it's a bit... involved. Here are some less friction alternatives.

You could make a new git branch for your (non draft) post, let your CI platform build it, then send that link to your readers. This is what [Mark Allison](https://markallison.co.uk/) does.

Another variant: Deploy a separate environment where drafts are built, then send your readers there.
