(function () {
    'use strict';

    angular.module('Beneficiary').controller('RequestController', RequestController);

    RequestController.$inject = ['$scope', 'IndustryService', 'BeneficiaryService', '$location'];

    function RequestController($scope, IndustryService, BeneficiaryService, $location) {
       
        $scope.ChosenIndustries = [];

        $scope.SubmitForm = function () {
            BeneficiaryService.registerBeneficiary($scope.ChosenIndustries).then(function(result){
                alert('Registration successful! You will soon be contacted by a member of an NGO.');                
            });
            $location.path('/');
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

        $scope.GetIndustry = function(industryId){
            IndustryService.getIndustry(industryId).then(function(result){
                $scope.$apply(function(){
                    $scope.Industries.push(result);
                });
            });
        }

        $scope.GetIndustries = function(){
            IndustryService.getIndustries().then(function(result){
                $scope.Industries = [];
                angular.forEach(result, function(item){
                    $scope.GetIndustry(item);
                });
            });
        }

        function activate(){
            $scope.GetIndustries();
        }

        activate();
    };

}());