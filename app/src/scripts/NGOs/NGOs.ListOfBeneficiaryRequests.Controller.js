(function () {
    'use strict';

    angular.module('NGOs').controller('ListOfBeneficiaryRequestsController', ListOfBeneficiaryRequestsController);

    ListOfBeneficiaryRequestsController.$inject = ['$scope', 'NGOsService', 'BeneficiaryService', '$location'];

    function ListOfBeneficiaryRequestsController($scope, NGOsService, BeneficiaryService, $location) {


		$scope.getBeneficiariesPendingApproval = function(){
			BeneficiaryService.getBeneficiariesPendingApproval().then(function (response) {
					var beneficiaries = response;
					
					var finalarraytooutput = [];
					
					angular.forEach(beneficiaries, function(value, key){
						finalarraytooutput.push({Id: value, ServiceNeeded: '| Food | Hygiene'});
					});
					
					finalarraytooutput[1].ServiceNeeded = '| Clothes | Food '
					
					$scope.BenefeciaryRequests = finalarraytooutput;
					
					//$scope.BenefeciaryRequests[0].ServiceNeeded = '| Food and Catering | Hygiene'
					//$scope.BenefeciaryRequests[1].ServiceNeeded = '| Food and Catering | Clothes'
			}); 
		}
		
		function activate(){
			$scope.getBeneficiariesPendingApproval();
		}
		
		activate();
    };

}());