var gulp = require('gulp'),
    karma = require('karma').server,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourceFiles = [
      'src/mnoUiElements.prefix',
      'src/mnoUiElements.suffix',
      'src/mnoUiElements.js',
      'src/components/**/*.js',
      'src/filters/**/*.js',
      'src/services/**/*.js'
    ];

gulp.task('build', function() {
  gulp.src(sourceFiles)
    .pipe(concat('mno-ui-elements.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('mno-ui-elements.min.js'))
    .pipe(gulp.dest('./dist'))
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

gulp.task('test-debug', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: false,
    autoWatch: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

gulp.task('default', ['test', 'build']);
gulp.task('dist', ['test','test-dist-concatenated', 'test-dist-minified']);
