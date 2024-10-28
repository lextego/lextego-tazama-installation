---  
sidebar_position: 1  
sidebar_label: Static IP
id: setup-static-ip
title: Setup Static IP
date: 2024-09-11 14:56:32
author: Rob Reeve
description: Setup Static IP
tags: 
  - WIP
  - MachineSetup
  - Ubuntu
---  

<!-- GNU GENERAL PUBLIC LICENSE: Copyright © 2024 LexTego--> 

## Generate a Static IP

We need to install a service to test our changes we are about to make

```bash
sudo apt update && sudo apt upgrade
sudo apt install openvswitch-switch-dpdk
```

- We are going to create a script called generate_static_ip.sh. ```nano ~/scripts/generate_static_ip.sh``` This script will provide all the details you need to set the static ip correctly
- copy the contents of [generate_static_ip.sh](scripts/generate_static_ip.md) into the script
- ```Ctrl``` + ```O``` to write it out
- accept the name
- and ```Ctrl``` + ```x``` to exit.
- Make it executable with: ```chmod +x ~/scripts/generate_static_ip.sh```
- move to the scripts directory: ```cd ~/scripts```

get the ip address with ```ip a``` you should get a response like the one below:

You might need to modify the script to enter the IP address of your box, for example my IP is ```192.168.50.X``` - so the script already has ```192.168.50``` - change this to yours.

```bash
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host noprefixroute
       valid_lft forever preferred_lft forever
2: eno1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 1c:69:7a:60:33:4c brd ff:ff:ff:ff:ff:ff
    altname enp0s31f6
    inet 192.168.50.27/24 metric 100 brd 192.168.50.255 scope global dynamic eno1
       valid_lft 86286sec preferred_lft 86286sec
    inet6 fe80::1e69:7aff:fe60:334c/64 scope link
       valid_lft forever preferred_lft forever
3: wlp0s20f3: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 94:e6:f7:e7:de:02 brd ff:ff:ff:ff:ff:ff
```

You can see in number 2, that the adaptor is called eno1 (yours will have a different name), you need to record name for your controller so you can enter it when you create the static IP. You can copy and paste this in to the script inputs, as it will be visible when you start the script.

- You can now run the script with: ```./generate_static_ip.sh```.

You can copy this output, to add it to the netplan. Check the name of your file, we can then modify it

```bash
ls /etc/netplan
00-installer-config-wifi.yaml  00-installer-config.yaml

or

50-cloud-init.yaml
```

```bash
sudo nano /etc/netplan/00-installer-config.yaml

or

sudo nano /etc/netplan/50-cloud-init.yaml
```

Check the name and details are as expected. Once you are happy

- ```Ctrl``` + ```O``` to write it out
- accept the name
- and ```Ctrl``` + ```x``` to exit.
- if you are working on the machine test it with ```sudo netplan try``` (if you have SSHed in to the box, it will kick you out)
- If it works (no errors), accept with ```Enter```
- then apply the settings with ```sudo netplan apply```
- restart the server if you want to be entirely sure

You have successfully set the static ip
