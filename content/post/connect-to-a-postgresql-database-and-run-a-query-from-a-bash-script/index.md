---
title: "Connect to a Postgresql database and run a query from a Bash script"
date: 2019-06-07T13:10:14-05:00
tags: [postgresql, sql, command-line]
toc: false
show_comments: true
---

## Prerequisites 

- `psql` (PostgreSQL) 9.0.x or higher is installed and on your PATH
- The following files are in the same directory

## Files 

A `query.sql` file:
```sql
-- this file must end in a new line
SELECT 'foo'
WHERE 1 = 1
UNION ALL
SELECT 'bar'
WHERE 2 = 2;
```

An `.env` file:
```bash
export POSTGRES_HOST="some-host.com"
export POSTGRES_PORT="5432"
export POSTGRES_DATABASE="some_database"
export POSTGRES_USERNAME="some_user"
export POSTGRES_PASSWORD="some_password"
```

A `script.bash` file:
```bash
#!/bin/bash

# Load database connection info
source .env 

# Read query into a variable
sql="$(cat query.sql)"

# If psql is not installed, then exit
if ! command -v psql > /dev/null; then 
  echo "PostgreSQL is required..."
  exit 1 
fi 

# Connect to the database, run the query, then disconnect
PGPASSWORD="$POSTGRES_PASSWORD" psql -t -A \
-h "$POSTGRES_HOST" \
-p "$POSTGRES_PORT" \
-d "$POSTGRES_DATABASE" \
-U "$POSTGRES_USERNAME" \
-c "$sql" 
```

Usage:
```
$ ./script.bash
foo
bar

$ ./script.bash > results.txt
```

Notes:

- There isn't an option to pass the password, so that's why the `PGPASSWORD` environment variable is set
- The `-t` option turns off printing of column names and result row count footers
- The `-A` option switches to unaligned output mode
