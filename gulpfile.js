var gulp = require('gulp');
var browserify = require('gulp-browserify'); // handles importing of needed libraries and bundling separate files with a require command
var webserver = require('gulp-webserver'); // handle live reloading of code

var src = './process' //where the original files are located
var app = './builds/app'; //final destination of processed files

gulp.task('js', function() { //main task src through broswerify, transforming them with reactify plugin from jsx => js
	return gulp.src(src + '/js/app.js')
		.pip(browserify({
			transform: 'reactify',
			debug: true
		}))
		.on('error', function (err) {
			console.log("error:", err.message);
		})
		.pipe(gulp.dest(app + '/js'));
});

gulp.task('html', function() {
	gulp.src(app + '/**/*.html'); // where you'd normally minify html code, currently more of a placeholder
})

gulp.task('css', function(){
	gulp.src(app + '/css/*.css'); //where you'd process sass into css, currently more of a placeholder
})

gulp.task('watch', function(){ // looks for changes in any of the included folders and reruns tasks so things are processed correctly
	gulp.watch(src + '/js/**/*.js', ['js']);
	gulp.watch(app + '/css/**/*.css', ['css']);
	gulp.watch(app + '/**/*.html', ['html']);

});

gulp.task('webserver', function(){ //live reloads any of the pages so that browserify will auto update when change files
	gulp.src(app + '/')
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);