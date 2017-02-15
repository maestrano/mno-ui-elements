'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

// Compile dist/mno-ui-elements.css from src/mno-ui-elements.less
// TODO: Do not work, should be fixed
gulp.task('styles-compile', function () {
  var lessOptions = {
    paths: [
      path.join(conf.paths.src, '/components')
    ]
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/components/**/*.less')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '/* inject:imports */',
    endtag: '/* endinject */',
    addRootSlash: false
  };

  return gulp.src([
    path.join(conf.paths.src, '/mno-ui-elements.less')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(conf.wiredep))
    .pipe($.sourcemaps.init())
    .pipe($.less(lessOptions)).on('error', conf.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.dist)));
});

// Concat all less files to generate dist/mno-ui-elements.less
gulp.task('styles-concat', function () {
  return gulp.src([
      path.join(conf.paths.src, '/**/*.less')
    ])
    .pipe($.concat('mno-ui-elements.less'))
    .pipe(gulp.dest(path.join(conf.paths.dist)));
});

gulp.task('styles', ['styles-concat']);
