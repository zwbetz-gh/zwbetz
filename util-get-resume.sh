#!/usr/bin/env bash

pushd static
curl -o resume.html https://raw.githubusercontent.com/zwbetz-gh/json-resume/master/public/index.html
popd
