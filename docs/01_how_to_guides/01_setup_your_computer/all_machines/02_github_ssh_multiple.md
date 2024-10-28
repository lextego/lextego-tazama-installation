---  
sidebar_position: 1  
sidebar_label: GitHub SSH Multiple
id: gitHub-SSH-Multiple
title: Setup GitHub with Multiple SSH Profiles
date: 2024-10-12 15:21:10
author: Rob Reeve
description: Setting up GitHub to use multiple SSH profiles
tags: 
  - WIP
  - MachineSetup
  - GitHub
---  

<!-- GNU GENERAL PUBLIC LICENSE: Copyright © 2024 LexTego--> 

After you have started working with GitHub, and have created a number of accounts, you realise the value of SSH - but this can get complicated fast. So you need to setup multiple accounts with SSH, and you also want to ensure that your email is not scraped from GitHub. These instructions aim to help you use SSH and profiles to manage this process.

## What we will go through

- Checking for existing SSH Keys
- Generate new SSH Keys for multiple Github accounts
- Configure an SSH config file to handle multiple GitHub accounts
- Adding a remote Repository

## Example Scenario

I have multiple accounts

- RobWork - these are my projects for LexTego
- RobPersonal - these are my personal projects, that I do not want to mix up.
- RobProject - this is for coding for a specific project that has a dedicated GitHub Account

We will need to configure our Git Environment to handle these different accounts. So we can push and pull between different accounts.

## 1 - Check for existing SSH keys

Taken from [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys)

Time passes, we forget - you might already have some SSH keys for GitHub and you have forgotten where they are. If they don't exist we can make them.

```bash
ls -al ~/.ssh
```

If you see files ending in .pub then you have existing keys, for example:

```bash
id_rsa.pub
id_ecdsa.pub
id_ed25519.pub
```

If you see all the existing key’s for your GitHub accounts that you want to use then skip to Step 3.

Otherwise, if one or more accounts that you want to use is missing then proceed to step 2 to create new SSH key’s for those accounts.

## 2 - Generating SSH key’s for each Github account

We will create new keys using the ed25519 algorithm, in the examples we need to replace <My_User>@Domain.com with your email, and where we are using GitHub to mask our actual email, remember to use the GitHub address - i.e. 77055177+RobReeveLexTego@users.noreply.github.com:

```bash
ssh-keygen -t ed25519 -C "<My_User>@Domain.com"
```

When you’re prompted to “Enter a file in which to save the key”:

:::note

You will be asked to enter a filename - this will be to your home directory and by default end with the algorithm you have just chosen

```bash
Enter file in which to save the key (/home/my_user/.ssh/id_ed25519):
```

We want to create a better, and more descriptive name so we will add more information

```bash
Enter file in which to save the key (/home/my_user/.ssh/id_ed25519_git_rob_lextego):
```

You can leave the name as it is by pressing ```Enter```

:::

You will now be asked to Enter a passphrase. If you press ```Enter``` it will be blank, but this will create a security issue where anyone can then access your account. You will be asked to repeat the passphrase if you wisely use one.

We repeat this step for all the accounts we want to create.

## 3 - Mapping SSH keys for our GitHub Accounts

Taken from [here](https://stackoverflow.com/questions/3225862/multiple-github-accounts-ssh-config)

Now we have unique SSH Keys, we will add these keys to our GitHub accounts and ensure we have an easy way to connect to GitHub with these profiles.

We will now create an SSH config file, that will manage the multiple accounts for us. It maps the various accounts to the specific SSH keys. This will allow us to quickly switch between our users on the same computer.

Check for an existing config file

```bash
open ~/.ssh/config
```

if one does not exist we will see the following

```bash
xdg-open: file '/home/control/.ssh/config' does not exist
```

So we will create one with the following command

```bash
touch ~/.ssh/config
```

We can now modify this file,

```bash
nano ~/.ssh/config
```

We use the following template


<KEYNAME>
<USERNAME>
<USEREMAIL>

```bash
# Default work
Host <MYHOSTNAME>
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_ed25519_git_rob_lextego
```

Host <MYHOSTNAME> - the name we will use, i.e. LexTego-Rob or Personal-Rob
HostName is the actual domain that is used (that we will replace with Host)
GITHUB represents the service, in this example github.
IdentityFile is the path to the files we just created.

```bash
# Default work
Host LexTego-Rob
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_ed25519_git_rob_lextego
```

We write the file with ```Ctrl``` + ```O```
Accept the name with ```Enter```
We close the file with ```Ctrl``` + ```X```

We create a unique section for each service

```bash
# Personal
  Host Personal-Rob
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_ed25519_git_rob_personal
```

We do this for all the keys we need

## Add the private SSH key to SSH Agent

Taken from [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) and [here](https://www.fosslinux.com/122405/how-to-install-and-use-ssh-agent-on-ubuntu.htm)

This step is recommended, or you will need to add the passphrase every time you try to push and pull from the server.

### Check for SSH Agent

```bash
ssh-agent
```

This should return some lines of shell commands that set environment variables used by SSH-Agent. If you get these lines, SSH-Agent is installed. If it isn't it can be quickly installed with

```bash
sudo apt update
sudo apt install openssh-client
```

### Start SSH Agent

Start the ssh-agent in the background and sets the environment variables that are needed for ssh-agent to communicate with ssh-add and ssh:

```bash
eval "$(ssh-agent -s)"
```

This command starts SSH Agent, and sets the environment variable for the current shell.

### Add your SSH Private Key to the SSH Agent

Add your SSH private key to the ssh-agent so that you don’t have to type a password every time you connect to the GitHub server.

```bash
ssh-add ~/.ssh/id_ed25519_git_rob_lextego
```

Remember to replace the placeholder ```id_ed25519_git_rob_lextego``` with the SSH private key associated with the Github account you want to add. It will ask you for your Passphrase which you will only need to enter once.

Repeat this step until you have finished adding all your SSH private key’s to the ssh-agent for all your Github accounts.

### Make sure SSH Agent runs every time you enter a session

To auto-start ssh-agent whenever you start a terminal, you can add the ```eval "$(ssh-agent -s)" ``` command to your shell’s profile script.

For bash users, the file is ~/.bashrc. For Zsh users, it is ~/.zshrc.

```bash
echo 'eval "$(ssh-agent -s)"' >> ~/.bashrc
```

### Add your Public Key to your GitHub Account

The public key is the key that you share with others or add to your GitHub account. The private key is the one that you should **NEVER SHARE**.

To add your public key to your GitHub account, you would need to visit the GitHub website, go to your settings, and then move to [SSH and GPG keys](https://github.com/settings/keys). From there you can add your new public key by copying the contents of ```~/.ssh/id_ed25519_git_rob_personal.pub``` to a new SSH Key

### Verify your connection with the SSH Keys

We will now test that this is all working on our local machine, by creating a new project that we can connect to GitHub with.

We save all our development in a directory off home called code. If it does not exist, we create the code directory.

```bash
mkdir ~/code
```

We now create a test repository with our <USERNAME> with our GitHub user name. For example for my repo, I would creat

```bash
mkdir ~/code/test_repository_roblextego
```

We navigate to the new project directory:

```bash
cd ~/code/test_repository_roblextego
```

We will now follow the GitHub instructions an empty README file:

```bash
echo "# test_repository_roblextego" >> README.md
```

We then Initialize our project with Git:

```bash
git init
```

Check the current username and email configuration for your repository:

```bash
git config user.name
git config user.email
```

If these are empty or not what you expected, set your username and email with the following commands:

git config user.name "Your Name"
git config user.email "Your Email"

For example, I would enter:

```bash
git config user.name "RobReeveLexTego"
git config user.email "77055177+RobReeveLexTego@users.noreply.github.com"
```

### Create a New GitHub Repository on GitHub

We now go to GitHub.com and login with the user that we will be testing the push with.

Create a new repository - calling it ```test_repository_<USERNAME>```

### Push to this repository

We will now connect the local repository to the one in GitHub

Navigate to the root directory of your project if you haven’t already:

```bash
cd ~/code/test_repository_<USERNAME>
```

In my case that is:

```bash
cd ~/code/test_repository_roblextego
```

We will now add the README to a Commit, then link to the remote repository


Link your local repository with the remote repository by using the custom SSH URL format, adjusting <HOSTNAME>, <USERNAME> and <REPOSITORY_NAME> as appropriate:

```bash
git remote add origin git@<HOSTNAME>:<USERNAME>/<REPOSITORY_NAME>.git
```
<HOSTNAME> should be the name you added to ```.ssh/config``` for this profile
<USERNAME> should be your GitHub username.
<REPOSITORY_NAME> is the name of the repository you created in step 6.1.

In my case that is

```bash
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@LexTego-Rob:RobReeveLexTego/test_repository_roblextego.git
git push -u origin main
```

Tip: To make sure your SSH configuration is set up correctly, check your SSH config file.

```bash
nano ~/.ssh/config
```

Verify that the remote repository was successfully added:

```bash
git remote -v
```

The output should list the URL for your repository associated with the alias ‘origin’, confirming the link.

```bash
git remote -v
origin  git@LexTego-Rob.github:RobReeveLexTego/test_repository_roblextego.git (fetch)
origin  git@LexTego-Rob.github:RobReeveLexTego/test_repository_roblextego.git (push)
```

Push the initial contents of your local project to the GitHub repository:

### Check in GitHub

Navigate to your repository on GitHub.com to ensure the new changes you pushed are visible.

Congratulations! You have successfully configured a new GitHub account and securely connected it with SSH. This successful push confirms that your SSH settings and Git configuration are correctly set up for your account.

To verify that your setup works correctly across different accounts, repeat for any other GitHub accounts you manage.