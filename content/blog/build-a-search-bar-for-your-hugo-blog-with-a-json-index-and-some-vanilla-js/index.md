---
title: "Build a Search Bar for Your Hugo Blog With a JSON Index and Some Vanilla JS"
date: 2021-03-06T22:21:55-06:00
toc: true
---

My blog has become a personal knowledge base of sorts. As it's grown, doing the usual `Command` + `F` for browser-search doesn't always cut it. I sometimes need to search for keywords within a blog post, yet only titles are shown on the blog list page. So, that's my problem, but how to fix it?

Solutions do exist, but they entail connecting to an external search service, or pulling in a large JS framework. I wanted to keep things as close to home as possible and use good ole vanilla JS.

After much consideration, I added a simple search bar. In a nutshell, it uses a JSON index to search against, then re-renders the blog list on each `keyup` event.

I'm documenting the relevant bits in case it's useful for someone else. Let's dive in.

## Sister Links

- **Demo:** <https://build-a-search-bar-for-your-hugo-blog.netlify.app>
- **GitHub:** <https://github.com/zwbetz-gh/build-a-search-bar-for-your-hugo-blog-with-a-json-index-and-some-vanilla-js>

## Prerequisites

- Hugo version `0.81.0` or higher is required (since newlines are used in the template dictionaries for readability)

## Files

### Config

[`config.yaml`](https://github.com/zwbetz-gh/build-a-search-bar-for-your-hugo-blog-with-a-json-index-and-some-vanilla-js/blob/main/config.yaml)

In your config file, set the output formats for the homepage. Then add search-related params.

```yaml
# ...

outputs:
  home:
    - HTML
    - RSS
    - JSON

params:
  search: true
  search_minify: false
```

### Blog List Template

[`layouts/blog/list.html`](https://github.com/zwbetz-gh/build-a-search-bar-for-your-hugo-blog-with-a-json-index-and-some-vanilla-js/blob/main/layouts/blog/list.html)

This is a fairly normal blog list template, with a few extras:

- search bar
- regex mode checkbox
- page count

```html
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ if site.Params.search }}
  <input
    id="search"
    class="form-control"
    type="text"
    aria-label="Case-insensitive search by title, content, or publish date"
  >
  <div id="regex_mode_form" class="form-check">
    <input id="regex_mode" class="form-check-input" type="checkbox">
    <label class="form-check-label" for="regex_mode">
      Regex mode
    </label>
  </div>
  {{ end }}
  <p id="count">
    Count: {{ len .Pages }}
  </p>
  <ul id="list">
    {{ range .Pages.ByPublishDate.Reverse }}
    <li>
      <span>{{ .PublishDate.Format "2006-01-02" }}</span>
      <a href="{{ .RelPermalink }}">{{ .Title }}</a>
    </li>
    {{ end }}
  </ul>
{{ end }}
```

### JSON Index

[`layouts/index.json.json`](https://github.com/zwbetz-gh/build-a-search-bar-for-your-hugo-blog-with-a-json-index-and-some-vanilla-js/blob/main/layouts/index.json.json)

This is part 1 of 2 of the magic. It iterates all blog posts, then creates a list of relevant fields: `Title`, `PublishDateFormatted`, and `PlainContent`. We configure whether to minify the JSON output with the `search_minify` param.

```go
{{- $blog := slice -}}

{{- range where site.RegularPages.ByPublishDate.Reverse "Section" "==" "blog" -}}
  {{- $item := dict
    "Title" .Title
    "PublishDateFormatted" (.PublishDate.Format "2006-01-02")
    "RelPermalink" .RelPermalink
    "PlainContent" .Plain -}}

  {{- $blog = $blog | append $item -}}
{{- end -}}

{{- $object := dict "blog" $blog -}}

{{- if (eq site.Params.search_minify true) -}}
  {{- $object | jsonify -}}
{{- else -}}
  {{- $jsonifyOptions := dict "indent" "  " -}}
  {{- $object | jsonify $jsonifyOptions -}}
{{- end -}}
```

### JS

[`assets/js/search.js`](https://github.com/zwbetz-gh/build-a-search-bar-for-your-hugo-blog-with-a-json-index-and-some-vanilla-js/blob/main/assets/js/search.js)

This is part 2 of 2 of the magic. Here's how it works:

- If the search bar exists on the page, then:
    - Fetch the JSON index. Before the request, disable the search bar and show a loading message. Once the request completes, enable the search bar and show a placeholder. Keep two copies of the JSON index. One original, one filtered, so they can be compared
    - Add an event listener to the search bar to listen for `keyup` events
- On each `keyup` event:
    - If regex mode is **not** checked, then uppercase the search query and compare it against the uppercased index fields. If regex mode **is** checked, then test the regex query against the uppercased index fields. Either way, if there is a match, add it to the filtered list
    - Re-render the count by checking the length of the filtered list
    - Re-render the blog list. This code will look different for your blog because you must represent your UI in JS. Mine is fairly simple because it's just a `ul` element

```js
(function () {
  const SEARCH_ID = 'search';
  const REGEX_MODE_ID = 'regex_mode';
  const COUNT_ID = 'count';
  const LIST_ID = 'list';

  let list = null;
  let filteredList = null;

  const getDuration = (startTime, endTime) => (endTime - startTime).toFixed(2);

  const getSearchEl = () => document.getElementById(SEARCH_ID);
  const getRegexModeEl = () => document.getElementById(REGEX_MODE_ID);
  const getCountEl = () => document.getElementById(COUNT_ID);
  const getListEl = () => document.getElementById(LIST_ID);

  const disableSearchEl = () => {
    getSearchEl().disabled = true;
    getSearchEl().placeholder = 'Loading ...';
  };

  const enableSearchEl = () => {
    getSearchEl().disabled = false;
    getSearchEl().placeholder =
      'Case-insensitive search by title, content, or publish date';
  };

  const fetchJson = () => {
    const startTime = performance.now();
    disableSearchEl();
    const url = `${window.location.origin}/index.json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        list = data.blog;
        filteredList = data.blog;
        enableSearchEl();
        console.log(
          `fetchJson took ${getDuration(startTime, performance.now())} ms`
        );
      })
      .catch((error) =>
        console.error(`Failed to fetch JSON index: ${error.message}`)
      );
  };

  const filterList = (regexMode) => {
    const regexQuery = new RegExp(getSearchEl().value, 'i');
    const query = getSearchEl().value.toUpperCase();
    filteredList = list.filter((item) => {
      const title = item.Title.toUpperCase();
      const content = item.PlainContent.toUpperCase();
      const publishDate = item.PublishDateFormatted.toUpperCase();
      if (regexMode) {
        return (
          regexQuery.test(title) ||
          regexQuery.test(content) ||
          regexQuery.test(publishDate)
        );
      } else {
        return (
          title.includes(query) ||
          content.includes(query) ||
          publishDate.includes(query)
        );
      }
    });
  };

  const renderCount = () => {
    const count = `Count: ${filteredList.length}`;
    getCountEl().textContent = count;
  };

  const renderList = () => {
    const newList = document.createElement('ul');
    newList.id = LIST_ID;

    filteredList.forEach((item) => {
      const li = document.createElement('li');

      const publishDate = document.createElement('span');
      publishDate.textContent = item.PublishDateFormatted;

      const titleLink = document.createElement('a');
      titleLink.href = item.RelPermalink;
      titleLink.textContent = item.Title;

      li.appendChild(publishDate);
      li.appendChild(document.createTextNode(' '));
      li.appendChild(titleLink);

      newList.appendChild(li);
    });

    const oldList = getListEl();
    oldList.replaceWith(newList);
  };

  const handleEvent = () => {
    const startTime = performance.now();
    const regexMode = getRegexModeEl().checked;
    filterList(regexMode);
    renderCount();
    renderList();
    console.log(
      `handleEvent took ${getDuration(startTime, performance.now())} ms`
    );
  };

  const addEventListeners = () => {
    getSearchEl().addEventListener('keyup', handleEvent);
    getRegexModeEl().addEventListener('change', handleEvent);
  };

  const main = () => {
    if (getSearchEl()) {
      fetchJson();
      addEventListeners();
    }
  };

  main();
})();
```

### Import the JS

Import the JS on all pages. This is usually done in your `layouts/_default/baseof.html` template. [Sample](https://github.com/zwbetz-gh/build-a-search-bar-for-your-hugo-blog-with-a-json-index-and-some-vanilla-js/blob/main/layouts/partials/script.html)

```html
{{ if site.Params.search }}
  {{ $searchJs := resources.Get "js/search.js"
    | resources.ExecuteAsTemplate "js/search.js" .
    | fingerprint }}
  <script src="{{ $searchJs.RelPermalink }}"></script>
{{ end }}
```

## References

- Hugo
    - [Homepage output formats](https://gohugo.io/templates/output-formats/#output-formats-for-pages)
    - [Homepage layout lookup order](https://gohugo.io/templates/lookup-order/#examples-layout-lookup-for-home-page)
    - [`jsonify` function](https://gohugo.io/functions/jsonify/#readout)
    - [Newlines in template dictionaries](https://github.com/gohugoio/hugo/releases/tag/v0.81.0)
    - [`.Plain` page variable](https://gohugo.io/variables/page/#page-variables)
- JS
    - [`document.querySelector()` function](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
    - [`addEventListener()` function](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
    - [`keyup` event](https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event)
    - [`fetch()` api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
    - [`window.location.origin`](https://developer.mozilla.org/en-US/docs/Web/API/Location/origin#examples)
    - [`filter()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
    - [`replaceWith()` function](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith)
    - [`RegExp` flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp#parameters)
    - [`test()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
    - [`change` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)
