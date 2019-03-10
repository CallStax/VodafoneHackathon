(function(){
    'use strict';

    angular.module('NGOs').service('NGOsService', NGOsService);

    NGOsService.$inject = [];

    function NGOsService(){
		

		
        return {           
            getNGOs: getNGOs,
            getNGOApprovalsForBeneficiaries: getNGOApprovalsForBeneficiaries

        }
		

        function getData(){
            // web3 code goes here
            console.log('TEST!')
        }
		
		async function getNGOs() {
			var result = await window.getInstance();
			return result.ghajnunaContract.methods.getNGOs().call();			 
        }

        async function getNGOApprovalsForBeneficiaries() {
            var result = await window.getInstance();
            return result.ghajnunaContract.methods.getNGOApprovalsForBeneficiaries().call();
        }
    }

}());