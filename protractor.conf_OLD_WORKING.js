exports.config = {
	
	//seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.41.0.jar', // 
	
	//seleniumAddress: 'http://localhost:4444/wd/hub',
  
	onPrepare: function() {
		
		browser.ignoreSynchronization = false;
	}, 
	
	// The timeout in milliseconds for each script run on the browser. This should
	// be longer than the maximum time your application needs to stabilize between
	// tasks.
	allScriptsTimeout: 500000000,

	// How long to wait for a page to load.
	getPageTimeout: 50000000,
  
	// CSS Selector for the element housing the angular app - this defaults to
	// body, but is necessary if ng-app is on a descendant of <body>.
	rootElement: 'html', //'body',
    
	specs: [
		
		'./app/**/js/**/*_e2e.js'
	],
	
    capabilities: {
    
		browserName: 'firefox'
    },
	
    baseUrl: 'http://localhost:9000',
    framework: 'jasmine2', 
	
	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
	
		showColors: true,
		defaultTimeoutInterval: 99999999,
		isVerbose : true,
		includeStackTrace : true
	}
};