(function(){
    'use strict';

    angular.module('User').service('UserService', UserService);

    UserService.$inject = [];

    function UserService(){
        return {
            getUserType: getUserType
        }
        
        async function getUserType() {
            var result = await window.getInstance();
			return result.ghajnunaContract.methods.getUserType().call({ from: result.accounts[0]});
		}
    }

}());