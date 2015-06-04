
describe('filter', function(){
	
	beforeEach(module('admin.filters'));
	
	describe('Permalink filter test\n', function(){
		
		var filter;
		beforeEach(inject(function(permalinkFilter){
			
			filter = permalinkFilter;
		}));
		
		it('should not be undefined', function(){
				
				expect(filter).not.toBe(undefined);
		});
		
		it('should be empty', function(){
				
			expect(filter()).toEqual('');
		});
		
		it('should replace all spaces with hyphens (-) and convert to lowercase', function(){
				
				expect(filter('I had 3 spaces')).toEqual('i-had-3-spaces');
		});
	});
	
	describe('Wordcount filter test\n', function(){
		
		var filter;
		beforeEach(inject(function(wordcountFilter){
			
			filter = wordcountFilter;
		}));
		
		
		it('should not be undefined', function(){
				
				expect(filter).not.toBe(undefined);
		});
		
		it('the count should be 0', function(){
				
			expect(filter()).toEqual(0);
		});
		
		it('should count the words in current text (4 words)', function(){
			
			expect(filter('i have 4 words')).toEqual(4);
		});
	});
});

