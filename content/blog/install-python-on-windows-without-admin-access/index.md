---
title: "Install Python on Windows Without Admin Access"
date: 2020-07-13T22:08:50-05:00
toc: false
---

Sometimes you need to install developer tools on a Windows machine, but you don't have Admin access. How to get around this, you say? Well, instead of running an installer, you download the binaries you need then add them to your `PATH`.

## Python version 3.8.4

1. Download a zip of the 64-bit Windows binary <https://www.python.org/ftp/python/3.8.4/python-3.8.4-embed-amd64.zip>
1. Create folder `%USERPROFILE%\bin\python`, then extract the zip contents into this folder
1. Open Command Prompt and set environment variables for your account

        setx PYTHON_HOME "%USERPROFILE%\bin\python\python-3.8.4-embed-amd64"
        setx PATH "%PYTHON_HOME%;%PATH%"

1. **Restart** Command Prompt. Changes made by `setx` will only be picked up in new instances of Command Prompt
1. Confirm installation

        python --version
