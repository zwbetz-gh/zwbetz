---
title: "Passing Input to a Bash Function via Arguments or stdin"
date: 2019-06-29T10:44:58-05:00
toc: false
---

I have a [collection of Bash functions](https://github.com/zwbetz-gh/dotfiles) that I often use. For some of them, I needed to ability to read input from all of the following:

<!--more-->

- positional arguments
- stdin (standard input)
- here-strings

This was not as straight-forward as I would have hoped. After much trial and error, though, here's what I came to. We'll use the `length` function as an example:

## Bash Function

```shell
length() {
  local input=""

  if [[ -p /dev/stdin ]]; then
    input="$(cat -)"
  else
    input="${@}"
  fi

  if [[ -z "${input}" ]]; then
    return 1
  fi

  echo "${#input}"
}
```

## Usage

It can be used in the following ways:

```
$ length "hey"
3
```

```
$ echo "hey" | length
3
```

```
$ length <<< echo "hey"
3
```

## How it Works

First, check if stdin was given:

```
[[ -p /dev/stdin ]]
```

If it was, then read from it:

```
cat -
```

If not, then read in all positional arguments:

```
${@}
```

All of this is assigned to the local variable `input`. Next, check if `input` is empty:

```
[[ -z "${input}" ]]
```

If it is, then return a non-zero exit code:

```
return 1
```

Finally, if `input` has a value, then get its length:

```
echo "${#input}"
```
