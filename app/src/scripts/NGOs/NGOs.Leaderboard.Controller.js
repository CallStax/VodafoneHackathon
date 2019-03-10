(function(){
    'use strict';

    angular.module('NGOs').controller('NGOsLeaderboardController', NGOsLeaderboardController);

    NGOsLeaderboardController.$inject = ['$scope', 'NGOsService'];

    function NGOsLeaderboardController($scope, NGOsService){
        $scope.NGOs = 'Test';

        $scope.labels = ["Food", "Appliances", "Clothes", "Cleanliness"];
        $scope.data = [300, 40, 100, 210];
    }

}());