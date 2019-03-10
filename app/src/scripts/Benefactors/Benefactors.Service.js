(function(){
    'use strict';

    angular.module('Benefactors').service('BenefactorService', BenefactorService);

    BenefactorService.$inject = [];

    function BenefactorService() {
        return {
            requestBenefactor: requestBenefactor,
            getRequests: getRequests,
            getScore: getScore,
			benefactorChosenIndustries: benefactorChosenIndustries,
			getBenefactorIndustries: getBenefactorIndustries,
			getBeneficiariesApprovedByNGO : getBeneficiariesApprovedByNGO
        }

        async function requestBenefactor(companyName, email, phone) {
            var requests = await window.getInstance();
            return requests.ghajnunaContract.methods.requestBenefactor(companyName, email, phone).send({ from: requests.accounts[0] });
        }

        async function getRequests() {
            var requests = await window.getInstance();
            return requests.ghajnunaContract.methods.getListofRequests().call();
        }

        async function getScore() {
            var requests = await window.getInstance();
            return requests.ghajnunaContract.methods.getScore().call();
        }
		
		
		async function benefactorChosenIndustries(chosenIndustries) {
            var result = await window.getInstance();
			return result.ghajnunaContract.methods.benefactorChosenIndustries(chosenIndustries).send({ from: result.accounts[0]});			
		}
		
		async function getBenefactorIndustries(){
			var requests = await window.getInstance();
            return requests.ghajnunaContract.methods.getBenefactorIndustries(requests.accounts[0]).call({ from: requests.accounts[0]});	
		}
		
		async function getBeneficiariesApprovedByNGO (){		
			var requests = await window.getInstance();
            return requests.ghajnunaContract.methods.getBeneficiariesApprovedByNGO().call({ from: requests.accounts[0]});
		}
    }

}());