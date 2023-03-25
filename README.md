<h1 align="center">
  <img width="200px" src="https://upload.wikimedia.org/wikipedia/commons/4/41/DALL-E_2_artificial_intelligence_digital_image_generated_photo.jpg" alt="DALL·E 2 Logo" />
  <br />
  DALL·E 2 Clone
  <br />
</h1>

<h4 align="center">
   DALL·E 2 Clone created with Next.JS and Azure</a>
</h4>

<p align="center">
   <img src="https://img.shields.io/github/v/release/MartsTech/dalle2-clone" alt="Release" />
   <img src="https://img.shields.io/github/license/MartsTech/dalle2-clone" alt="License" />
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#key-technologies">Key Technologies</a> •
  <a href="#setup">Setup</a> •
  <a href="#support">Support</a> •
  <a href="#license">License</a>
</p>

![Home Screenshot](assets/home.JPG?raw=true 'Home Screenshot')

## Key Features

- Davinci 003 Prompt Suggestions
- DALL·E 2 Art Generation
- Azure Serverless Enviroment
- Azure Storage

---

## Key Technologies

- Next.JS
- TailwindCSS
- Redux
- Typescript
- Azure
- OpenAi API
- Terraform

---

## Setup

This guide will help you set up the monorepo with Azure Serverless Functions. The project contains a packages folder in the root directory of the project. This folder contains 3 subfolders: client, azure, and terraform. To use the project locally, you need to follow the below steps.

### Prerequisites
Before you begin, make sure you have the following installed:

- Terraform CLI
- Azure CLI
- Node.js

### Azure Serverless Functions Setup

Open a terminal and navigate to the packages/terraform directory.
1. Run terraform init to initialize Terraform.
2. Run terraform apply to create the Azure resources needed for the serverless functions.
3. Once the resources are created, you can optionally install the Azure Storage extension in Visual Studio Code to create a blob container called images.

### Azure Setup
1. Open a terminal and navigate to the packages/azure directory.
2. Copy the contents of the .env.example file and paste them into a new file called local.settings.json.
3. Fill in the values in the local.settings.json file.
4. Add the following config to the local.settings.json file to enable CORS:
```
"Host": {
  "CORS": "http://localhost:3000"
}
```

### Client Setup
1. Open a terminal and navigate to the packages/client directory.
2. Copy the contents of the .env.example file and paste them into a new file called .env.local.
3. Fill in the values in the .env.local file.

---

## Support

Whether you use this project, have learned something from it, or just like it, please consider supporting it by buying me a coffee, so I can dedicate more time on open-source projects like this :)

<a href="https://www.buymeacoffee.com/martstech" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60px" width="217px" />
</a>

---

## License

> You can check out the full license [here](https://github.com/MartsTech/dalle2-clone/blob/main/LICENSE)

This project is licensed under the terms of the **MIT** license
