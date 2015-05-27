
'use strict';

var scope;

beforeEach(module('posts.controllers'));
beforeEach(module('posts.services'));

describe('PostsCtrl tests\n', function(){
	
	it('should count the length of the posts to be 4', inject(function($rootScope, $controller, PostsSrv){
		
		
		scope = $rootScope.$new();
		$controller('PostsCtrl', {$scope: scope, PostsSrv: PostsSrv});
		
		var numposts = scope.posts.length;
		expect(numposts).toBe(4);
	}));
});

describe('PostDetailsCtrl tests\n', function(){
	
	beforeEach(module('ui.router'));
	
	it('should initialize controller with 1 post', inject(function($rootScope, $state, $stateParams, $controller, PostsSrv){
		
		$stateParams.id = 2;
		scope = $rootScope.$new();
		
		$controller('PostDetailsCtrl', {$scope: scope, $stateParams: $stateParams, $state: $state, PostsSrv: PostsSrv});
		
		expect(scope.singlePost).not.toBe(undefined);
	}));
	
});