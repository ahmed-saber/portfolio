'use strict';

// VARS
var port = 8000;
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var autoprefixerCore = require('autoprefixer-core');
var postcss    = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
// PATHS
var paths = {
	scssFiles:'./styles/scss/style.scss',
	cssPath:'./styles/css',
	miniFile:'style.min.css'
}

// DEFINE SCSS TASK
gulp.task('sass', function () {
	// LOG
	console.log('COMPINE FILES')
    // MERGE THE TWO STREAMS AND CONCATENATE THEIR CONTENTS INTO A SINGLE FILE
	return gulp.src(paths.scssFiles)
		.pipe(concat(paths.miniFile))
		.pipe(sass({
			outputStyle: 'compressed',
			errLogToConsole: true
		}).
		on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe( postcss([autoprefixerCore]) )
		.pipe( sourcemaps.write('.') )
		.pipe(gulp.dest(paths.cssPath))
});

gulp.task('webserver', function() {
	gulp.src('').pipe(webserver({
		port:port,
		fallback: 'index.html',
		livereload: true,
		directoryListing: true,
		open: 'index.html'
	}));
});

// DEFINE DEFAULT TASK
gulp.task('default', function () {
	// RUN ONCE
	gulp.run('sass');
	gulp.run('webserver');
	// WATCH
	gulp.watch([paths.scssFiles,'./styles/**/*.scss'], ['sass']);
});