(function(){
    'use strict';

    angular.module('Home').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController($scope){
        $scope.Home = '';
    }

}());