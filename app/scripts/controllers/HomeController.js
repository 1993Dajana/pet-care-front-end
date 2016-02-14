'use strict';
petcareApp
  .controller('HomeController', ['$scope','$rootScope', 'posts', 'comments', 'likes',
                                         function($scope, $rootScope, posts, comments, likes) {
	
	
	/* variables */

  
  var daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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
        $scope.post.type = "injured"; 
      }

      var clearPostSection = function(){
        initStuff();
        $scope.post = [];
      }

      var clearCommentSection = function(){
        initStuff();
        $scope.comment = [];
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
          // console.log('day is ' + day);
          var daynum = date.getDate();        
          // console.log('year is '  + year);
          var yearMod = year - 100 + 2000;
          return daysWeek[day] + ", " + daynum + " " + daysMonth[month] + " " + yearMod;

       };
	     
       $scope.convertTimestampToTime = function(timestamp){
          var date = new Date(timestamp);
          var hours = date.getHours();
          var minutes = date.getMinutes(); 
          // console.log('minutes');
          if(minutes < 10){
            if(hours < 10){
              return "0" + hours + ":0" + minutes;
            }
            return hours + ":0" + minutes;
          }

          if(hours < 10){
             return "0" + hours + ":" + minutes;
          }
          return hours + ":" + minutes;
       }

       $scope.addLocation = function() {
          // if (!$scope.toAddLocation) {
          //   $scope.toAddContactPhone = false;
          //   $scope.toAddType = false;
          // }
          $scope.showLocation = false;
          $scope.toAddLocation = !$scope.toAddLocation;
       }
       
       $scope.post = function(){
         console.log('pred da pratime razgleduvame post');
         console.dir($scope.post);
         // console.log($scope.longitude);
         posts.store($scope.post).then(
            function success(response){
              // do stuff
              $scope.getPosts();
              clearPostSection();
            }
         );
       }

       $scope.showPost = function(id){
             posts.show(id);
       }


        $scope.comment = function(post_id){

            console.log('post: ');
            console.log(post_id);
            $scope.comment.post_id = post_id;
            comments.store($scope.comment).then(
                function success(response){
                  $scope.getPosts();
                  clearCommentSection();
                }
            );
        }

        $scope.heartIt = function(post_id, index, liked){
          console.log('post_id is ' + post_id);
          console.log('index is ' + index);
          console.log('liked ' + liked);
            if(liked == true){
              unlike(post_id, index);
            } else {
              like(post_id, index);
            }
        }

        var like = function(post_id, index){

           console.log('like:');
           
           likes.like(post_id).then(
              function success(response){
                $('#post-' + index).attr('class','fa fa-heart pull-right');  // polno srce :)
                $scope.posts[index].liked = true;
                $scope.posts[index].nLikes++;
              }
            );
        }

        var unlike = function(post_id, index){

          console.log('unlike');
            likes.unlike(post_id).then(
                function success(response){
                  $('#post-' + index).attr('class','fa fa-heart-o pull-right');  // prazno srce :(
                    $scope.posts[index].liked = false;
                    if($scope.posts[index].nLikes > 0){
                      $scope.posts[index].nLikes--;
                    }
                }
              );
        }

        // dali da bide prazno ili polno srce :)
        $scope.getLikeClass = function(liked){
            if(liked == true){
              return 'fa fa-heart pull-right'; 
            } else {
              return 'fa fa-heart-o pull-right';
            }
        }

        $scope.sell = function() {
          $scope.showType = "sell";
          $scope.post.type = "sell"; 
        }

        $scope.adopt = function() {
          $scope.showType = "adopt";
          $scope.post.type = "adopt"; 
        }

        $scope.lost = function() {
          $scope.showType = "lost";
          $scope.post.type = "lost";
        }
        
        $scope.found = function() {
          $scope.showType = "found";
          $scope.post.type = "found"; 
        }
        
        
        $scope.injured = function() {
          $scope.showType = "injured";
          $scope.post.type = "injured"; 
        }


        /* prikaz na slikata */
        var handleFileSelect = function(evt) {
        console.log('handleFileSelect');
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
          console.log('files file');
          var reader = new FileReader();
          reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            // console.log('binary string is ' + binaryString);
            document.getElementById("previewImg").src = "data:image/jpeg;base64," + btoa(binaryString);
          };

          reader.readAsBinaryString(file);
        }
      };

        /*
       * handle na eventot koga birame slika
       */
      if (window.File && window.FileReader
          && window.FileList && window.Blob) {
        // console.log('add event listener');
        document.getElementById('form-data')
            .addEventListener('change', handleFileSelect, false);
      } else {
        alert('The File APIs are not fully supported in this browser.');
      }

	/* methods */

}]);
