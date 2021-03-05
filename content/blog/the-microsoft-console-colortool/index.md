---
title: "The Microsoft Console Colortool"
date: 2019-03-26T15:57:02-05:00
toc: false
show_comments: true
---

Today I stumbled upon Microsoft's [Console ColorTool](https://github.com/microsoft/terminal/tree/master/src/tools/ColorTool). I've long played around with the color scheme of my Windows Console to make things more readable and improve the aesthetic (with not much luck). This awesome tool let's me make color changes easily, and the changes show up in **Command Prompt**, **PowerShell**, and **Windows Subsystem for Linux Console**. Nice. 

To quickly get started with ColorTool, here are some steps: 

1. Download the latest `ColorTool.zip` from [GitHub Releases](https://github.com/Microsoft/console/releases) and unzip it
1. Add the unzipped files to your `PATH`. For example, I unzipped to files to `C:\ColorTool` then added that folder to my `PATH`. For reference, the contents of that folder are below

    ```
    ├── ColorTool.exe
    └── schemes
        ├── OneHalfDark.itermcolors
        ├── OneHalfLight.itermcolors
        ├── campbell-legacy.ini
        ├── campbell.ini
        ├── cmd-legacy.ini
        ├── deuteranopia.itermcolors
        ├── solarized_dark.itermcolors
        └── solarized_light.itermcolors
    ```
    
1. Run `colortool` to see the full help menu
1. Run `colortool --schemes` to display available schemes
1. Run `colortool --both <scheme>` to apply the given scheme to both the current console and the defaults. My current favorite is campbell-legacy, so I ran `colortool --both campbell-legacy`
1. Save your changes by doing
    1. Right-click your current console window 
    1. Click **Properties** 
    1. Click **OK**
