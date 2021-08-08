#!/usr/bin/env bash

# Load database connection info
set -o allexport
source .env
set +o allexport

# Read query into a variable
sql="$(<"query.sql")"

# If psql is not available, then exit
if ! command -v psql > /dev/null; then
  echo "This script requires psql to be installed and on your PATH ..."
  exit 1
fi

# Connect to the database, run the query, then disconnect
psql -t -A -c "${sql}"
