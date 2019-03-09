(function(){
    'use strict';

    angular.module('Benefactors').controller('ScorepageController', ScorepageController);

    ScorepageController.$inject = ['$scope'];

    $scope.TextData = {
        h2: {
            en: 'Score page',
            mt: 'Punteġġ'
        },
        p: {
            en: 'Percentage contribution',
            mt: 'Konċentrazzjoni perċentwali'
        }
    };

    function ScorepageController($scope){
        $scope.Home = '';
    }

}());