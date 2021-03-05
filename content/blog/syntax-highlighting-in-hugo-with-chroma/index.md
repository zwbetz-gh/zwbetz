---
title: "Syntax highlighting in Hugo with Chroma"
date: 2019-01-21T13:08:15-06:00
toc: false
show_comments: true
---

[Hugo](https://gohugo.io/) has built-in syntax highlighting, provided by [Chroma](https://github.com/alecthomas/chroma). To use it, you just need 2 lines in your `config.toml` file:

```
pygmentsCodefences = true
pygmentsStyle = "pygments"
```

In the above, `pygments` is the name of the highlight style. To pick a different style, see the [style gallery](https://xyproto.github.io/splash/docs/all.html). 

Once you choose a style, you can highlight your code by using markdown code fences (3 backticks), then specifying the programming language. For example, say we wanted to highlight some HTML:

````
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```
````

The output would be:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```
