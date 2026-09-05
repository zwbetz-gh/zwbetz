---
title: "Rosetta Stone CLI: Write the Same Option Parser Script in Bash, Python, and Node.js"
date: 2021-04-02T21:13:34-05:00
toc: true
---

To really appreciate what a language does for you, it helps to compare it to other languages. Then you can see how (differently) common tasks are done. In this fun little exercise, we'll write the same option parser script in multiple languages.

<!--more-->

## Sister Links

These scripts are available in [GitHub](https://github.com/zwbetz-gh/rosetta-stone-cli-write-the-same-option-parser-script-in-multiple-languages). The repo includes a TAP-compliant test script.

## Requirements

1. Use as few external binaries and libraries as possible. **This means option parser libraries are off limits**
1. Accept input in the form of

        ./script [OPTIONS] -- <NAME>

1. `[OPTIONS]` can be zero or multiple of
      1. `-h` or `--help`
      1. `-u` or `--uppercase`
      1. `-p <PREFIX>` or ` --prefix <PREFIX>`
1. If `-h` or `--help` is passed, print the usage, then exit with code `0`
1. If  `-u` or `--uppercase` is passed, uppercase the  `<NAME>`
1. If `-p <PREFIX>` or ` --prefix <PREFIX>` is passed, change the greeting prefix. If `<PREFIX>` is empty, handle the error
1. If an unknown option is passed, handle the error
1. Print this line

        Hello, <NAME>
        Your name backwards is <BACKWARDS_NAME>
        Today is <TODAY>
        Completed in <TIME> s

1. Read `<NAME>` from an argument. If the argument is empty, read from piped `stdin`. If piped `stdin` is empty, handle the error
1. `<BACKWARDS_NAME>` is the reverse string of `<NAME>`
1. `<TODAY>` is the current date as format `yyyy-MM-dd` in UTC
1.  `<TIME>` is in seconds. Use 2 decimal places if possible
1. If an error is handled, print a message describing the error, print a message showing how to get help, then exit with code `1`

## Thoughts

- Quoting variables in Bash is safe, but tedious
- Bash has an interesting built-in called `shift`. When called, it removes 1 argument from the beginning of the argument list. When used inside a while loop / case statement combo, it's like you're calling `shift()` on an array that you're currently iterating. Spooky
- This was my first substantial Python script. I was forced to dive deep into the docs. The syntax reminded me of Visual Basic (in a good way), which I first learned to program on
- When accessing an array index that does not exist, JS returns `undefined`, but Python throws an `IndexError`
- All of these languages support multi-line template literal strings, which is nice

## Sample Usage

Make each script executable:

```shell
$ chmod 755 ./script
```

After each script run, print the exit code:

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
$ ./script
<NAME> cannot be empty
For help, run: ./script --help

$ echo ${?}
1
```

```shell
$ ./script --what
Unknown option: --what
For help, run: ./script --help

$ echo ${?}
1
```

```shell
$ ./script --prefix
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
$ ./script -- Jane
Hello, Jane
Your name backwards is enaJ
Today is 2021-04-03
Completed in 0.07 s

$ echo ${?}
0
```

```shell
$ ./script -u -p Woah -- Jane
Woah, JANE
Your name backwards is ENAJ
Today is 2021-04-03
Completed in 0.07 s

$ echo ${?}
0
```

```shell
$ ./script --uppercase --prefix Woah -- Jane
Woah, JANE
Your name backwards is ENAJ
Today is 2021-04-03
Completed in 0.07 s

$ echo ${?}
0
```

```shell
$ echo "sample stdin" | ./script -u -p Woah --
Woah, SAMPLE STDIN
Your name backwards is NIDTS ELPMAS
Today is 2021-04-03
Completed in 0.08 s

$ echo ${?}
0
```

## Bash

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
name_arg=""
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

handle_unknown_option() {
  local option="${1}"
  echo "Unknown option: ${option}"
  die
}

handle_empty_arg() {
  local arg_usage="${1}"
  echo "${arg_usage}"
  die
}

uppercase_string() {
  local str="${1}"
  echo "${str}" | tr '[:lower:]' '[:upper:]'
}

reverse_string() {
  local str="${1}"
  echo "${str}" | rev
}

get_today() {
  date -u '+%F'
}

if [[ ${#} == 0 ]]; then
  handle_empty_arg "${NAME_USAGE}"
fi

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
      if [[ -z "${prefix_option}" ]]; then
        handle_empty_arg "${PREFIX_USAGE}"
      fi
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

name_arg=${1}

if [[ -p /dev/stdin ]]; then
  name_arg="$(cat -)"
fi

if [[ -z "${name_arg}" ]]; then
  handle_empty_arg "${NAME_USAGE}"
fi

if [[ ${uppercase_option} == "true" ]]; then
  name_arg="$(uppercase_string "${name_arg}")"
fi

backwards_name="$(reverse_string "${name_arg}")"
today="$(get_today)"

output="\
${prefix_option}, ${name_arg}
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
from datetime import datetime, timezone

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
name_arg = ""
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


def handle_unknown_option(option):
    print("Unknown option: {0}".format(option))
    die()


def handle_empty_arg(arg_usage):
    print(arg_usage)
    die()


def get_prefix_option(index):
    try:
        return args[index]
    except IndexError:
        handle_empty_arg(PREFIX_USAGE)


def get_name_arg(index):
    try:
        return args[index]
    except IndexError:
        return ""


def piped_stdin_exists():
    return not sys.stdin.isatty()


def get_piped_stdin():
    return sys.stdin.read().strip()


def reverse_string(str):
    return str[::-1]


def get_today():
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def get_duration_in_seconds(start_time_in_millis, end_time_in_millis):
    return round((end_time_in_millis - start_time_in_millis) * 1000, 2)


if len(args) == 0:
    handle_empty_arg(NAME_USAGE)

for i, arg in enumerate(args):
    if skip_next_iteration:
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
        name_arg = get_name_arg(i + 1)
        break
    else:
        handle_unknown_option(arg)

if piped_stdin_exists():
    name_arg = get_piped_stdin()

if name_arg == "":
    handle_empty_arg(NAME_USAGE)

if uppercase_option == True:
    name_arg = name_arg.upper()

backwards_name = reverse_string(name_arg)
today = get_today()

output = """\
{0}, {1}
Your name backwards is {2}
Today is {3}"""

print(output.format(prefix_option, name_arg, backwards_name, today))

duration = get_duration_in_seconds(start_time, time.time())

print("Completed in {0} s".format(duration))
```

## Node.js

```js
#!/usr/bin/env node

const fs = require('fs');

const SCRIPT_NAME = './script';
const HELP_USAGE = `For help, run: ${SCRIPT_NAME} --help`;
const NAME_USAGE = '<NAME> cannot be empty';
const PREFIX_USAGE = '<PREFIX> cannot be empty';
const USAGE = `\
Usage:
  ${SCRIPT_NAME} [OPTIONS] -- <NAME>

${NAME_USAGE}

OPTIONS:
  -h, --help              Show this help
  -u, --uppercase         Uppercase the <NAME>
  -p, --prefix <PREFIX>   Change the greeting prefix`;

const startTime = process.hrtime()[1];
const args = process.argv.slice(2);
let skipNextIteration = false;

let uppercaseOption = false;
let prefixOption = 'Hello';
let nameArg = '';
let backwardsName = '';
let today = '';
let output = '';
let duration = null;

const handleHelp = () => {
  console.log(USAGE);
  process.exit(0);
};

const die = () => {
  console.log(HELP_USAGE);
  process.exit(1);
};

const handleUnknownOption = (option) => {
  console.log(`Unknown option: ${option}`);
  die();
};

const handleEmptyArg = (argUsage) => {
  console.log(argUsage);
  die();
};

const getPrefixOption = (index) => {
  if (args[index]) {
    return args[index];
  }
  handleEmptyArg(PREFIX_USAGE);
};

const getNameArg = (index) => {
  if (args[index]) {
    return args[index];
  }
  return '';
};

const pipedStdinExists = () => !process.stdin.isTTY;

const getPipedStdin = () => fs.readFileSync(0).toString().trim();

const reverseString = (str) => str.split('').reverse().join('');

const getToday = () => new Date().toISOString().split('T')[0];

const getDurationInSeconds = (startTimeInNanos, endTimeInNanos) =>
  ((endTimeInNanos - startTimeInNanos) / 10_000_000).toFixed(2);

if (args.length === 0) {
  handleEmptyArg(NAME_USAGE);
}

for (const [i, arg] of args.entries()) {
  if (skipNextIteration) {
    skipNextIteration = false;
    continue;
  } else if (arg === '-h' || arg === '--help') {
    handleHelp();
  } else if (arg === '-u' || arg === '--uppercase') {
    uppercaseOption = true;
  } else if (arg === '-p' || arg === '--prefix') {
    prefixOption = getPrefixOption(i + 1);
    skipNextIteration = true;
    continue;
  } else if (arg === '--') {
    nameArg = getNameArg(i + 1);
    break;
  } else {
    handleUnknownOption(arg);
  }
}

if (pipedStdinExists()) {
  nameArg = getPipedStdin();
}

if (nameArg === '') {
  handleEmptyArg(NAME_USAGE);
}

if (uppercaseOption) {
  nameArg = nameArg.toUpperCase();
}

backwardsName = reverseString(nameArg);
today = getToday();

output = `\
${prefixOption}, ${nameArg}
Your name backwards is ${backwardsName}
Today is ${today}`;

console.log(output);

duration = getDurationInSeconds(startTime, process.hrtime()[1]);

console.log(`Completed in ${duration} s`);
```
