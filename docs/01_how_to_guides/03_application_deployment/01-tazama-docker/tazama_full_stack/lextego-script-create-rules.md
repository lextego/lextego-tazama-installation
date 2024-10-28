---  
sidebar_position: 1  
sidebar_label: LexTego Create Rules script
id: lextego-script-create-rules
title: LexTego Ubuntu deployment script - Create rules
date: 2024-09-16 15:34:57
author: Rob Reeve
description: deployment script to create all rules
tags: 
  - WIP
  - Ubuntu
  - Tazama
  - Script
---  

<!-- GNU GENERAL PUBLIC LICENSE: Copyright © 2024 LexTego--> 


```bash
# SPDX-License-Identifier: Apache-2.0

#!/bin/bash

# Ensure nvm is installed and loaded
if [ -z "$NVM_DIR" ]; then
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
fi

# Install Node.js 20 if it's not already installed
if ! nvm ls 20 > /dev/null; then
  echo "Installing Node.js 20..."
  nvm install 20
fi

# Set Node.js 20 as the default version
echo "Setting Node.js 20 as the default..."
nvm use 20
nvm alias default 20

# Verify the Node.js version
echo "Node.js version in use: $(node -v)"

# Define a list of folder numbers
folder_numbers=("001" "002" "003" "004" "006" "007" "008" "010" "011" "016" "017" "018" "020" "021" "024" "025" "026" "027" "028" "030" "044" "045" "048" "054" "063" "074" "075" "076" "078" "083" "084" "090" "091")

# Step 1: Duplicate Rule Executer folders
echo "Duplicating Rule Executer folders..."
for number in "${folder_numbers[@]}"
do
  cp -R rule-executer rule-executer-$number
  if [[ $? -ne 0 ]]; then
    echo "Error: Failed to create folder rule-executer-$number."
    exit 1
  else
    echo "Folder rule-executer-$number created successfully."
  fi
done
echo "All Rule Executer folders duplicated successfully."

# Step 2: Confirm before modifying files
read -p "Do you want to proceed to modify the rule-executer files? (y/n): " proceed
if [[ "$proceed" != "y" ]]; then
  echo "Exiting script as per user request."
  exit 0
fi

# Step 3: Modify the files in each folder
echo "Modifying rule-executer files..."
for number in "${folder_numbers[@]}"
do
  echo "Modifying rule-executer-$number files..."

  # Check if package.json exists
  if [ ! -f "rule-executer-$number/package.json" ]; then
    echo "Error: package.json does not exist for rule-executer-$number."
    exit 1
  fi

  # Replace rule-901@2.0.0 with rule-XYZ@2.0.0 in package.json (using # as a delimiter)
  sed -r "s/rule-901@2\.0\.0/rule-$number@2\.0\.0/" rule-executer-$number/package.json > tmp_package.json && mv tmp_package.json rule-executer-$number/package.json
  if [[ $? -ne 0 ]]; then
    echo "Error: Failed to modify package.json for rule-executer-$number."
    exit 1
  fi

  # Check if Dockerfile exists
  if [ ! -f "rule-executer-$number/Dockerfile" ]; then
    echo "Error: Dockerfile does not exist for rule-executer-$number."
    exit 1
  fi

  # Replace 901 with XYZ in Dockerfile
  sed -r "s/901/$number/" rule-executer-$number/Dockerfile > tmp_dockerfile && mv tmp_dockerfile rule-executer-$number/Dockerfile
  if [[ $? -ne 0 ]]; then
    echo "Error: Failed to modify Dockerfile for rule-executer-$number."
    exit 1
  fi

  # Ensure Node.js version 20 in Dockerfile
  sed -r "s#^FROM node:.*#FROM node:20#" rule-executer-$number/Dockerfile > tmp_dockerfile && mv tmp_dockerfile rule-executer-$number/Dockerfile

  echo "Files for rule-executer-$number modified successfully."
done
echo "All files modified successfully."

```