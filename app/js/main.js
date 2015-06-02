
(function(app){
	
	app.config(function($stateProvider){
		
		// routes
		$stateProvider.state('/', {
			
			url: '/', 
			templateUrl: 'views/view1.html', 
			controller: 'MainCtrl', 
			data: {
				
				title: 'AngularJs Gulp Starter'
			}
		});
		
	});
		
	app.run(function($state){
		
		$state.go('allPosts');
	});
	
})	
(angular.module('ngBlog', [

	'ui.router',  
	'post', 
	'admin'
]));


