(function(){
    'use strict';

    angular.module('NGOs').service('NGOsService', NGOsService);

    NGOsService.$inject = [];

    function NGOsService(){
        return {
            getData: getData
        }

        function getData(){
            // web3 code goes here
            console.log('TEST!')
        }
    }

}());