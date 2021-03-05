---
title: "Generate Lorem Ipsum with a Hugo shortcode"
date: 2018-12-03T21:34:26-06:00
publishdate: 2018-12-02
draft: false
toc: false
---

Inspired by this [discussion](https://discourse.gohugo.io/t/lorem-ipsum-shortcode-for-hugo/15604), I thought it'd be useful to generate Lorem Ipsum with a Hugo shortcode. 

## Definition

Let's say you wanted to generate 20 paragraphs of dummy text. You could create a shortcode called `loremGen.html` and define it like:

```
{{ $lorem := "<p><em>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan rutrum consectetur. Vivamus eu ex quis leo posuere convallis. Nunc laoreet velit sed ullamcorper mollis. Mauris porta consequat tortor aliquet maximus. Quisque sed purus condimentum orci sodales aliquam non vel tellus. Praesent lorem arcu, scelerisque a semper at, iaculis eget purus. Etiam ullamcorper orci a porttitor sodales. Nullam tincidunt nibh et hendrerit auctor. Quisque vitae quam ut lorem vehicula condimentum. In commodo cursus elit, non volutpat lectus sagittis non.</em></p>" }}

{{ range seq (.Get 0) }}
  {{ $lorem | safeHTML }}
{{ end }}
```

The `seq` function ([see the docs](https://gohugo.io/functions/seq/)) works well here since it generates a sequence of integers -- and we define how many integers to generate based on the argument we pass to the shortcode. 


## Usage 
An example usage: 

```
{{</* loremGen 20 */>}}
```

## Output 

For fun, here's the output:

{{< loremGen 20 >}}
