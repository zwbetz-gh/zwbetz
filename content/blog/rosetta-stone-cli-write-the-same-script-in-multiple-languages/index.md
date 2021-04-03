---
title: "Rosetta Stone CLI: Write the Same Script in Bash, Python, NodeJS, Groovy, and Ruby"
date: 2021-04-02T21:13:34-05:00
toc: true
---

TODO: replace projects link

To really appreciate a language, you have to compare it to others see how (differently) common tasks are done. In this fun little exercise, we'll write the same script in multiple languages.

Each script must meet these requirements:

1. Accept input like this: `<SCRIPT> [OPTIONS] -- <NAME>`
1. `[OPTIONS]` can be zero or multiple of
      1. `-h` or `--help`
      1. `-u` or `--uppercase`
      1. `-p <PREFIX>` or ` --prefix <PREFIX>`
1. If `-h` or `--help` is passed, print the usage, then exit with status code `0`
1. If  `-u` or `--uppercase` is passed, uppercase the output
1. If `-p <PREFIX>` or ` --prefix <PREFIX>` is passed, change the greeting prefix. If `<PREFIX>` is empty, handle the error
1. If an unknown option is passed, handle the error
1. Print this line
    ```
    Hello, <NAME>
    Your name backwards is <BACKWARDS_NAME>
    Today is yyyy-MM-dd
    Completed in <TIME> s
    ```
1. Read `<NAME>` from the 1st positional parameter. If the 1st positional parameter is empty, read from `stdin`. If `stdin` is empty, handle the error
1. `<BACKWARDS_NAME>` is the reverse string of `<NAME>`
1.  `<TIME>` is in seconds. Use 2 decimal places if possible
1. If an error is handled, print a message describing the error, print a message showing how to get help, then exit with status code `1`
1. Use as few external tools and libraries as possible


## Sample Usage

```
$ ./script --what
Unknown option: --what
For help, run: ./script --help
```

```
$ ./script -p
<PREFIX> cannot be empty
For help, run: ./script --help
```

```
$ ./script --
<NAME> cannot be empty
For help, run: ./script --help
```

```
$ ./script -- "Jane"
Hello, Jane
Your name backwards is enaJ
Today is 2021-04-02
Completed in 0 s
```

```
$ ./script -u -p "Woah" -- "Jane"
Woah, JANE
Your name backwards is ENAJ
Today is 2021-04-02
Completed in 0 s
```

```
$ echo "stdin" | ./script --uppercase --prefix "Woah"
Woah, STDIN
Your name backwards is NIDTS
Today is 2021-04-02
Completed in 0 s
```



## Bash

```shell
#!/usr/bin/env bash

HELP_USAGE="For help, run: ${0} --help"
NAME_USAGE="<NAME> cannot be empty"
PREFIX_USAGE="<PREFIX> cannot be empty"
USAGE="\
Usage:
  ${0} [OPTIONS] -- <NAME>

${NAME_USAGE}

OPTIONS:
  -h, --help              Show this help
  -u, --uppercase         Uppercase the <NAME>
  -p, --prefix <PREFIX>   Change the greeting prefix"

uppercase_option="false"
prefix_option="Hello"
name=""
backwards_name=""
today=""
output=""

uppercase() {
  echo "$(tr '[:lower:]' '[:upper:]' <<< ${1})"
}

reverse() {
  echo "$(rev <<< ${1})"
}

get_today() {
  echo "$(date '+%F')"
}

get_duration() {
  echo "${SECONDS}"
}

handle_help() {
  echo -e "${USAGE}"
  exit 0
}

handle_empty_arg() {
  if [[ -z "${2}" ]]; then
    echo "${1}"
    echo "${HELP_USAGE}"
    exit 1
  fi
}

handle_unknown_option() {
  echo "Unknown option: ${1}"
  echo "${HELP_USAGE}"
  exit 1
}

while [[ ${#} -gt 0 ]]; do
  case ${1} in
    -h | --help)
      handle_help
      ;;
    -u | --uppercase)
      uppercase_option="true"
      shift
      ;;
    -p | --prefix)
      shift
      prefix_option="${1}"
      handle_empty_arg "${PREFIX_USAGE}" "${prefix_option}"
      shift
      ;;
    --)
      shift
      break
      ;;
    *)
      handle_unknown_option "${1}"
      ;;
  esac
done

name=${1}

if [[ -p /dev/stdin ]]; then
  name="$(cat -)"
fi

handle_empty_arg "${NAME_USAGE}" "${name}"

if [[ ${uppercase_option} == "true" ]]; then
  name=$(uppercase ${name})
fi

backwards_name="$(reverse ${name})"
today="$(get_today)"
duration="$(get_duration)"

output="\
${prefix_option}, ${name}
Your name backwards is ${backwards_name}
Today is ${today}"

echo "${output}"
echo "Completed in ${duration} s"
```

## Python

## NodeJS

## Groovy

## Ruby
