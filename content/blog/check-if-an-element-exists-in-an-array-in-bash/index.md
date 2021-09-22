---
title: "Check if an Element Exists in an Array in Bash"
date: 2021-09-21T20:23:16-05:00
toc: false
---

Why didn't I just use NodeJS or Python? Hey, you're getting distracted. That's not what this post is about. Just enjoy how hard someone else had to work to achieve this in Bash.

<!--more-->

## Snippet

```sh
element_exists_in_array() {
    local usage="\
Usage:
  ${FUNCNAME[0]} <element_to_find> <array>
Sample:
  ${FUNCNAME[0]} \"dog\" \"\${animals[@]}\"
Where <element_to_find> is the element to find.
Where <array> is the array to search."

  if [[ ${#} -lt 2 ]]; then
    echo -e "${usage}"
    return 1
  fi

  local element_to_find="${1}"
  shift
  local array=("${@}")

  for element in "${array[@]}"; do
    if [[ "${element_to_find}" == "${element}" ]]; then
      return 0
    fi
  done

  return 1
}
```

## Usage

```sh
animals=(
  "dog"
  "lizard"
  "frog"
)

if element_exists_in_array "dog" "${animals[@]}"; then
  echo "It exists :)"
else
  echo "It doesn't exist :("
fi
```
