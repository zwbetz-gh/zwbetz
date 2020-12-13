#!/usr/bin/env bash

git clone https://github.com/zwbetz-gh/json-resume.git /tmp/json-resume
mkdir -p static/resume
cp -a /tmp/json-resume/public/. static/resume/
rm -rf /tmp/json-resume
