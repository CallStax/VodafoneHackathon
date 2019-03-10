(function(){
    'use strict';

    angular.module('app').controller('MainController', MainController);

    MainController.$inject = ['$scope', '$rootScope', 'UserService'];

    function MainController($scope, $rootScope, UserService) {		

		$rootScope.language = 'en';
			
		  $scope.setLanguage = function(lang){
        $rootScope.language = lang;				
      }

      window.ethereum.on('accountsChanged', function (accounts) {
        UserService.getUserType().then(function(result){
          $rootScope.userType = result;
        });
        
      })
    };      


}());