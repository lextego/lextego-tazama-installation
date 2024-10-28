---  
sidebar_position: 1  
sidebar_label: Oh My Posh Full
id: oh-my-posh-full
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

<!-- GNU GENERAL PUBLIC LICENSE: Copyright © 2024 LexTego--> 

## Original instructions

```bash
brew install jandedobbeleer/oh-my-posh/oh-my-posh
```

Homebrew will install:

- `oh-my-posh` - Executable, added to /usr/local/bin
- `themes` - The latest Oh My Posh themes

### Choose and apply a WSL prompt theme

The Oh My Posh themes will be found in the oh-my-posh directory as JSON files. You can find it by entering `cd $(brew --prefix oh-my-posh)`, then just `cd themes` and `ls` for the list. For Ubuntu-20.04 running via WSL, the windows path is likely to be something like: `\\wsl.localhost\Ubuntu\home\linuxbrew\.linuxbrew\Cellar\oh-my-posh\12.14.1\themes` - this can change so also start from `\\wsl.localhost\Ubuntu\home\linuxbrew\.linuxbrew\Cellar\oh-my-posh`. You can also view what the themes look like in the Oh My Posh docs: [Themes](https://ohmyposh.dev/docs/themes).

To use a theme, copy it from the themes folder to your `$Home` folder, then add this line to the bottom of the .profile file found (or created) in your `$Home` folder:

```bash
cp /home/linuxbrew/.linuxbrew/opt/oh-my-posh/themes/powerlevel10k_rainbow.omp.json ~/
eval "$(oh-my-posh --init --shell bash --config ~/powerlevel10k_rainbow.omp.json)"
```

> Note  
> Change the path above to the one you found earlier

You can replace `powerlevel10k_rainbow.omp.json` with the name of whichever theme you prefer to use as long as it's copied to your `$Home` folder (just remember the name of the file, as we will need it later).

Alternatively, if you are using oh-my-posh in both Windows with PowerShell and with WSL, you can share your PowerShell theme with WSL by pointing to a theme in your Windows user's home folder. In your WSL distribution's `.profile` path, replace ~ with the path: `/mnt/c/Users/<WINDOWSUSERNAME>`. Replacing `<WINDOWSUSERNAME>` with your own Windows username.

You can also [customize the Oh My Posh themes](https://ohmyposh.dev/docs/installation/customize) if desired - but we will not do that today.

### Set your profile to use OhMyPosh

These instructions are [here](https://ohmyposh.dev/docs/installation/prompt) for different shells

> TIP  
> If you have no idea which shell you're currently using, Oh My Posh has a utility switch that can tell that to you.

```bash
oh-my-posh get shell
```

Add the following to ~/.bashrc (could be ~/.profile or ~/.bash_profile depending on your environment):

In our case it is .profile

```bash
nano ~/.profile
```

add the following lines at the end of the file (note we have used the theme we chose earlier)

```nano
# start oh-my-posh
eval "$(oh-my-posh init bash --config ~/powerlevel10k_rainbow.omp.json)"
```

Once added, reload your profile for the changes to take effect.

When using `~/.profile`.

```bash
. ~/.profile
```

## Install Screenfetch

[WSL2, OhMyZSH, Screenfetch](https://dejanstojanovic.net/powershell/2020/september/customizing-wsl2-on-windows-with-screenfetch-and-oh-my-zsh/)

Install Screenfetch

```bash
sudo apt-get install screenfetch -y 
```

Run Screenfetch on login by adding it to the end of .bashrc  

```bash
nano ~/.profile  
```

scroll to the end and add a line to call it

```nano
# run screenfetch
screenfetch
```

Enter ```Ctrl+X``` then ```y``` to save it.

When using `~/.profile`.

```bash
. ~/.profile
```
