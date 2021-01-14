---
title: "My collection of useful bash functions"
date: 2019-05-30T21:39:48-05:00
tags: [command-line]
toc: true
show_comments: true
---

**UPDATE:** THIS ARTICLE IS NO LONGER MAINTAINED. My dotfiles now live in git. Please see <https://github.com/zwbetz-gh/dotfiles>.

---

This is a living document. If relevant, I include an example usage after the function definition. Functions are geared towards Mac, but can be easily adapted to Linux. 

<!-- UPDATE THIS WHEN ADDING A NEW FUNC -->
For easy copy-pasting, here they are in [plain text](/dotfiles). 

## bash_profile_open

Open `.bash_profile` with vscode:

```
bash_profile_open() {
  code ~/.bash_profile
}
```

## bash_profile_source

Source `.bash_profile` changes:

```
bash_profile_source() {
  source ~/.bash_profile
}
```

## pretty_print_path

Pretty print `PATH`:

```
pretty_print_path() {
  echo $PATH | tr ':' '\n'
}
```

```
$ pretty_print_path
/home/zwbetz/bin
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
```

## log

Log something and timestamp it:

```
log() {
  echo -e "[$(date +'%a %F %T %z')] ${@}"
}
```

```
$ log Some text here
[Thu 2019-05-30 21:58:08 -0500] Some text here
```

## to_lowercase

Convert string to lowercase:

```
to_lowercase() {
  local input="$([[ -p /dev/stdin ]] && cat - || echo "$@")"
  [[ -z "$input" ]] && return 1 
  echo "$input" | tr '[:upper:]' '[:lower:]' 
}
```

```
$ to_lowercase SOME TEXT
some text
```

```
$ echo SOME TEXT | to_lowercase 
some text
```

## to_uppercase

Convert string to uppercase:

```
to_uppercase() {
  local input="$([[ -p /dev/stdin ]] && cat - || echo "$@")"
  [[ -z "$input" ]] && return 1 
  echo "$input" | tr '[:lower:]' '[:upper:]' 
}
```

```
$ to_uppercase some text
SOME TEXT
```

```
$ echo some text | to_uppercase 
SOME TEXT
```

## length

Get string length:

```
length() {
  local input="$([[ -p /dev/stdin ]] && cat - || echo "$@")"
  [[ -z "$input" ]] && return 1 
  echo "${#input}"
}
```

```
$ length gohugo
6
```

```
$ echo gohugo | length 
6
```

## iso_8601_date

Get the current date in ISO 8601 format, as UTC.  

```
iso_8601_date() {
  date -u +'%Y-%m-%dT%H:%M:%SZ'
}
```

```
$ iso_8601_date
2019-06-12T00:34:41Z
```

## timestamp

Generate a file-friendly timestamp. 

```
timestamp() {
  date +'%Y-%m-%d_%H-%M-%S'
}
```

```
$ timestamp
2019-06-11_19-34-58
```

```
$ touch foo_$(timestamp).txt
$ ls
foo_2019-06-11_19-34-58.txt
```

## count_bytes

```
count_bytes() {
  wc -c < "$1" | tr -d ' '
}
```

```
$ printf "My life has been the poem I would have writ\nBut I could not both live and utter it.\n" > foo.txt
$ count_bytes foo.txt
84
```

## count_chars

```
count_chars() {
  wc -m < "$1" | tr -d ' '
}
```

```
$ printf "My life has been the poem I would have writ\nBut I could not both live and utter it.\n" > foo.txt
$ count_chars foo.txt
84
```

## count_words

```
count_words() {
  wc -w < "$1" | tr -d ' '
}
```

```
$ printf "My life has been the poem I would have writ\nBut I could not both live and utter it.\n" > foo.txt
$ count_words foo.txt
19
```

## count_lines

```
count_lines() {
  wc -l < "$1" | tr -d ' '
}
```

```
$ printf "My life has been the poem I would have writ\nBut I could not both live and utter it.\n" > foo.txt
$ count_lines foo.txt
2
```

## http_status_code

```
http_status_code() {
  local input="$([[ -p /dev/stdin ]] && cat - || echo "$@")"
  [[ -z "$input" ]] && return 1
  curl -I -s -o /dev/null -w "%{http_code}\n" "$input"
}
```

```
$ http_status_code https://gohugo.io/
200
```

```
$ echo https://gohugo.io/ | http_status_code
200
```

## merge_hugo_themes 

```
merge_hugo_themes() {
  git submodule update --remote --merge
  git add --all 
  git commit -m "Theme changes" 
  git push 
}
```
