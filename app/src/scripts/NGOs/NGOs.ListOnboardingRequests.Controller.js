(function () {
    'use strict';

    angular.module('NGOs').controller('ListOnboardingRequestsController', ListOnboardingRequestsController);

    ListOnboardingRequestsController.$inject = ['$scope'];

    function ListOnboardingRequestsController($scope) {
        $scope.BenefeciaryRequests = [{
            Date: '25-02-2019',
            ServiceNeeded: 'Food',
            Accepted: true
        },
        {
            Date: '09-03-2019',
            ServiceNeeded: 'Clothes',
            Accepted: false
        },
        {
            Date: '23-01-2019',
            ServiceNeeded: 'Food',
            Accepted: true
        }];


        $scope.BenefactorRequests = [{
            Name: 'Pama',
            Date: '25-02-2019',
            ServiceOffer: 'Food',
            Accepted: false
        },
        {
            Name: 'Smart',
            Date: '09-03-2019',
            ServiceOffer: 'Food',
            Accepted: true
        },
        {
            Name: 'Scott',
            Date: '23-01-2019',
            ServiceOffer: 'Food',
            Accepted: false
        }];
    };

}());