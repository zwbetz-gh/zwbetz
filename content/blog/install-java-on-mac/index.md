---
title: "Install Java on Mac"
date: 2019-10-11T20:56:27-05:00
tags: [command-line, mac, java]
toc: false
show_comments: true
---

## Java 8

1. Download OpenJDK 8 tarball from [AdoptOpenJDK](https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=hotspot#x64_mac)

        curl -O -L https://github.com/AdoptOpenJDK/openjdk8-binaries/releases/download/jdk8u232-b09_openj9-0.17.0/OpenJDK8U-jdk_x64_mac_openj9_8u232b09_openj9-0.17.0.tar.gz

1. Make dir then extract tarball

        mkdir -p ~/bin/java
        tar -v -x -C ~/bin/java -f OpenJDK8U-jdk_x64_mac_openj9_8u232b09_openj9-0.17.0.tar.gz

1. Set environment variables in your bash config file, e.g. `~/.bash_profile`

        export JAVA_HOME=$HOME/bin/java/jdk8u232-b09/Contents/Home
        export PATH=$JAVA_HOME/bin:$PATH

1. Source bash config file

        source ~/.bash_profile

1. Confirm installation

        java -version

## Java 11

1. Download OpenJDK 11 tarball from [AdoptOpenJDK](https://adoptopenjdk.net/releases.html?variant=openjdk11&jvmVariant=hotspot#x64_mac)

        curl -O -L https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.4%2B11.4/OpenJDK11U-jdk_x64_mac_hotspot_11.0.4_11.tar.gz

1. Make dir then extract tarball

        mkdir -p ~/bin/java
        tar -v -x -C ~/bin/java -f OpenJDK11U-jdk_x64_mac_hotspot_11.0.4_11.tar.gz

1. Set environment variables in your bash config file, e.g. `~/.bash_profile`

        export JAVA_HOME=$HOME/bin/java/jdk-11.0.4+11/Contents/Home
        export PATH=$JAVA_HOME/bin:$PATH

1. Source bash config file

        source ~/.bash_profile

1. Confirm installation

        java -version
