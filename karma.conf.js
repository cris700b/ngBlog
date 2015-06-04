
// Karma configuration
// Generated on Tue May 19 2015 00:12:07 GMT+0200 (W. Europe Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

	plugins: [
				
		//'karma-coverage', 
		'karma-ng-html2js-preprocessor', 
		//'karma-junit-reporter',
		//'karma-jshint-preprocessor', 
		'karma-chrome-launcher',
		//'karma-firefox-launcher',
		'karma-jasmine',
		'karma-phantomjs-launcher'
	], 
	
	// add the plugin settings
	ngHtml2JsPreprocessor: {
	  
	  stripPrefix: 'app/', 
	  moduleName:'templates' //load this module in your tests
	}, 

    // list of files / patterns to load in the browser
    files: [
		'./app/bower_components/jquery/dist/jquery.min.js',		
		'./app/bower_components/angular/angular.min.js', './app/bower_components/angular-resource/angular-resource.min.js', 
		'./app/bower_components/angular-mocks/angular-mocks.js',
		'./app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
		//'./app/bower_components/angular-animate/angular-animate.min.js', 
		'./app/bower_components/bootstrap/dist/js/bootstrap.min.js',
		//'./app/app.min.js', 
		'./app/**/js/*_srv.js',
		'./app/**/js/*_ctrl.js',
		'./app/**/js/*_drv.js', 
		'./app/**/js/*_filter.js', 
		'./app/**/test/unit/*_test.js',
		//'./app/**/js/**/*_e2e.js',		
		'./app/**/views/*.html'
    ],
	
    // list of files to exclude
    exclude: [
	],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		
		'./app/**/views/*.html': 'ng-html2js',
		//'./../app/app.min.js': ['coverage'],
		//'./../app/js/*.js': ['jshint', 'coverage'], 
		//'./../app/modules/**/js/*.js': ['jshint', 'coverage'] 
    },
	
	// add plugin settings
	coverageReporter: {
		
		// type of file to output, use text to output to console
		type : 'text',
		
		// directory where coverage results are saved
		dir: './test_results/coverage/',
		
		// if type is text or text-summary, you can set the file name
		// file: './../test_results/coverage.txt'
	},
	
	// add plugin settings
	junitReporter: {
	  
		// location of results output file
		outputFile: './test_results/junit-results.xml'
	}, 

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'], //, 'coverage'],


    // web server port
    port: 9876,
	runnerPost: 9100, 

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
	// autoWatch is set to false becouse it is handled by the gulp watch task
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [//'Firefox', 
					//'Chrome', 
					'PhantomJS'],
	
	captureTimeout: 60000, 
	
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
  });
};
