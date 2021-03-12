---
title: "Speed Up a Fedora Linux vm on VirtualBox"
date: 2018-10-24T13:02:52-05:00
publishdate: 2018-10-24
draft: false
toc: false
---

Does your freshly created VirtualBox Fedora Linux VM feel slow? Mine sure did. After much trial and error over many days, the following steps worked for me to speed things up. 

At the time of this writing, I was using [Fedora Workstation 28](https://getfedora.org/en/workstation/download/). If you've never installed Linux on a VirtualBox VM before, see the Fedora Magazine article on [how to install Fedora as a VirtualBox guest](https://fedoramagazine.org/install-fedora-virtualbox-guest/). 

## Storage Space

When first creating the VM, make sure the hard drive is at least 20GB. This leaves enough room for OS-specific files, and files added by you, assuming you're not doing anything crazy where you need loads of storage space.  

## RAM

Give the VM at least 2GB of RAM. While the VM is powered off:

**Settings** > **System** > change the value of **Base Memory**. 

## CPU Execution Cap

Set the VM's CPU Execution Cap to 100%. While the VM is powered off:

**Settings** > **System** > **Processor** tab > change the value of **Execution Cap**. 

## Video RAM

Max out the VM's Video RAM to 256MB. VirtualBox limits you to 128MB in the GUI, so you have to do it through command line. While the VM is powered off:

Mac:
```
/Applications/VirtualBox.app/Contents/MacOS/VBoxManage modifyvm "<VM_NAME>" --vram 256
```

Windows:
```
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" modifyvm "<VM_NAME>" --vram 256
```

Then confirm the Video RAM settings:

**Settings** > **Display** > confirm the value of **Video Memory**.

## 3D Acceleration

Disable 3D Acceleration on the VM. In a nutshell, VirtualBox has issues with 3D support for X11 guests. For details, see this [ask ubuntu discussion](https://askubuntu.com/questions/1035410/ubuntu-18-04-gnome-hangs-on-virtualbox-with-3d-acceleration-enabled) and this [VirtualBox wiki post](https://www.virtualbox.org/wiki/X11Guest3D). While the VM is powered off:

**Settings** > **Display** > uncheck the **Enable 3D Acceleration** checkbox.

## Guest Additions

Install Guest Additions on the VM. While the VM is running:

**Devices** > **Insert Guest Additions CD image...** > then follow the prompts. 

If this doesn't work for some reason, you can download the Guest Additions directly to the VM [from VirtualBox](https://www.virtualbox.org/wiki/Downloads). 

## Xfce Desktop Environment

By default, Fedora uses the [GNOME Desktop Environment](https://www.gnome.org/). While GNOME is pretty to look at, unfortunately it isn't handled well by VirtualBox (see the 3D Acceleration section above). So, while all the previous items helped, what really got my VM _blazing fast_ was installing the [Xfce Desktop Environment](https://www.xfce.org/). Quoted from their site: 

> Xfce is a lightweight desktop environment for UNIX-like operating systems. It aims to be fast and low on system resources, while still being visually appealing and user friendly.

While the VM is running, to install Xfce: 

1. `sudo dnf install @xfce-desktop-environment`
1. Reboot the VM
1. At the **login screen** > click your **username** > click the **Session** menu (the gear icon) > **Xfce Session**

Once your Xfce Session is started, to add applications to your dock: click **Applications** in top left, then drag-n-drop the applications you want into the dock. 

I'm happy to say that my VM actually feels snappy now. 
