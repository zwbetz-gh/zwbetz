#!/usr/bin/env bash

TEMP_DIR="/tmp/json-resume"
LOCAL_DIR="static/resume"

FILES=(
  "resume.html"
  "resume.json"
)

git clone https://github.com/zwbetz-gh/json-resume.git ${TEMP_DIR}

mkdir -p ${LOCAL_DIR}

for f in ${FILES[@]}; do
  cp -v ${TEMP_DIR}/public/${f} ${LOCAL_DIR}/${f}
done

rm -rf ${TEMP_DIR}

echo "Completed ${0} in ${SECONDS}s"
