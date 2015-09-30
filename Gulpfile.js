'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

//RECIPE
//https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
gulp.task('scripts', function () {

	var b = browserify({
		entries: './client/assets/js/glugr.js',
		debug: true,
		transform: ['reactify']
	});

	var bundle = b.bundle();

	//Store the unminified bundle for debugging
	bundle
		.pipe(source('glugr.js'))
		.pipe(gulp.dest('./client/assets/js/bundles/'));

	return bundle
		.pipe(source('glugr.min.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./client/assets/js/bundles/'));
});

gulp.task('default', ['scripts']);