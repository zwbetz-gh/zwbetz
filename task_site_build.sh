#!/usr/bin/env bash

./task_get_resume.sh

hugo --cleanDestinationDir

echo "Completed ${0} in ${SECONDS} s"
