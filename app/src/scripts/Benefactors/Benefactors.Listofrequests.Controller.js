(function(){
    'use strict';

    angular.module('Benefactors').controller('ListofrequestsController', ListofrequestsController);
    
    ListofrequestsController.$inject = ['$scope', 'BenefactorService'];

    function ListofrequestsController($scope, BenefactorService) {

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
	
        BenefactorService.getRequests().then(function (response) {
            $scope.$apply(function () {
                $scope.requestList = response;
                console.log(response);
            });
        });

        $scope.selectedRequests = [];

        $scope.contribute = function (el) {
            $scope.selectedRequests.push(el);           
        };
    };      


}());