(function(){
    'use strict';

    angular.module('Beneficiary').service('BeneficiaryService', BeneficiaryService);

    BeneficiaryService.$inject = [];

    function BeneficiaryService(){
        return {
            getData: getData
        }

        function getData(){
            // web3 code goes here
            console.log('TEST!')
        }
    }

}());