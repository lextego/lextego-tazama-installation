<!-- GNU GENERAL PUBLIC LICENSE: Copyright © 2024 LexTego--> 

# Installing the LexTego documentation for Tazama

This is a docusaurus installation that allows you to quickly and easily browse the documentation that we have written to deploy Tazama. It includes the installation of the software required to support Tazama. It is designed to be a quick self host, and with access to the scripts, it should help you deploy the service more quickly. Please note this installation assumes you have access to all the rules, including those that are restricted, to reduce bad actors understanding the full inner workings of Tazama.

## Dependencies

- NodeJS
  - [Windows instructions](../docs/01_how_to_guides/01_setup_your_computer/windows/node/nodejs.md)
  - [Ubuntu Instructions](../docs/01_how_to_guides/01_setup_your_computer/ubuntu/01_server_setup/01_dependencies.md)
- Node Package Manager

Once you have installed Node, you are ready to launch the documentation server

From the local repository you run the command to deploy the dependencies for Docusaurus.

```bash
npm install
```

once it has installed, you can address some of the NPM warnings and issues with 

```bash
npm audit fix
```

once the fixes have completed, you can launch the service with 

```bash
npm run start
```

If you are uncertain, please head to Docusaurus documentation.