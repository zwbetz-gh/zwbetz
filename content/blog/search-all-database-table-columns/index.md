---
title: "Search all database table columns"
date: 2019-08-16T15:29:14-05:00
tags: [sql, oracle, postgresql]
toc: false
show_comments: true
---

Ever wanted to search an entire database for a column by name? Well, put your detective hat on, 'cause it's possible. 

## Oracle

```sql
SELECT * 
FROM all_tab_cols
WHERE column_name LIKE '%FOO%';
```

## Postgres

```sql
SELECT * 
FROM information_schema.columns
WHERE column_name LIKE '%foo%';
```
