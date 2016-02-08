petcareApp
	.service("registration", [ 'crud' , '$q', '$rootScope', 'BASE_URL', '$auth', '$state',
                                   
                                   function(crud, $q, $rootScope, BASE_URL, $auth,  $state) {

	
	this.register = function(data){

		var dfd = $q.defer();
		registerService.register(uploadUrl, data).then(
				function success(response){
					/**/
					console.log('im registered in ' + response);
					dfd.resolve(response);
				},
				function failure(error){
					console.log('failure during registration');
				
					dfd.reject(error);
				}
			
		);
		
		return dfd.promise;
	}
	
  
}]);