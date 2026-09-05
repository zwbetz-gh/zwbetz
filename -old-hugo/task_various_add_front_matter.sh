#!/usr/bin/env bash

front_matter="show_comments: true"
dir="content/post"
pages="$(find $dir -name "*.md")"
tmp="tmp.md"

for page in $pages; do 
  awk -v front_matter="$front_matter" '/---/{
    c++;
    if (c==2) {
      sub("---",front_matter "\n---")
    }
  } 1' $page > $tmp
  mv $tmp $page
done
