petcareApp
	.service('crud', ['$resource', 'BASE_URL',
	function($resource, BASE_URL){


		return $resource(BASE_URL + ':service/:action/:id', {id: '@id'},{
			
			getAuthUser: {
				method: 'GET',
				params:{
					service: 'authenticate',
					action: 'user'
				}
			},
			
			getComments:{
				method:'GET',
				params:{
					service:'posts',
					action: 'get'
					
				}
			},
			getLikedPosts:{
				method:'GET',
				params:{
					service:'posts',
					action: 'liked'
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