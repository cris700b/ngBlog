

describe('Posts end-to-end test\n', function() {
  
	browser.get('/');
	
	it('sould have 4 posts', function(){
	  
		var posts = element.all(by.repeater('post in posts'));
		expect(posts.count()).toBe(4);
	});
	
	it('should redirect to #/posts/1/title-1', function(){
		
		var posts = element.all(by.repeater('post in posts'));
				
		var post = posts.first();
		var titleLink = post.element(by.binding('post.title'));
		titleLink.click();
					
		expect(browser.getCurrentUrl()).toMatch(browser.baseUrl + '/#/posts/1/title-1');
	});

	it('should have a close button', function(){
		
		var closeBtn = element.all(by.css('.cross-btn'));
		expect(closeBtn).not.toBe(undefined);
	});
	
	it('should close the post details and redirect to the posts page', function(){
		
		var closeBtn = element.all(by.css('.cross-btn'));
		closeBtn.click();
						
		expect(browser.getCurrentUrl()).toMatch(browser.baseUrl + '/#/posts');
	});
			
});