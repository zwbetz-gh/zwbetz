---
title: "Rosetta Stone CLI: Write the Same Script in Bash, Python, NodeJS, and Groovy"
date: 2021-04-02T21:13:34-05:00
toc: true
draft: true
---

TODO: replace projects link

TODO: re copy paste scripts into markdown

To really appreciate what a language does for you, it must be compared to other languages. Then you compare and contrast how (differently) common tasks are done. In this fun little exercise, we'll write the same script in multiple languages.

Each script must meet these requirements:

1. Accept input in the form of
    ```
    ./script [OPTIONS] -- <NAME>
    ```
1. `[OPTIONS]` can be zero or multiple of
      1. `-h` or `--help`
      1. `-u` or `--uppercase`
      1. `-p <PREFIX>` or ` --prefix <PREFIX>`
1. If `-h` or `--help` is passed, print the usage, then exit with code `0`
1. If  `-u` or `--uppercase` is passed, uppercase the  `<NAME>`
1. If `-p <PREFIX>` or ` --prefix <PREFIX>` is passed, change the greeting prefix. If `<PREFIX>` is empty, handle the error
1. If an unknown option is passed, handle the error
1. Print this line
    ```
    Hello, <NAME>
    Your name backwards is <BACKWARDS_NAME>
    Today is <TODAY>
    Completed in <TIME> s
    ```
1. Read `<NAME>` from the 1st positional parameter. If the 1st positional parameter is empty, read from piped `stdin`. If piped `stdin` is empty, handle the error
1. `<BACKWARDS_NAME>` is the reverse string of `<NAME>`
1. `<TODAY>` is the current date as format `yyyy-MM-dd`
1.  `<TIME>` is in seconds. Use 2 decimal places if possible
1. If an error is handled, print a message describing the error, print a message showing how to get help, then exit with code `1`
1. Use as few external binaries and libraries as possible. This means option/argument parser libraries are off limits


## Sample Usage

Make each script executable:

```shell
$ chmod 755 ./script
```

After each run, print the exit code:

```shell
$ ./script --help
Usage:
  ./script [OPTIONS] -- <NAME>

<NAME> cannot be empty

OPTIONS:
  -h, --help              Show this help
  -u, --uppercase         Uppercase the <NAME>
  -p, --prefix <PREFIX>   Change the greeting prefix

$ echo ${?}
0
```

```shell
$ ./script --what
Unknown option: --what
For help, run: ./script --help

$ echo ${?}
1
```

```shell
$ ./script -p
<PREFIX> cannot be empty
For help, run: ./script --help

$ echo ${?}
1
```

```shell
$ ./script --
<NAME> cannot be empty
For help, run: ./script --help

$ echo ${?}
1
```

```shell
$ ./script -- "Jane"
Hello, Jane
Your name backwards is enaJ
Today is 2021-04-03
Completed in 0.07 s

$ echo ${?}
0
```

```shell
$ ./script -u -p "Woah" -- "Jane"
Hello, JANE
Your name backwards is ENAJ
Today is 2021-04-03
Completed in 0.07 s

$ echo ${?}
0
```

```shell
$ echo "stdin" | ./script --uppercase --prefix "Woah" --
Hello, STDIN
Your name backwards is NIDTS
Today is 2021-04-03
Completed in 0.09 s

$ echo ${?}
0
```

## Bash

Assumes Bash version 3 or higher. For the uppercase, reverse, and date logic, it made sense to reach for external binaries.

```shell
#!/usr/bin/env bash

SCRIPT_NAME="./script"
HELP_USAGE="For help, run: ${SCRIPT_NAME} --help"
NAME_USAGE="<NAME> cannot be empty"
PREFIX_USAGE="<PREFIX> cannot be empty"
USAGE="\
Usage:
  ${SCRIPT_NAME} [OPTIONS] -- <NAME>

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

handle_help() {
  echo -e "${USAGE}"
  exit 0
}

die() {
  echo "${HELP_USAGE}"
  exit 1
}

handle_empty_arg() {
  if [[ -z "${2}" ]]; then
    echo "${1}"
    die
  fi
}

handle_unknown_option() {
  echo "Unknown option: ${1}"
  die
}

uppercase() {
  echo "$(tr '[:lower:]' '[:upper:]' <<< ${1})"
}

reverse() {
  echo "$(rev <<< ${1})"
}

get_today() {
  echo "$(date '+%F')"
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
  name="$(< /dev/stdin)"
fi

handle_empty_arg "${NAME_USAGE}" "${name}"

if [[ ${uppercase_option} == "true" ]]; then
  name=$(uppercase ${name})
fi

backwards_name="$(reverse ${name})"
today="$(get_today)"

output="\
${prefix_option}, ${name}
Your name backwards is ${backwards_name}
Today is ${today}"

echo "${output}"

echo "Completed in ${SECONDS} s"
```

## Python

```python
#!/usr/bin/env python

import sys
import time
import datetime

SCRIPT_NAME = "./script"
HELP_USAGE = "For help, run: {0} --help"
NAME_USAGE = "<NAME> cannot be empty"
PREFIX_USAGE = "<PREFIX> cannot be empty"
USAGE = """\
Usage:
  {0} [OPTIONS] -- <NAME>

{1}

OPTIONS:
  -h, --help              Show this help
  -u, --uppercase         Uppercase the <NAME>
  -p, --prefix <PREFIX>   Change the greeting prefix"""

start_time = time.time()
args = sys.argv[1:]
skip_next_iteration = False
seperator_index = None

uppercase_option = False
prefix_option = "Hello"
name = ""
backwards_name = ""
today = ""
output = ""
duration = None


def handle_help():
    print(USAGE.format(SCRIPT_NAME, NAME_USAGE))
    sys.exit(0)


def die():
    print(HELP_USAGE.format(SCRIPT_NAME))
    sys.exit(1)


def handle_unknown_option(arg):
    print("Unknown option: {0}".format(arg))
    die()


def get_prefix_option(index):
    try:
        return args[index]
    except IndexError:
        print(PREFIX_USAGE)
        die()


def handle_name_usage():
    print(NAME_USAGE)
    die()


def get_name(index):
    try:
        return args[index]
    except IndexError:
        return ""


def stdin_exists():
    return not sys.stdin.isatty()


def get_stdin():
    return sys.stdin.read().strip()


def reverse(str):
    return str[::-1]


def get_today():
    return datetime.date.today().strftime("%Y-%m-%d")


def get_duration_in_seconds(start_time, end_time):
    return round((end_time - start_time) * 1000, 2)


for i, arg in enumerate(args):
    if skip_next_iteration == True:
        skip_next_iteration = False
        continue
    elif arg == "-h" or arg == "--help":
        handle_help()
    elif arg == "-u" or arg == "--uppercase":
        uppercase_option = True
    elif arg == "-p" or arg == "--prefix":
        prefix_option = get_prefix_option(i + 1)
        skip_next_iteration = True
        continue
    elif arg == "--":
        name = get_name(i + 1)
        break
    else:
        handle_unknown_option(arg)

if stdin_exists():
    name = get_stdin()

if name == "":
    handle_name_usage()

if uppercase_option == True:
    name = name.upper()

backwards_name = reverse(name)
today = get_today()

output = """\
{0}, {1}
Your name backwards is {2}
Today is {3}"""

print(output.format(prefix_option, name, backwards_name, today))

duration = get_duration_in_seconds(start_time, time.time())

print("Completed in {0} s".format(duration))
```

## NodeJS

## Groovy

