PROGRAM="foo"

if ! command -v ${PROGRAM} >/dev/null; then
  echo "This script requires ${PROGRAM} to be installed and on your PATH ..."
  exit 1
fi
