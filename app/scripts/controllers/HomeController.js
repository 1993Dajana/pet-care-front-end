'use strict';
petcareApp
  .controller('HomeController', ['$scope','$rootScope', 'posts',
                                         function($scope, $rootScope, posts) {
	
	
	/* variables */

  
  var daysWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  var daysMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  

  $scope.gPlace; /* changed location - google place */
  /* variables */
                                         	


  /* methods */
      var initStuff = function(){
        $scope.addressShow = "";
        $scope.showType = "";
        $scope.showLocation = false;
        $scope.showContact = true; /* ako go zemame samo kontakt brojot od korisnikot togash nema potreba */
        /* mozhe predefinirano da si stoi brojot na korisnikot i ako saka da go apdejtira da go napravi toa */
        $scope.showType = false;
        $scope.showImage = false;
        $scope.toAddLocation = false;
        $scope.toAddType = false;
        $scope.showLocation = false;
        $scope.flagsLike = [];
      }

       $scope.getPosts = function(){

       		posts.get().then(
       			function success(response){
       				$scope.posts = response.posts;
              initStuff();
       			},
       			function failure(rejection){
       				
       			}
       		);
       }	

       $scope.convertTimestampToDate = function(timestamp) {
          var date = new Date(timestamp);
          var year = date.getYear();
          var month = date.getMonth();
          var day = date.getDay();
          var daynum = date.getDate();        
          return daysWeek[day - 1] + ", " + daynum + " " + daysMonth[month - 1] + " " + year;

       };
	     
       $scope.convertTImestampToTime = function(timestamp){
          var date = new Date(timestamp);
          var hours = date.getHours();
          var minutes = date.getMinutes(); 
          return hours + ":" + minutes;
       }

       $scope.addLocation = function() {
          if (!$scope.toAddLocation) {
            $scope.toAddContactPhone = false;
            $scope.toAddType = false;
          }
          $scope.toAddLocation = !$scope.toAddLocation;
       }
       
       $scope.post = function(){
         console.log('pred da pratime razgleduvame post');
         console.dir($scope.post);
         // console.log($scope.longitude);
         posts.store($scope.post).then(
            function success(response){
              // do stuff
            }
         );
       }

       $scope.showPost = function(id){
             posts.show(id);
       }
	/* methods */

}]);
