#!/usr/bin/env bash

git submodule update --remote --merge
git add --all
git commit -m "Theme changes"

echo "Completed ${0} in ${SECONDS}s"
