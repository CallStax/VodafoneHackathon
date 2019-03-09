(function(){
    'use strict';

    angular.module('Scorepage').controller('ScorepageController', ScorepageController);

    ScorepageController.$inject = ['$scope'];

    function ScorepageController($scope){
        $scope.Home = '';
    }

}());