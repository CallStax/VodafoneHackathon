(function () {
    'use strict';

    angular.module('NGOs').controller('NGOsHomeController', NGOsHomeController);

    NGOsHomeController.$inject = ['$scope', '$rootScope', 'NGOsService', '$location'];

    function NGOsHomeController($scope, $rootScope, NGOsService, $location) {
        $scope.NGO = {};
        // $scope.TextData = 
            // {
                // par_1: {
                    // en: 'NGO\'s play a vital role in providing social justice services. <b>Ghajnu.na</b> makes their operation easier by fostering collaboration with full transparency, while ensuring that privacy is safeguarded as much as possible.',
                    // mt: 'l-NGOs ghandhom rwol importanti fil-qasam tal-gustizzja socjali. <b>Ghajnu.na</b> taghmel il-hajja iktar facli billi tippromwovi iktar kollaborazzjoni bi trasparenza, filwaqt li tassikura li il-privatezza tal-benefikant hija imharsa bl-ahjar mod possibli.'
                // },
				// par_2: {
					// en: 'To Sign up, click the Register button below, where one of our leading NGOs will reach out to onboard you and explain how we can make a greater impact together',
					// mt: 'Biex tissieheb fuq il-pjattaforma, ghafas \'Irregistra\' hawn isfel, fejn wahda mill NGOs li tmexxi is-sitema tkun tista tikkuntatjak biex tispjega il-process ta kif nistghu naghmel differenza ikbar flimkien'
				// }
			// };

        $scope.registerNgo = function () {
            NGOsService.requestNGO($scope.NGO.name, $scope.NGO.volNum).then(function(response){
				$scope.$apply(function() {
					$location.path('/NGOs/ListOnboardingRequests');
				});
			}).catch(function(err){					
				alert('an unexpected error occurred');
				console.log(err);
			});
        }
		
		function activate(){
			if($rootScope.userType == 1){
				$location.path('/NGOs/ListofBeneficiaryRequests');
			}
			else if($rootScope.userType == 0){
				console.log('b');
				// guest users should have possibility to sign up
			}
			else {
				console.log('c');
				$location.url('/');
			}
		}
		
		activate();
        
    };

}());