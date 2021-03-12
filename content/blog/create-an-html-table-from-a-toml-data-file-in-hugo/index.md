---
title: "Create an HTML Table From a TOML Data File in Hugo"
date: 2018-11-12T22:54:47-06:00
publishdate: 2018-11-12
draft: false
toc: false
---

This post was inspired by a recent Hugo [discussion](https://discourse.gohugo.io/t/how-to-create-tables-more-simpler-without-markdown/15254). In a nutshell: instead of writing the table in markdown, the user wanted to build the table from a TOML data file. Below is _one_ way to solve this. 

Let's say the data file lived at `data/sample.toml`. The nice thing about doing it this way is that new rows/columns are easily added: 

```
[table]
  [[row]]
  data = ["Animal", "Sound"]
  [[row]]
  data = ["Cat", "Meow"]
  [[row]]
  data = ["Dog", "Woof"]
```

A shortcode would be created at `layouts/shortcodes/tomlTable.html`, then defined as:

```
{{ $arg := .Get 0 }}
{{ $dataFile := index .Site.Data $arg }}
{{ $.Scratch.Set "count" 0 }}

<table>
{{ range $table := $dataFile }}  
  {{ range $row := $table }}
    <tr>
    {{ range $datas := $row }}
      {{ range $data := $datas }}
        {{ if eq 0 ($.Scratch.Get "count") }}
        <th> 
          {{ . }}
        </th>
        {{ else }}
        <td> 
          {{ . }}
        </td>
        {{ end }}
      {{ end }}
    {{ end }}
    </tr>
    {{ $.Scratch.Add "count" 1 }}
  {{ end }}
{{ end }}
</table>
```

It could then be used in a markdown file like this, where `"sample"` is just the name of the TOML data file:

```
{{</* tomlTable "sample" */>}}
```

And the output would be:

{{< tomlTable "sample" >}}
