---
title: "Change Terminal prompt on Mac"
date: 2019-10-19T14:16:00-05:00
tags: []
toc: false
show_comments: true
---

Your Terminal prompt is controlled via the `PS1` Bash environment variable . It's initially defined in `/etc/bashrc`, and its default value is:

    '\h:\W \u\$ '

See the [GNU Bash reference manual](https://www.gnu.org/software/bash/manual/html_node/Controlling-the-Prompt.html) for available prompt config options.

Once you find the options you like, update `PS1` in your Bash config file, e.g. `~/.bash_profile`, for example:

    export PS1='\u@\h:\w\n\$ '

The above will display a prompt like so:

    user@host:/path/to/current/dir
    $ 
