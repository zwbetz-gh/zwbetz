---
title: "Find All Tables That Do Not Have a Given Column in Postgres"
date: 2020-06-15T15:23:05-05:00
toc: false
---

If you have hundreds of tables, it can be a pain to search each individual one to check if it has a given column. This query left joins all tables for a given schema, `<some_schema>`, against itself, then shows tables that do not have a given column, `<some_column>`.

<!--more-->

```sql
SELECT
  *
FROM
  (
  SELECT
    DISTINCT table_name
  FROM
    information_schema.columns
  WHERE
    table_schema = '<some_schema>' ) a
LEFT JOIN (
  SELECT
    DISTINCT table_name
  FROM
    information_schema.columns
  WHERE
    table_schema = '<some_schema>'
    AND column_name = '<some_column>' ) b ON
  a.table_name = b.table_name
WHERE
  b.table_name IS NULL;
```
