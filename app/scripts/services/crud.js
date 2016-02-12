'use strict';
petcareApp
	.service('crud', ['$resource', 'BASE_URL',
	function($resource, BASE_URL){


		return $resource(BASE_URL + ':service/:action/:id', {}, {
			
			getAuthUser: {
				method: 'GET',
				params:{
					service: 'authenticate',
					action: 'user'
				}
			},
			
			getPosts:{
				method:'GET',
				params:{
					service:'posts'
				}
			},
			storePost:{
				// console.log('here');
				method:'POST',
				params:{
					service:'posts'
				},
				headers: {
            		'Content-Type' : undefined
          		}
			},
			showPost:{
				method:'GET',
				params:{
					service:'posts',
					id:'@id'
				}
			},
			comment:{
				method:'POST',
				params:{
					service:'post',
					action:'comment'
				}
			},
			getReplies:{
				method:'GET',
				params:{
					service:'post',
					action:'comments'
				}
			},
			nearBy:{
				method:'GET',
				params:{
					service:'nearby'
				}
			}
			
			
			
			
		});


}]);