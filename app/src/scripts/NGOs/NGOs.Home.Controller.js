(function () {
    'use strict';

    angular.module('NGOs').controller('NGOsHomeController', NGOsHomeController);

    NGOsHomeController.$inject = ['$scope', 'NGOsService'];

    function NGOsHomeController($scope, NGOsService) {
		console.log(NGOsService);

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
            console.log($scope.Benefactor.name);
			//TODO: Register NGO
            //NGOsService.sendBenefactorData($scope.Benefactor.name, $scope.Benefactor.email, $scope.Benefactor.phone, $scope.Benefactor.mobile, $scope.Benefactor.service);
        }
		
		NGOsService.getNGOs().then(function(response){
			$scope.$apply(function() {
				$scope.NGOs = response;
				console.log(response);
			});
		}); 
        
    };

}());