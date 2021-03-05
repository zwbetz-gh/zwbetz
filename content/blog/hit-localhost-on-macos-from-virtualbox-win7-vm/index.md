---
title: "Hit localhost on macOS from VirtualBox Win7 VM"
date: 2018-12-03T22:07:04-06:00
publishdate: 2018-12-03
draft: false
toc: false
show_comments: true
---

At work, everyone on my team has Macs, but the users of one of our apps use Internet Explorer 11 (IE). We obviously need to test in IE, but how? This is where a VirtualBox Win7 VM comes in handy. 

Our app has a React front-end, so local development/testing is done on `http://localhost:3000`. But how do we hit this URL from the Win7 VM? I'll show you, but first let's setup the VM. 

## Import and Configure the Win7 VM

1. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads). If you get a permission error when installing VirtualBox, see [this fix](https://stackoverflow.com/a/46549654)
1. Download [IE11 on Win7](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) VM for VirtualBox
1. Unzip the VM then import it into VirtualBox:

    ```
    unzip IE11.Win7.VirtualBox.zip
    VBoxManage import "IE11 - Win7.ova"
    ```

1. Increase CPUs to 2:

    ```
    VBoxManage modifyvm "IE11 - Win7" --cpus 2
    ```

1. Increase video memory to 128MB:

    ```
    VBoxManage modifyvm "IE11 - Win7" --vram 128
    ```

1. Attach an empty optical drive, which is required in order to install Guest Additions:

    ```
    VBoxManage storageattach "IE11 - Win7" \
    --storagectl "IDE Controller" \
    --port 0 \
    --device 1 \
    --type dvddrive \
    --medium emptydrive
    ```

1. Install VirtualBox Guest Additions:
    1. Start Win7 VM
    1. If needed, default login password is `Passw0rd!`
    1. **Menu Bar** > **Devices** > **Insert Guest Additions CD image...**
    1. Open **Windows Explorer** > **Computer** > double-click the **CD Drive**, follow the prompts, then reboot

## Hit localhost from the Win7 VM

Okay, now let's hit `http://localhost:3000` from our Win7 VM.

Open Internet Explorer and navigate to `http://10.0.2.2:3000`. Bam, we can see our app. 

You may be wondering, "how is this working?" In a nutshell, the default gateway of the Win7 VM, `10.0.2.2`, is equivalent to `localhost` on macOS. See this [superuser thread](https://superuser.com/a/310745) for a deeper dive.

You can confirm the default gateway of your VM by doing the following:

- Open Command Prompt or PowerShell
- Run `ipconfig`
- Look for the line that says **Default Gateway**

    ```
    Default Gateway . . . . . . . . . : 10.0.2.2
    ```

## Network Adapter

To hit internal (vpn-only) sites, keep your network adapter as **NAT**.

To hit external sites such as <https://duckduckgo.com/> then set your network adapter as **Bridged Adapter**.
