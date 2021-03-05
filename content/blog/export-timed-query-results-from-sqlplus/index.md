---
title: "Export timed query results from SQL*Plus"
date: 2019-01-15T22:10:59-06:00
toc: false
show_comments: true
---

At work, we have to SSH into an ubuntu box in order to run queries. Since this box has no GUI, all work must be done through command line and SQL*Plus. 

Sadly, pasting multi-line queries into SQL*Plus is a no-go. And copying query results, if they're more than a few dozen lines, isn't much better. So, after trial and error, here's my solution:

- Copy the multi-line query from my host (macOS)
- Create a file on ubuntu box using [vi]({{< relref "just-enough-vi-to-open-a-file-edit-it-and-quit" >}}), then paste in the query. Save it as `file.sql`
- Open SQL*Plus and make a connection to the Oracle database
- Run the query file by entering `@file.sql`
- The timed results are exported to a file named `output.txt`
- Use SCP to copy `output.txt` from the ubuntu box to my host 

Here's an example query file. **Note**, the query must end with a semicolon. 

```
SPOOL output.txt
TIMING START timer

<query_goes_here>

TIMING STOP timer
SPOOL OFF
```

And an example SCP command. 

```
 scp <username>@<host>:/path/to/output.txt ~/Desktop
```
