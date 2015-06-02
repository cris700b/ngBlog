
(function(module){
	
	'use strict';
	
	module.config(function($stateProvider){
		
		// routes
		$stateProvider.state('allPosts', {
			
			url: '/posts', 
			templateUrl: 'modules/post/views/posts.html', 
			controller: 'PostCtrl', 
			data: {
				
				title: 'Posts Page'
			}
		})
		
		.state('singlePost', {
			
			url: '/posts/:id/:permalink', 
			templateUrl: 'modules/post/views/singlePost.html', 
			controller: 'PostDetailsCtrl', 
			data: {
				
				title: 'Single Post Page'
			}
		});
		
	});
	
})	
(angular.module('post', [

	'ui.router', 
	'post.controllers', 
	'post.services', 
	'post.directives'
]));