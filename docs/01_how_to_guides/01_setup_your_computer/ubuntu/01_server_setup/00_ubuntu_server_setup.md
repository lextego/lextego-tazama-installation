---  
sidebar_position: 1  
sidebar_label: Server Installation
id: ubuntu-server-Installation
title: Ubuntu Server Installation 
date: 2024-09-27 13:10:12
author: Rob Reeve
description: How to Installation Ubuntu Server
tags: 
  - WIP
  - Setup
  - UbuntuServer
  - HomeNetwork  
---  

<!-- GNU GENERAL PUBLIC LICENSE: Copyright © 2024 LexTego--> 

## Pre - requisites

it is assumed you have downloaded the latest [Ubuntu ISO image](https://ubuntu.com/download/server) and used [Rufus](https://rufus.ie/en/) to deploy it to your USB stick  

We are documenting for 24.04.1 LTS (we normally update to the latest LTS once the version is at least 9 months old)

## Install Server

### Select Language  

1. English UK  
1. Done  

### Select Keyboard  

1. Layout - English UK  
2. Variant - English UK  
3. Done  

### Update installer

If asked - update to the newest installer (available if connected to internet)

### Installation Options

1. Select Ubuntu Server (minimised) - this helps us secure our machine  
2. Search for 3rd Party Drivers  
3. Done  

### Configure DHCP

1. Leave to DHCP  
2. Done

### Configure Proxy

1. Leave blank  
2. Done

### Select Mirror

1. Leave as ```http://gb.archive.ubuntu.com/ubuntu```  
2. Done

### Configure Storage

1. Use Entire Disk
   1. Setup Disk as LVM Group
   2. Do not encrypt with LUKS (this will require you to enter the password on boot - complicated for headless server)  
2. Done

(if you are dual booting, you will need to complete a Custom Storage Layout, and install Ubuntu on the appropriate disk)

### Storage Configuration

1. Confirm all OK  
1. Done
1. Select Continue - to overwrite everything

### Profile Setup

1. Your Name - ```Your Name```  
1. Your Server's Name - ```server_name```  
1. Your User Name - ```your user``` - we prefer not to use common names like admin  
1. Choose a Password - ```Secure - as exposed to internet```  
1. Confirm a Password - ```Secure - as exposed to internet```  
1. Done

### Upgrade to Ubuntu Pro

1. Skip for Now
2. Continue

### SSH Setup

1. Select Install OpenSSH Server  
1. Done

#### Open SSH Identity - to research  

We will get here... in a later document :-)  

### 3rd Party Drivers

If there is a third party driver, you will be asked to install it now

### Featured Server Snaps

Choose the following Snaps

1. Microk8s  
1. AWS-CLI
1. Done

### Complete installation

Once installation is complete

1. Reboot Now
2. Remove installation Media
3. press ```ENTER```

## Install Default Services

Once you have logged in for the first time, you can now SSH in to the box if you wish, or you can continue locally

### Install Nano, so we can make life easier

```bash
sudo apt update && sudo apt upgrade
sudo apt install nano
```

### Working on a Laptop

Nothing worse than the laptop screen glaring away all the time - when you are doing nothing...  

This section needs to be reviewed, as it caused the terminal to freeze too

```bash
setterm --blank 1
```

After executing the command the screen will turn off automatically every minute (if idle).

And even better, if you want the command to be executed automatically at boot, you can add it to the GRUB commandline, to do so we have to edit the next file:

```bash
sudo nano /etc/default/grub
```

Once there, just add ```consoleblank=60``` to ```GRUB_CMDLINE_DEFAULT```, it should look like this:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet consoleblank=60"
```

- Write out the file ```ctrl``` + ```o```
- Accept the name
- close the file ```ctrl``` + ```x```

close the file and save it, after that just run ```sudo update-grub``` and voila, every time you boot the screen will turn off automatically every 60 sec. (again, if idle).
