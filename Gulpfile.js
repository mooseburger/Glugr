var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('scripts', function () {

	gulp.src(['client/assets/js/glugr.js'])
		.pipe(browserify({
			debug: true,
			transform: ['reactify']
		}))
		.pipe(gulp.dest('client/assets/js/bundles'));
});

gulp.task('default', ['scripts']);