---  
sidebar_position: 1  
sidebar_label: Static IP
id: generate-static-ip
title: Generate Static IP
date: 2024-09-11 14:56:32
author: Rob Reeve
description: Generate Static IP
tags: 
  - WIP
  - MachineSetup
  - Ubuntu
---  

<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

```bash
#!/bin/bash

# Function to handle errors
function handle_error() {
    echo "Error: $1"
    exit 1
}

# Prompt the user for input
read -p "Enter the controller name: " CONTROLLER_NAME
if [ -z "$CONTROLLER_NAME" ]; then
    handle_error "Controller name is required"
fi

read -p "Enter the last digits for the IP address (192.168.50.): " IP_LAST_DIGITS
if [ -z "$IP_LAST_DIGITS" ]; then
    handle_error "Last digits for the IP address are required"
fi

read -p "Enter the default gateway (e.g. 192.168.50.1): " DEFAULT_GATEWAY
if [ -z "$DEFAULT_GATEWAY" ]; then
    handle_error "Default gateway is required"
fi

read -p "Enter the primary DNS server (e.g. 192.168.50.1): " DNS_SERVER1
if [ -z "$DNS_SERVER1" ]; then
    handle_error "Primary DNS server is required"
fi

read -p "Enter the secondary DNS server (e.g. 8.8.8.8): " DNS_SERVER2
if [ -z "$DNS_SERVER2" ]; then
    handle_error "Secondary DNS server is required"
fi

# Generate the static IP configuration
IP_ADDRESS="192.168.50.$IP_LAST_DIGITS"
NETMASK="24"

echo "The following configuration can be used for setting up a static IP address:"
echo
echo "network:"
echo "  version: 2"
echo "  ethernets:"
echo "    $CONTROLLER_NAME:"
echo "      addresses:"
echo "        - $IP_ADDRESS/$NETMASK"
echo "      nameservers:"
echo "        addresses: [$DNS_SERVER1, $DNS_SERVER2]"
echo "      routes:"
echo "        - to: default"
echo "          via: $DEFAULT_GATEWAY"
echo

echo "Copy the above configuration into your network settings file, typically located at /etc/netplan/*.yaml"

echo "Script completed successfully."
```
