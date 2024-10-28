---  
sidebar_position: 1  
sidebar_label: Working with Folder
id: working-with-folders
title: Working with Git and Folders
date: 2024-10-23 17:57:08
author: Rob Reeve
description: Working with Git and Folders
tags: 
  - WIP
  - Machine Setup
  - Git
---  

<!-- GNU GENERAL PUBLIC LICENSE: Copyright © 2024 LexTego--> 

GitHub has a very flat folder structure, so everything comes under multiple repositories in one area. When we start working locally this becomes complicated, but we can simply create folders to contain similar repositories - like a project.

We recommend the 4 main folders for now:

- company
- deprecated
- emma
- cindy
- polly

We then clone from GitHub into these folders.

## Company

We create all company related activity here - and also use some SubFolders

- [Commercial](#commercial)

and the following repo(s)

- way_of_working (private) - [documentation.lextego.com](https://documentation.lextego.com)

### Commercial

Under Commercial we have

- product_overview (protected)
- recruitment (private)
- sales_marketing (private)

## Deprecated

- company_plan
- commercial-demo-stack
- load-testing-k6
- data-transformation
- documentation-old

## Removed

- documentation

## Emma

Under Emma we have a number of folders, which could be broken down further as

### Core Platform

- fincrime-api
- channel-router-setup-processor
- typology-processor
- channel-aggregation-decisioning-processor
- event-aggregation-decisioning-processor
- postman-config
- rule-processors

### Other

superset  
transaction-monitoring-service

## Penny

## Polly

In Polly we have:

- typology-database

## to allocate

- APRICOT_Internal
- architecture
- cache
- Data_creation
- Data_driven_classification
- data_sampling
- database
- data-creation
- data-models
- DataPath_Tooling
- data-processor
- Design_Structure
- event-flow-control-processor
- infastructure-terraform
- infrastructure-secrets
- internal-platform
- lextego
- octia-user-interface
- Open_Data
- platform
- platform-security
- rule-003
- rule-028
- Rules_dev
- telemetry
