---
title: "Install Java on Mac"
date: 2019-10-11T20:56:27-05:00
tags: [command-line, mac, java]
toc: false
show_comments: true
---

1. Navigate to [AdoptOpenJDK](https://adoptopenjdk.net/?variant=openjdk11&jvmVariant=hotspot)
1. For this example, we'll download and install **Version**: OpenJDK 11 (LTS), **JVM**: HotSpot
1. After installation, set environment variables in your bash config file, e.g. `~/.bash_profile`

        export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk/Contents/Home
        export PATH=$JAVA_HOME/bin:$PATH

1. Source bash config file

        source ~/.bash_profile

1. Confirm installation

        java -version
