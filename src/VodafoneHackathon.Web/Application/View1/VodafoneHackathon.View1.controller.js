// JavaScript source code
var myApp = angular.module('myApp', []);

myApp.controller('GetGreeting1', ['$scope', function ($scope) {
    $scope.greeting1 = 'Hello!';
}]);