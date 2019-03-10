(function(){
    'use strict';

    angular.module('Benefactors').controller('SignupController', SignupController);


    SignupController.$inject = ['$scope', 'BenefactorService']

    function SignupController($scope, BenefactorService) {
        $scope.Benefactor = {};

        $scope.sendBenefactorData = function () {
            BenefactorService.sendBenefactorData($scope.Benefactor.companyName, $scope.Benefactor.email, $scope.Benefactor.phone, $scope.Benefactor.mobile, $scope.Benefactor.service);
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
    }

}());