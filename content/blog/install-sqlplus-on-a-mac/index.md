---
title: "Install SQL*Plus on a Mac"
date: 2019-06-07T13:06:55-05:00
toc: true
---

Also see: [Install SQL*Plus on Linux]({{< relref "/install-sqlplus-on-linux" >}}).

## SQL*Plus Version 12.2.0.1.0

1. Navigate to [Oracle downloads](https://www.oracle.com/technetwork/topics/intel-macsoft-096467.html), accept the license agreement, and login. If you don't already have an Oracle account, you'll need to create one
1. Download these zip files:
    1. `instantclient-basic-macos.x64-12.2.0.1.0-2.zip`
    1. `instantclient-sqlplus-macos.x64-12.2.0.1.0-2.zip`
1. Make dir for instant client then unzip zips

        mkdir -p ~/bin/oracle
        unzip -d ~/bin/oracle instantclient-basic-macos.x64-12.2.0.1.0-2.zip
        unzip -d ~/bin/oracle instantclient-sqlplus-macos.x64-12.2.0.1.0-2.zip

1. The file listing of that dir should now look like:
    
        $ cd  ~/bin/oracle/instantclient_12_2 && find . -type f | sort
        ./BASIC_README
        ./SQLPLUS_README
        ./adrci
        ./genezi
        ./glogin.sql
        ./libclntsh.dylib
        ./libclntsh.dylib.12.1
        ./libclntshcore.dylib.12.1
        ./libnnz12.dylib
        ./libocci.dylib
        ./libocci.dylib.12.1
        ./libociei.dylib
        ./libocijdbc12.dylib
        ./libons.dylib
        ./liboramysql12.dylib
        ./libsqlplus.dylib
        ./libsqlplusic.dylib
        ./ojdbc8.jar
        ./sqlplus
        ./uidrvci
        ./xstreams.jar
    
1. Add this line to your bash config file, e.g. `~/.bash_profile`, to add `sqlplus` to your `PATH`
    
        export LD_LIBRARY_PATH=$HOME/bin/oracle/instantclient_12_2:$LD_LIBRARY_PATH
        export PATH=$LD_LIBRARY_PATH:$PATH
    
1. Source your `~/.bash_profile`
    
        source ~/.bash_profile
    
1. Run `sqlplus -V` to confirm it's installed

## SQL*Plus Version 19.3.0.0.0

1. Navigate to [Oracle downloads](https://www.oracle.com/technetwork/topics/intel-macsoft-096467.html), accept the license agreement, and login. If you don't already have an Oracle account, you'll need to create one
1. Download these zip files:
    1. `instantclient-basic-macos.x64-19.3.0.0.0dbru.zip`
    1. `instantclient-sqlplus-macos.x64-19.3.0.0.0dbru.zip`
1. Make dir for instant client then unzip zips

        mkdir -p ~/bin/oracle
        unzip -d ~/bin/oracle instantclient-basic-macos.x64-19.3.0.0.0dbru.zip
        unzip -d ~/bin/oracle instantclient-sqlplus-macos.x64-19.3.0.0.0dbru.zip

1. The file listing of that dir should now look like:
    
        $ cd  ~/bin/oracle/instantclient_19_3 && find . -type f | sort
        ./BASIC_LICENSE
        ./BASIC_README
        ./SQLPLUS_LICENSE
        ./SQLPLUS_README
        ./adrci
        ./genezi
        ./glogin.sql
        ./libclntsh.dylib.19.1
        ./libclntshcore.dylib.19.1
        ./libnnz19.dylib
        ./libocci.dylib.19.1
        ./libociei.dylib
        ./libocijdbc19.dylib
        ./liboramysql19.dylib
        ./libsqlplus.dylib
        ./libsqlplusic.dylib
        ./network/admin/README
        ./ojdbc8.jar
        ./sqlplus
        ./ucp.jar
        ./uidrvci
        ./xstreams.jar
    
1. Add this line to your bash config file, e.g. `~/.bash_profile`, to add `sqlplus` to your `PATH`
    
        export LD_LIBRARY_PATH=$HOME/bin/oracle/instantclient_19_3:$LD_LIBRARY_PATH
        export PATH=$LD_LIBRARY_PATH:$PATH
    
1. Source your `~/.bash_profile`
    
        source ~/.bash_profile
    
1. Run `sqlplus -V` to confirm it's installed
