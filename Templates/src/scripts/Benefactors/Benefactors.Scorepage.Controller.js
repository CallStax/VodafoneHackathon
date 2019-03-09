(function(){
    'use strict';

    angular.module('Benefactors').controller('ScorepageController', ScorepageController);

    ScorepageController.$inject = ['$scope'];

    function ScorepageController($scope){
        $scope.Home = '';
    }

}());