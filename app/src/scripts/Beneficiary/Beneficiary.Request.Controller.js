(function () {
    'use strict';

    angular.module('Beneficiary').controller('RequestController', RequestController);

    RequestController.$inject = ['$scope', 'IndustryService', 'BeneficiaryService', '$location', '$rootScope'];

    function RequestController($scope, IndustryService, BeneficiaryService, $location, $rootScope) {
       
        $scope.ChosenIndustries = [];

        $scope.UpdatePreferences = function () {
			let industries = $scope.ChosenIndustries.filter(function(element){
				return element !== false;
			});
						
            BeneficiaryService.updateBeneficiaryIndustries(industries).then(function(result){
                
				alert('Registration successful! You will soon be contacted by a member of an NGO.');                
				
				$rootScope.userType = 4;
				
				$scope.$apply(function() {$location.path('/');});
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

        $scope.GetIndustry = function(industryId){
            IndustryService.getIndustry(industryId).then(function(result){
                $scope.$apply(function(){
					result.Id = industryId;
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
		
		
		$scope.GetSelectedIndustries = function(){
			BeneficiaryService.getBeneficiaryIndustries().then(function(result){
				$scope.$apply(function(){
					$scope.ChosenIndustries = result;
				});
			});
		
		}
		
        function activate(){
            $scope.GetIndustries();
			$scope.GetSelectedIndustries();
        }

        activate();
    }

}());