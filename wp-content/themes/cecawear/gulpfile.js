var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

var JS_SOURCE = 'js';
var JS_DEST = 'js';
var JS_OUTPUT_FILE = 'main.js';
var CSS_SOURCE = 'css';
var CSS_DEST = 'css';
var SERVER_BASE_DIR = './';
var WATCH_FILE_EXTENSIONS = ['*.html'];

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: SERVER_BASE_DIR
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('javascript', function() {
  return gulp.src(JS_SOURCE + '/**/*.js')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        generator.emit('end');
    }}))
    .pipe(gulp.dest(JS_DEST + '/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(JS_DEST + '/'))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('css', function() {
  gulp.src(CSS_SOURCE + '/**/*.scss')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        generator.emit('end');
    }}))
    .pipe(sass())
    .pipe(gulp.dest(CSS_DEST + '/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(CSS_DEST + '/'))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch(JS_SOURCE + '/**/*.js', ['javascript']);
  gulp.watch(CSS_SOURCE + '/**/*.scss', ['css']);
  gulp.watch(WATCH_FILE_EXTENSIONS, ['bs-reload']);
});
