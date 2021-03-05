---
title: "Grant current and future objects to a user (role) in Postgres"
date: 2020-05-21T00:00:00-05:00
toc: false
show_comments: false
---

Ran into an issue at work with one of our flyway scripts. The script was somewhere in the middle of the migration order, so it wasn't the first or the last script to run. This was an issue since we needed to grant read-only access to a `some_user` user for both current and future tables that were created. After a bit of tinkering, I came to the below solution. 

```sql
-- grant read-only access to some_user if the role exists
do
$do$
begin
if exists (select rolname from pg_catalog.pg_roles where rolname = 'some_user') then
  grant usage on schema some_schema to some_user;
  -- current objects
  grant select on all tables in schema some_schema to some_user;
  -- future objects
  alter default privileges in schema some_schema grant select on tables to some_user;
end if;
end
$do$
```
