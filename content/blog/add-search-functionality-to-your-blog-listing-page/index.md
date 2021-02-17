---
title: "Add search functionality to your blog listing page"
date: 2020-06-14T20:22:51-05:00
tags: [javascript, search]
toc: false
show_comments: false
---

This is something that I recently added to my [uswds hugo theme](https://github.com/zwbetz-gh/uswds-hugo-theme). I'm documenting it here for others, and to remind myself in the future. Code samples and a demo are below. In a nutshell, here's how it works:

A text input element is used for searching, and a paragraph element holds the list count. It's assumed that your blog posts, or whatever content it happens to be, are in a plain old unordered list element, aka a `ul`.

The js code is wrapped in a [Immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) so that the global scope is not polluted. 

A function is defined that updates the count, `updateCount`. Another function is defined that runs when an event happens, `onEvent`, which does a few things
- Gets the entered search term then converts it to uppercase
- Gets the list element
- For each list item in the list, convert the inner text to uppercase, then compare it to the entered search term. If they match, show that list item, and increment a counter. If they don't match, hide that list item
- Call `updateCount` with the counter

Lastly, the text input is grabbed by id. If it exists, then an event listener is added that calls `onEvent` on every [keyup](https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event) event.

## HTML

```html
<input
  id="sample-search"
  type="text"
  placeholder="Search movies by title..."
  aria-label="Search movies by title"
/>

<p id="sample-list-count">Count: 10</p>

<ul id="sample-list">
  <li><a href="https://en.wikipedia.org/wiki/The_Siege_of_Jadotville_(film)">The Siege of Jadotville</a></li>
  <li><a href="https://en.wikipedia.org/wiki/The_Big_Short_(film)">The Big Short</a></li>
  <li><a href="https://en.wikipedia.org/wiki/The_Accountant_(2016_film)">The Accountant</a></li>
  <li><a href="https://en.wikipedia.org/wiki/Batman_Begins">Batman Begins</a></li>
  <li><a href="https://en.wikipedia.org/wiki/Scrapheap_Challenge">Junkyard Wars</a></li>
  <li><a href="https://en.wikipedia.org/wiki/How_It%27s_Made">How It’s Made</a></li>
  <li><a href="https://en.wikipedia.org/wiki/Never_Back_Down">Never Back Down</a></li>
  <li><a href="https://en.wikipedia.org/wiki/The_Prestige_(film)">The Prestige</a></li>
  <li><a href="https://en.wikipedia.org/wiki/Shot_Caller_(film)">Shot Caller</a></li>
  <li><a href="https://en.wikipedia.org/wiki/Cloud_Atlas_(film)">Cloud Atlas</a></li>
</ul>
```

## JavaScript

```js
(function () {
  function updateCount(count) {
    var listCount = document.getElementById("sample-list-count");
    listCount.innerText = "Count: " + count;
  }

  function onEvent() {
    var count = 0;
    var filter = search.value.toUpperCase();
    var list = document.getElementById("sample-list");
    var listItems = list.getElementsByTagName("li");
    for (i = 0; i < listItems.length; i++) {
      var item = listItems[i];
      var text = item.innerText.toUpperCase();
      if (text.indexOf(filter) > -1) {
        item.style.display = "";
        count++;
      } else {
        item.style.display = "none";
      }
    }
    updateCount(count);
  }

  var search = document.getElementById("sample-search");
  if (search) {
    search.addEventListener("keyup", onEvent);
  }
})();
```

## Demo

<input
  class="usa-input"
  id="sample-search"
  type="text"
  placeholder="Search movies by title..."
  aria-label="Search movies by title"
/>

<p id="sample-list-count">Count: 10</p>

<ul id="sample-list" style="height: 300px">
  <li><a href="https://en.wikipedia.org/wiki/The_Siege_of_Jadotville_(film)">The Siege of Jadotville</a></li>
  <li><a href="https://en.wikipedia.org/wiki/The_Big_Short_(film)">The Big Short</a></li>
  <li><a href="https://en.wikipedia.org/wiki/The_Accountant_(2016_film)">The Accountant</a></li>
  <li><a href="https://en.wikipedia.org/wiki/Batman_Begins">Batman Begins</a></li>
  <li><a href="https://en.wikipedia.org/wiki/Scrapheap_Challenge">Junkyard Wars</a></li>
  <li><a href="https://en.wikipedia.org/wiki/How_It%27s_Made">How It’s Made</a></li>
  <li><a href="https://en.wikipedia.org/wiki/Never_Back_Down">Never Back Down</a></li>
  <li><a href="https://en.wikipedia.org/wiki/The_Prestige_(film)">The Prestige</a></li>
  <li><a href="https://en.wikipedia.org/wiki/Shot_Caller_(film)">Shot Caller</a></li>
  <li><a href="https://en.wikipedia.org/wiki/Cloud_Atlas_(film)">Cloud Atlas</a></li>
</ul>

<script>
(function () {
  function updateCount(count) {
    var listCount = document.getElementById("sample-list-count");
    listCount.innerText = "Count: " + count;
  }

  function onEvent() {
    var count = 0;
    var filter = search.value.toUpperCase();
    var list = document.getElementById("sample-list");
    var listItems = list.getElementsByTagName("li");
    for (i = 0; i < listItems.length; i++) {
      var item = listItems[i];
      var text = item.innerText.toUpperCase();
      if (text.indexOf(filter) > -1) {
        item.style.display = "";
        count++;
      } else {
        item.style.display = "none";
      }
    }
    updateCount(count);
  }

  var search = document.getElementById("sample-search");
  if (search) {
    search.addEventListener("keyup", onEvent);
  }
})();
</script>
