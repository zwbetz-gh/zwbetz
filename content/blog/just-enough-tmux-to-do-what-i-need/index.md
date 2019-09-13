---
title: "Just enough tmux to do what I need"
date: 2019-02-07T10:56:19-06:00
tags: [tmux, command-line, linux, mac]
toc: false
show_comments: true
---

As mentioned in [Export timed query results from SQL*Plus]({{< relref "export-timed-query-results-from-sqlplus" >}}), I have to SSH into an ubuntu box in order to run queries. Sometimes these queries take a while, so if my SSH connection times out, I'm out of luck. 

Thankfully, I learned about tmux, and can now keep my SSH connection open as long as I'd like. Here are some useful tmux commands: 

List sessions:

```
tmux ls
```

If no sessions exist, create one:

```
tmux
```

If sessions exist, attach to one:

```
tmux attach -t <session_name>
```

Attach to last used session:

```
tmux attach
```

Detach from a session:

```
tmux detach
```

Kill a session:

```
tmux kill-session -t <session_name>
```

Kill all sessions:

```
tmux kill-server
```
