#!/usr/bin/env bash

REQUIRED_TOOLS=(foo)

for tool in ${REQUIRED_TOOLS[@]}; do
  if ! command -v ${tool} >/dev/null; then
    echo "${tool} is required ... "
    exit 1
  fi
done

# Content goes here

echo "Completed in ${SECONDS}s"
