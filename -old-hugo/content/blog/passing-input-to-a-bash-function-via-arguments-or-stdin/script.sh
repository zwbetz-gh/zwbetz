#!/usr/bin/env bash

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

length "hey"

echo "hey" | length

length <<< echo "hey"

length ""
