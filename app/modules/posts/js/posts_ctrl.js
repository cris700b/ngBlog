
(function(module){
	
	'use strict';
	
	// load controller
	module.controller('PostsCtrl', function($scope, PostsSrv){
		
		$scope.getAllPosts = function(){
			
				return PostsSrv.getAll();
		};
		
		$scope.posts = $scope.getAllPosts();
	})
	
	.controller('PostDetailsCtrl', function($scope, $stateParams, $state, PostsSrv){
		
		$scope.getPostById = function(id){
			
			return PostsSrv.getPostById(id);
		};
		
		$scope.closePost = function(){
			
				$state.go('allPosts');
		};
		
		$scope.singlePost = $scope.getPostById($stateParams.id);	
		
		console.log($scope.singlePost);
		
	});
})
(angular.module('posts.controllers', [

	
]));