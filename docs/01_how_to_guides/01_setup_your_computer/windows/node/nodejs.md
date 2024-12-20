---  
sidebar_position: 1  
sidebar_label: nodejs
id: nodejs
title: NodeJS setup
date: 2024-10-23 14:09:10
author: Rob Reeve
description: NodeJS setup
tags: 
  - WIP
  - GitHub
  - WSL
  - Ubuntu
---  

<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

6 - Approve the MSI

```powershell
====================================================
Tools for Node.js Native Modules Installation Script
====================================================

This script will install Python and the Visual Studio Build Tools, necessary
to compile Node.js native modules. Note that Chocolatey and required Windows
updates will also be installed.

This will require about 3 GiB of free disk space, plus any space necessary to
install Windows updates. This will take a while to run.

Please close all open programs for the duration of the installation. If the
installation fails, please ensure Windows is fully updated, reboot your
computer and try to run this again. This script can be found in the
Start menu under Node.js.

You can close this window to stop now. Detailed instructions to install these
tools manually are available at https://github.com/nodejs/node-gyp#on-windows

Press any key to continue . . .
```

```powershell
Using this script downloads third party software
------------------------------------------------
This script will direct to Chocolatey to install packages. By using
Chocolatey to install a package, you are accepting the license for the
application, executable(s), or other artifacts delivered to your machine as a
result of a Chocolatey install. This acceptance occurs whether you know the
license terms or not. Read and understand the license terms of the packages
being installed and their dependencies prior to installation:
- https://chocolatey.org/packages/chocolatey
- https://chocolatey.org/packages/python
- https://chocolatey.org/packages/visualstudio2019-workload-vctools

This script is provided AS-IS without any warranties of any kind
----------------------------------------------------------------
Chocolatey has implemented security safeguards in their process to help
protect the community from malicious or pirated software, but any use of this
script is at your own risk. Please read the Chocolatey's legal terms of use
as well as how the community repository for Chocolatey.org is maintained.

Press any key to continue . . .
```

Powershell with then ask for permission, and then start an install process

