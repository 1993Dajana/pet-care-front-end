'use strict';
petcareApp
	.service('crud', ['$resource', 'BASE_URL',
	function($resource, BASE_URL){


		return $resource(BASE_URL + ':service/:action/:id', {id:'@id'}, {
			
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
				},
				headers: {
            		'Content-Type' : undefined
          		}
			},
			// NE GO KORISTIME, SO SEKOJ POST ZEMAME KOMENTARI
			getComments:{
				method:'GET',
				params:{
					service:'post',
					action:'comments',
					id:'@id'
				}
			},
			like:{
				method:'GET',
				params:{
					service:'post',
					action: 'like',
					id:'@id'
				}
			},
			unlike:{
				method:'GET',
				params:{
					service:'post',
					action: 'unlike',
					id:'@id'
				}
			}
			
			
			
			
		});


}]);