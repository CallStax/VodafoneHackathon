require('angular');
require('angular-route');

// reference modules
require('./Home/Home.Module.js');
require('./Benefactors/Signup.Module.js');
require('./Benefactors/Listofrequests.Module.js');


(function(){
    'use strict';

    angular.module('app', ['ngRoute', 'Home', 'Signup', 'ListofRequests'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider

            // route for the home page
            .when('/Test', {
                templateUrl : 'Home/Home.html',
                controller  : 'HomeController'
            })
            .when('/Benefactors/Signup', {
                templateUrl: 'Benefactors/Signup.html',
                controller: 'SignupController'
            })
            .when('/Benefactors/ListofRequests', {
                templateUrl: 'Benefactors/ListofRequests.html',
                controller: 'ListofrequestsController'
            });
            
    });
}());
