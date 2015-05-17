var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var port = process.env.port || 3031;


gulp.task('browserify', function(){
  gulp.src('./app/src/js/components/main.js')
      .pipe(browserify({transform: 'reactify'}))
      .pipe(gulp.dest('/app/dist/js'));
});

// launch
gulp.task('open', function(){
  var options = {
    url: 'http://localhost:' + port,
  };

  gulp.src('./app/index.html')
      .pipe(open('', options));
});

// livereload server
gulp.task('connect', function(){
  connect.server({
    root: 'app',
    port: port,
    livereload: true
  });
});

// livereload js
gulp.task('js', function(){
  gulp.src('./app/dist/**/*/js')
      .pipe(connect.reload());
});

// livereload html
gulp.task('html', function(){
  gulp.src('./app/*.html')
      .pipe(connect.reload());
});

// watch files for livereload
gulp.task('watch', function(){

  gulp.watch('app/dist/js/*.js', ['js']);
  gulp.watch('app/index.html', ['html']);
  gulp.watch('app/src/js/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);

