const assert = require('chai').assert;
const ganache = require('ganache-cli');
const Web3 = require('web3');

const options = { gasLimit: 8000000 };

const web3 = new Web3(ganache.provider(options));
const { abi, evm } = require('../compile');

let accounts;
let ghajnuna;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

    
  
  //Use one of those accounts to deploy
  //the contract
  ghajnuna = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Vodafone Malta Foundation', 'VO/0537']
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Ghajnuna - Setup', () => {
  it('deploys a contract', () => {
    assert.ok(ghajnuna.options.address);
  });

  it('sets contract creator as ngo', async () => {
    const ngo = await ghajnuna.methods.getNGO(accounts[0]).call();
    
	assert.equal(ngo[0], 'Vodafone Malta Foundation'); //Name
	assert.equal(ngo[1], 'VO/0537'); //VO Number
	assert.equal(ngo[2], true); //Is Set
	assert.equal(ngo[3], true); //Is Sys Admin
  });
  
});

describe('Ghajnuna - NGO Admin', () => {

  it('allows admin ngo to register new ngo', async () => {
    await ghajnuna.methods.registerNGO(accounts[1], 'Test NGO', 'VO/9999').send({ from: accounts[0], gas: '1000000' });
	
	const ngo = await ghajnuna.methods.getNGO(accounts[1]).call();
	assert.equal(ngo[0], 'Test NGO');
	assert.equal(ngo[1], 'VO/9999');
	assert.equal(ngo[2], true); //Is Set 
	assert.equal(ngo[3], false); //is Sys Admin
  });
  
  it('allows admin ngo to set non-admin ngo as admin', async () => {
	await ghajnuna.methods.registerNGO(accounts[1], 'Test NGO', 'VO/9999').send({ from: accounts[0], gas: '1000000' });
	
    await ghajnuna.methods.makeNGOAdmin(accounts[1]).send({ from: accounts[0], gas: '1000000' });
	
	const ngo = await ghajnuna.methods.getNGO(accounts[1]).call();

	//perform sanity checks
	assert.equal(ngo[0], 'Test NGO');
	assert.equal(ngo[1], 'VO/9999');
	assert.equal(ngo[2], true); //Is Set
	assert.equal(ngo[3], true); //Is Sys Admin
  });
 
  it('prevents non-admin ngo to set non-admin ngo as admin', async () => {
		//Register account[1] as non admin NGO
		await ghajnuna.methods.registerNGO(accounts[1], 'Test NGO', 'VO/9999').send({ from: accounts[0], gas: '1000000' });
	  
		try {
			await ghajnuna.methods.makeNGOAdmin(accounts[1]).send({ from: accounts[1], gas: '1000000' });
			
			//If we get to here, it means the call succeeded which is wrong!
			assert.fail("makeNGOAdmin by a non admin NGO succeeded");
		} catch(error){
			assert.include(error.message, 'Only Admin NGOs are able To run this function');
		}
  });
  
});
