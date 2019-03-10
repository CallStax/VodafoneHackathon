(function(){
    'use strict';

    angular.module('app').controller('MainController', MainController);

    MainController.$inject = ['$scope', '$rootScope', 'UserService'];

    function MainController($scope, $rootScope, UserService) {		

		$rootScope.language = 'en';
			
		  $scope.setLanguage = function(lang){
        $rootScope.language = lang;				
      }

	  window.onload = function(){
        UserService.getUserType().then(function(result){
          $scope.$apply(function() {$rootScope.userType = result;});
		  console.log('User Changed!', $rootScope.userType);
        });
	  }
	  
      window.ethereum.on('accountsChanged', function (accounts) {
        UserService.getUserType().then(function(result){
          $scope.$apply(function() {$rootScope.userType = result;});
		  console.log('User Changed!', $rootScope.userType);
        });
      });  
	  
    };     


}());