---
title: "Setup and Run SonarQube on Mac"
date: 2020-08-31T19:59:10-05:00
toc: true
---

It can be useful to run sonar locally. This doc explains how.

Sonar has 2 main parts: **sonarqube**, which is a server that displays scan results (among other things), and **sonar-scanner**, which does the actual scanning.

**Note:** This doc uses SonarQube version 8.4.2

## Prerequisites

- Java version 8 or higher is installed
- The directory `~/bin` exists

## Install sonarqube

1. Download sonarqube from <https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-8.4.2.36762.zip>
1. Extract the zip file to `~/bin`

## Install sonar-scanner

1. Download sonar-scanner from <https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.4.0.2170-macosx.zip>
1. Extract the zip file to `~/bin`

## Bash helper functions

Add the following bash helper functions to your `~/.bash_profile` then restart terminal

```shell
SONARQUBE_PATH="${HOME}/bin/sonarqube-8.4.2.36762/bin/macosx-universal-64/sonar.sh"
SONAR_SCANNER_PATH="${HOME}/bin/sonar-scanner-4.4.0.2170-macosx/bin/sonar-scanner"

sonar_start() {
  ${SONARQUBE_PATH} start
}

sonar_status() {
  ${SONARQUBE_PATH} status
}

sonar_stop() {
  ${SONARQUBE_PATH} stop
}

sonar_scan() {
  current_dir=$(basename $(pwd))
  echo "current_dir=${current_dir}"

  current_commit=$(git rev-parse --short HEAD)
  echo "current_commit=${current_commit}"

  # Optional: Include lombok
  lombok_jar_path=$(find ${HOME}/.gradle/caches -name lombok-1.18.10.jar)
  echo "lombok_jar_path=${lombok_jar_path}"

  echo ""

  ${SONAR_SCANNER_PATH} \
  -Dsonar.projectKey=${current_dir} \
  -Dsonar.projectName=${current_dir} \
  -Dsonar.projectVersion=${current_commit} \
  -Dsonar.source=. \
  -Dsonar.java.binaries=build/classes \
  # Optional: Include lombok
  -Dsonar.java.libraries=${lombok_jar_path}
}
```

## Start sonarqube server

1. Start server

        sonar_start

1. Check server status

        sonar_status

## Run a scan with sonar-scanner

1. Navigate to the repo that you want to run a scan on
1. Run all unit tests so that sonar will report test coverage
1. Run a scan

        sonar_scan

## View scan results

1. Navigate to <http://localhost:9000>
1. Click **Projects**

## Notes

- Sonar can connect to an external RDS to store scan history, but this doc assumes you'll use the default embedded database
- If you want to delete a project, you must login. The default username/password is `admin`/`admin`
- It's possible to ignore rules via undocumented config <https://community.sonarsource.com/t/documentation-about-ignore-issues-seems-to-be-wrong-or-outdated/3353>
