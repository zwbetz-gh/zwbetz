---
title: "Setup and Run SonarQube on Mac"
date: 2020-08-31T19:59:10-05:00
toc: true
---

Many projects these days have a dedicated SonarQube stage in their CI/CD pipelines. Yet, sometimes it's useful to run SonarQube locally to shorten the feedback loop of a) change code, b) run scan, c) view results.

SonarQube has 2 main parts: SonarQube Server, which is a server that displays scan results (among other things), and Sonar Scanner, which does the actual scanning.

<!--more-->

## SonarQube Version 9.4.0

### Prerequisites

1. Java 11 is installed

### Setup

#### Install SonarQube Server

```sh
mkdir -p ~/bin && \
mkdir -p ~/tmp && \
cd ~/tmp && \
curl -O https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-9.4.0.54424.zip && \
tar -x -z -f sonarqube-9.4.0.54424.zip && \
cp -R sonarqube-9.4.0.54424 ~/bin/
```

#### Install Sonar Scanner

```sh
mkdir -p ~/bin && \
mkdir -p ~/tmp && \
cd ~/tmp && \
curl -O https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.7.0.2747-macosx.zip
tar -x -z -f sonar-scanner-cli-4.7.0.2747-macosx.zip && \
cp -R sonar-scanner-4.7.0.2747-macosx ~/bin/
```

#### Add Shell Helper

Add the following to your [shell config file]({{< relref "shell-config-file-on-mac" >}}) then restart Terminal:

```sh
export SONARQUBE_PATH="${HOME}/bin/sonarqube-9.4.0.54424/bin/macosx-universal-64/sonar.sh"
export SONAR_SCANNER_PATH="${HOME}/bin/sonar-scanner-4.7.0.2747-macosx/bin/sonar-scanner"

sonar_console() {
  "${SONARQUBE_PATH}" console
}

sonar_scan() {
  local token="${1}"
  local current_dir="$(basename $(pwd))"
  local current_commit="$(git rev-parse --short HEAD)"

  # Optional: Include lombok
  local lombok_jar_version="1.18.18" # Change this to your version
  local lombok_jar_path="$(find ${HOME}/.gradle/caches -name lombok-${lombok_jar_version}.jar)"

  echo "token=${token}"
  echo "current_dir=${current_dir}"
  echo "current_commit=${current_commit}"

  # Optional: Include lombok
  echo "lombok_jar_version=${lombok_jar_version}"
  echo "lombok_jar_path=${lombok_jar_path}"

  if [[ -z "${token}" ]] ; then
    echo ""
    echo "The token is required as the 1st arg. Exiting"
    return 1
  fi

  echo ""

  "${SONAR_SCANNER_PATH}" \
  -Dsonar.login="${token}" \
  -Dsonar.projectKey="${current_dir}" \
  -Dsonar.projectName="${current_dir}" \
  -Dsonar.projectVersion="${current_commit}" \
  -Dsonar.java.binaries="build/classes" \
  -Dsonar.java.libraries="${lombok_jar_path}" # Optional: Include lombok
}
```

#### Generate a Token

1. Run `sonar_console` then wait for it to startup
1. Go to <http://localhost:9000>
1. Login with default credentials of `admin` / `admin` then reset your password
1. Go to <http://localhost:9000/projects/create?mode=manual>
1. Enter `temp` for Project display name and Project key
1. Click **Set Up**
1. Go to <http://localhost:9000/dashboard?id=temp&selectedTutorial=manual>
1. Enter `temp` for your token name
1. Click **Generate**
1. Copy the generated token

### Usage

1. `cd` the project that you want to run SonarQube on
1. _Optionally_, run the unit tests for the repo. You only have to do this if you want SonarQube to report on _test coverage_. Otherwise, you can skip this step and just address the Code Smells and such reported by SonarQube
1. Run `sonar_scan <TOKEN>` to start the scanner. Replace `<TOKEN>` with your actual token
1. Once the scan is complete, view the results at <http://localhost:9000/projects>

---

## SonarQube Version 8.4.2

### Prerequisites

- Java version 8 or higher is installed
- The directory `~/bin` exists

### Install sonarqube

1. Download sonarqube from <https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-8.4.2.36762.zip>
1. Extract the zip file to `~/bin`

### Install sonar-scanner

1. Download sonar-scanner from <https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.4.0.2170-macosx.zip>
1. Extract the zip file to `~/bin`

### Add Shell Helper

Add the following helper functions to your [shell config file]({{< relref "shell-config-file-on-mac" >}}) then restart Terminal

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
  lombok_jar_path=$(find ${HOME}/.gradle/caches -name lombok-1.18.10.jar) # Change this to your version
  echo "lombok_jar_path=${lombok_jar_path}"

  echo ""

  ${SONAR_SCANNER_PATH} \
  -Dsonar.projectKey=${current_dir} \
  -Dsonar.projectName=${current_dir} \
  -Dsonar.projectVersion=${current_commit} \
  -Dsonar.source=. \
  -Dsonar.java.binaries=build/classes \
  -Dsonar.java.libraries=${lombok_jar_path} # Optional: Include lombok
}
```

### Start sonarqube server

1. Start server

        sonar_start

1. Check server status

        sonar_status

### Run a scan with sonar-scanner

1. Navigate to the repo that you want to run a scan on
1. Run all unit tests so that sonar will report test coverage
1. Run a scan

        sonar_scan

### View scan results

1. Navigate to <http://localhost:9000>
1. Click **Projects**

### Notes

- Sonar can connect to an external RDS to store scan history, but this doc assumes you'll use the default embedded database
- If you want to delete a project, you must login. The default username/password is `admin`/`admin`
- It's possible to ignore rules via undocumented config <https://community.sonarsource.com/t/documentation-about-ignore-issues-seems-to-be-wrong-or-outdated/3353>
