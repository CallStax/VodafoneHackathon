(function(){
    'use strict';

    angular.module('Beneficiary').service('BeneficiaryService', BeneficiaryService);

    BeneficiaryService.$inject = [];

    function BeneficiaryService(){
        return {
            requestBeneficiary: requestBeneficiary,
			updateBeneficiaryIndustries: updateBeneficiaryIndustries,
			getBeneficiaryIndustries: getBeneficiaryIndustries,
			getBeneficiariesApprovedByNGO: getBeneficiariesApprovedByNGO,
			getBeneficiaryDetails: getBeneficiaryDetails,
			getBeneficiariesPendingApproval: getBeneficiariesPendingApproval
        }

        async function requestBeneficiary() {
            var result = await window.getInstance();
			return result.ghajnunaContract.methods.requestBeneficiary().send({ from: result.accounts[0]});
		}
		
		async function updateBeneficiaryIndustries(chosenIndustries) {
			var result = await window.getInstance();
			return result.ghajnunaContract.methods.updateBeneficiaryIndustries(chosenIndustries).send({ from: result.accounts[0]});			
		}
		
		async function getBeneficiaryIndustries(address){
			debugger;
			
			var requests = await window.getInstance();
			
			let beneficiary = requests.accounts[0];
			if (address){
				beneficiary = address;
			}
            return await requests.ghajnunaContract.methods.getBeneficiaryIndustries(beneficiary).call({ from: requests.accounts[0]});	
		} 
		
		async function getBeneficiariesApprovedByNGO(){
			var requests = await window.getInstance();
            return requests.ghajnunaContract.methods.getBeneficieries().call({ from: requests.accounts[0]});				
		}
		
		async function getBeneficiaryDetails(address){
			var requests = await window.getInstance();
            return requests.ghajnunaContract.methods.getBeneficiary(address).call({ from: requests.accounts[0]});							
		}
		
		async function getBeneficiariesPendingApproval(){
			var requests = await window.getInstance();
			return requests.ghajnunaContract.methods.getBeneficiariesPendingApproval().call({from: requests.accounts[0]});
		}
    }

}());