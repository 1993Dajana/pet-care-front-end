'use strict';
petcareApp
.config(function ($routeProvider, $httpProvider, $compileProvider,$stateProvider, $urlRouterProvider,
				  $authProvider, $injector, $provide) {

             function redirectWhenLoggedOut($q, $injector) {

                return {

                    //responseError: interceptor gets called when a previous interceptor threw an error or resolved with a rejection.
                    responseError: function(rejection) {

                        // Need to use $injector.get to bring in $state or else we get
                        // a circular dependency error
                        var $state = $injector.get('$state');

                        // Instead of checking for a status code of 400 which might be used
                        // for other reasons in Laravel, we check for the specific rejection
                        // reasons to tell us if we need to redirect to the login state
                        var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                        // Loop through each rejection reason and redirect to the login
                        // state if one is encountered
                        angular.forEach(rejectionReasons, function(value, key) {

                            if(rejection.data.error === value) {

                                // If we get a rejection corresponding to one of the reasons
                                // in our array, we know we need to authenticate the user so 
                                // we can remove the current user from local storage
                                localStorage.removeItem('user');

                                // Send the user to the auth state so they can login
                                $state.go('auth');
                            }
                        });

                        return $q.reject(rejection);
                    }
                }
            }

            // Setup for the $httpInterceptor
            $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

               // Push the new factory onto the $http interceptor array
            $httpProvider.interceptors.push('redirectWhenLoggedOut');

            // // Satellizer configuration that specifies which API
            // // route the JWT should be retrieved from
            $authProvider.loginUrl = '/api/authenticate';

            
            
            $stateProvider
            	.state('auth',{
            		url: '/welcome',
                    templateUrl: '../views/guest/welcome.html'
            	})
                .state('auth.login', {
                    url: '^/login',
                    templateUrl: '../views/guest/login.html',
                    controller: 'AuthController as auth'
                })
                .state('auth.register', {
                    url: '^/register',
                    templateUrl: '../views/guest/register.html'
                })
                .state('users', {
                    url: '/users',
                    templateUrl: '../views/users/userView.html',
                    controller: 'UserController as user'
                })
                .state('users.home', {
                    url: '^/home',
                    templateUrl: '../views/users/home.html',
                    controller: 'HomeController as home'
                });


            $urlRouterProvider.otherwise('/auth');
        
  })
.run(['$rootScope', '$http', '$state', function($rootScope, $http, $state){

  console.log('run');
    

            $rootScope.$on('$stateChangeStart', function(event, toState) {

                var user = JSON.parse(localStorage.getItem('user'));            

                if(user) {
                    // logirana sum
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = user;


                    if((toState.name === "auth") || (toState.name === "auth.login") || (toState.name === "auth.register")){
                       // ako sakame da ideme na login strana dodeka sme logirani ne ni e dozvoleno.
                        event.preventDefault();
                        $state.go('users');
                    }       
                } else {
                	// ne sum logirana
                	// logirana sum
                    $rootScope.authenticated = false;
                    $rootScope.currentUser = null;

                    if((toState.name === "users.home")
                    	|| (toState.name === "users") ) {
                       // ako sakame da ideme na login strana dodeka sme logirani ne ni e dozvoleno.
                        event.preventDefault();
                        $state.go('auth');
                    }   
                }
            });
}]);
