---
title: "Install Python on Windows Without Admin Access"
date: 2020-07-13T22:08:50-05:00
toc: false
---

Sometimes you need to install developer tools on a Windows machine, but you don't have Admin access. How to get around this, you say? Well, instead of running an installer, you download the binaries you need then add them to your `PATH`.

<!--more-->

**Note:** This will only install the [embeddable package](https://docs.python.org/3.9/using/windows.html#windows-embeddable) of `python`, which means `pip` will **not** be included. If you need `pip`, then use the [full package](https://docs.python.org/3.9/using/windows.html#windows-full) (whic may require admin access).

## Install

1. Get familiar with [Windows Environment Variables in Command Prompt]({{< relref "windows-environment-variables-in-command-prompt" >}})
1. Download a zip of the 64-bit Windows binary <https://www.python.org/ftp/python/3.9.9/python-3.9.9-embed-amd64.zip>
1. Create folder `%USERPROFILE%\bin\python`, then extract the zip contents into this folder
1. Open Command Prompt and run

        setx PYTHON_HOME "%USERPROFILE%\bin\python\python-3.9.9-embed-amd64"
        setx PATH "%PYTHON_HOME%;%PATH%"

1. **Restart** Command Prompt
1. Confirm installation

        python --version

## Related

- [How to Add a Binary (or Executable, or Program) to Your PATH on macOS, Linux, or Windows]({{< relref "how-to-add-a-binary-to-your-path-on-macos-linux-windows" >}})
- [Install NodeJS on Windows Without Admin Access]({{< relref "install-nodejs-on-windows-without-admin-access" >}})
