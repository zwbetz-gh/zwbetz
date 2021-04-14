#!/usr/bin/env bash

echo "Regenerating the hugo_stats.json file ..."
hugo 

echo "Purging the CSS ..."
node task_purge_css.js

echo "Moving the purged CSS file to the theme ..."
mv -v uswds-purged.css ../uswds-hugo-theme/assets/css/
