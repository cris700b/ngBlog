
(function(module){
	
	'use strict';
	
	// load controller
	module.factory('PostsSrv', function(){
		
		return {
		    
			posts : [{id: 1, 
		                    title: 'Title 1', 
							permalink: 'title-1',
							author: 'Pinco Pallo', 
							publishDate: new Date(), 
							content: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
						}, 
						{id: 2, 
							title: 'Title 2', 
							permalink: 'title-2',
							author: 'Pinco Pallo', 
							publishDate: new Date(), 
							content: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
						},
						{id: 3, 
							title: 'Title 3', 
							permalink: 'title-3',
							author: 'Pinco Pallo', 
							publishDate: new Date(),								
							content: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
						},
						{id: 4, 
							title: 'Title 4',
                            permalink: 'title-4'	,						
							author: 'Pinco Pallo', 
							publishDate: new Date(), 
							content: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
						}], 
							
			getAll: function(){
				
				return this.posts;
			}, 
			
			getPostById: function(id){
				
				var post = {};
				for(var index in this.posts){
					
					if(this.posts[index].id === id){
						
						post = this.posts[index];
						break;
					}
				}
				
				return post;
			}
		};			
		
	});
})
(angular.module('posts.services', [

	
]));