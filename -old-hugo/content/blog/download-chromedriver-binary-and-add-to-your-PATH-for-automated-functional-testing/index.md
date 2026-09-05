---
title: "Download ChromeDriver Binary and Add to Your PATH"
date: 2018-09-19T23:28:02-05:00
publishdate: 2018-09-19
draft: false
aliases:
- /2018/09/download-chromedriver-binary-and-add-to-your-path-for-automated-functional-testing/
toc: true
---

Many projects these days rely on `chromedriver`. Below are steps for Mac and Windows to download it, add it to your `PATH`, and verify setup.

You can obviously place the `chromedriver` binary in any directory you like, I just used Mac `${HOME}/bin` and Windows `C:\bin` for this example.

<!--more-->

## Sister Links

This article is basically a more specific version of [How to Add a Binary (or Executable, or Program) to Your PATH on macOS, Linux, or Windows]({{< relref "how-to-add-a-binary-to-your-path-on-macos-linux-windows" >}}).

## Mac CLI

1. Get familiar with [Mac Environment Variables in Terminal]({{< relref "mac-and-linux-environment-variables-in-terminal" >}})
1. Create directory `${HOME}/bin`
1. [Download it](http://chromedriver.chromium.org/downloads) for Mac and save to `${HOME}/bin`
1. Make it executable with
    ```
    chmod 755 ${HOME}/bin/chromedriver
    ```
1. Open your [shell config file]({{< relref "shell-config-file-on-mac" >}}) in a text editor
1. Add the below line then save the file
    ```
    export PATH="${HOME}/bin:${PATH}"
    ```
1. **Restart** your Terminal
1. Verify setup with
    ```
    chromedriver -v
    ```

## Windows CLI

1. Get familiar with [Windows Environment Variables in Command Prompt]({{< relref "windows-environment-variables-in-command-prompt" >}})
1. Create directory `C:\bin`
1. [Download it](http://chromedriver.chromium.org/downloads) for Windows and save to `C:\bin`
1. Open Command Prompt and set the `PATH` for your account with
    ```
    setx PATH "C:\bin;%PATH%"
    ```
1. **Restart** Command Prompt
1. Verify setup with
    ```
    chromedriver.exe -v
    ```

## Windows GUI

1. Create directory `C:\bin`
1. [Download it](http://chromedriver.chromium.org/downloads) for Windows and save to `C:\bin`
1. Depending on your Windows version
    - If you're using Windows 8 or 10, press the Windows key, then search for and select **System (Control Panel)**
    - If you're using Windows 7, right click the **Computer** icon on the desktop and click **Properties**
1. Click **Advanced system settings**
1. Click **Environment Variables**
1. Under **System Variables**, find the `PATH` variable, select it, and click **Edit**. If there is no `PATH` variable, click **New**
1. Add `C:\bin` to the start of the variable value, followed by a `;`. For example, if the value was `C:\Windows\System32`, change it to `C:\bin;C:\Windows\System32`
1. Click **OK**
1. **Restart** Command Prompt
1. Verify setup with
    ```
    chromedriver.exe -v
    ```
