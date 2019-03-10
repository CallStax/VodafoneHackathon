(function(){
    'use strict';

    angular.module('Beneficiary').service('BeneficiaryService', BeneficiaryService);

    BeneficiaryService.$inject = [];

    function BeneficiaryService(){
        return {
            registerBeneficiary: registerBeneficiary
        }

        async function registerBeneficiary(beneficiaryAddress, chosenIndustries) {
            var result = await window.getInstance();
			await result.ghajnunaContract.methods.registerBeneficiary(beneficiaryAddress, chosenIndustries).send({ from: window.contractAddress.address });		 
		}
    }

}());