
'use strict';

var scope;

beforeEach(module('post.controllers'));
beforeEach(module('post.services'));
beforeEach(module('ngResource'));
beforeEach(module('ui.router'));

describe('PostCtrl tests \n', function(){
	
	var httpBack;
	
	beforeEach(inject(function($httpBackend){
		
		httpBack = $httpBackend;
		
		$httpBackend.expectGET('http://localhost:8080/api/posts')
							.respond([{id: 1, title: 'Test 1'}, 
											{id: 2, title: 'Test 2'}]);
	}));
	
	it('should initialize controller with 2 posts', inject(function($rootScope, $controller, PostSrv){
		
		
		scope = $rootScope.$new();
		$controller('PostCtrl', {$scope: scope, PostSrv: PostSrv});
		
		httpBack.flush();
		
		var numposts = scope.posts.length;
		expect(numposts).toBe(2);
	}));
});

describe('PostDetailsCtrl tests\n', function(){
	
	var httpBack;
	beforeEach(inject(function($httpBackend){
		
		httpBack = $httpBackend;
		
		$httpBackend.expectGET('http://localhost:8080/api/posts/2')
							.respond({id: 2, title: 'Title 2'});
	}));
	
	it('should initialize controller with 1 post', inject(function($rootScope, $state, $stateParams, $controller, PostSrv){
		
		scope = $rootScope.$new();
		$stateParams.id = 2;
		
		$controller('PostDetailsCtrl', {$scope: scope, $stateParams: $stateParams, $state: $state, PostSrv: PostSrv});
		
		expect(scope.singlePost).not.toBe(undefined);
	}));
	
});