(function(){
    'use strict';

    angular.module('Industry').service('IndustryService', IndustryService);

    IndustryService.$inject = [];

    function IndustryService(){
        return {
            getIndustries: getIndustries
        }
        
        async function getIndustries() {
            var result = await window.getInstance();
			return result.ghajnunaContract.methods.getIndustries().call();
		 
		}
    }

}());