---  
sidebar_position: 1  
sidebar_label: LexTego script
id: lextego-script-deploy
title: LexTego Ubuntu deployment script
date: 2024-09-16 15:34:57
author: Rob Reeve
description: deployment script
tags: 
  - WIP
  - Ubuntu
  - Tazama
  - Script
---  

<!-- GNU GENERAL PUBLIC LICENSE: Copyright © 2024 LexTego--> 

```bash
#!/bin/bash

# Check if Node.js 20 is installed
if ! node -v | grep "v20" > /dev/null; then
  echo "Node.js 20 is not installed. Please install it manually."
  exit 1
fi

# Ensure npm is available
if ! command -v npm &> /dev/null; then
  echo "npm command not found. Please ensure npm is installed."
  exit 1
fi

# Set Node.js 20 as the default if using nvm (optional if using globally installed Node)
# echo "Setting Node.js 20 as the default..."
# nvm use 20
# nvm alias default 20

# Verify the Node.js version
echo "Node.js version in use: $(node -v)"

# Define a list of folder numbers
folder_numbers=("001" "002" "003" "004" "006" "007" "008" "010" "011" "016" "017" "018" "020" "021" "024" "025" "026" "027" "028" "030" "044" "045" "048" "054" "063" "074" "075" "076" "078" "083" "084" "090" "091")

# Step 4: Confirm before proceeding to the next step
read -p "Modifications complete. Do you want to proceed with the next step (e.g., building rule packages)? (y/n): " proceed_build
if [[ "$proceed_build" != "y" ]]; then
  echo "Exiting script as per user request."
  exit 0
fi

# Step 5: Proceed with building rule packages (or other actions)
echo "Building rule packages..."

# Loop through folders and run npm install using GH_TOKEN
for number in "${folder_numbers[@]}"
do
  cd rule-executer-$number
  NPM_TOKEN=$GH_TOKEN npm install
  if [[ $? -ne 0 ]]; then
    echo "Error: Failed to build rule-executer-$number."
    exit 1
  else
    echo "rule-executer-$number built successfully."
  fi
  cd ..
done

echo "All rule packages built successfully."

# Step 7: Confirm before Docker deployment
read -p "Do you want to deploy the rule processors into Docker? (y/n): " proceed_deploy
if [[ "$proceed_deploy" != "y" ]]; then
  echo "Exiting script as per user request."
  exit 0
fi

# Step 8: Deploy rule processors into Docker
echo "Deploying rule processors into Docker..."
cd ~/code/tazama/Full-Stack-Docker-Tazama

for number in "${folder_numbers[@]}"
do
  docker compose up -d rule-$number
done

echo "Deployment complete."

```