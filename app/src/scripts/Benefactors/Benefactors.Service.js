(function(){
    'use strict';

    angular.module('Benefactors').service('BenefactorService', BenefactorService);

    BenefactorService.$inject = [];

    function BenefactorService() {
        return {
            registerBenefactor: registerBenefactor,
            getRequests: getRequests,
            getScore: getScore
        }

        async function registerBenefactor(companyName, email, phone, mobile, chosenIndustries) {
            var requests = await window.getInstance();
            requests.ghajnunaContract.methods.registerBenefactor({ companyName, email, phone, mobile, chosenIndustries }).send({ from: window.contractAddress.address });
        }

        async function getRequests() {
            var requests = await window.getInstance();
            return requests.ghajnunaContract.methods.getListofRequests().call();
        }

        async function getScore() {
            var requests = await window.getInstance();
            return requests.ghajnunaContract.methods.getScore().call();
        }
    }

}());