#!/usr/bin/env bash

./task_get_resume.sh

git add static/resume

git commit -m "sync resume"

echo "Completed ${0} in ${SECONDS} s"
