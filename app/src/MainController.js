(function(){
    'use strict';

    angular.module('app').controller('MainController', MainController);

    MainController.$inject = ['$scope', '$rootScope'];

    function MainController($scope, $rootScope) {		

		$rootScope.language = 'en';
			
		$scope.setLanguage = function(lang){
			$rootScope.language = lang;				
		}
    };      


}());