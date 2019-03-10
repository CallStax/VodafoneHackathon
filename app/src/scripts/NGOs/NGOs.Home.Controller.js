(function () {
    'use strict';

    angular.module('NGOs').controller('NGOsHomeController', NGOsHomeController);

    NGOsHomeController.$inject = ['$scope', 'NGOsService'];

    function NGOsHomeController($scope, NGOsService) {
		console.log(NGOsService);
		
		NGOsService.getNGOs().then(function(response){
			$scope.$apply(function() {
				$scope.NGOs = response;
				console.log(response);
			});
		});
			
		
		//const test = await window.ghajnunaContract.methods.allNGOs().call();

		//console.log(test);
  
        
    };

}());