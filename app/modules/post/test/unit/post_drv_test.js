
beforeEach(module('post.directives'));
beforeEach(module('post.services'));
beforeEach(module('templates'));

describe('Directive tests \n', function(){
	
	it('should initialize comments div with 2 comments', inject(function($rootScope, $compile){
		
		var scope = $rootScope.$new();
		scope.singlePost = {id: 1, comments: [{content: 'test content 1', 	
																author: 'test author 1'}, 
															{content: 'test content 2', 		
																author: 'test author 2'} ]};
		
		// markup that uses the directive
		var tpl = '<ngb-comments  post-instance="singlePost"></ngb-comments>';
		
		// wrap the eelement with jQuery becouse $compile service compiles DOM and not String
		var elem = angular.element(tpl);
		
		// link the element with the proper scope
		$compile(elem)(scope);
		
		// fire digest so that expressions are evaluated
		$rootScope.$digest();
		
		var cmts = elem.find('.single-comment');
		
		// expect number of comments to be 2 
		expect(cmts.length).toBe(2);
	}));
});