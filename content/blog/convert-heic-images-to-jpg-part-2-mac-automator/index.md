---
title: "Convert HEIC Images to JPG Part 2: Mac Automator"
date: 2019-09-01T20:47:15-05:00
toc: false
---

This post builds on [part 1]({{< relref "convert-heic-images-to-jpg" >}}). In that post, I described the command-line steps necessary to convert hundreds of my wife's pictures from `.heic` to `.jpg`. Well, turns out this isn't a one-time-thing. She works in real estate, and lately has been needing to do the task more often. So I added a simple GUI using Mac Automator. A rough version of the steps follow:

<!--more-->

1. Open Mac Automator and choose **Application**
1. Drag over action **Ask for Finder Items**
    1. Choose a folder to start at
    1. Change **Type** to **Folders**
1. Drag over action **Run Shell Script**
    1. Choose shell `/bin/bash`
    1. Change **Pass input** to **as arguments**
    1. Paste in this script:
    ```bash
    dir="$@"
    cd "$dir"
    shopt -s nocaseglob
    for f in *.heic; do
      echo "Converting $f"
      /usr/local/bin/mogrify -format jpg $f
    done
    ```
1. Drag over action **Display Notification**
    1. Enter the **Title** and **Message** you want to display

How it works: The user runs the application and is prompted with a Finder window to choose a folder. Once a folder is chosen, the script changes to it, then does a case-insensitive search for all `.heic` images and converts them. When done, it displays a notification to the user. 

{{< figure
img="screenshot-1.png" 
alt="Screenshot of Mac Automator application" 
caption="Screenshot of Mac Automator application" 
command="Original" >}}
