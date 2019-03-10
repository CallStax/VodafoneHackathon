(function(){
    'use strict';

    angular.module('Industry').service('IndustryService', IndustryService);

    IndustryService.$inject = [];

    function IndustryService(){
        return {
            getIndustries: getIndustries,
            getIndustry: getIndustry,
            setupSampleIndustries: setupSampleIndustries
        }
        
        async function getIndustries() {
            var result = await window.getInstance();
			return result.ghajnunaContract.methods.getIndustries().call();		 
        }

        async function getIndustry(industryId) {
            var result = await window.getInstance();
			return result.ghajnunaContract.methods.getIndustry(industryId).call();		 
        }
        
        async function setupSampleIndustries(){
            var result = await window.getInstance();
            await result.ghajnunaContract.methods.registerIndustry('Food', 'This is Food').send({from: result.accounts[0]});
            await result.ghajnunaContract.methods.registerIndustry('Clothes', 'These are Clothes').send({from: window.contractAddress.address});
            await result.ghajnunaContract.methods.registerIndustry('Appliances', 'These are Appliances').send({from: window.contractAddress.address});
            await result.ghajnunaContract.methods.registerIndustry('Cleanliness', 'This is Cleanliness').send({from: window.contractAddress.address});
        }
    }

}());