(function(){
    'use strict';

    angular.module('Course').service('CourseService', CourseService);

    CourseService.$inject = [];

    function CourseService(){
        return {
            getCourses: getCourses,
            enrollInCourse: enrollInCourse,
            setupSampleCourses: setupSampleCourses
        }
        
        async function getCourses() {
            var result = await window.getInstance();
			return result.ghajnunaContract.methods.getCourses().call();
		}
        
        async function enrollInCourse(beneficiaryAddress, course) {
            var result = await window.getInstance();
			await result.ghajnunaContract.methods.enrollInCourse(beneficiaryAddress, course).send({ from: result.accounts[0] });		 
        }
        
        async function setupSampleCourses(){
            var result = await window.getInstance();
            await result.ghajnunaContract.methods.registerCourse('Maltese', 'Learn Fundamental Maltese').send({from: result.accounts[0]});
        }
    }

}());