---
title: "Install Postgres and psql on Mac"
date: 2019-10-11
aliases: ["/install-psql-on-mac/"]
---

For your local database needs.

1. Download and install [Postgres.app](https://postgresapp.com/)
1.  Set environment variables in your [shell config file](/wiki/shell-config-file-on-mac)

        export POSTGRES_HOME=/Applications/Postgres.app/Contents/Versions/latest
        export PATH=${POSTGRES_HOME}/bin:${PATH}

1. Restart Terminal
1.  Confirm installation

        psql --version
