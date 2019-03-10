require('./scripts/main');
import 'bootstrap';
import './scss/custom.scss';
require ('./MainController');

const Web3 = require('web3');

const contractAddress = require('./assets/contract.json');
const abi = require('./assets/abi.json');

angular.element(document).ready(() => {
	  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
	  if (typeof web3 !== 'undefined') {
		console.log('found mist/metamask provider');
		// Use Mist/MetaMask's provider
		window.web3js = new Web3(web3.currentProvider);
	  } else {
		console.log('No web3? You should consider trying MetaMask!');
		
		alert('No metamask extension found. As this is a POC, dApp will default to connecting to http://localhost:8545');
		
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		window.web3js = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	  }
			
	  window.contractAddress = contractAddress;
	  window.abi = abi;
	  
	  	window.getInstance =  async function(){
			
		  
		  var accounts = await web3js.eth.getAccounts();
			
		  var ghajnunaContract = new web3js.eth.Contract(window.abi, window.contractAddress.address);
			 
			var result = {
				accounts: accounts,
				ghajnunaContract: ghajnunaContract				
			}
			
			return Promise.resolve(result);
		}


});