---
title: "Check if a program exists from your bash script"
date: 2019-04-12T13:55:35-05:00
tags: [command-line, mac, linux]
toc: false
show_comments: true
---

Lately I've had the bash bug... and I'm continually impressed at what can be accomplished with this tool. Just the other day, I needed to check for the existence of some programs before doing the rest of my scripting work. Originally I was doing this with `which`, but after reading this [detailed stackoverflow answer](https://stackoverflow.com/a/677212), I'm now using the more portable `command -v`. A sample script and examples follow. 

## Script

```bash
#!/bin/bash

programs="${@}"

print_usage() {
  printf "Usage:\\n"
  printf "  ${0} <programs>\\n"
  printf "Examples:\\n"
  printf "  ${0} cp\\n"
  printf "  ${0} cp mv cat\\n"
}

check_for_program() {
  local program 
  program="${1}"

  printf "Checking for ${program}\\n  "
  command -v "${program}"

  if [[ "${?}" -ne 0 ]]; then
    printf "${program} is not installed, exiting\\n"
    exit 1
  fi 
}

main() {
  if [[ -z "${programs}" ]]; then 
    print_usage 
    exit 1
  fi 

  for p in ${programs}; do 
    check_for_program "${p}"
  done
}

main 
```

## Examples

```
$ ./check_for_program.bash
Usage:
  ./check_for_program.bash <programs>
Examples:
  ./check_for_program.bash cp
  ./check_for_program.bash cp mv cat

$ ./check_for_program.bash cp mv cat
Checking for cp
  /bin/cp
Checking for mv
  /bin/mv
Checking for cat
  /bin/cat

$ ./check_for_program.bash foobar
Checking for foobar
  foobar is not installed, exiting
```
