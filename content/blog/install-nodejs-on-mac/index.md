---
title: "Install NodeJS and NPM on Mac"
date: 2019-10-19T23:34:33-05:00
toc: false
---

This will install `node v10.16.3` and `npm v6.9.0`.

1. Download tarball from [NodeJS downloads](https://nodejs.org/en/download/)

        curl -O -L https://nodejs.org/dist/v10.16.3/node-v10.16.3-darwin-x64.tar.gz

1. Make dir then extract tarball

        mkdir -p ~/bin/nodejs
        tar -v -x -C ~/bin/nodejs -f node-v10.16.3-darwin-x64.tar.gz

1. Set environment variables in your bash config file, e.g. `~/.bash_profile`

        export NODEJS_HOME=$HOME/bin/nodejs/node-v10.16.3-darwin-x64
        export PATH=$NODEJS_HOME/bin:$PATH

1. Source bash config file

        source ~/.bash_profile

1. Confirm installation

        node --version
        npm --version
