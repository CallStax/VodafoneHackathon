const Web3 = require('web3');
const { abi, evm } = require('./compile');

//TODO: parameterize the server url
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  //console.log('Attempting to deploy from account', accounts[0]);
  
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Vodafone Malta Foundation', 'VO/0537'] })
    .send({ gas: '6000000', from: accounts[0] });

	const contractAddress = result.options.address;
	
	const contractInstance = await new web3.eth.Contract(abi, contractAddress);
	
	//TEMP - Set sample initial data
	
	//0 - Vodafone Malta Foundation
	//1 - Millenium Chapel
	//2 - Food Bank
	
	await contractInstance.methods.registerIndustry('FOOD', 'Food').send({from: accounts[0], gasLimit: 3000000});
	await contractInstance.methods.registerIndustry('CLOTHES', 'Clothes').send({from: accounts[0], gasLimit: 3000000});
	await contractInstance.methods.registerIndustry('APPL', 'Appliances').send({from: accounts[0], gasLimit: 3000000});
	await contractInstance.methods.registerIndustry('HYGIENE', 'Hygiene').send({from: accounts[0], gasLimit: 3000000});
	
	let industryIds = await contractInstance.methods.getIndustries().call({from: accounts[0]});
	
	let industries = {};

	//Synchronous
	for (let i = 0; i < industryIds.length; i++) { 
		let industryId = industryIds[i];
		
		let industry = await contractInstance.methods.getIndustry(industryId).call();
		
		console.log(industry);
		
		industries[industry[0]] = {
			Id: industryId,
			Code: industry[0],
			Description: industry[1]
		}
	}
	
	console.log('industries', industries);
	
	await contractInstance.methods.requestNGO('Millenium Chapel', 'VO/0022').send({from: accounts[1], gasLimit: 3000000});
	await contractInstance.methods.approveNGO(accounts[1]).send({from: accounts[0], gasLimit: 3000000});
	await contractInstance.methods.updateNGOIndustries([industries['FOOD'].Id, industries['CLOTHES'].Id]).send({from: accounts[1], gasLimit: 3000000});
	
	await contractInstance.methods.requestNGO('Food Bank', 'VO/0018').send({from: accounts[2], gasLimit: 3000000});
	await contractInstance.methods.approveNGO(accounts[2]).send({from: accounts[0], gasLimit: 3000000});
	await contractInstance.methods.updateNGOIndustries([industries['FOOD'].Id]).send({from: accounts[1], gasLimit: 3000000});
	
	// await contractInstance.methods.requestNGO('Caritas', 'VO/0032').send({from: accounts[3], gasLimit: 3000000});
	// await contractInstance.methods.approveNGO(accounts[3]).send({from: accounts[0], gasLimit: 3000000});
	// await contractInstance.methods.updateNGOIndustries([industries['CLOTHES'].Id, industries['HYGIENE'].Id]).send({from: accounts[1], gasLimit: 3000000});
	
	
	await contractInstance.methods.requestBeneficiary().send({from: accounts[3], gasLimit: 3000000});
	await contractInstance.methods.approveBeneficiary(accounts[3]).send({from: accounts[0], gasLimit: 3000000});
	await contractInstance.methods.updateBeneficiaryIndustries([industries['CLOTHES'].Id, industries['HYGIENE'].Id]).send({from: accounts[3], gasLimit: 3000000});	
	
	await contractInstance.methods.requestBeneficiary().send({from: accounts[4], gasLimit: 3000000});
	await contractInstance.methods.approveBeneficiary(accounts[4]).send({from: accounts[1], gasLimit: 3000000});
	await contractInstance.methods.updateBeneficiaryIndustries([industries['FOOD'].Id, industries['HYGIENE'].Id]).send({from: accounts[4], gasLimit: 3000000});

	await contractInstance.methods.requestBenefactor('ACME Co. Ltd', 'test@abc.net', '99112233').send({from: accounts[6], gasLimit: 3000000});
	await contractInstance.methods.approveBenefactor(accounts[6]).send({from: accounts[0], gasLimit: 3000000});
	await contractInstance.methods.updateBenefactorIndustries([industries['FOOD'].Id, industries['APPL'].Id]).send({from: accounts[6], gasLimit: 3000000});		
	
	
	const usertype0 = await contractInstance.methods.getUserType().call({from: accounts[0]});
	console.log('userType0', usertype0);
	
	const usertype3 = await contractInstance.methods.getUserType().call({from: accounts[3]});
	console.log('userType3', usertype3);
	
	const usertype6 = await contractInstance.methods.getUserType().call({from: accounts[6]});
	console.log('userType6', usertype6);
	
  console.log('Contract deployed to', contractAddress);
};
deploy();
