#!/usr/bin/env bash

./task_resume_get.sh

npm install

hugo --environment production

echo "Completed ${0} in ${SECONDS}s"
