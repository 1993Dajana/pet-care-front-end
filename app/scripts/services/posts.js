'use strict';
petcareApp
	.service("posts", [ 'crud' , '$q', '$rootScope', 'BASE_URL', '$auth',  '$state',
                                   
                                   function(crud, $q, $rootScope, BASE_URL, $auth,  $state) {
	
    


        this.get = function(){
            var dfd = $q.defer();
            crud.getPosts(
                    function successs (response){
                        console.log('loaded posts');
                        console.dir(response);
                        dfd.resolve(response);
                    },
                    function failure (error){
                        console.log('error in loading posts ' + error);
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
              console.log('post data - key: ' + key + ' data: ' + data[key]);
              formData.append(key, data[key]); 
            }
            // console.log('comment message is: ' +  post.message);
            // crud.data = post;
            crud.storePost(formData,    
                function successs(response){
                    console.log('post posted');
                    dfd.resolve(response);
                },
                function failure(reject){
                    console.log('post not posted');
                    dfd.reject(reject);
                });
            return dfd.promise;
        }

        this.show = function(id){
            // crud.showPost(1,
            //     function successs(response){
            //         console.log('holy moly');
            //         console.dir(response);
            //     },
            //     function failure(error){
            //         console.log(error);
            //     });
            var c = new crud();
            c.params.id = 1;
            c.$showPost(function successs(response){
                console.log('yeah');
            });
        }
 
}]);