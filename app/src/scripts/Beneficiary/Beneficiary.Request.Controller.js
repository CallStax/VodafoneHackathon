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
		
        $scope.TextData = 
            {
                title: {
                    en: 'Request Service',
                    mt: 'Servizzi'
                },
                heading: {
                    en: 'Select the type of help you need',
                    mt: 'Ghazel it-tip ta ghajnuna li ghandek bzonn'
                },
                reset: {
                    en: 'Reset',
                    mt: 'Erga Ibda'
                },
                submit: {
                    en: 'Submit',
                    mt: 'Kompli'
                },
                text_placeholder: {
                    en: 'Please provide further details here...',
                    mt: 'Jekk jghogbok itfa iktar dettall hawnhekk...'
                }
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