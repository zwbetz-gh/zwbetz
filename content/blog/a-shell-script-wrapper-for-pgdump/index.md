---
title: "A Shell Script Wrapper for pg_dump"
date: 2021-02-09T21:54:51-06:00
toc: false
---

[`pg_dump`](https://www.postgresql.org/docs/13/app-pgdump.html) is a **sweet** tool to extract a database to a file (tables, functions, triggers... I mean _everything_). It has many CLI options, and I'm documenting the ones that were most useful to me here.

The shell script reads in a `.env` file with [database connection info](https://www.postgresql.org/docs/13/libpq-envars.html), then exports each env var by using the [bash set builtin](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html).

Next, `pg_dump` is called with the following options:

- `--inserts` Dump data as `INSERT` commands (rather than `COPY`)
- `--column-inserts` Dump data as `INSERT` commands with explicit column names
- `--rows-per-insert`Controls the maximum number of rows per `INSERT` command. Good for reducing network round trips
- `--file` Send output to the specified file

## Secrets

Name the file `.env`

```shell
PGHOST=localhost
PGPORT=5432
PGDATABASE=some_database
PGUSER=postgres
PGPASSWORD=postgres
```

## Shell Script

Name the file `dump.sh`

```shell
#!/usr/bin/env bash

set -o allexport;
source .env;
set +o allexport;

pg_dump \
--inserts \
--column-inserts \
--rows-per-insert=1000 \
--file=dump.sql;

echo "Completed in ${SECONDS}s";
```
