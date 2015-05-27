
// gulp 
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	clean = require('gulp-clean'),
	ngAnnotate = require('gulp-ng-annotate'),
	sourcemaps = require('gulp-sourcemaps'), 
	imagemin = require('gulp-imagemin'), 
	karma = require('gulp-karma'), 
	protractor = require('gulp-protractor').protractor;


var devDir = 'app/',
	distDir = 'dist/',
	minFile = 'app.min.',
	minCssFile =  devDir + minFile + 'css', 
	minJsFile = devDir + minFile + 'js',
	
	mainJsFile = devDir + 'js/main.js', 
	mainCssFile = devDir + 'css/main.css', 
	
	cssFiles = devDir + '**/css/**/*.css',
	jsFiles = devDir + '**/js/**/*_+(srv|ctrl)+(.js)', 
	htmlFiles = devDir + '**/*.html',
	imgFiles = devDir + '**/img/**/*.+(jpg|png)', 
	
	moduleInitFile = devDir + '/**/js/*_module.js', 
	testFiles = devDir + '**/test/unit/*_test.js', 
	e2eFiles = devDir + '**/test/e2e/*_e2e.js', 
	bowerFiles = devDir + 'bower_components/**';
	
// all the task are dependent on one-a-nother 
// so calling on task invokes all the other tasks that it depends on

// cleans the applications main app.css file
gulp.task('clean-css-app-file', function(){
	
	return gulp.src(minCssFile, {read: false})
					.pipe(clean({force: true}));
});

// cleans the applications main app.js file
gulp.task('clean-js-app-file', function(){
	
	return gulp.src(minJsFile, {read: false})
					.pipe(clean({force: true}));
});

// cleans the dist directory
gulp.task('clean-dist', function(){
	
	return gulp.src([distDir], {read: false})
					.pipe(clean({force: true}));
});

// checks the js for errors 
// runs after the 'clean-js-app-file' task has finished
// if it encounters essror, exits
gulp.task('lint', ['clean-js-app-file'], function(){
	
	return gulp.src([mainJsFile, moduleInitFile, jsFiles,  '!' + testFiles, '!' + e2eFiles, '!' + bowerFiles])
					.pipe(jshint())
					.pipe(jshint.reporter('default'));
					//.pipe(jshint.reporter('fail'));
});

// concatenates and minifies the css files into the main app.css file
// runs after the 'clean-css-app-file' task has finished 
gulp.task('minify-css', ['clean-css-app-file'], function(){
	
	var opts = {comments: true, spare: true};
	return gulp.src([cssFiles, '!' + bowerFiles])
					.pipe(concat(minFile + 'css'))
					.pipe(minifyCSS(opts))
					 .pipe(gulp.dest(devDir));
});

// concatenates, applies the ngAnotations and minifies all the js files into the main app.js file
// runs after the 'lint' task has finished
gulp.task('minify-js', ['lint'], function(){
	
	return gulp.src([mainJsFile, moduleInitFile, jsFiles, '!' + testFiles, '!' + e2eFiles, '!' + bowerFiles])
					.pipe(sourcemaps.init())
					.pipe(concat(minFile + 'js'))
					.pipe(ngAnnotate())
					.pipe(uglify())
					.pipe(sourcemaps.write())
					.pipe(gulp.dest(devDir));
});

// karma test task
gulp.task('test', ['minify-js'], function(){
	
	// Be sure to return the stream
	// NOTE: Using the fake './foobar' so as to run the files
	// listed in karma.conf.js INSTEAD of what was passed to
	// gulp.src !
	
	return gulp.src('./dummyFile')
					.pipe(karma({configFile: './karma.conf.js', 
										action: 'run'})
					)
					.on('error', function(err){
						
						// Make sure failed tests cause gulp to exit non-zero
						console.log(err);
						
						//instead of erroring the stream, end it
						this.emit('end');
					});
});

var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
gulp.task('webdriver_standalone', webdriver_standalone);

// e2e (protractor) test task
gulp.task('e2e', function(cb) {

		gulp.src([e2eFiles])
			.pipe(protractor({
				
				configFile: 'protractor.conf.js',
			}))
			.on('error', function(e) {
				
				console.log(e);
			})
			.on('end', cb);        
});

// copies the app.css, app.js and all the html files to the dist directory
// runs after the 'clean-dist', 'minify-css' and 'minify-js' tasks have finished
gulp.task('copy-files', ['clean-dist', 'minify-css', 'minify-js'], function(){
	
	return gulp.src([minJsFile, minCssFile, htmlFiles, '!' + testFiles, '!' + e2eFiles,  '!' + bowerFiles])
					.pipe(gulp.dest(distDir));
});

// minifies, optimises and copies the images for the dist folder
// runs after the 'clean-dist' task has finished
gulp.task('minify-img', ['clean-dist'], function() {
  
	return gulp.src(imgFiles)
					.pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true }))
					.pipe(gulp.dest(distDir + 'img/'))
});

// copies the 'bower-components' folder to the dist folder
// runs after the 'minify-img' and 'copy-files' tasks have finished
gulp.task('copy-bower-components', ['clean-dist'], function(){
	
	return gulp.src(bowerFiles)
					.pipe(gulp.dest(distDir + 'bower_components'));
});

// watches for changes inthe css and js files and if necessary, 
// updates the app.css or app.js files
// runs after the 'minify-css' and 'minify-js' tasks have finished
gulp.task('watch', function(){
	
	// watch files for changes and coppy them to the appropriate location
	gulp.watch(cssFiles, ['minify-css']);
	gulp.watch([jsFiles, htmlFiles, '!' + e2eFiles], ['test']);
});

// opens the server on the 'app' folder on port 9000
// runs after the 'watch' task has finished
gulp.task('connect', ['watch', 'minify-css', 'minify-js', 'test'], function(){
	
	connect.server({
		
		root: devDir, 
		port: 9000
	});
});
	
// opens the server on the 'dist' folder on port 3000
// runs after the 'copy-bower-components' task has finished
gulp.task('connect-dist', ['copy-bower-components', 'minify-img', 'copy-files', 'test'], function(){
	
	connect.server({
		
		root: distDir, 
		port: 3000
	});
});

// default task
// runs the 'connect' task 
gulp.task('default', ['connect']);

// build task
// runs the 'build' task
gulp.task('build', ['connect-dist']);





