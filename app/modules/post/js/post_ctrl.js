
(function(module){
	
	'use strict';
	
	// load controller
	module.controller('PostCtrl', function($scope, PostSrv){
				
		$scope.posts = PostSrv.query();
	})
	
	.controller('PostDetailsCtrl', function($scope, $stateParams, $state, PostSrv){
		
		$scope.closePost = function(){
			
				$state.go('allPosts');
		};
		
		$scope.singlePost = PostSrv.get({id: $stateParams.id});	
		
	});
})
(angular.module('post.controllers', [

	
]));