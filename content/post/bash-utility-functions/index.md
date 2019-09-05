---
title: "Bash utility functions"
date: 2019-03-18T14:31:08-05:00
tags: [command-line, mac, linux]
toc: false
show_comments: true
---

## border

Used by the `log` function to surround a message with borders. If no character is passed in, it uses the default (`=`).  

```bash
border() {
  local result
  local char

  if [[ -z "${1}" ]]; then
    char="="
  else
    char="${1:0:1}"
  fi 

  for i in {1..80}
  do
    result="${result}${char}"
  done

  echo ${result}
}

```

### Example

```
$ border
================================================================================
$ border #
################################################################################
```

## log

Log a message and date-time stamp it. 

```bash
log() {
  border
  echo -e "[$(date +'%Y-%m-%d %H:%M:%S')] ${@}"
  border
}
```

### Example

```
$ log "Hello world"
================================================================================
[2019-03-18 18:01:01] Hello world
================================================================================
```

## timer

Time another bash function. 

```bash
timer() {
  local start
  start=${SECONDS}

  "${@}"
  
  local duration
  duration=$((SECONDS - start))
  log "Total time: ${duration} sec"
}

```

### Example

```
$ timer log "How long does the log function take?"
================================================================================
[2019-03-18 18:01:01] How long does the log function take?
================================================================================
================================================================================
[2019-03-18 18:01:01] Total time: 0 sec
================================================================================
```

```
$ timer sleep 1
================================================================================
[2019-03-18 18:01:01] Total time: 1 sec
================================================================================
```
