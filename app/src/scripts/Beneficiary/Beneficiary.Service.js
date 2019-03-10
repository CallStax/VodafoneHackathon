(function(){
    'use strict';

    angular.module('Beneficiary').service('BeneficiaryService', BeneficiaryService);

    BeneficiaryService.$inject = [];

    function BeneficiaryService(){
        return {
            registerBeneficiary: registerBeneficiary
        }

        async function registerBeneficiary(chosenIndustries) {
            var result = await window.getInstance();
			await result.ghajnunaContract.methods.registerBeneficiary(result.accounts[0], chosenIndustries).send({ from: result.accounts[0]});		 
		}
    }

}());