'use strict';

const del = require('del');
const gulp = require('gulp');
const zip = require('gulp-zip');
const merge = require('merge-stream');
const install = require('gulp-install');
const runSequence = require('run-sequence');
const awsLambda = require('node-aws-lambda');

const awsConfig = require('./aws-config'); // eslint-disable-line import/no-unresolved

gulp.task('clean', () => del(['dist/']));

gulp.task('bundle', () => gulp
  .src('./package.json')
  .pipe(gulp.dest('./dist'))
  .pipe(install({ production: true })));

gulp.task('compile', () => {
  const tasks = ['src'].map((directory) => gulp
    .src(`${directory}/**/*`)
    .pipe(gulp.dest(`./dist/${directory}`)));
  return merge(tasks);
});

gulp.task('zip', () => gulp
  .src('./dist/**/*', { nodir: true })
  .pipe(zip('dist/dist.zip'))
  .pipe(gulp.dest('./')));

gulp.task('upload', (callback) => {
  awsLambda.deploy('./dist/dist.zip', awsConfig, callback);
});

gulp.task('deploy', (callback) => runSequence(['clean'], ['bundle'], ['compile'], ['zip'], callback));
