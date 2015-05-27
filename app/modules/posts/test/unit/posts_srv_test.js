
'use strict';
describe('PostsSrv tests\n', function(){
	
	beforeEach(module('posts.services'));
	
	it('should return 4 post objects', inject(function(PostsSrv){
		
		var numposts = PostsSrv.getAll().length;
		expect(numposts).toBe(4);
	}));
	
	if('should return one object for id 2', inject(function(PostsSrv){
		
		var post = PostsSrv.getPostById(2);
		expect(post).not.toBe(undefined);
	}));
});