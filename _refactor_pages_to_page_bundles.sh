#!/bin/bash
# 
# Refactor a page named `X.md` to `content/<section>/X/index.md` to use the
# new page bundles and featured image system
#
# E.g. a post `content/post/X.md` is converted to `content/post/X/index.md`
#
# https://github.com/sourcethemes/academic-scripts/blob/master/refactor-pages-to-page-bundles.sh

refactor_pages_to_page_bundles()
{
  if [ ! -d ./content/ ]; then
    echo "Please run the script from the root of your Academic site" >&2
    exit 1
  fi
  local files="$(find ./content/ -iname '*.md' -not -iname '*index.md' -not -ipath './content/home/*')"
  for file in ${files}; do
    local pagedir="${file%.md}"

    echo "${file} -> ${pagedir}/index.md"
    if [ ! -d "${pagedir}" ]; then
      mkdir "${pagedir}"
    fi

    mv "${file}" "${pagedir}/index.md"
  done
}

# Bash Strict Mode
set -eu

# Bash Debug Mode
set -x 

refactor_pages_to_page_bundles "$@"
