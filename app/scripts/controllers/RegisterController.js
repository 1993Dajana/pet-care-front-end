'use strict';
petcareApp
  .controller('RegisterController', ['$scope','registration','$rootScope', '$location',
                                         function($scope, registration, $rootScope, $location) {
	
	
	var file;
	$scope.register = function() {	
		
		console.log('register');
		console.dir($scope.user.profile_picture);
		console.dir($scope.user);
		registration.register($scope.user).then(	
				function success(data){
					console.log('success register: ', data);
					$location.url('/login');
				},
				function error(err){
					console.log('error register: ', err);
				});
	};


        
/*************** IMAGE UPLOAD FINESI ****************/
	$scope.fileNameChanged = function(data) {
	     console.log("select file " + data.value);
	}
	
	$("#form-data").change(function() {
		console.log("my file changed and now is: "+ this);
    });

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
				.addEventListener('change',	handleFileSelect, false);
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}


/*************** IMAGE UPLOAD FINESI ****************/
	
	
}]);
