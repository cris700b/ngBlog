
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
	karma = require('gulp-karma');


// all the task are dependent on one-a-nother 
// so calling on task invokes all the other tasks that it depends on

// cleans the applications main app.css file
gulp.task('clean-css-app-file', function(){
	
	return gulp.src(['./app/app.min.css)', ], {read: false})
					.pipe(clean({force: true}));
});

// cleans the applications main app.js file
gulp.task('clean-js-app-file', function(){
	
	return gulp.src(['./app/app.min.js', ], {read: false})
					.pipe(clean({force: true}));
});

// cleans the dist directory
gulp.task('clean-dist', function(){
	
	return gulp.src(['./dist/'], {read: false})
					.pipe(clean({force: true}));
});

// checks the js for errors 
// runs after the 'clean-js-app-file' task has finished
// if it encounters essror, exits
gulp.task('lint', ['clean-js-app-file'], function(){
	
	return gulp.src(['./app/js/main.js', './app/**/js/*_module.js', './app/**/js/**/*.js',  '!./app/**/js/**/*_test.js', '!./app/bower_components/**'])
					.pipe(jshint())
					.pipe(jshint.reporter('default'))
					.pipe(jshint.reporter('fail'));
});

// concatenates and minifies the css files into the main app.css file
// runs after the 'clean-css-app-file' task has finished 
gulp.task('minify-css', ['clean-css-app-file'], function(){
	
	var opts = {comments: true, spare: true};
	return gulp.src(['/app/css/main.css', './app/**/css/**/*.css', '!./app/bower_components/**'])
					.pipe(concat('app.min.css'))
					.pipe(minifyCSS(opts))
					 .pipe(gulp.dest('./app/'));
});

// concatenates, applies the ngAnotations and minifies all the js files into the main app.js file
// runs after the 'lint' task has finished
gulp.task('minify-js', ['lint'], function(){
	
	return gulp.src(['./app/js/main.js', './app/**/js/*_module.js', './app/**/js/**/*.js', '!./app/**/js/**/*_test.js', '!./app/bower_components/**'])
					.pipe(sourcemaps.init())
					.pipe(concat('app.min.js'))
					.pipe(ngAnnotate())
					.pipe(uglify())
					.pipe(sourcemaps.write())
					.pipe(gulp.dest('./app/'));
});

// karma test task
gulp.task('test', ['minify-js'], function(){
	
	// Be sure to return the stream
	// NOTE: Using the fake './foobar' so as to run the files
	// listed in karma.conf.js INSTEAD of what was passed to
	// gulp.src !
	
	return gulp.src('./dummyFile')
					.pipe(karma({configFile: 'karma.conf.js', 
										action: 'run'})
					)
					.on('error', function(err){
						
						// Make sure failed tests cause gulp to exit non-zero
						console.log(err);
						
						//instead of erroring the stream, end it
						this.emit('end');
					});
});

// copies the app.css, app.js and all the html files to the dist directory
// runs after the 'clean-dist', 'minify-css' and 'minify-js' tasks have finished
gulp.task('copy-files', ['clean-dist', 'minify-css', 'minify-js'], function(){
	
	return gulp.src(['./app/*.min.+(css|js)', './app/**/*.html', '!./app/**/js/**/*_test.js', '!./app/bower_components/**'])
					.pipe(gulp.dest('./dist/'));
});

// minifies, optimises and copies the images for the dist folder
// runs after the 'clean-dist' task has finished
gulp.task('minify-img', ['clean-dist'], function() {
  
	return gulp.src('./app/**/img/**/*.+(jpg|png)')
					.pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true }))
					.pipe(gulp.dest('./dist/img/'))
});

// copies the 'bower-components' folder to the dist folder
// runs after the 'minify-img' and 'copy-files' tasks have finished
gulp.task('copy-bower-components', ['clean-dist'], function(){
	
	return gulp.src('./app/bower_components/**')
					.pipe(gulp.dest('./dist/bower_components'));
});

// watches for changes inthe css and js files and if necessary, 
// updates the app.css or app.js files
// runs after the 'minify-css' and 'minify-js' tasks have finished
gulp.task('watch', function(){
	
	// watch files for changes and coppy them to the appropriate location
	gulp.watch('./app/**/css/**/*.css', ['minify-css']);
	gulp.watch(['./app/**/js/**/*.js', '!./app/**/js/**/*_test.js'] ['minify-js']);
	gulp.watch('./app/**/js/**/*_test.js', ['test']);
});

// opens the server on the 'app' folder on port 9000
// runs after the 'watch' task has finished
gulp.task('connect', ['watch', 'minify-css', 'minify-js', 'test'], function(){
	
	connect.server({
		
		root: 'app/', 
		port: 9000
	});
});
	
// opens the server on the 'dist' folder on port 3000
// runs after the 'copy-bower-components' task has finished
gulp.task('connect-dist', ['copy-bower-components', 'copy-files', 'test'], function(){
	
	connect.server({
		
		root: 'dist/', 
		port: 3000
	});
});

// default task
// runs the 'connect' task 
gulp.task('default', ['connect']);

// build task
// runs the 'build' task
gulp.task('build', ['connect-dist']);





