petcareApp
	.service("authentication", [ 'crud' , '$q', '$rootScope', 'BASE_URL', '$auth',  '$state',
                                   
                                   function(crud, $q, $rootScope, BASE_URL, $auth,  $state) {
	
    this.login = function(userLoginData) {
    	
    	var deferred = $q.defer();
    	

    		// go koristime Satillizer $auth servisot
            $auth.login(userLoginData).then(
             	function success(response){
             	console.log('succesfully logged in');
             	console.dir(response);
             	$state.go('users', {}); // od auth vo users state
             	crud.getAuthUser(
             			function success(response){
             				// ako e se OK vrakjame avtenticiran user na kontrolerot i go zachuvuvame vo $rootScope
             				// za da go koristime niz view-a
             				console.dir(response);
	                		var user = JSON.stringify(response.user);
							localStorage.setItem('user', user);	
	                		$rootScope.authenticated = true;
	                		$rootScope.currentUser = response.user;
	               			$state.go('users');
	               			deferred.resolve(response);
             			},
             			function failure(error){
             				console.log('greshka pri avtenticiranje - vo authentication service');
             				deferred.reject(error);
             			}
             		);

            }, function failure(error){
            	console.log('error in logging in');
            	console.dir(error);
            	deferred.reject(error);
            });

			return deferred.promise;
		   	
    };
  
    
    this.logout = function(){
    	
    	var deferred = $q.defer();
    	
    	$auth.logout().then(
    		function success() {

                console.log('user logged out');
                localStorage.removeItem('user');
                $rootScope.authenticated = false;
                $rootScope.currentUser = null;
                $state.go('auth');
                deferred.resolve();
            },
            function failure(){
            	console.log('user not logged out');
            	deferred.reject();
            });

			return deferred.promise;
    };
   
 
}]);