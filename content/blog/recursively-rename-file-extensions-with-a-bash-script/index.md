---
title: "Recursively Rename File Extensions With a Bash Script"
date: 2019-06-12T12:59:22-05:00
toc: false
---

I was recently [helping](https://discourse.gohugo.io/t/rendering-code-blocks-properly-from-md-files/19126/3?u=zwbetz) a Hugo user rename all their content files from `.md` to `.mmark`. Posting it here since it's useful for more than just Hugo projects. 

---

Script: 
```bash
#!/bin/bash

usage() {
  printf "Usage:\n  $0 <old ext> <new ext>\n"
}

if [[ $# -ne 2 ]]; then
  usage
  exit 1
fi

ext_old="$1"
ext_new="$2"

files="$(find . -type f -name "*.$ext_old")"

for file in $files; do
  basename="$(basename "$file")"
  filename="${basename%.*}"
  dirname="$(dirname "$file")"
  echo mv "$file" "$dirname"/"$filename"."$ext_new"
  mv "$file" "$dirname"/"$filename"."$ext_new"
done
```

Example usage:
```plain
$ ./script.bash
Usage:
  ./script.bash <old ext> <new ext>

$ find . -type f
./page-1.md
./script.bash
./some-dir/page-2.md

$ ./script.bash md mmark 
mv ./page-1.md ./page-1.mmark
mv ./some-dir/page-2.md ./some-dir/page-2.mmark

$ find . -type f
./page-1.mmark
./script.bash
./some-dir/page-2.mmark
```
