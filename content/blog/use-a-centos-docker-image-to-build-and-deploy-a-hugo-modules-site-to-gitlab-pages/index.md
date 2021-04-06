---
title: "Use a CentOS Docker Image to Build and Deploy a Hugo (Modules) Site to GitLab Pages"
date: 2020-12-22T13:29:09-06:00
toc: false
---

Am wrapping up a project for a client that needed a static site. They requested that it be built with Hugo and deployed to GitLab pages. The theme they wanted to base it off uses Hugo Modules, which in turn requires a Golang installation.

I set things up so that when a commit is pushed to the `master` branch, a CI job is triggered. This job does the following:

- Pulls a CentOS docker image
- Installs `curl`, `git`, `go`, `hugo`
- Builds the site
- Deploys the site to GitLab Pages

Sample files are below.

Also, this was my first time doing any CI work in GitLab, and I must say, the `.gitlab-ci.yml` is very cool. Their documentation is good too.

## `.gitlab-ci.yml`

```yml
image: centos:8

variables:
  GIT_SUBMODULE_STRATEGY: recursive
  GO_VERSION: "1.15.6"
  HUGO_VERSION: "0.78.2"

before_script:
  - yum install -y curl git
  - chmod 755 task_ci_config.sh
  - chmod 755 task_ci_install_go.sh
  - chmod 755 task_ci_install_hugo.sh
  - chmod 755 task_ci_build.sh
  - ./task_ci_install_go.sh $GO_VERSION
  - ./task_ci_install_hugo.sh $HUGO_VERSION

pages:
  stage: deploy
  script:
    - ./task_ci_build.sh
  artifacts:
    paths:
      - public
  only:
    - master
```

## `task_ci_config.sh`

```shell
#!/usr/bin/env bash

export PATH=${PATH}:/usr/local/go/bin
export PATH=${PATH}:/usr/local
```

## `task_ci_install_go.sh`

```shell
#!/usr/bin/env bash

USAGE="Usage:\n\n${0} VERSION\n"

if [[ -z ${1} ]]; then
  echo -e "${USAGE}"; exit 1
fi

source task_ci_config.sh

VERSION=${1}
TAR=go${VERSION}.linux-amd64.tar.gz
URL=https://golang.org/dl/${TAR}

curl -L -O ${URL}
tar -C /usr/local -xzf ${TAR}
go version
```

## `task_ci_install_hugo.sh`

```shell
#!/usr/bin/env bash

USAGE="Usage:\n\n${0} VERSION\n"

if [[ -z ${1} ]]; then
  echo -e "${USAGE}"; exit 1
fi

source task_ci_config.sh

VERSION=${1}
TAR=hugo_extended_${VERSION}_Linux-64bit.tar.gz
URL=https://github.com/gohugoio/hugo/releases/download/v${VERSION}/${TAR}

curl -L -O ${URL}
tar -C /usr/local -xzf ${TAR}
hugo version
```

## `task_ci_build.sh`

```shell
#!/usr/bin/env bash

source task_ci_config.sh

hugo
```
