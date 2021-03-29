---
title: "Install Yarn on Mac"
date: 2019-10-19T23:35:38-05:00
toc: false
---

This will install yarn version `1.22.10`

1. Install [NodeJS]({{< relref "install-nodejs-on-mac" >}})
1. Download tarball from [Yarn downloads](https://github.com/yarnpkg/yarn/releases)

        curl -O -L https://github.com/yarnpkg/yarn/releases/download/v1.22.10/yarn-v1.22.10.tar.gz

1. Make dir then extract tarball

        mkdir -p ~/bin/yarn
        tar -v -x -C ~/bin/yarn -f yarn-v1.22.10.tar.gz

1. Set environment variables in your bash config file, e.g. `~/.bash_profile`

        export YARN_HOME=$HOME/bin/yarn/yarn-v1.22.10
        export PATH=$YARN_HOME/bin:$PATH

1. Source bash config file

        source ~/.bash_profile

1. Confirm installation

        yarn --version
