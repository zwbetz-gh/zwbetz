---
title: "Don't Have Flyway Teams? Roll Your Own Version of Output Query Results"
date: 2021-02-11T15:46:07-06:00
toc: false
---

Flyway is a popular database migration tool. They offer two versions, a Free edition, and a Teams edition. 

I was using the Free edition on a project. When creating the migration files, I did a [`pg_dump` of an existing database]({{< relref "a-shell-script-wrapper-for-pgdump" >}}). This worked out fine and dandy, except for one thing... 

<!--more-->

When `pg_dump` extracts data, it generates `INSERT` statements with the `OVERRIDING SYSTEM VALUE` clause, which allows explicit values into an identity column (as opposed to letting the column auto-increment). 

This means statements like `SELECT pg_catalog.setval('foo', 42, false)` are then needed to set the identity column sequence to its correct value.

Well, these `SELECT`  statements were outputting query results, and making the logs quite noisy. Turns out, there's a configuration parameter in the Teams edition called [`outputQueryResults`](https://flywaydb.org/documentation/configuration/parameters/outputQueryResults). Setting this parameter to `false` would have solved the issue. But I was on the Free edition, so I had to get creative.

The solution was to create a temporary table from the `SELECT` statement, then immediately drop it, so that the pattern could be repeated.

This will output query results:

```sql
SELECT pg_catalog.setval('foo', 42, false);
```

And this will not:

```sql
CREATE TEMP TABLE temp_silent AS SELECT pg_catalog.setval('foo', 42, false);
DROP TABLE IF EXISTS temp_silent;
```
