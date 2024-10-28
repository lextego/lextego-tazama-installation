---  
sidebar_position: 1  
sidebar_label: Setup Environment
id: setup-environment
title: Setup Environment
date: 2024-09-11 15:03:04
author: Rob Reeve
description: Setup Environment
tags: 
  - WIP
  - MachineSetup
  - Ubuntu
---  

<!-- GNU GENERAL PUBLIC LICENSE: Copyright © 2024 LexTego--> 

```bash
#!/bin/bash

# Function to check if a command exists
function command_exists() {
    command -v "$1" &> /dev/null
}

# Function to handle errors
function handle_error() {
    echo "Error: $1"
    exit 1
}

# Function to prompt user for installation
function prompt_install() {
    read -p "Would you like to install $1? (Y/N): " answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        return 0
    else
        return 1
    fi
}

# Update and upgrade system
echo "Updating system..."
sudo apt update || handle_error "Failed to update package list"
echo "System updated."

echo "Upgrading system..."
sudo apt upgrade -y || handle_error "Failed to upgrade packages"
echo "System upgraded."

# Check if tmux is installed
if ! command_exists tmux; then
    if prompt_install "tmux"; then
        echo "Installing tmux..."
        sudo apt install -y tmux || handle_error "Failed to install tmux"
        echo "tmux installed."
    fi
else
    echo "tmux is already installed."
fi

# Check if git is installed
if ! command_exists git; then
    if prompt_install "git"; then
        echo "Installing git..."
        sudo apt install -y git || handle_error "Failed to install git"
        echo "git installed."
    fi
else
    echo "git is already installed."
fi

# Check if curl is installed
if ! command_exists curl; then
    if prompt_install "curl"; then
        echo "Installing curl..."
        sudo apt install -y curl || handle_error "Failed to install curl"
        echo "curl installed."
    fi
else
    echo "curl is already installed."
fi

# Check if Homebrew is installed
if ! command_exists brew; then
    if prompt_install "Homebrew"; then
        echo "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" || handle_error "Failed to install Homebrew"
        
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

        echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> "$CONFIG_FILE"
        eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
        echo "Homebrew installed and configured."
    fi
else
    echo "Homebrew is already installed."
fi

# Ensure NVM is installed
if ! command_exists nvm; then
    if prompt_install "NVM"; then
        echo "Installing NVM..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash || handle_error "Failed to install NVM"
        export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" || handle_error "Failed to source NVM script"
        echo "NVM installed."
    fi
else
    echo "NVM is already installed."
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" || handle_error "Failed to source NVM script"
fi

# Check if build-essential is installed
if ! dpkg -s build-essential &> /dev/null; then
    if prompt_install "build-essential"; then
        echo "Installing build-essential..."
        sudo apt-get install -y build-essential || handle_error "Failed to install build-essential"
        echo "build-essential installed."
    fi
else
    echo "build-essential is already installed."
fi

# Prompt the user to install Docker using the existing prompt_install function
if prompt_install "Docker"; then
    # Remove old Docker installations
    echo "Removing old Docker installations..."
    sudo apt-get remove -y docker docker.io containerd runc || echo "Some old Docker packages were not found, continuing..."
    echo "Old Docker installations removed."

    # Purge Docker-related files
    echo "Purging Docker-related files..."
    sudo apt-get purge -y docker-ce docker-ce-cli containerd.io || echo "Some Docker packages were not found for purging, continuing..."
    sudo rm -rf /var/lib/docker || handle_error "Failed to remove Docker data directory"
    sudo rm -rf /var/lib/containerd || handle_error "Failed to remove containerd data directory"
    echo "Docker-related files purged."

    # Set up the Docker repository
    echo "Setting up Docker repository..."
    sudo apt-get install -y ca-certificates curl gnupg lsb-release || handle_error "Failed to install dependencies"
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg || handle_error "Failed to add Docker GPG key"
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null || handle_error "Failed to set up Docker repository"
    sudo apt update || handle_error "Failed to update package list after adding Docker repository"
    echo "Docker repository added."

    # Install Docker Engine
    echo "Installing Docker Engine..."
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io || handle_error "Failed to install Docker Engine"
    sudo systemctl start docker || handle_error "Failed to start Docker"
    sudo systemctl enable docker || handle_error "Failed to enable Docker to start on boot"
    echo "Docker Engine installed."

    # Add user to Docker group to run without sudo
    echo "Configuring Docker to run without sudo..."
    if ! getent group docker > /dev/null; then
        sudo groupadd docker || handle_error "Failed to add Docker group"
    else
        echo "Docker group already exists."
    fi
    sudo usermod -aG docker $USER || handle_error "Failed to add user to Docker group"
    newgrp docker <<EOF
    echo "Docker group applied successfully."
EOF
    echo "Docker configured to run without sudo."

    # Verify Docker starts at boot
    echo "Verifying Docker starts at boot..."
    sudo systemctl list-unit-files --type=service | grep docker.service || handle_error "Failed to verify Docker service"
    sudo systemctl enable docker.service || handle_error "Failed to enable Docker service on boot"
    echo "Docker is set to start at boot."

    # Optional: Configure Docker for remote connections
    read -p "Would you like to configure Docker to accept remote connections? (Y/N): " remote_answer
    if [[ "$remote_answer" =~ ^[Yy]$ ]]; then
        echo "Configuring Docker for remote connections..."
        echo -e "[Service]\nExecStart=\nExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2376" | sudo tee /etc/systemd/system/docker.service.d/override.conf > /dev/null
        sudo systemctl daemon-reload || handle_error "Failed to reload systemctl configuration"
        sudo systemctl restart docker.service || handle_error "Failed to restart Docker service"
        sudo netstat -lntp | grep dockerd || handle_error "Failed to verify Docker is listening on the remote port"
        echo "Docker configured to accept remote connections on port 2376."
    else
        echo "Skipping remote connection configuration."
    fi

    echo "Docker installation and configuration complete."
else
    echo "Skipping Docker installation."
fi

# Prompt the user to install Docker Compose using the existing prompt_install function
if prompt_install "Docker Compose"; then
    # Check if Docker Compose is installed
    if ! command_exists docker-compose; then
        echo "Installing Docker Compose..."
        sudo apt install -y docker-compose || handle_error "Failed to install Docker Compose"
        echo "Docker Compose installed."
    else
        echo "Docker Compose is already installed."
    fi
else
    echo "Skipping Docker Compose installation."
fi

# Check if procps is installed
if ! dpkg -s procps &> /dev/null; then
    if prompt_install "procps"; then
        echo "Installing procps..."
        sudo apt-get install -y procps || handle_error "Failed to install procps"
        echo "procps installed."
    fi
else
    echo "procps is already installed."
fi

# Check if file is installed
if ! dpkg -s file &> /dev/null; then
    if prompt_install "file"; then
        echo "Installing file..."
        sudo apt-get install -y file || handle_error "Failed to install file"
        echo "file installed."
    fi
else
    echo "file is already installed."
fi

echo "Script completed successfully."

```
