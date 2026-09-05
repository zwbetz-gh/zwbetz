---
title: "From SQL to Java String and Back"
date: 2019-06-21T22:16:20-05:00
toc: false
---

Manually converting SQL to a Java string, or vice versa, isn't bad if it's only a few lines. But when your query is hundreds of lines, that's no fun. So I wrote Bash scripts to do the heavy lifting. Each script is below, followed by an example usage. 

<!--more-->

## From SQL to Java string

```bash
#!/bin/bash

file="$1"
last_line=$([ -f "$file" ] && wc -l < "$file" | tr -d ' ')
current_line=0

if [ ! -f "$file" ]; then
  echo "The specified file does not exist"
  exit 1 
fi 

while read -r line; do
  if [[ "$line" == "" ]]; then
    continue
  fi
  current_line=$(($current_line + 1))
  # replace all occurrences of " with \"
  line="$(echo "$line" | sed 's#\"#\\\"#g')"
  if [[ $current_line -ne $last_line ]]; then 
    # if not last line, add open/close ", then +
    echo "\"$line\" +"
  else
    # if last line, only add open/close "
    echo "\"$line\""
  fi 
done < "$file"
```

```
$ cat file.sql
select 1 as "alias"
from dual
where 1=1

$ ./from_sql_to_java_string.bash file.sql
"select 1 as \"alias\"" +
"from dual" +
"where 1=1"
```

## From Java string to SQL

```bash
#!/bin/bash

file="$1"

if [ ! -f "$file" ]; then
  echo "The specified file does not exist"
  exit 1 
fi 

while read -r line; do
  if [[ "$line" == "" ]]; then
    continue
  fi
  # delete first occurrence of +
  line="$(echo "$line" | sed 's#\+##')"
  # delete first occurrence of "
  line="$(echo "$line" | sed 's#\"##')"
  # delete last occurrence of "
  line="$(echo "$line" | rev | sed 's#\"##' | rev)"
  # replace all occurrences of \" with "
  line="$(echo "$line" | sed 's#\\\"#\"#g')"
  echo "$line" 
done < "$file" 
```

```
$ cat file.java
"select 1 as \"alias\"" +
"from dual" +
"where 1=1"

$ ./from_java_string_to_sql.bash file.java
select 1 as "alias"
from dual
where 1=1
```
