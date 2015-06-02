
(function(module){
	
	'use strict';
	
	module.config(function($stateProvider){
		
		$stateProvider.state('admin', {
			
			url: '/admin', 
			abstract: true, 
			controller: 'AdminCtrl', 
			templateUrl: 'modules/admin/views/admin_home.html'			
		})
		
		.state('admin.postList', {
			
			url: '', 
			controller: 'PostListCtrl', 
			templateUrl: 'modules/admin/views/admin_post_list.html', 
			data: {
				
				title: 'Admin Posts List Page'
			}
		})
		
		.state('admin.postNew', {
			
			url: '/posts/new', 
			controller: 'PostCreationCtrl', 
			templateUrl: 'modules/admin/views/admin_post_new.html', 
			data: {
				
				title: 'Admin New Post Page'
			}
		})
		
		.state('admin.postUpdate', {
			
			url: '/posts/:id/edit', 
			controller: 'PostUpdateCtrl', 
			templateUrl: 'modules/admin/views/admin_post_update.html', 
			data: {
				
				title: 'Admin Post Update Page'
			}
		})	;
		
	});
})
(angular.module('admin', [
	
	'ui.router',
	'admin.controllers', 
	'admin.services',
	'post.services'
]));