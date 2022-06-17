---
title: "Connect to a Postgres Database and Run a Query From a Bash Script"
summary: "Get Postgres and Bash to play nice."
date: 2019-06-07T13:10:14-05:00
toc: true
---

## Prerequisites 

- `psql` (PostgreSQL) version 9.0.x or higher is installed and on your `PATH`. See install steps for [Mac]({{< relref "install-psql-on-mac" >}})
- The following files are in the same directory

## Files 

A `query.sql` file:

```sql
SELECT 'foo'
WHERE 1 = 1
UNION ALL
SELECT 'bar'
WHERE 2 = 2;
```

An `.env` file:

```bash
PGHOST='localhost'
PGPORT='5432'
PGDATABASE='some_database'
PGUSER='some_user'
PGPASSWORD='some_password'
```

A `script.sh` file:

```bash
#!/usr/bin/env bash

# Load database connection info
set -o allexport
source .env
set +o allexport

# If psql is not available, then exit
if ! command -v psql > /dev/null ; then
  echo "This script requires psql to be installed and on your PATH. Exiting"
  exit 1
fi

# Connect to the database, run the query, then disconnect
psql -t -A -f ./query.sql
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

- The `-t` option turns off printing of column names and result row count footers
- The `-A` option switches to unaligned output mode
- The `-f` option reads the command from a file

## Related

- [Connect to an Oracle Database and Run a Query From a Bash Script]({{< relref "connect-to-an-oracle-database-and-run-a-query-from-a-bash-script" >}})
- [Set Environment Variables in Your Bash Shell From a .env File (Version 2)]({{< relref "set-environment-variables-in-your-bash-shell-from-a-env-file-version-2/index.md" >}})
