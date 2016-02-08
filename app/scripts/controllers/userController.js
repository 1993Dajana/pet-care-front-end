// public/scripts/userController.js

(function() {

    'use strict';

    angular
        .module('petCareFrontEndApp')
        .controller('UserController', UserController);  

    function UserController($http, BASE_URL, $rootScope, $auth, $state) {

        var vm = this;
        
        vm.users;
        vm.error;

        vm.getUsers = function() {

            // This request will hit the index method in the AuthenticateController
            // on the Laravel side and will return the list of users
            $http.get(BASE_URL + 'authenticate').success(function(users) {
                console.log('sum avtenticiran i mozham da zemam users ' );
                console.dir(users);
                vm.users = users;
               
                return $http.get(BASE_URL + 'authenticate/user');
            }).error(function(error) {
                console.log('ne sum avtenticiran i ne mozham da zemam users ');
                console.dir(error);
                vm.error = error;
            })
        }



        // We would normally put the logout method in the same
        // spot as the login method, ideall y extracted out into
        // a service. For this simpler example we'll leave it here
        //// Use Satellizer's $auth service to logout
        vm.logout = function() {

            $auth.logout().then(function() {

                console.log('user logged out');
                // Remove the authenticated user from local storage
                localStorage.removeItem('user');

                // Flip authenticated to false so that we no longer
                // show UI elements dependant on the user being logged in
                $rootScope.authenticated = false;

                // Remove the current user info from rootscope
                $rootScope.currentUser = null;

                $state.go('auth');
            });
        }
    }
    
})();