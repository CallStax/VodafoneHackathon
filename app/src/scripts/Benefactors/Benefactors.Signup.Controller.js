(function(){
    'use strict';

    angular.module('Benefactors').controller('SignupController', SignupController);


    SignupController.$inject = ['$scope', 'BenefactorService', '$location', '$rootScope']

    function SignupController($scope, BenefactorService, $location, $rootScope) {
        $scope.Benefactor = {};

        $scope.requestBenefactor = function () {
			
            BenefactorService.requestBenefactor($scope.Benefactor.name, $scope.Benefactor.email, $scope.Benefactor.phone).then(function(response){
				$scope.$apply(function() { $location.path('/Benefactors/Listofrequests'); });
			}).catch(function(err){
				alert('an unexpected error occurred');
				console.log(err);
			});
        }

        $scope.TextData = {
            h2: {
                en: 'Signup Form',
                mt: 'Formola ta" Reġistrazzjoni'
            },
            p_top: {
                en: 'Please fill in this form to create an account as a benefactor',
                mt: 'Jekk jogħġbok imla din il-formola biex tissieħeb bħala benefattur'
            },
            name: {
                en: 'Name:',
                mt: 'Isem:'
            },
            surname: {
                en: 'Surname:',
                mt: 'Kunjom:'
            },
            companyName: {
                en: 'Company name:',
                mt: 'Isem tal-kumpanija:'
            },
            email: {
                en: 'Email:',
                mt: 'Indirizz elettroniku:'
            },
            telephone: {
                en: 'Telephone number:',
                mt: 'Numru tat-telefon:'
            },
            mobile: {
                en: 'Mobile number:',
                mt: 'Numru tal-mowbajl:'
            },
            service: {
                en: 'Select a service offered',
                mt: 'Għażel servizz offrut'
            },
            submit: {
                en: 'Submit',
                mt: 'Irreġistra'
            },
            cancel: {
                en: 'Cancel',
                mt: 'Ikkanċella'
            }

        };
		
		function activate(){
			if($rootScope.userType == 2){
				$location.url('/Benefactors/Listofrequests');
			}
			else if($rootScope.userType == 0){
				// guest users should have possibility to sign up
			}
			else {
				$location.url('/');
			}
		}
		
		activate();
	}
}());