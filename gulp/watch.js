/* ************************************ */
/* Watch                                */
/* ************************************ */
// TODO: update this watch task to be more granular. Rerun only the tasks needed to update the changes. Example, if a stylesheet is updates, rebuild `gulp styles` only.
'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');

gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build', browserSync.reload]);
  gulp.watch('src/*', ['build', browserSync.reload]);
});
