---
title: "Add your account as a sudoer on Mac"
date: 2019-04-17T11:54:33-05:00
toc: false
---

1. Run `whoami`. You will use this value later to replace `YOUR_ACCOUNT`
1. Switch to an admin account by running

        su ADMIN_ACCOUNT

1. Run `sudo cat /etc/sudoers` and verify that the following line exists somewhere in that file [^private_symlink]

        #includedir /private/etc/sudoers.d

1. Use visudo [^visudo_command] to create a new sudoers file [^why_use_new_file] by running

        sudo visudo -f /etc/sudoers.d/sudoers

1. Press the `i` key for "insert" mode, then type the following line

        YOUR_ACCOUNT ALL=(ALL) ALL

1. Press `ESC`, then type `:x` followed by the `ENTER` key to save your changes
1. Verify your changes by running

        sudo cat /etc/sudoers.d/sudoers

1. Run `exit` to logout of the admin account and return to your account
1. Test your sudo access by running a simple command, such as

        sudo echo "hello world"

[^private_symlink]: On Mac, `/etc` is a symlink to `/private/etc`
[^visudo_command]: To learn more about this command, type `info visudo` into Terminal and read up
[^why_use_new_file]: We're creating a new sudoers file instead of editing the existing one at `/etc/sudoers` because this is a best practice. For more info see [this stackoverflow thread](https://superuser.com/questions/869144/why-does-the-system-have-etc-sudoers-d-how-should-i-edit-it)
