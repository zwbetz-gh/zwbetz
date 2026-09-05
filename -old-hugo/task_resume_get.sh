#!/usr/bin/env bash

TEMP_DIR="/tmp/json-resume"
LOCAL_DIR="static/resume"

FILES=(
  "resume.html"
  "resume.json"
)

cleanup() {
  rm -r -f "${TEMP_DIR}"
}

cleanup

git clone https://github.com/zwbetz-gh/json-resume.git "${TEMP_DIR}"

mkdir -p "${LOCAL_DIR}"

cp -v "${TEMP_DIR}/public/resume.json" "${LOCAL_DIR}/resume.json"
cp -v "${TEMP_DIR}/public/resume.html" "${LOCAL_DIR}/resume.html"
cp -v "${TEMP_DIR}/public/resume.html" "${LOCAL_DIR}/index.html"

cleanup

echo "Completed ${0} in ${SECONDS}s"
