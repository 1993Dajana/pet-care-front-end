'use strict';
petcareApp
	.service("likes", [ 'crud' , '$q', '$rootScope', 'BASE_URL', '$auth',  '$state',
                                   
                                   function(crud, $q, $rootScope, BASE_URL, $auth,  $state) {
	
    


         // NE GO KORISTIME SO SEKOJ POST ZEMAME KOMENTARI                           
        this.like = function(post_id){
            var dfd = $q.defer();
            var params = {
                id: post_id
            }
            crud.like(params,
                    function successs (response){
                        console.log('post liked');
                        console.dir(response);
                        dfd.resolve(response);
                    },
                    function failure (error){
                        console.log('error in liking a post ' + error);
                        dfd.reject(error);
                    }
                    
            );
            
            return dfd.promise;
        }

        this.unlike = function(post_id){
             var dfd = $q.defer();
            var params = {
                id: post_id
            }
            crud.unlike(params,
                    function successs (response){
                        console.log('post unliked');
                        console.dir(response);
                        dfd.resolve(response);
                    },
                    function failure (error){
                        console.log('error in unliking a post ' + error);
                        dfd.reject(error);
                    }
                    
            );
            
            return dfd.promise;
        }

       
 
}]);