#<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

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

# Check if Docker is installed
docker_installed=false
if ! command_exists docker; then
    if prompt_install "Docker"; then
        echo "Installing Docker..."
        sudo apt install -y apt-transport-https ca-certificates curl software-properties-common || handle_error "Failed to install prerequisites for Docker"
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg || handle_error "Failed to add Docker GPG key"
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null || handle_error "Failed to add Docker repository"
        sudo apt update || handle_error "Failed to update package list after adding Docker repository"
        sudo apt install -y docker-ce || handle_error "Failed to install Docker"
        sudo systemctl start docker || handle_error "Failed to start Docker"
        sudo systemctl enable docker || handle_error "Failed to enable Docker to start on boot"
        sudo usermod -aG docker $USER || handle_error "Failed to add user to Docker group"
        newgrp docker <<EOF
        echo "Docker group applied successfully."
EOF
        docker_installed=true
        echo "Docker installed."
    fi
else
    echo "Docker is already installed."
    docker_installed=true
fi

# Check if Docker Compose is installed
if $docker_installed && ! command_exists docker-compose; then
    if prompt_install "Docker Compose"; then
        echo "Installing Docker Compose..."
        sudo apt install -y docker-compose || handle_error "Failed to install Docker Compose"
        echo "Docker Compose installed."
    fi
else
    echo "Docker Compose is already installed."
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