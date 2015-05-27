

exports.config = {

	//seleniumAddress: 'http://localhost:4444/wd/hub',

	specs: ['./app/**/test/e2e/*_e2e.js'], 
  
	baseUrl: 'http://localhost:9000',
  
	capabilities: {
		
		browserName: 'firefox'
	}, 
  
	framework:  'jasmine2', 
  
	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
	
		showColors: true,
		defaultTimeoutInterval: 30000,
		isVerbose : true,
		includeStackTrace : true
	}
}