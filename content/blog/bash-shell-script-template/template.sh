#!/usr/bin/env bash

REQUIRED_TOOLS=()

for tool in ${REQUIRED_TOOLS[@]}; do
  if ! command -v ${tool} >/dev/null; then
     echo "Tool ${tool} is required. Exiting"; exit 1
  fi
done

# Content goes here

echo "Completed in ${SECONDS}s"
