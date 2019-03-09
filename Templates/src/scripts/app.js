require('angular');
require('angular-route');

// reference modules
require('./Home/Home.Module.js');


(function(){
    'use strict';

    angular.module('app', ['ngRoute','Home'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'Home/Home.html',
                controller  : 'HomeController'
            });
    });
}());
