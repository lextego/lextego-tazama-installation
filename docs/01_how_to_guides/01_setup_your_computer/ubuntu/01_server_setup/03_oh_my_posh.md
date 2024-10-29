---  
sidebar_position: 1  
sidebar_label: Oh My Posh
id: oh-my-posh
title: Oh My Posh Ubuntu
date: 2024-09-11 14:47:01
author: Rob Reeve
description: Setup Oh My Posh in Ubuntu
tags:
  - WIP
  - Ubuntu
  - OhMyPosh
  - MachineSetup
---  

<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## Introduction

We recommend installing Oh My Posh, whether using Bash, Zsh, or something else, by following the [Linux install guide in the Oh My Posh docs](https://ohmyposh.dev/docs/installation/linux). The relevant portions have been copied here.

Currently the recommended path for customizing prompts with Oh My Posh uses the [Homebrew package manager](https://brew.sh/) for installation. (Homebrew works with WSL now!) When installing Homebrew for Linux, be sure to follow [Next steps](https://docs.brew.sh/Homebrew-on-Linux#install) instructions to add Homebrew to your PATH and to your bash shell profile script.

### Install Homebrew and key components

This should have been installed as part of your dependencies. If you did not, please revisit [dependencies](01_dependencies.md)

#### Install HomeBrew build tools (not optional)

This should have been installed as part of your dependencies. If you did not, please revisit [dependencies](01_dependencies.md)

### Install oh-my-posh

We run the standalone script to install Oh My Posh, configure a theme, and install Screenfetch. This script also updates the appropriate profile configuration file for your shell.

### How to Run the Script

- We are going to create a script called install_oh_my_posh.sh. ```nano ~/scripts/install_oh_my_posh.sh```
- copy the contents of [install_oh_my_posh.sh](scripts/oh_my_posh.md) into the script
- ```Ctrl``` + ```O``` to write it out
- accept the name
- and ```Ctrl``` + ```x``` to exit.
- Make it executable with: ```chmod +x ~/scripts/install_oh_my_posh.sh```
- move to the scripts directory: ```cd ~/scripts```
- Run the script with: `./install_oh_my_posh.sh`

This script will:
1. Install Oh My Posh using Homebrew.
2. Copy the `powerlevel10k_rainbow.omp.json` theme to your home directory.
3. Add the Oh My Posh initialization to the appropriate profile configuration file for your shell.
4. Install Screenfetch.
5. Add a command to run Screenfetch at the end of the profile configuration file.

After running this script, restart your terminal or source your profile to apply the changes:

```bash
source ~/.bashrc   # For bash
source ~/.zshrc    # For zsh
source ~/.profile  # If neither bash nor zsh
```

You will have to install a Font to display correctly in your terminal of choice. I use [Nerd Font](https://www.nerdfonts.com/font-downloads). Instructions for Windows are [here](../../windows/02_terminal_ohmyposh01_win.md)
