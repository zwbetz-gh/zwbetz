---
title: "Install Python on Windows Without Admin Access"
date: 2020-07-13T22:08:50-05:00
toc: false
---

Sometimes you need to install developer tools on a Windows machine, but you don't have Admin access. How to get around this, you say? Well, instead of running an installer, you download the binaries you need then add them to your `PATH`.

This will install python version `3.9.2`

## Install

1. Get familiar with [Windows Environment Variables in Command Prompt]({{< relref "windows-environment-variables-in-command-prompt" >}})
1. Download a zip of the 64-bit Windows binary <https://www.python.org/ftp/python/3.9.2/python-3.9.2-embed-amd64.zip>
1. Create folder `%USERPROFILE%\bin\python`, then extract the zip contents into this folder
1. Open Command Prompt and set environment variables for your account

        setx PYTHON_HOME "%USERPROFILE%\bin\python\python-3.9.2-embed-amd64"
        setx PATH "%PYTHON_HOME%;%PATH%"

1. **Restart** Command Prompt
1. Confirm installation

        python --version

## Related

- [Install NodeJS on Windows Without Admin Access]({{< relref "install-nodejs-on-windows-without-admin-access" >}})
