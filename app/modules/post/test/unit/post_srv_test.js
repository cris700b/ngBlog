
'use strict';
describe('PostSrv tests \n', function(){
	
	beforeEach(module('post.services'));
	
	var httpBack;
	beforeEach(inject(function($httpBackend){
		
		httpBack = $httpBackend;
		
		
	}));
	
	it('should return 2 post objects', inject(function(PostSrv){
		
		httpBack.expectGET('http://localhost:8080/api/posts')
							.respond([{id: 1, title: 'Test 1'}, 
											{id: 2, title: 'Test 2'}]);
				
		var posts = PostSrv.query();
		
		httpBack.flush();
		
		var numPosts = posts.length;
		expect(numPosts).toBe(2);
	}));
	
	if('should return one object for id 2', inject(function(PostSrv){
		
		httpBack.expectGET('http://localhost:8080/api/posts/2')
							.respond({id: 2, title: 'Title 2'});
							
		var post = PostSrv.get({id: 2});
		
		httpBack.flush();
		expect(post).not.toBe(undefined);
	}));
});