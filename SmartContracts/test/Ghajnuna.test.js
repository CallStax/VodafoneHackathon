const assert = require('chai').assert;
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
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
		.send({ from: accounts[0], gas: 3000000 });
});

describe('Ghajnuna - Setup', () => {
	it('deploys a contract', () => {
		assert.ok(ghajnuna.options.address);
	});

	it('sets contract creator as ngo', async () => {
		const ngo = await ghajnuna.methods.getNGO(accounts[0]).call({ from: accounts[0], gas: 3000000 });

		assert.equal(ngo[0], 'Vodafone Malta Foundation'); //Name
		assert.equal(ngo[1], 'VO/0537'); //VO Number
		assert.equal(ngo[2], true); //Is Set
		assert.equal(ngo[3], true);	//Is Approved
		assert.equal(ngo[4], true); //Is Sys Admin
	});

});

describe('Ghajnuna - NGO Admin', () => {

	it('allows admin ngo to register new ngo', async () => {
		await ghajnuna.methods.requestNGO(accounts[1], 'Test NGO', 'VO/9999').send({ from: accounts[0], gas: 3000000 });

		const ngo = await ghajnuna.methods.getNGO(accounts[1]).call();
		assert.equal(ngo[0], 'Test NGO');
		assert.equal(ngo[1], 'VO/9999');
		assert.equal(ngo[2], true); //Is Set
		assert.equal(ngo[3], false);	//Is Approved
		assert.equal(ngo[4], false); //Is Sys Admin
	});

	it('allows admin ngo to approve an ngo', async () => {
		await ghajnuna.methods.requestNGO(accounts[1], 'Test NGO', 'VO/9999').send({ from: accounts[0], gas: 3000000 });

		await ghajnuna.methods.approveNGO(accounts[1]).send({ from: accounts[0], gas: 3000000 });

		const ngo = await ghajnuna.methods.getNGO(accounts[1]).call({ from: accounts[0], gas: 3000000 });

		//perform sanity checks
		assert.equal(ngo[0], 'Test NGO');
		assert.equal(ngo[1], 'VO/9999');
		assert.equal(ngo[2], true); //Is Set
		assert.equal(ngo[3], true);	//Is Approved
		assert.equal(ngo[4], false); //Is Sys Admin
	});

	it('allows admin ngo to set non-admin ngo as admin', async () => {
		await ghajnuna.methods.requestNGO(accounts[1], 'Test NGO', 'VO/9999').send({ from: accounts[0], gas: 3000000 });

		await ghajnuna.methods.makeNGOAdmin(accounts[1]).send({ from: accounts[0], gas: 3000000 });

		const ngo = await ghajnuna.methods.getNGO(accounts[1]).call({ from: accounts[0], gas: 3000000 });

		//perform sanity checks
		assert.equal(ngo[0], 'Test NGO');
		assert.equal(ngo[1], 'VO/9999');
		assert.equal(ngo[2], true); //Is Set
		assert.equal(ngo[3], false);	//Is Approved
		assert.equal(ngo[4], true); //Is Sys Admin
	});

	it('prevents non-admin ngo to approve an ngo', async () => {
		//Register account[1] as non admin NGO
		await ghajnuna.methods.requestNGO(accounts[1], 'Test NGO', 'VO/9999').send({ from: accounts[0], gas: 3000000 });

		try {
			await ghajnuna.methods.approveNGO(accounts[1]).send({ from: accounts[1], gas: 3000000 });

			//If we get to here, it means the call succeeded which is wrong!
			assert.fail("approveNGO by a non admin NGO succeeded");
		} catch (error) {
			assert.include(error.message, 'Only Admin NGOs are able To run this function');
		}
	});

	it('prevents non-admin ngo to set non-admin ngo as admin', async () => {
		//Register account[1] as non admin NGO
		await ghajnuna.methods.requestNGO(accounts[1], 'Test NGO', 'VO/9999').send({ from: accounts[0], gas: 3000000 });

		try {
			await ghajnuna.methods.makeNGOAdmin(accounts[1]).send({ from: accounts[1], gas: 3000000 });

			//If we get to here, it means the call succeeded which is wrong!
			assert.fail("makeNGOAdmin by a non admin NGO succeeded");
		} catch (error) {
			assert.include(error.message, 'Only Admin NGOs are able To run this function');
		}
	});
});

describe('Ghajnuna - Industries', () => {

	it('allows admin ngo to register new industry', async () => {
		await ghajnuna.methods.registerIndustry('Test Industry', 'Test Description').send({ from: accounts[0], gas: 3000000 });

		const allIndustries = await ghajnuna.methods.getAllIndustries().call();
		const industry = await ghajnuna.methods.getIndustry(allIndustries[0]).call();
		assert.equal(industry[1], 'Test Industry');
		assert.equal(industry[2], 'Test Description');
		assert.equal(industry[3], true); //Is Set
	});

	it('prevents benefactor to register new industry', async () => {
		//Register account[2] as non Benefactor
		await ghajnuna.methods.registerBenefactor(accounts[2], 'Test Name', []).send({ from: accounts[2], gas: 3000000 });

		try {
			await ghajnuna.methods.registerIndustry('Test Industry', 'Test Description').send({ from: accounts[2], gas: 3000000 });

			//If we get to here, it means the call succeeded which is wrong!
			assert.fail("createIndustry by a non admin NGO succeeded");
		} catch (error) {
			assert.include(error.message, 'Only Admin NGOs are able To run this function');
		}
	});

	it('prevents non-admin ngo to register new industry', async () => {
		//Register account[1] as non admin NGO
		await ghajnuna.methods.requestNGO(accounts[1], 'Test NGO', 'VO/9999').send({ from: accounts[0], gas: 3000000 });

		try {
			await ghajnuna.methods.registerIndustry('Test Industry', 'Test Description').send({ from: accounts[1], gas: 3000000 });

			//If we get to here, it means the call succeeded which is wrong!
			assert.fail("createIndustry by a non admin NGO succeeded");
		} catch (error) {
			assert.include(error.message, 'Only Admin NGOs are able To run this function');
		}
	});

	it('prevents beneficiary to register new industry', async () => {
		//Register account[3] as beneficiary
		await ghajnuna.methods.registerBeneficiary(accounts[3], []).send({ from: accounts[3], gas: 3000000 });

		try {
			await ghajnuna.methods.registerIndustry('Test Industry', 'Test Description').send({ from: accounts[3], gas: 3000000 });

			//If we get to here, it means the call succeeded which is wrong!
			assert.fail("createIndustry by a beneficiary succeeded");
		} catch (error) {
			assert.include(error.message, 'Only Admin NGOs are able To run this function');
		}
	});

});

describe('Ghajnuna - Benefactor', () => {

	it('allows benefactors to register', async () => {
		await ghajnuna.methods.registerBenefactor(accounts[2], 'Test Name', []).send({ from: accounts[2], gas: 3000000 });

		const benefactors = await ghajnuna.methods.getBenefactor(accounts[2]).call();
		assert.equal(benefactors[0], 'Test Name');
		assert.deepEqual(benefactors[1], []);
		assert.equal(benefactors[2], true); //Is Set
	});
});

describe('Ghajnuna - Beneficiary', () => {

	it('allows beneficiary to register', async () => {
		await ghajnuna.methods.registerBeneficiary(accounts[3], []).send({ from: accounts[3], gas: 3000000 });

		const beneficiary = await ghajnuna.methods.getBeneficiary(accounts[3]).call();
		assert.deepEqual(beneficiary[0], []);
		assert.equal(beneficiary[1], true); //Is Set
		assert.equal(beneficiary[2], false); //Is Sys Admin
	});

	it('allows admin ngo to approve beneficiary', async () => {
		await ghajnuna.methods.registerBeneficiary(accounts[4], []).send({ from: accounts[4], gas: 3000000 });

		await ghajnuna.methods.approveBeneficiary(accounts[4]).send({ from: accounts[0], gas: 3000000 });

		const beneficiary = await ghajnuna.methods.getBeneficiary(accounts[4]).call({ from: accounts[0], gas: 3000000 });
		const beneficiariesApprovedByNGO = await ghajnuna.methods.getBeneficiariesApprovedByNGO(accounts[0]).call({ from: accounts[0], gas: 3000000 });
		const ngoApprovalsForBeneficiaries = await ghajnuna.methods.getNGOApprovalsForBeneficiaries(accounts[4]).call({ from: accounts[0], gas: 3000000 });

		//perform sanity checks
		assert.deepEqual(beneficiary[0], []);
		assert.equal(beneficiary[1], true); //Is Set
		assert.equal(beneficiary[2], true); //Is Sys Admin
		assert.equal(beneficiariesApprovedByNGO.length, 1);
		assert.equal(ngoApprovalsForBeneficiaries.length, 1);
	});

	it('prevents non-admin ngo to set non-admin ngo as admin', async () => {
		//Register account[1] as non admin NGO
		await ghajnuna.methods.requestNGO(accounts[1], 'Test NGO', 'VO/9999').send({ from: accounts[0], gas: 3000000 });

		try {
			await ghajnuna.methods.makeNGOAdmin(accounts[1]).send({ from: accounts[1], gas: 3000000 });

			//If we get to here, it means the call succeeded which is wrong!
			assert.fail("makeNGOAdmin by a non admin NGO succeeded");
		} catch (error) {
			assert.include(error.message, 'Only Admin NGOs are able To run this function');
		}
	});

});