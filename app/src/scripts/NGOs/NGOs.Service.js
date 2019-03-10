(function(){
    'use strict';

    angular.module('NGOs').service('NGOsService', NGOsService);

    NGOsService.$inject = [];

    function NGOsService() {



        return {
            getNGOs: getNGOs,
            getNGOApprovalsForBeneficiaries: getNGOApprovalsForBeneficiaries,
            requestNGO: requestNGO
        }


        function getData() {
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

        //async function postNGOApplication() {
        //    var result = await window.getInstance();
        //    return result.ghajnunaContract.methods.requestNGO({}).send({ from: window.contractAddress.address });
        //}

        async function requestNGO(name, volnum, chosenIndustries) {
            var requests = await window.getInstance();
            requests.ghajnunaContract.methods.requestNGO( name, volnum, chosenIndustries).send({ from: window.contractAddress.address });
        }
    };
    

}());