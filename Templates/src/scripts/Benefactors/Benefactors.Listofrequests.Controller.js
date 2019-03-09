(function(){
    'use strict';

    angular.module('Listofrequests').controller('ListofrequestsController', ListofrequestsController);

    ListofrequestsController.$inject = ['$scope'];

    function ListofrequestsController($scope){
        $scope.Home = '';
    }

}());