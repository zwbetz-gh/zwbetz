---
title: "Pretty print Github markdown"
date: 2019-02-11T15:17:44-06:00
tags: [javascript, github]
toc: false
show_comments: true
---

If you want to pretty print your markdown docs in GitHub (GH), and your repo lives on the official github.com, then you can use [gitprint](https://gitprint.com/). But at work our GH is hosted internally, so this gitprint service does not work. 

So, I made my own. It grabs the div that contains the markdown doc (which from what I've seen always has an id of `readme`), clears the body, appends said div, then creates and appends a style to remove anchor coloring. 

To use it, (1) copy the below code:

```
javascript:(function(){

var readme = document.getElementById("readme");
document.body.innerHTML = "";
document.body.append(readme);

var style = document.createElement("style");
style.innerHTML = "a { color: inherit; }";
document.head.append(style);

})();
```

(2) Create a new bookmark, then (3) paste the above code into the URL line:

{{< figure 
img="chrome-bookmark.png" 
command="Resize" 
options="700x" 
caption="Google Chrome bookmark" >}}
