
(function(module){
	
	'use strict';
	
	module.config(function($stateProvider){
		
		// routes
		$stateProvider.state('allPosts', {
			
			url: '/posts', 
			templateUrl: 'modules/posts/views/posts.html', 
			controller: 'PostsCtrl', 
			data: {
				
				title: 'Posts Page'
			}
		})
		
		.state('singlePost', {
			
			url: '/posts/:id/:permalink', 
			templateUrl: 'modules/posts/views/singlePost.html', 
			controller: 'PostDetailsCtrl', 
			data: {
				
				title: 'Single Post Page'
			}
		});
		
	});
	
})	
(angular.module('posts', [

	'ui.router', 
	'posts.controllers', 
	'posts.services'
]));