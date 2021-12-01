---
title: "Install NodeJS on Windows Without Admin Access"
date: 2020-07-13T22:00:00-05:00
toc: false
---

Sometimes you need to install developer tools on a Windows machine, but you don't have Admin access. How to get around this, you say? Well, instead of running an installer, you download the binaries you need then add them to your `PATH`.

<!--more-->

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

## Known Issues

[@cgronseth](https://github.com/cgronseth) opened an [issue](https://github.com/zwbetz-gh/zwbetz/issues/12) where he ran into a character limit issue. Turns out the [setx docs](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/setx#remarks) mention this too. 

> Be aware there's a limit of 1024 characters when assigning contents to a variable using setx.
>
> This means that the content is cropped if you go over 1024 characters, and that the cropped text is what's applied to the target variable. If this cropped text is applied to an existing variable, it can result in loss of data previously held by the target variable.

He was able to resolve the issue by running this in PowerShell:

```
setx PATH ("%NODEJS_HOME%;"+[System.Environment]::GetEnvironmentVariables('User').Path)
```

## Related

- [How to Add a Binary (or Executable, or Program) to Your PATH on macOS, Linux, or Windows]({{< relref "how-to-add-a-binary-to-your-path-on-macos-linux-windows" >}})
- [Install Python on Windows Without Admin Access]({{< relref "install-python-on-windows-without-admin-access" >}})
