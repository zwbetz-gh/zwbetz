---
title: "Install Postgres and psql on Mac"
date: 2019-10-11T20:53:10-05:00
toc: false
show_comments: true
---

1. Download and install [Postgres.app](https://postgresapp.com/)
1. Set environment variables in your bash config file, e.g. `~/.bash_profile`

        export POSTGRES_HOME=/Applications/Postgres.app/Contents/Versions/latest
        export PATH=$POSTGRES_HOME/bin:$PATH

1. Source bash config file

        source ~/.bash_profile

1. Confirm installation

        psql --version
