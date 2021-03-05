---
title: "Install SQL*Plus on Linux"
date: 2019-09-28T14:10:28-05:00
toc: true
show_comments: true
---

Also see: [Install SQL*Plus on Mac]({{< relref "/install-sqlplus-on-a-mac" >}}).

## SQL*Plus Version 12.2.0.1.0

1. Navigate to [Instant Client Downloads for Linux x86-64 (64-bit)](https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html)
1. Download these zip files:
    1. `instantclient-basic-linux.x64-12.2.0.1.0.zip`
    1. `instantclient-sqlplus-linux.x64-12.2.0.1.0.zip`
1. Make dir for instant client then unzip zips

        mkdir -p /opt/oracle
        unzip -d /opt/oracle instantclient-basic-linux.x64-12.2.0.1.0.zip
        unzip -d /opt/oracle instantclient-sqlplus-linux.x64-12.2.0.1.0.zip

1. The file listing of that dir should now look like

        $ cd /opt/oracle/instantclient_12_2 && find . -type f | sort
        ./adrci
        ./BASIC_README
        ./genezi
        ./glogin.sql
        ./libclntshcore.so.12.1
        ./libclntsh.so.12.1
        ./libipc1.so
        ./libmql1.so
        ./libnnz12.so
        ./libocci.so.12.1
        ./libociei.so
        ./libocijdbc12.so
        ./libons.so
        ./liboramysql12.so
        ./libsqlplusic.so
        ./libsqlplus.so
        ./ojdbc8.jar
        ./sqlplus
        ./SQLPLUS_README
        ./uidrvci
        ./xstreams.jar

1. Set the `LD_LIBRARY_PATH` and `PATH` env vars in your `~/.bashrc`

        export LD_LIBRARY_PATH=/opt/oracle/instantclient_12_2:$LD_LIBRARY_PATH
        export PATH=$LD_LIBRARY_PATH:$PATH

1. Source your `~/.bashrc`

        source ~/.bashrc

1. Run `sqlplus -V` to confirm it's installed

## SQL*Plus Version 19.3.0.0.0

1. Navigate to [Instant Client Downloads for Linux x86-64 (64-bit)](https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html)
1. Download these zip files:
    1. `instantclient-basic-linux.x64-19.3.0.0.0dbru.zip`
    1. `instantclient-sqlplus-linux.x64-19.3.0.0.0dbru.zip`
1. Make dir for instant client then unzip zips

        mkdir -p /opt/oracle
        unzip -d /opt/oracle instantclient-basic-linux.x64-19.3.0.0.0dbru.zip
        unzip -d /opt/oracle instantclient-sqlplus-linux.x64-19.3.0.0.0dbru.zip 

1. The file listing of that dir should now look like

        $ cd /opt/oracle/instantclient_19_3 && find . -type f | sort
        ./adrci
        ./BASIC_LICENSE
        ./BASIC_README
        ./genezi
        ./glogin.sql
        ./libclntshcore.so.19.1
        ./libclntsh.so.19.1
        ./libipc1.so
        ./libmql1.so
        ./libnnz19.so
        ./libocci.so.19.1
        ./libociei.so
        ./libocijdbc19.so
        ./liboramysql19.so
        ./libsqlplusic.so
        ./libsqlplus.so
        ./network/admin/README
        ./ojdbc8.jar
        ./sqlplus
        ./SQLPLUS_LICENSE
        ./SQLPLUS_README
        ./ucp.jar
        ./uidrvci
        ./xstreams.jar

1. Set the `LD_LIBRARY_PATH` and `PATH` env vars in your `~/.bashrc`

        export LD_LIBRARY_PATH=/opt/oracle/instantclient_19_3:$LD_LIBRARY_PATH
        export PATH=$LD_LIBRARY_PATH:$PATH

1. Source your `~/.bashrc`

        source ~/.bashrc

1. Run `sqlplus -V` to confirm it's installed

---

Note: If you get the following error, then see potential solutions at <https://stackoverflow.com/questions/10619298/libaio-so-1-cannot-open-shared-object-file>

```
sqlplus: error while loading shared libraries: libaio.so.1: cannot open shared object file: No such file or directory
```
