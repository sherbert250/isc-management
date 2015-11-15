'use strict';

var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var util = require('gulp-util');

// project config

var config = {
  scripts: {
    src: './src/**/*.js',
    dest: './dist/js/',
    entries: './src/index.js', // array or string, if only one entry
    output: 'bundle.js' // name of bundled file
  },
  styles: {
    src: './src/_assets/scss/**/*.scss',
    dest: './dist/css/'
  },
  views: {
    src: './src/views/**/*.html',
    dest: './dist/views/'
  }
};

// scripts task

gulp.task('scripts', function () {
  var b = browserify({
    entries: config.scripts.entries,
    debug: true,
    transform: [babelify]
  });

  return b.bundle()
    .pipe(source(config.scripts.output))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // add transformation tasks to the pipeline here.
      .on('error', util.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(livereload());
});

// styles task

gulp.task('styles', function () {
  gulp.src(config.styles.src)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(rename({suffix : '.min'}))
      .pipe(minifycss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(livereload());
});

// views task

gulp.task('views', function () {
  gulp.src(config.views.src)
    .pipe(gulp.dest(config.views.dest))
    .pipe(livereload());
});

// watch task

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(config.styles.src, ['styles']);
  gulp.watch(config.scripts.src, ['scripts']);
  gulp.watch(config.views.src, ['views']);
});

// default & build tasks

gulp.task('build', ['scripts', 'styles', 'views']);
gulp.task('default', ['build', 'watch']);
