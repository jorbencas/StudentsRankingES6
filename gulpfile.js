var fs = require("fs");
var browserify = require("browserify");
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var jslint = require('gulp-jslint-simple');
const jscs = require('gulp-jscs');

if (!fs.existsSync("dist")){
  fs.mkdirSync("dist");
}

///babelify, es6 to es5
gulp.task('browserify', function() {
browserify("./src/main.js")
  .transform("babelify", {presets: ["es2015"]})
  .bundle()
  .pipe(fs.createWriteStream("dist/main.js"));
});

///http server live reload (html changes)
gulp.task('webserver', function() {
  gulp.src('./')
  .pipe(webserver({
    livereload: true,
    directoryListing: false,
    open: true
  }));
});

gulp.task('lint', function () {
  gulp.src('./src/*.js')
      .pipe(jslint.run({
          // project-wide JSLint options
          node: true,
          vars: true
      }))
      .pipe(jslint.report({
          // example of using a JSHint reporter
          reporter: require('jshint-stylish').reporter
      }));
});

gulp.task('jscs', () => {
  return gulp.src('./src/*.js')
      .pipe(jscs())
      .pipe(jscs.reporter());
});

// watch any change
gulp.task('watch', ['browserify'], function () {
    gulp.watch('./src/**/*.js', ['browserify']);
});
gulp.task('default', ['browserify', 'webserver', 'watch']);