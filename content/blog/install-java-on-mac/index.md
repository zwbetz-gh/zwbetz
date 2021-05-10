---
title: "Install Java on Mac"
summary: "Good old Java, let me install you."
date: 2019-10-11T20:56:27-05:00
toc: true
---

## Java 8

1. Download OpenJDK 8 tarball from [AdoptOpenJDK](https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=hotspot#x64_mac)

        curl -O -L https://github.com/AdoptOpenJDK/openjdk8-binaries/releases/download/jdk8u232-b09_openj9-0.17.0/OpenJDK8U-jdk_x64_mac_openj9_8u232b09_openj9-0.17.0.tar.gz

1. Make dir for it

        mkdir -p ~/bin/java

1. Extract tarball

        tar -v -x -C ~/bin/java -f OpenJDK8U-jdk_x64_mac_openj9_8u232b09_openj9-0.17.0.tar.gz

1. Set environment variables in your `~/.bash_profile`

        export JAVA_HOME=${HOME}/bin/java/jdk8u232-b09/Contents/Home
        export PATH=${JAVA_HOME}/bin:${PATH}

1. Pick up the changes

        source ~/.bash_profile

1. Confirm installation

        java -version

## Java 11

1. Download OpenJDK 11 tarball from [AdoptOpenJDK](https://adoptopenjdk.net/releases.html?variant=openjdk11&jvmVariant=hotspot#x64_mac)

        curl -O -L https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.4%2B11.4/OpenJDK11U-jdk_x64_mac_hotspot_11.0.4_11.tar.gz

1. Make dir for it

        mkdir -p ~/bin/java

1. Extract tarball

        tar -v -x -C ~/bin/java -f OpenJDK11U-jdk_x64_mac_hotspot_11.0.4_11.tar.gz

1. Set environment variables in your `~/.bash_profile`

        export JAVA_HOME=${HOME}/bin/java/jdk-11.0.4+11/Contents/Home
        export PATH=${JAVA_HOME}/bin:${PATH}

1. Pick up the changes

        source ~/.bash_profile

1. Confirm installation

        java -version

## Switch Java Versions on the Fly

Add the following Bash function to your `~/.bash_profile`. It uses Java 11 by default, and allows you to switch Java versions on the fly.

```shell
use_java() {
  local USAGE="\
Usage: ${FUNCNAME[0]} <VERSION>
Where <VERSION> is one of: 8, 11"

  if [[ ${#} -ne 1 ]]; then
    echo -e "${USAGE}"
    return 1
  fi

  if [[ ${1} == 8 ]]; then 
    export JAVA_HOME=${HOME}/bin/java/jdk8u232-b09/Contents/Home
  elif [[ ${1} == 11 ]]; then 
    export JAVA_HOME=${HOME}/bin/java/jdk-11.0.4+11/Contents/Home
  else 
    echo -e "${USAGE}"
    return 1
  fi 

  export PATH=${JAVA_HOME}/bin:${PATH}
  2>&1 java -version | head -n 1
}

use_java 11
```
