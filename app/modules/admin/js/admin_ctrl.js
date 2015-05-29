
(function(module){
	
	'use strict';
	
	module.controller('AdminCtrl', function($scope){
		
		
	    })
		
		.controller('PostListCtrl', function($scope, $state, PostSrv, PopupSrv){
			
			$scope.posts = PopupSrv.query();
			
			$scope.deletePost = function(post){
				
				if(PopupSrv.showPopup('Really delete this post?')){
					
					post.$delete(function(){
						
						// once deleted, reload the state
						$state.go('admin.postList', undefined, {
							
							reload: true;
						});
					});
				}
			};
		}) 
		
		.controller('PostCreationCtrl', function($scope,  $state, PostSrv){
			
			$scope.post = new PostSrv();
			$scope.buttonText = 'Create';
			
			$scope.savePost = function(){
				
				$scope.buttonText = 'Saving ...';
			};
			
			$scope.post.permalink = angular.lowercase($scope.post.title).replace(/[\s]/g, '-');
			
			$scope,post.$save(function(){
				
				$state.go('admin.postList');
			});			
			
		}) 
		
		.controller('PostUpdateCtrl', function($scope, $stateParams, $state, PostSrv){
			
			$scope.post = PostSrv.get({id: $stateParams.id});
			$scope.buttonText = 'Update';
			
			$scope.updatePost = function(){
				
				$scope.buttonText = 'Updating ...';
			};
			
			$state.post.$update(function(){
				
				$state.go('admin.postList');
			});
		});
})
(angular.module('admin.controllers', [

]));