(function () {
    'use strict';

    angular.module('NGOs').controller('ListOnboardingRequestsController', ListOnboardingRequestsController);

    ListOnboardingRequestsController.$inject = ['$scope', 'NGOsService'];

    function ListOnboardingRequestsController($scope, NGOsService) {
        
        NGOsService.getNGOApprovalsForBeneficiaries().then(function (response) {
            $scope.$apply(function () {
                $scope.BenefeciaryRequests = response;
                console.log(response);
            });
        }); 

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