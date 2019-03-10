const Web3 = require('web3');
const { abi, evm } = require('./compile');

//TODO: parameterize the server url
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  //console.log('Attempting to deploy from account', accounts[0]);
  
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Vodafone Malta Foundation', 'VO/0537'] })
    .send({ gas: '5000000', from: accounts[0] });

	const contractAddress = result.options.address;
	
	const contractInstance = await new web3.eth.Contract(abi, contractAddress);
	
	//0 - Vodafone Malta Foundation
	//1 - Millenium Chapel
	//2 - Food Bank
	//3 - Charitas
	
	await contractInstance.methods.registerIndustry('FOOD', 'Food and Catering').send({from: accounts[0], gasLimit: 3000000});
	await contractInstance.methods.registerIndustry('CLOTHES', 'Food and Catering').send({from: accounts[0], gasLimit: 3000000});
	await contractInstance.methods.registerIndustry('APPL', 'Appliances').send({from: accounts[0], gasLimit: 3000000});
	await contractInstance.methods.registerIndustry('HYGIENE', 'Hygiene').send({from: accounts[0], gasLimit: 3000000});
	
	await contractInstance.methods.requestNGO('Millenium Chapel', 'VO/0022').send({from: accounts[1], gasLimit: 3000000});
	await contractInstance.methods.requestNGO('Food Bank', 'VO/0018').send({from: accounts[2], gasLimit: 3000000});
	await contractInstance.methods.requestNGO('Caritas', 'VO/0032').send({from: accounts[3], gasLimit: 3000000});

  console.log('Contract deployed to', contractAddress);
};
deploy();
