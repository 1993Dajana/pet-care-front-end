'use strict';
petcareApp
  .controller('CommentController', ['$scope','$rootScope', 'comments',
                                         function($scope, $rootScope, comments) {
	
	
	/* variables */

  
  /* variables */
                                         	


  /* methods */
      
        $scope.getComments = function(post_id){


        }


        $scope.comment = function(){

            console.log('post: ' + $scope.post);
            $scope.comment.post_id = post_id;
            comments.store($scope.comment).then(
                function success(response){

                }
            );
        }

	/* methods */

}]);
