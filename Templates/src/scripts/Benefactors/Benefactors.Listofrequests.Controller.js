(function(){
    'use strict';

    angular.module('Benefactors').controller('ListofrequestsController', ListofrequestsController);

    ListofrequestsController.$inject = ['$scope'];

    function ListofrequestsController($scope){
        $scope.Home = '';
    }

}());