# BDSEC Automation Tests

## Description
This project is focused on automation testing using Cypress. It provides a framework for end-to-end testing of web applications, specifically for managing patient registration and clinical workflows. The key functionalities include:

1. **Register Patient**: Automates the process of registering a patient by filling out a form with randomly generated data.
2. **Start Patient Visit**: Initiates a patient visit by retrieving registered patient data and filling out the necessary forms.
3. **Update Clinical Forms**: Allows for updating clinical forms by searching for registered patients and filling out various consultation templates.

## Installation
To install the project dependencies, run the following command:

```bash
yarn install
```
or
```bash
npm install
```

## Usage
To start the Cypress test runner, use the following command:

```bash
yarn start
```
or
```bash
npm start
```

To run the tests in headless mode, use:

```bash
yarn test
```
or
```bash
npm test
```

## Project Structure
```
d:/BDSEC_Automation_Tests/
├── cypress/
│   ├── e2e/                  # End-to-end test scripts
│   │   └── BDSEC/
│   │       └── script.cy.js  # Test script for patient registration and visits
│   ├── fixtures/             # Mock data for tests
│   └── support/              # Custom commands and support files for Cypress
├── cypressworkflows/         # CI/CD workflow files
│   └── workflows/
│       └── cypress.yml       # Workflow configuration for Cypress tests
├── package.json              # Project dependencies and scripts
└── README.md                 # Documentation for the project
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.
