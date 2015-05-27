
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
	imagemin = require('gulp-imagemin');


// all the task are dependent on one-a-nother 
// so calling on task invokes all the other tasks that it depends on

// cleans the applications main app.css file
gulp.task('clean-css-app-file', function(){
	
	return gulp.src(['./app/app.css)', ], {read: false})
					.pipe(clean({force: true}));
});

// cleans the applications main app.js file
gulp.task('clean-js-app-file', function(){
	
	return gulp.src(['./app/app.js', ], {read: false})
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
	
	return gulp.src(['./app/js/main.js', './app/**/js/*.module.js', './app/**/js/**/*.js', '!./app/bower_components/**'])
					.pipe(jshint())
					.pipe(jshint.reporter('default'))
					.pipe(jshint.reporter('fail'));
});

// concatenates and minifies the css files into the main app.css file
// runs after the 'clean-css-app-file' task has finished 
gulp.task('minify-css', ['clean-css-app-file'], function(){
	
	var opts = {comments: true, spare: true};
	return gulp.src(['/app/css/main.css', './app/**/css/**/*.css', '!./app/bower_components/**'])
					.pipe(concat('app.css'))
					.pipe(minifyCSS(opts))
					 .pipe(gulp.dest('./app/'));
});

// concatenates, applies the ngAnotations and minifies all the js files into the main app.js file
// runs after the 'lint' task has finished
gulp.task('minify-js', ['lint'], function(){
	
	return gulp.src(['./app/js/main.js', './app/**/js/*.module.js', './app/**/js/**/*.js', '!./app/bower_components/**'])
					.pipe(sourcemaps.init())
					.pipe(concat('app.js'))
					.pipe(ngAnnotate())
					.pipe(uglify())
					.pipe(sourcemaps.write())
					.pipe(gulp.dest('./app/'));
});

// copies the app.css, app.js and all the html files to the dist directory
// runs after the 'clean-dist', 'minify-css' and 'minify-js' tasks have finished
gulp.task('copy-files', ['clean-dist', 'minify-css', 'minify-js'], function(){
	
	return gulp.src(['./app/*.+(css|js)', './app/**/*.html', '!./app/bower_components/**'])
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
gulp.task('copy-bower-components', ['minify-img', 'copy-files'], function(){
	
	return gulp.src('./app/bower_components/**')
					.pipe(gulp.dest('./dist/bower_components'));
});

// watches for changes inthe css and js files and if necessary, 
// updates the app.css or app.js files
// runs after the 'minify-css' and 'minify-js' tasks have finished
gulp.task('watch', ['minify-css', 'minify-js'], function(){
	
	// watch files for changes and coppy them to the appropriate location
	gulp.watch('./app/**/css/**/*.css', ['minify-css']);
	gulp.watch('./app/**/js/**/*.js', ['minify-js']);
});

// opens the server on the 'app' folder on port 9000
// runs after the 'watch' task has finished
gulp.task('connect', ['watch'], function(){
	
	connect.server({
		
		root: 'app/', 
		port: 9000
	});
});
	
// opens the server on the 'dist' folder on port 3000
// runs after the 'copy-bower-components' task has finished
gulp.task('connect-dist', ['copy-bower-components'], function(){
	
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





