(function () {
    'use strict';

    angular.module('Beneficiary').controller('RequestController', RequestController);

    RequestController.$inject = ['$scope'];

    function RequestController($scope) {
        $scope.UserRequests = [
            "Supermarket",
            "Furniture",
            "Clothes",
            "Shelter"
        ];
        $scope.ChosenUserRequests = {
            selected: {}
        };

        $scope.SubmitForm = function () {
            console.log($scope.ChosenUserRequests);
        };
    };

}());