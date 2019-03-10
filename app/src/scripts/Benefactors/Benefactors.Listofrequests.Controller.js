(function(){
    'use strict';

    angular.module('Benefactors').controller('ListofrequestsController', ListofrequestsController);
    
    ListofrequestsController.$inject = ['$scope', '$rootScope', '$location', 'BenefactorService', 'IndustryService', 'BeneficiaryService' ,'NGOsService'];

    function ListofrequestsController($scope, $rootScope, $location, BenefactorService, IndustryService, BeneficiaryService, NGOsService) {

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

        $scope.selectedRequests = [];

        $scope.contribute = function (el) {
            $scope.selectedRequests.push(el);           
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
		
		        
		$scope.ChosenIndustries = [];

        $scope.UpdatePreferences = function () {
			var industries = $scope.ChosenIndustries.filter(function(element){
				return element !== false;
			});
						
            BenefactorService.benefactorChosenIndustries(industries).then(function(result){
                
				alert('Registration successful! You will soon be contacted by a member of an NGO.');                
								
				$scope.$apply(function() {$location.path('/');});
            });
        };
		
		
		$scope.GetSelectedIndustries = function(){
			BenefactorService.getBenefactorIndustries().then(function(result){
				$scope.$apply(function(){
					$scope.ChosenIndustries = result;
				});
			});		
		}
		
		$scope.RequestList = [];
		$scope.GetBeneficiaryDetails = function(beneficiaryId){
            BeneficiaryService.getBeneficiaryDetails(beneficiaryId).then(function(result){
                $scope.$apply(function(){
					result.Id = beneficiaryId;
					result.Industries = '';
                    $scope.RequestList.push(result);
					angular.forEach(result[1], function(industryId){
						IndustryService.getIndustry(industryId).then(function(industry){
							$scope.$apply(function(){
								if(industry[1]){
									result.Industries += ' | ' + industry[1]; 	
								}								
							});
						});
					});
										
					NGOsService.getNGO(result[4][0]).then(function(ngo){
						$scope.$apply(function(){
							result.NGO = ngo[1];
						});
					});
                });
            });
        }
		
		$scope.GetBeneficiariesApprovedByNGO = function(){
			BeneficiaryService.getBeneficiariesApprovedByNGO().then(function(result){
				angular.forEach(result, function(beneficiary){
					$scope.GetBeneficiaryDetails(beneficiary);
				});
			});
		}

        function activate(){
			if($rootScope.userType != 2){
				$location.url('/');
			}
			else {
				$scope.GetIndustries();				
				$scope.GetSelectedIndustries();	
				$scope.GetBeneficiariesApprovedByNGO();
			}
        }
		activate();		
    }
}());