(function () {
    'use strict';

    angular.module('Beneficiary').controller('RequestController', RequestController);

    RequestController.$inject = ['$scope', 'IndustryService', 'BeneficiaryService'];

    function RequestController($scope, IndustryService, BeneficiaryService) {
       
        $scope.ChosenIndustries = {
            selected: {}
        };

        $scope.SubmitForm = function () {
            BeneficiaryService.registerBeneficiary(window.contractAddress.address, $scope.ChosenIndustries).then(function(result){
                if(result){
                    alert('Registration successful! You will soon be contacted by a member of an NGO.');
                }
                else {
                    alert('An error occurred! Please contact system administrator if issue persists');
                }
            });
        };

        $scope.GetIndustries = function(){
            IndustryService.getIndustries().then(function(result){
                $scope.Industries = result;
            });
        }

        function activate(){
            $scope.GetIndustries();
        }

        activate();
    };

}());