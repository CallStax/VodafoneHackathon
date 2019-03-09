(function(){
    'use strict';

    angular.module('Benefactors').controller('ListofrequestsController', ListofrequestsController);

    ListofrequestsController.$inject = ['$scope'];

    function ListofrequestsController($scope) {
        $scope.requestList = [{
            Description: 'I want food',
            NGO: 'Millenium Chapel',
            Contribute: null
        },
        {
            Description: 'I want money',
            NGO: 'Charitas',
            Contribute: null
        }];

        $scope.selectedRequests = [];

        $scope.contribute = function (el) {
            $scope.selectedRequests.push(el);           
        };
    };      


}());