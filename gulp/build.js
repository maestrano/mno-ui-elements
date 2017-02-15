'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

// Clean up  the tmp and build directory
gulp.task('clean', function (asyncCallback) {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], asyncCallback);
});

gulp.task('build', ['scripts', 'styles'], function() {
  // Source files for final dist build - NOTE: order is imporant.
  var buildSourceFiles = [
    path.join(conf.paths.src, 'mnoUiElements.prefix'),
    path.join(conf.paths.src, 'mnoUiElements.js'),
    path.join(conf.paths.tmp, 'partials/*.js'),
    path.join(conf.paths.src, 'mnoUiElements.suffix'),
    path.join(conf.paths.tmp, 'scripts/**/*.js'),
    path.join(conf.paths.lib, '*.js')
    //path.join(conf.paths.dist, 'mnoUiElements.css'),
  ];

  var jsFilter = $.filter(['**/*.js', '**/*.prefix', '**/*.suffix', '!**/*.spec.js']);
  var cssFilter = $.filter('**/*.css', { restore: true });

  return gulp.src(buildSourceFiles)
    .pipe(jsFilter)
    // TODO: make source maps actually work.
    // .pipe($.sourcemaps.init())
    // .pipe($.sourcemaps.write())
    .pipe($.concat('mno-ui-elements.js'))
    .pipe($.ngAnnotate())
    .pipe(gulp.dest(conf.paths.dist)) // Output mno-ui-elements.js
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }))
    .pipe($.uglify()).on('error', conf.errorHandler('Uglify'))
    .pipe($.rename('mno-ui-elements.min.js'))
    .pipe(gulp.dest(conf.paths.dist))

    //.pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});
