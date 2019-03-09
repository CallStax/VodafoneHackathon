(function(){
    'use strict';

    angular.module('Signup').controller('SignupController', SignupController);

    SignupController.$inject = ['$scope'];

    function SignupController($scope){
        $scope.Home = '';
    }

}());