'use strict';
petcareApp
	.service("registration", [ 'crud' , '$q', '$rootScope', 'BASE_URL', '$auth', '$state', '$http',
                                   
                                   function(crud, $q, $rootScope, BASE_URL, $auth,  $stat, $http) {

	
	this.register = function(data){
        

        var dfd = $q.defer();
        var formData = new FormData();
        for (var key in data){
          console.log('post data - key:' + key + ' data:' + data[key]);
          formData.append(key, data[key]); 
        }
        // console.dir('data in registration service is ');
        // console.dir(data);
        $http({
          method: 'POST',
          url: BASE_URL + 'register',
          data: formData,
          transformRequest: angular.identity,
          headers: {
            'Content-Type' : undefined
          }
        }).then(function successCallback(response) {
               // console.log("success register ");
                // console.dir(response);
                dfd.resolve(response);
          }, function errorCallback(rejection) {
               // console.log("failure register");
                // console.dir(rejection);
                dfd.reject(rejection);
          });
          
          return dfd.promise;
		
		
	}
	
  
}]);