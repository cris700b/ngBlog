
(function(module){
	
	'use strict';
			
	module.value('API_URL', 'http://localhost:8080/api/posts/:id')
	
	.factory('PostSrv', function($resource, API_URL){
		
		return $resource(API_URL, {id: '@id'}, {
									
									update: {method: 'PUT'}
								});
	})
	
	.service('PopupSrv', function($window){
		
		this.showPopup = function(message){
			
			return $window.confirm(message);
		};
	});
	
})
(angular.module('post.services', [

	'ngResource'
]));