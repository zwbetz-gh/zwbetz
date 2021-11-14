---
title: "How to Add a Binary (or Executable, or Program) to Your PATH on macOS, Linux, or Windows"
date: 2021-06-23T21:03:06-05:00
toc: true
---

I often find myself explaining how to do this. It's time I get wise and write a generic doc on it.

We'll assume you want to add a binary, named `binary` on macOS and Linux, and `binary.exe` on Windows, to your `PATH`. (How original, I know).

Enjoy.

<!--more-->

## macOS and Linux CLI

**Note:** `${HOME}` is also known as `~`

1. Get familiar with [macOS and Linux Environment Variables in Terminal]({{< relref "mac-and-linux-environment-variables-in-terminal" >}})
1. Open Terminal
1. Create directory `${HOME}/bin` by running

        mkdir ${HOME}/bin

1. Save the `binary` to directory `${HOME}/bin`
1. Make the `binary` executable by running

        chmod 755 ${HOME}/bin/binary

1. **macOS** specific step
    1. Open file `${HOME}/.bash_profile` in a text editor. If the file doesn't exist, create it
1. **Linux** specific step
    1. Open file `${HOME}/.bashrc` in a text editor. If the file doesn't exist, create it
1. Add line `export PATH="${PATH}:${HOME}/bin"` to the file, then save it
1. **Restart** your Terminal
1. Verify the `binary` is on your `PATH` by running

        command -v binary

## Windows CLI

1. Get familiar with [Windows Environment Variables in Command Prompt]({{< relref "windows-environment-variables-in-command-prompt" >}})
1. Open Command Prompt
1. Create folder `C:\bin` by running

        mkdir C:\bin

1. Save the `binary.exe` to folder `C:\bin`
1. Edit the `PATH` for your account

        setx PATH "%PATH%;C:\bin"

1. **Restart** Command Prompt
1. Verify the `binary.exe` is on your `PATH` by running

        where.exe binary.exe

## Windows GUI

1. Create folder `C:\bin`
1. Save the `binary.exe` to folder `C:\bin`
1. Depending on your Windows version
    - If you're using Windows 8 or 10, press the Windows key, then search for and select **System (Control Panel)**
    - If you're using Windows 7, right click the **Computer** icon on the desktop and click **Properties**
1. Click **Advanced system settings**
1. Click **Environment Variables**
1. Under **System Variables**, find the `PATH` variable, select it, and click **Edit**. If there is no `PATH` variable, click **New**
1. Add `;C:\bin` to the end of the variable value. Notice the preceding `;`. For example, if the value was `C:\Windows\System32`, change it to `C:\Windows\System32;C:\bin`
1. Click **OK**
1. Open Command Prompt
1. Verify the `binary.exe` is on your `PATH` by running

        where.exe binary.exe
