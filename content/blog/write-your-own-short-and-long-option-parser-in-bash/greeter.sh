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
