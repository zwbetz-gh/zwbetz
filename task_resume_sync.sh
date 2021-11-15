#!/usr/bin/env bash

./task_resume_get.sh

git add static/resume

git commit -m "sync resume"

echo "Completed ${0} in ${SECONDS} s"
