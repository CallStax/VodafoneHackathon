# Vodafone Hackathon

## Problem Definition & Proposed Solution
Create an online social platform to enable people who need help, NGOs, and people/entities who can help, to collaborate effortlessly.

The proposed solution includes the setting up of a private ethereum blockchain, with Proof-of-Authority consensus mechanism. A node should be hosted by each NGO, with other stakeholders being allowed into the “Consortium” once they are approved. The manager of the ecosystem, who will have limited powers to onboard new node hosters.

## Roles Within the System

- A Beneficiary is a user who needs help and uses the platform to request specific and different types of help. Ethical considerations are of utmost importance and they must be given the utmost priority, particularly in relation to GDPR requirements.
A Beneficiary may get help in different ways, such as in the short term by being given food on a weekly basis, but also in the long term by being given opportunities to do jobs. A Beneficiary needs to be onboarded by an NGO who will vouch for their case, without disclosing personal and sensitive information.

- The Benefactor is a user (or a group of users) typically representing an entity who would like to help out. They can be onboarded by NGOs too, which would be more of a formal process that allows them to get recognized and build trust, upon which they will be given direct access to the Beneficiaries without having private and sensitive data disclosed. Benefactors can report back and provide feedback to the NGOs on the Beneficiaries cases to use them as stakeholders who can stem abuse. Since one of the main factors preventing benefactors from really helping out has been the fact that they typically see it as a “waste of time”, a gamification concept will be utilised to regularly rank benefactors, and provide a platform to help them use it for their CSR purposes, reducing costs while driving up the brand’s image and market value.

- NGOs are the key stakeholders in the system. The platform will ensure that they can focus their time and resources where they are really needed, leveraging the power of the Blockchain to eliminate them being bottlenecks wherever it is not required, transferring this responsibility to Smart Contracts. NGOs will be able to perform onboarding of new beneficiaries off-chain by listening to “requests for help”, while being the humans-in-the-loop to ensure that the emotional connection with the person-in-need remains a priority.
Public: The public will be able to interface with the platform in a read-only manner, by accessing data through NGO or Benefactor-based portals.

## Setting Up The Environment

Install [Node.js](https://nodejs.org/en/download/current/)

Install [Geth](https://geth.ethereum.org/downloads/)

Install [Python](https://www.python.org/downloads/)

Install [C++ Build Tools](https://www.microsoft.com/en-us/download/details.aspx?id=8279)

Install [Metamask](https://metamask.io/)

In a command line opened as an Administrator, run the following commands one after the other:

```bash
npm install -g ganache-cli
npm install -g production windows-build tools
```

In a command line, opened as an Administrator, in the src directory of the solution, run the following commands:

```bash
npm install web3
npm install solc
```

## Running The Solution

Clone the repository on your machine. Open a command line, navigate to the folder '..\VodafoneHackathon\smartcontracts\contracts' and run the following command

```bash
solcjs Ghajnuna.sol --abi
```

Rename the generated file to 'abi.json' and move it to the the following directory: '..\VodafoneHackathon\app\src\assets'

In the same command line run the following command:
```bash
node deploy.js
```

This will essentially deploy the smart contract the the blockchain and create the smart contract address. Store this address in a new file named 'contract.json' and place this file in the same location as the 'abi.json'.

Open another command line, navigate to the app/src folder in the repository and run the following command:
```
npm start
```
