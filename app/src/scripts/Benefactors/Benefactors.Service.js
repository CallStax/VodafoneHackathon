(function(){
    'use strict';

    angular.module('Benefactor').service('BenefactorService', BenefactorService);

    BenefactorService.$inject = [];

    function BenefactorService(){
        return {
            getData: getData
        }

        function getData(){
            // web3 code goes here
            console.log('TEST!')
        }
    }

}());