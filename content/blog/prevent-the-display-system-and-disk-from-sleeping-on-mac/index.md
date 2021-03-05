---
title: "Prevent the display, system, and disk from sleeping on Mac"
date: 2020-08-31T19:42:58-05:00
toc: false
---

When you step away from your Mac, it can be useful to prevent it from sleeping. Say you want to grab some coffee, but not deal with unlocking your screen and such when you get back. It's as easy as running a quick command.

Just add the below function to your `~/.bash_profile` then pick up the change with `source ~/.bash_profile`.

## Bash function

```shell
caffe() {
  if [[ ${#} -lt 1 ]]; then
    echo -e "Usage:\n  ${FUNCNAME[0]} HOURS"
    echo -e "Sample:\n  ${FUNCNAME[0]} 1"    
    return 1
  fi
  local hr=${1}
  local sec=$(python -c "print(${hr} * 60 * 60)")
  local day=$(python -c "print(round(${hr} / 24))")
  echo "${hr} hr == ${sec} sec == ${day} day"
  echo "Creating an assertion to prevent the display, system, and disk from sleeping"
  caffeinate -d -i -m -s -u -t ${sec}
}
```

## Usage

**Wrong:** Calling with no arg:

```
$ caffe
Usage:
  caffe HOURS
Sample:
  caffe 1
```

**Right:** Calling with 1 arg:

```
$ caffe 24
24 hr == 86400 sec == 1 day
Creating an assertion to prevent the display, system, and disk from sleeping
```
