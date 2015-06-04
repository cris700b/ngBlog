
(function(app){
	
	app.config(function($stateProvider, $translateProvider){
		
		// routes
		$stateProvider.state('/', {
			
			url: '/', 
			templateUrl: 'views/view1.html', 
			controller: 'MainCtrl', 
			data: {
				
				title: 'AngularJs Gulp Starter'
			}
		});
		
		
		$translateProvider.translations('en', {
			
			TITLE: 'ngBlog, The Single Page Blog', 
			SUBTITLE: 'One Stop Blogging Solution', 
			SIGNIN: 'Sign in', 
			COMMENTS: 'Comments', 
			BY: 'By', 
			ON: 'On'
			ADD: 'Add'
		});
		
		$translateProvider.translations('it', {
			
			TITLE: 'ngBlog, Piattaforma di Blogging Su Una Pagina (SPA)', 
			SUBTITLE: 'La Soluzione Completa Per Il Tuo Blog', 
			SIGNIN: 'Login'
			COMMENTS: 'Commenti', 
			BY: 'Da', 
			ON: 'Data'
			ADD: 'Aggiungi'
		});
		
		$translateProvider.preferredLanguage('en');
		
	});
		
	app.run(function($state, $rootScope, $translate){
		
		$state.go('allPosts');
		
		$rootScope.languagePreference = {currentLanguage: 'en'};
		$rootScope.languagePreference.switchLanguage = function(key){
			
			$translate.use(key);
			$rootScope.languagePreference.currentLanguage = key;
		};
	});
	
})	
(angular.module('ngBlog', [

	'ui.router',
	'ngAnimate', 
	'pascalprecht.translate', 
	'post', 
	'admin'
]));


