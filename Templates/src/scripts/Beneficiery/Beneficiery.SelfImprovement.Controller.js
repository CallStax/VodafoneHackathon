(function(){
    'use strict';

    angular.module('Beneficiery').controller('SelfImprovementController', SelfImprovementController);

    SelfImprovementController.$inject = ['$scope'];

    function SelfImprovementController($scope){
        $scope.Home = '';

        $scope.Web3 = new Web3(
            new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
        );
        console.log($scope.Web3.eth.accounts);
    }

}());