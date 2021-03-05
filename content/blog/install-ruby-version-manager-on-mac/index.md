---
title: "Install Ruby Version Manager (RVM) on Mac"
date: 2019-10-19T23:37:06-05:00
toc: false
show_comments: true
---

1. Install [Homebrew](https://brew.sh/)
1. Install GPG

        brew install gpg

1. Import RVM keys into GPG

        curl -sSL https://rvm.io/mpapis.asc | gpg --import -
        curl -sSL https://rvm.io/pkuczynski.asc | gpg --import -

1. Trust RVM keys with GPG

        echo 409B6B1796C275462A1703113804BB82D39DC0E3:6: | gpg --import-ownertrust
        echo 7D2BAF1CF37B13E2069D6956105BD0E739499BDB:6: | gpg --import-ownertrust

1. Install RVM

        \curl -sSL https://get.rvm.io | bash -s -- --ignore-dotfiles

1. To source RVM, add this line to your bash config file, e.g. `~/.bash_profile`

        source $HOME/.rvm/scripts/rvm

1. Source bash config file

        source ~/.bash_profile

1. Confirm installation

        rvm --version

See [RVM CLI docs](https://rvm.io/rvm/cli) for how to manage different versions of Ruby.
