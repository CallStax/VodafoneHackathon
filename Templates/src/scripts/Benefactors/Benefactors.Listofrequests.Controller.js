(function(){
    'use strict';

    angular.module('Benefactors').controller('ListofrequestsController', ListofrequestsController);

    ListofrequestsController.$inject = ['$scope'];

    $scope.TextData = {
        h2: {
            en: 'List of Requests',
            mt: 'Lista ta\' Talbiet'
        },
        th1: {
            en: 'Description',
            mt: 'Deskrizzjoni'
        },
        th2: {
            en: 'NGO',
            mt: 'NGO'
        },
        th3: {
            en: 'Contribute',
            mt: 'Jikkontribwixxu'
        },
        button: {
            en: 'Provide',
            mt: 'Ipprovdi'
        }
    };

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