'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var embedTemplates = require('gulp-angular-embed-templates');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src(path.join(conf.paths.src, '/**/*.coffee'))
    .pipe($.coffee()).on('error', conf.errorHandler('CoffeeScript'))
    .pipe(embedTemplates())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/scripts')))
    .pipe($.size());
});
