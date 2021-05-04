#!/usr/bin/env bash

echo "Regenerating the hugo_stats.json file ..."
hugo 

echo "Purging the CSS ..."
node task_purge_css.js

echo "Completed ${0} in ${SECONDS} s"
