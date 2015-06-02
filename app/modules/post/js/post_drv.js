
(function(module){

	'use strict';
	
	module.directive('ngbComments', function(PostSrv){
		
		return{
			
			restrict: 'AE', 
			scope: {
				
				postInstance: '='
			}, 
			replace: false, 
			link: function(scope, elem, attrs){
				
				scope.saveComment = function(){
					
					var postId = scope.postInstance.id;
					
					console.log('postId : ' + postId);
					
					var postInstanceToSave = {};
					
					scope.comment.datePublished = new Date();
					
					// copy the post instance in 'scope' to the variable 'postInstanceToSave'
					angular.copy(scope.postInstance, postInstanceToSave);
					
					// push the comment to the savedPostInstance
					postInstanceToSave.comments.unshift(scope.comment);
					
					// push the comment to the 'scope.postInstance' as well
					scope.postInstance.comments.unshift(scope.comment);
					
					// clear the comment
					scope.comment = {};
					
					// now update the 'savedPostInstance' 
					// so that the new comment goes to the server
					postInstanceToSave.$update();
				};
			}, 
			template: 'modules/post/views/comments_drv.html'
		};
	});
})
(angular.module('post.directives', [

]));