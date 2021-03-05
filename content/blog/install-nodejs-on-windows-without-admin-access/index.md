---
title: "Install NodeJS on Windows without Admin access"
date: 2020-07-13T22:00:00-05:00
toc: false
show_comments: false
---

Sometimes you need to install developer tools on a Windows machine, but you don't have Admin access. How to get around this, you say? Well, instead of running an installer, you download the binaries you need then add them to your `PATH`.

## NodeJS version 14.5.0

1. Download a zip of the 64-bit Windows binary <https://nodejs.org/dist/v14.5.0/node-v14.5.0-win-x64.zip>
1. Create folder `%USERPROFILE%\bin\nodejs`, then extract the zip contents into this folder
1. Open Command Prompt and set environment variables for your account

        setx NODEJS_HOME "%USERPROFILE%\bin\nodejs\node-v14.5.0-win-x64"
        setx PATH "%NODEJS_HOME%;%PATH%"

1. **Restart** Command Prompt. Changes made by `setx` will only be picked up in new instances of Command Prompt
1. Confirm installation

        node --version
        npm --version
