---
title: "Connect to a Postgresql Database and Run a Query From a Bash Script"
date: 2019-06-07T13:10:14-05:00
toc: true
---

## Prerequisites 

- `psql` (PostgreSQL) version 9.0.x or higher is installed and on your `PATH`. See install steps for [Mac]({{< relref "install-psql-on-mac" >}})
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
export POSTGRES_HOST="localhost"
export POSTGRES_PORT="5432"
export POSTGRES_DATABASE="some_database"
export POSTGRES_USERNAME="some_user"
export POSTGRES_PASSWORD="some_password"
```

A `script.sh` file:
```bash
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
```

## Usage

Make it executable:
```
$ chmod 755 script.sh
```

Print results to stdout:
```
$ ./script.sh
foo
bar
```

Write results to file:
```
$ ./script.sh > results.txt
```

## Notes

- There isn't an option to pass the password, so that's why the `PGPASSWORD` environment variable is set
- The `-t` option turns off printing of column names and result row count footers
- The `-A` option switches to unaligned output mode

## Related

- [Connect to an Oracle Database and Run a Query From a Bash Script]({{< relref "connect-to-an-oracle-database-and-run-a-query-from-a-bash-script" >}})
