#!/usr/bin/env bash

# Load database connection info
set -o allexport
source .env
set +o allexport

# Read sql query into a variable
sql="$(<"query.sql")"

# If sqlplus is not available, then exit
if ! command -v sqlplus > /dev/null; then 
  echo "This script requires sqlplus to be installed and on your PATH ..."
  exit 1 
fi 

# Connect to the database, run the query, then disconnect
echo -e "SET PAGESIZE 0\n SET FEEDBACK OFF\n ${sql}" | \
sqlplus -S -L ${ORACLE_USERNAME}/${ORACLE_PASSWORD}@${ORACLE_HOST}:${ORACLE_PORT}/${ORACLE_DATABASE}
