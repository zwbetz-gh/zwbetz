---
title: "Install Gradle on Mac"
date: 2019-10-11T20:58:09-05:00
tags: [command-line, mac, gradle, java]
toc: false
show_comments: true
---

1. [Install Java]({{< relref "install-java-on-mac" >}}), version 8 or higher
1. Download Gradle from the [releases page](https://gradle.org/releases/). We'll use `v5.6.2` in this example
1. Navigate to where you downloaded Gradle, make a directory for it, unzip it, then verify directory contents

        cd ~/Downloads
        mkdir -p ~/bin/gradle
        unzip -d ~/bin/gradle gradle-5.6.2-bin.zip
        ls ~/bin/gradle/gradle-5.6.2

1. Set environment variables in your bash config file, e.g. `~/.bash_profile`

        export GRADLE_HOME=$HOME/bin/gradle/gradle-5.6.2
        export PATH=$GRADLE_HOME/bin:$PATH

1. Source bash config file

        source ~/.bash_profile

1. Confirm installation

        gradle --version
