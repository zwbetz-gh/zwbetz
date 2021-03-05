---
title: "Connect to an Oracle Database and run a query from a Bash script"
date: 2019-06-07T13:09:06-05:00
toc: false
show_comments: true
---

## Prerequisites 

- `sqlplus` (SQL*Plus) 12.2.x or higher is installed and on your PATH
- The following files are in the same directory

## Files 

A `query.sql` file:
```sql
-- this file must end in a new line
SELECT 'foo'
FROM dual
WHERE 1 = 1
UNION ALL
SELECT 'bar'
FROM dual
WHERE 2 = 2;
```

An `.env` file:
```bash
export ORACLE_HOST="some-host.com"
export ORACLE_PORT="1521"
export ORACLE_DATABASE="some_service"
export ORACLE_USERNAME="some_user"
export ORACLE_PASSWORD="some_password"
```

A `script.bash` file:
```bash
#!/bin/bash

# Load database connection info
source .env 

# Read query into a variable
sql="$(cat query.sql)"

# If sqlplus is not installed, then exit
if ! command -v sqlplus > /dev/null; then 
  echo "SQL*Plus is required..."
  exit 1 
fi 

# Connect to the database, run the query, then disconnect
echo -e "SET PAGESIZE 0\n SET FEEDBACK OFF\n $sql" | \
sqlplus -S -L "$ORACLE_USERNAME/$ORACLE_PASSWORD@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=$ORACLE_HOST)(PORT=$ORACLE_PORT))(CONNECT_DATA=(SERVICE_NAME=$ORACLE_DATABASE)))"
```

Usage:
```
$ ./script.bash
foo
bar

$ ./script.bash > results.txt
```

Notes:

- The `SET PAGESIZE 0` option suppresses all headings, page breaks, titles, the initial blank line, and other formatting information
- The `SET FEEDBACK OFF` option suppresses the number of records returned by a script
- The `-S` option sets silent mode which suppresses the display of the SQL*Plus banner, prompts, and echoing of commands
