---
title: "Search All Database Table Columns"
date: 2019-08-16T15:29:14-05:00
toc: false
---

Ever wanted to search an entire database for a column by name? Well, put your detective hat on, 'cause it's possible. 

<!--more-->

## Oracle

```sql
SELECT * 
FROM all_tab_cols
WHERE column_name LIKE '%<FOO>%';
```

## Postgres

```sql
SELECT * 
FROM information_schema.columns
WHERE column_name LIKE '%<foo>%';
```
