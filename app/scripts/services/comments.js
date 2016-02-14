'use strict';
petcareApp
	.service("comments", [ 'crud' , '$q', '$rootScope', 'BASE_URL', '$auth',  '$state',
                                   
                                   function(crud, $q, $rootScope, BASE_URL, $auth,  $state) {
	
    


         // NE GO KORISTIME SO SEKOJ POST ZEMAME KOMENTARI                           
        this.get = function(post_id){
            var dfd = $q.defer();
            var params = {
                id: post_id
            }
            crud.getComments(params,
                    function successs (response){
                        console.log('loaded comments');
                        console.dir(response);
                        dfd.resolve(response);
                    },
                    function failure (error){
                        console.log('error in loading comments ' + error);
                        dfd.reject(error);
                    }
                    
            );
            
            return dfd.promise;
        }

        this.store = function(data){
            var dfd = $q.defer();
            /* with utf-8 message transfer encoding 
            new String (s.getBytes ("iso-8859-1"), "UTF-8");
            $scope.comment.message = ($scope.comment.message.getBytes("iso-8859-1"), "UTF-8");*/
            var formData = new FormData();
            for (var key in data){
              console.log('post data - key:' + key + ' data: ' + data[key]);
              formData.append(key, data[key]); 
            }
            // console.log('comment message is: ' +  post.message);
            // crud.data = post;
            crud.comment(formData,    
                function successs(response){
                    console.log('comment posted');
                    dfd.resolve(response);
                },
                function failure(reject){
                    console.log('comment not posted');
                    dfd.reject(reject);
                });
            return dfd.promise;
        }

       
 
}]);