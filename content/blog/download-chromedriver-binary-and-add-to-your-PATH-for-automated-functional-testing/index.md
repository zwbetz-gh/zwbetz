---
title: "Download chromedriver binary and add to your PATH for automated functional testing"
date: 2018-09-19T23:28:02-05:00
publishdate: 2018-09-19
draft: false
aliases:
- /2018/09/download-chromedriver-binary-and-add-to-your-path-for-automated-functional-testing/
toc: true
show_comments: true
---

Many automated functional testing projects these days rely on chromedriver as the main driver. Below are steps for Mac and Windows to download it, add it to your `PATH`, and verify setup. 

You can obviously place the chromedriver binary in any directory you like, I just used Mac `${HOME}/bin` and Windows `C:\bin` for this example. 

## Mac

### Via CLI

1. Create directory `${HOME}/bin`
1. [Download chromedriver](http://chromedriver.chromium.org/downloads) for Mac and save to `${HOME}/bin`
1. `cd ${HOME}/bin && chmod +x chromedriver` to make it executable
1. Open `${HOME}/.bash_profile` in a text editor
1. Add line `export PATH="${PATH}:${HOME}/bin"` then save the file
1. Restart your terminal
1. Verify setup with `chromedriver -v`

## Windows

### Via CLI

1. Create directory `C:\bin`
1. [Download chromedriver](http://chromedriver.chromium.org/downloads) for Windows and save to `C:\bin`
1. Open Command Prompt and set the `PATH` for your account
    ```
    setx PATH "%PATH%;C:\bin"
    ```
1. **RESTART** Command Prompt. Changes made by `setx` will only be picked up in new instances of Command Prompt
1. Verify setup with `chromedriver.exe -v`

### Via GUI

1. Create directory `C:\bin`
1. [Download chromedriver](http://chromedriver.chromium.org/downloads) for Windows and save to `C:\bin`
1. Add directory to your `PATH`:
1. Depending on your Windows version:
    - If you're using Windows 8 or 10, press the Windows key, then search for and select **System (Control Panel)**
    - If you're using Windows 7, right click the **Computer** icon on the desktop and click **Properties**
1. Click **Advanced system settings**
1. Click **Environment Variables**
1. Under **System Variables**, find the `PATH` variable, select it, and click **Edit**. If there is no `PATH` variable, click **New**
1. Add `C:\bin` to the end of the variable value, preceeded by a `;`. For example, if the value was `C:\Windows\System32`, change it to `C:\Windows\System32;C:\bin`
1. Click **OK**
1. Restart your command prompt
1. Verify setup with `chromedriver.exe -v`
