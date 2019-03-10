(function () {
    'use strict';

    angular.module('Beneficiary').controller('RequestController', RequestController);

    RequestController.$inject = ['$scope'];

    function RequestController($scope) {
        $scope.UserRequests = [
            "Supermarket",
            "Furniture",
            "Clothes",
            "Shelter"
        ];
        $scope.ChosenUserRequests = {
            selected: {}
        };

        $scope.SubmitForm = function () {
            console.log($scope.ChosenUserRequests);
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
    };

}());