---
title: "Write Your Own Short and Long Option Parser in Bash"
date: 2021-03-19T01:12:42-05:00
toc: false
---

Writing your own option parser in Bash is not so bad once you know the syntax. You can even support short and long options. An option can be a flag, or it can accept an argument.

We'll showcase this in a simple greeter script. In a nutshell, the script will do the following:

- Iterate an array of required tools. If they're not installed, exit
- Parse options via a `while` statement and a nested `case` statement
    - If an option equals a valid option, handle it
    - If an option is unknown, exit
    - If the `--` separator is detected, there are no more options to parse
- If `stdin` exists, use it, else use the positional argument for `NAME`
- If `NAME` length is `0`, exit
- Do logic for each given option
- Print the greeting

Enjoy.

## Usage

```
Usage:
  ./greeter.sh [OPTIONS] -- NAME

NAME must be a string of 1 or more characters

OPTIONS:
  -h, --help            Show this help
  -u, --uppercase       Uppercase the greeting
  -p, --prefix PREFIX   Change the greeting prefix. Defaults to "Hello"

Samples:
  ./greeter.sh -- "Townes"
  ./greeter.sh --uppercase --prefix "Yo" -- "Townes"
  echo "stdin" | ./greeter.sh --uppercase --prefix "Yo" --
```

## Samples

```
$ ./greeter.sh --
NAME must be a string of 1 or more characters
For help, run: ./greeter.sh --help
```

```
$ ./greeter.sh --what
Unknown option: --what
For help, run: ./greeter.sh --help
```

```
$ ./greeter.sh -- "Townes"
Hello, Townes
```

```
$ ./greeter.sh --uppercase --prefix "Yo" -- "Townes"
YO, TOWNES
```

```
$ echo "stdin" | ./greeter.sh --uppercase --prefix "Yo" --
YO, STDIN
```

## Bash Script

1. Save this to a file named `greeter.sh`
1. Make it executeable with `chmod +x greeter.sh`

```shell
#!/usr/bin/env bash

NAME_USAGE="NAME must be a string of 1 or more characters"

USAGE="Usage:
  ${0} [OPTIONS] -- NAME

${NAME_USAGE}

OPTIONS:
  -h, --help            Show this help
  -u, --uppercase       Uppercase the greeting
  -p, --prefix PREFIX   Change the greeting prefix. Defaults to \"Hello\"

Samples:
  ${0} -- \"Townes\"
  ${0} --uppercase --prefix \"Yo\" -- \"Townes\"
  echo \"stdin\" | ${0} --uppercase --prefix \"Yo\" --"

REQUIRED_TOOLS=(
  tr
)

for tool in ${REQUIRED_TOOLS[@]}; do
  if ! command -v ${tool} > /dev/null; then
    echo "This script requires ${tool} to be installed"
    exit 1
  fi
done

UPPERCASE="false"
PREFIX="Hello"

while [[ ${#} -gt 0 ]]; do
  case ${1} in
    -h|--help)
      echo -e "${USAGE}"
      exit 0
      ;;
    -u|--uppercase)
      UPPERCASE="true"
      shift
      ;;
    -p|--prefix)
      shift
      PREFIX="${1}"
      shift
      ;;
    --)
      shift
      break
      ;;
    *)
      echo "Unknown option: ${1}"
      echo "For help, run: ${0} --help"
      exit 1
      ;;
  esac
done

NAME=${1}

if [[ -p /dev/stdin ]]; then
  NAME=$(cat -)
fi

LENGTH=${#NAME}

# echo "UPPERCASE=${UPPERCASE}"
# echo "PREFIX=${PREFIX}"
# echo "NAME=${NAME}"
# echo "LENGTH=${LENGTH}"

if [[ ${LENGTH} -eq 0 ]]; then
  echo "${NAME_USAGE}"
  echo "For help, run: ${0} --help"
  exit 1
fi

GREETING="${PREFIX}, ${NAME}"

if [[ ${UPPERCASE} == "true" ]]; then
  GREETING=$(echo "${GREETING}" | tr '[:lower:]' '[:upper:]')
fi

echo "${GREETING}"
```
