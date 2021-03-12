---
title: "Find All Tables That Do Not Have a Given Column in Postgres"
date: 2020-06-15T15:23:05-05:00
toc: false
---

If you have hundreds of tables, it can be a pain to search each individual one to check if it has a given column. This query left joins all tables for a given schema, `some_schema`, against itself, then shows tables that do not have a given column, `some_column`.

```sql
select *
from (
  select distinct table_name
  from information_schema.columns
  where table_schema = 'some_schema'
) a
left join (
  select distinct table_name
  from information_schema.columns
  where table_schema = 'some_schema'
  and column_name = 'some_column'
) b
on a.table_name = b.table_name
where b.table_name is null;
```
