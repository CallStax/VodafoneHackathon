require('angular');
require('angular-route');
require('chart.js');
require('angular-chart.js');

// reference modules
require('./Home/Home.Module.js');
require('./Beneficiary/Beneficiary.Module.js');
require('./Benefactors/Benefactors.Module.js');
require('./NGOs/NGOs.Module.js');


(function(){
    'use strict';

    angular.module('app', ['ngRoute', 'chart.js', 'Home', 'Benefactors', 'Beneficiary', 'NGOs'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'Home/Home.html',
                controller: 'HomeController'
            })
            .when('/Beneficiery/Request', {
                templateUrl: 'Beneficiary/Beneficiary.Request.html',
                controller: 'RequestController'
            })
            .when('/Beneficiery/SelfImprovement', {
                templateUrl: 'Beneficiery/Beneficiery.SelfImprovement.html',
                controller: 'SelfImprovementController'
            })
            .when('/Benefactors/Signup', {
                templateUrl: 'Benefactors/Benefactors.Signup.html',
                controller: 'SignupController'
            })
            .when('/Benefactors/Scorepage', {
                templateUrl: 'Benefactors/Benefactors.Scorepage.html',
                controller: 'ScorepageController'
            })
            .when('/Benefactors/Listofrequests', {
                templateUrl: 'Benefactors/Benefactors.Listofrequests.html',
                controller: 'ListofrequestsController'
            })
            .when('/NGOs/Listofonboardingrequests', {
                templateUrl: 'NGOs/NGOs.Listofonboardingrequests.html',
                controller: 'ListofonboardingrequestsController'
            })
            .when('/NGOs/ListofBenefactorRequests', {
                templateUrl: 'NGOs/NGOs.ListofBenefactorRequests.html',
                controller: 'ListofonboardingrequestsController'
            });
    });
}());


