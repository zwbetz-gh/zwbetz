---
title: "Install NodeJS on Windows Without Admin Access"
date: 2020-07-13T22:00:00-05:00
toc: false
---

Sometimes you need to install developer tools on a Windows machine, but you don't have Admin access. How to get around this, you say? Well, instead of running an installer, you download the binaries you need then add them to your `PATH`.

This will install node version `14.16.0`

## Install

1. Get familiar with [Windows Environment Variables in Command Prompt]({{< relref "windows-environment-variables-in-command-prompt" >}})
1. Download a zip of the 64-bit Windows binary <https://nodejs.org/dist/v14.16.0/node-v14.16.0-win-x64.zip>
1. Create folder `%USERPROFILE%\bin\nodejs`, then extract the zip contents into this folder
1. Open Command Prompt and set environment variables for your account

        setx NODEJS_HOME "%USERPROFILE%\bin\nodejs\node-v14.16.0-win-x64"
        setx PATH "%NODEJS_HOME%;%PATH%"

1. **Restart** Command Prompt
1. Confirm installation

        node --version
        npm --version

## Related

- [Install Python on Windows Without Admin Access]({{< relref "install-python-on-windows-without-admin-access" >}})
