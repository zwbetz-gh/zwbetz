#!/usr/bin/env bash

# Load database connection info
source .env

# Read query into a variable
sql="$(<"query.sql")"

# If psql is not available, then exit
if ! command -v psql > /dev/null; then
  echo "This script requires psql to be installed and on your PATH ..."
  exit 1
fi

# Connect to the database, run the query, then disconnect
PGPASSWORD="${POSTGRES_PASSWORD}" psql -t -A \
-h "${POSTGRES_HOST}" \
-p "${POSTGRES_PORT}" \
-d "${POSTGRES_DATABASE}" \
-U "${POSTGRES_USERNAME}" \
-c "${sql}"
