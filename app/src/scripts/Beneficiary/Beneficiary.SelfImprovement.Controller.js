(function () {
    'use strict';

    angular.module('Course').controller('SelfImprovementController', SelfImprovementController);

    SelfImprovementController.$inject = ['$scope', 'CourseService'];

    function SelfImprovementController($scope, CourseService) {
        $scope.AvailableCourses = [
            "Course 1",
            "Course 2",
            "Course 3",
            "Course 4"
        ];

        $scope.GetAllCourses = function(){
            CourseService.getCourses().then(function(result){
                $scope.AvailableCourses = result;
            });
        }

        $scope.EnrollInCourse = function(course){
            CourseService.enrollInCourse(window.contractAddress.address, course).then(function(result){
                if(result){
                    alert('Registration successful! You will soon be contacted by a member of an NGO.');
                }
                else {
                    alert('An error occurred! Please contact system administrator if issue persists');
                }
            });
        }

        function activate(){
            $scope.GetAllCourses();
        }

        activate();
    }

}());