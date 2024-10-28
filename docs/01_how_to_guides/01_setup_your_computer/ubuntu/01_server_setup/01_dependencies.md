---  
sidebar_position: 1  
sidebar_label: Setup Dependencies
id: setup-dependencies
title: Setup Dependencies
date: 2024-09-11 14:49:28
author: Rob Reeve
description: Setup Ubuntu Dependencies
tags: 
  - WIP
  - MachineSetup
  - Ubuntu
---  

<!-- GNU GENERAL PUBLIC LICENSE: Copyright © 2024 LexTego--> 

:::warning

It is anticipated that you understand script files, and know that running an unvalidated script is very risky. Please ensure you are comfortable with all the steps the script is completing, before starting. We do not accept any liability for any issues you might encounter prior to running these exercises.

:::

## Default starting point

We are assuming that you are in your home directory ```~``` and the scripts will be saved off your home directory in a directory called ```~/scripts```. If you build a dev machine, All code will be moved to a directory called ```~/code```

## Dependency installation

Quickly install nano (if you haven't already) and create the scripts directory, to make life easier, but the remainder will be automated

```bash
sudo apt install nano
mkdir scripts
```

We can now create scripts, and automate the process

- Save the script as setup_environment.sh ```nano ~/scripts/setup_environment.sh```
- Copy the contents from the [environment setup](scripts/setup_environment.md) script
  - Write out the file `ctrl + o`
  - Accept the name `enter`
  - Exit  `ctrl + x`
- Make it executable with: ```chmod +x ~/scripts/setup_environment.sh```
- move to the scripts folder ```cd ~/scripts ``` and
- Run the script ```./setup_environment.sh```

The script will prompt if you want to:

- Update and Upgrade the system
- Install tmux
- Install git
- Install curl
- Install Homebrew
- Install NVM
- Install NPM ```sudo apt install npm```
- Install build-essentials
- Install Docker
- Install Docker Compose
- Install procps
- Install file

Check you have been added to the docker group with ```docker ps``` you should see no containers, but should not have permission issues. If you have issues, logout of the terminal session and log back in and try ```docker ps``` again.

If you still have permission denied issues seeing the docker output, you have most likely not been added to the group, you need to add yourself. If you have other issues, you might need to re-install docker

We have seen some strange effects with Docker-Compose, so if you installed that you might want to manually run the following to be sure it all worked properly.

### Some extra steps if you have issues

To run Docker commands without the sudo prefix, you must add your user to the Docker group. This step grants the user permission to access the Docker daemon. To add your current user to the Docker group, run:

```bash
sudo usermod -aG docker $USER
```

Important: After running this command, you will need to log out and back in for these changes to take effect, or you can use the following command to apply the changes immediately:

```bash
newgrp docker
```

## Remove Homebrew Analytics

If you installed Homebrew, we want to turn off analytics. This is to reduce data leakage.

```bash
brew analytics off
```

## Tazama Core

Once Node.js is installed, you can install newman.

```bash
sudo npm install -g newman
```

If you want to install it locally, remove the -g flag in the command

We now install unzip

```bash
ssudo apt install unzip
```

INSTALL PORTAINER AGENT...