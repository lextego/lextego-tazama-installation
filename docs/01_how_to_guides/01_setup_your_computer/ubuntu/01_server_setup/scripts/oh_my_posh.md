---  
sidebar_position: 2  
id: ohmyposh_script
sidebar_label: Oh My Posh Scripts
title: Oh My Posh in Ubuntu
date: 2024-06-17 09:37:10
author: Rob Reeve
description: Oh My Posh in Ubuntu
tags:
  - setup
  - ubuntu
  - WIP
---  

<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## install_oh_my_posh

```bash
#!/bin/bash

# Function to handle errors
function handle_error() {
    echo "Error: $1"
    exit 1
}

# Function to check if a command exists
function command_exists() {
    command -v "$1" &> /dev/null
}

# Check if Homebrew is installed
if ! command_exists brew; then
    echo "Homebrew is not installed. Please install Homebrew first."
    exit 1
fi

# Install Oh My Posh using Homebrew
echo "Installing Oh My Posh..."
brew install jandedobbeleer/oh-my-posh/oh-my-posh || handle_error "Failed to install Oh My Posh"
echo "Oh My Posh installed."

# Find and copy the theme
THEME_NAME="powerlevel10k_rainbow.omp.json"
THEME_PATH=$(brew --prefix oh-my-posh)/themes/$THEME_NAME
cp "$THEME_PATH" ~/ || handle_error "Failed to copy theme"

# Detect shell and update the appropriate configuration file
if [ -n "$BASH_VERSION" ]; then
    CONFIG_FILE="$HOME/.bashrc"
elif [ -n "$ZSH_VERSION" ]; then
    CONFIG_FILE="$HOME/.zshrc"
elif [ -n "$FISH_VERSION" ]; then
    CONFIG_FILE="$HOME/.config/fish/config.fish"
else
    CONFIG_FILE="$HOME/.profile"
fi

# Add Oh My Posh initialization to the profile
echo "Configuring Oh My Posh for your shell..."
{
    echo "# start oh-my-posh"
    echo "eval \"\$(oh-my-posh init bash --config ~/$THEME_NAME)\""
} >> "$CONFIG_FILE"
echo "Oh My Posh configured."

# Install Screenfetch
echo "Installing Screenfetch..."
sudo apt-get install -y screenfetch || handle_error "Failed to install Screenfetch"
echo "Screenfetch installed."

# Add Screenfetch to the profile
echo "Configuring Screenfetch to run on shell startup..."
{
    echo "# run screenfetch"
    echo "screenfetch"
} >> "$CONFIG_FILE"
echo "Screenfetch configured."

echo "Script completed successfully. Please restart your terminal or source your profile to apply changes."
```
