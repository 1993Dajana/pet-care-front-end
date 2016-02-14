'use strict';
petcareApp
.config(function ($routeProvider, $httpProvider, $compileProvider,$stateProvider, $urlRouterProvider,
				  $authProvider, $injector, $provide) {
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            // $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|skype):/);
$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob|skype|mailto):|data:image\//);



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
                            if(rejection.data != null){
                                if(rejection.data.error === value) {    // greshka rejection.data.error ?

                                    // If we get a rejection corresponding to one of the reasons
                                    // in our array, we know we need to authenticate the user so 
                                    // we can remove the current user from local storage
                                    localStorage.removeItem('user');

                                    // Send the user to the auth state so they can login
                                    $state.go('auth');
                                }    
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
                    controller: 'AuthController as auth',
                     css:  ['bower_components/bootstrap/dist/css/bootstrap.css',
                           'bower_components/font-awesome/css/font-awesome.css',
                           'dist/css/animate.min.css',
                           'styles/custom.css',
                           'styles/green.css']
                })
                .state('auth.register', {
                    url: '^/register',
                    templateUrl: '../views/guest/register.html',
                    controller: 'RegisterController',
                    css:  ['bower_components/bootstrap/dist/css/bootstrap.css',
                           'bower_components/font-awesome/css/font-awesome.css',
                           'dist/css/animate.min.css',
                           'styles/custom.css',
                           'styles/green.css']
                })
                .state('users', {
                    url: '/home',
                    templateUrl: '../views/users/home.html',
                    css: ['bootstrap/css/bootstrap.min.css',
                          'bower_components/font-awesome/css/font-awesome.css',
                          'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
                          'dist/css/AdminLTE.css',
                          'dist/css/skins/_all-skins.min.css',
                          'dist/css/AdminLTE.min.css',
                          'styles/home.css',
                          'dist/css/buttonsUnicorn.css']
                })
                .state('users.profile',{
                  url:'^/profile',
                  templateUrl: '../views/users/profile.html',
                     css: ['bootstrap/css/bootstrap.min.css',
                          'bower_components/font-awesome/css/font-awesome.css',
                          'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
                          'dist/css/AdminLTE.css',
                          'dist/css/skins/_all-skins.min.css',
                          'styles/home.css',
                          'dist/css/AdminLTE.min.css']
                });

            // $urlRouterProvider.otherwise('/auth'); // SEGA ZA SEGA FIX DODEKA SREDUVAME DIZAJN
  })
.run(['$rootScope', '$http', '$state', function($rootScope, $http, $state){

  console.log('run');
  

            $rootScope.$on('$stateChangeStart', function(event, toState) {

                var user = JSON.parse(localStorage.getItem('user'));            

                if(user) {
                    // logirana sum
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = user;
                    // console.log('current user is');
                    // console.dir($rootScope.currentUser);  

                    if((toState.name === "auth") || (toState.name === "auth.login") || (toState.name === "auth.register")){
                       // ako sakame da ideme na login strana dodeka sme logirani ne ni e dozvoleno.
                       console.log(toState.name + ' avtenticirani ama sakam na login');
                        event.preventDefault();
                        $state.go('users');
                    }       
                } else {
                	// ne sum logirana
                	// logirana sum
                    $rootScope.authenticated = false;
                    $rootScope.currentUser = null;

                    if((toState.name === "users.home") || (toState.name === "users")) {
                       // ako sakame da ideme na login strana dodeka sme logirani ne ni e dozvoleno.
                       console.log(toState.name + ' guest ama sakam home');
                        event.preventDefault();
                        $state.go('auth');
                    }   
                }
            });
}]);
