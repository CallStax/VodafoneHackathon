require('angular');
require('angular-route');

// reference modules
require('./Home/Home.Module.js');
require('./Beneficiery/Beneficiery.Module.js');


(function(){
    'use strict';

    angular.module('app', ['ngRoute','Home', 'Beneficiery'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'Home/Home.html',
                controller: 'HomeController'
            })
            .when('/Beneficiery/Request', {
                templateUrl: 'Beneficiery/Beneficiery.Request.html',
                controller: 'RequestController'
            })
            .when('/Beneficiery/SelfImprovement', {
                templateUrl: 'Beneficiery/Beneficiery.SelfImprovement.html',
                controller: 'SelfImprovementController'
            });
    });
}());
