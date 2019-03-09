(function(){
    'use strict';

    angular.module('Benefactors').controller('SignupController', SignupController);

    SignupController.$inject = ['$scope'];

    function SignupController($scope){
        $scope.Home = '';
    }

}());