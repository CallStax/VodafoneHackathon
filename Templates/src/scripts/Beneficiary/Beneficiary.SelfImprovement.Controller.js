(function () {
    'use strict';

    angular.module('Beneficiary').controller('SelfImprovementController', SelfImprovementController);

    SelfImprovementController.$inject = ['$scope'];

    function SelfImprovementController($scope) {
        $scope.AvailableCourses = [
            "Course 1",
            "Course 2",
            "Course 3",
            "Course 4"
        ];
    }

}());