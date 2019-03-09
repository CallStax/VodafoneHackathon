var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        template: "<h1>Main</h1>"
    })
    .when("/View1", {
        templateUrl: "Application/View1/VodafoneHackathon.View1.html",
        controller: "view1Controller"
    })
    .when("/View2", {
        templateUrl: "Application/View2/VodafoneHackathon.View2.html",
        controller: "view2Controller"
    })
    .when("/View3", {
        templateUrl: "Application/View3/VodafoneHackathon.View3.html",
        controller: "view3Controller"
    })
    .otherwise({
        template: "<h1>None</h1><p>Nothing has been selected</p>"
    });
});