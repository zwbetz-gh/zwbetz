---
title: "Install Gradle on Mac"
date: 2019-10-11T20:58:09-05:00
toc: false
---

1. [Install Java]({{< relref "install-java-on-mac" >}}) version 8 or higher
1. Download Gradle from the [releases page](https://gradle.org/releases/). We'll use version `6.8.3` in this example

        curl -O -L https://downloads.gradle-dn.com/distributions/gradle-6.8.3-bin.zip

1. Make dir then unzip it

        mkdir -p ~/bin/gradle
        unzip -d ~/bin/gradle gradle-6.8.3-bin.zip

1. Set environment variables in your bash config file, e.g. `~/.bash_profile`

        export GRADLE_HOME=$HOME/bin/gradle/gradle-6.8.3
        export PATH=$GRADLE_HOME/bin:$PATH

1. Source bash config file

        source ~/.bash_profile

1. Confirm installation

        gradle --version
