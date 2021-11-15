#!/usr/bin/env bash

./task_resume_get.sh

hugo --cleanDestinationDir

echo "Completed ${0} in ${SECONDS} s"
