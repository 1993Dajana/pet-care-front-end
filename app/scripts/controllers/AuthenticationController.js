'use strict';
petcareApp
  .controller('AuthController', ['$scope','authentication', '$location', '$rootScope', 
                                         function($scope, authentication, $location, $rootScope) {
	
	
	
	$scope.login = function() {	
		
		
		authentication.login($scope.user).then(	
				function success(data){
					console.log('success controller: ', data);
				},
				function error(err){
					console.log('error: ', err);
				});
	};
	

	
    $scope.logout = function() {	
		
	
		
		authentication.logout().then(
				
				function success(){
					console.log('successfully logged out controller');
				},
				function error(){
					console.log('unsuccessfully logged out controller');
				});
		
		
	};

	
	
	
	
}]);
