'use strict';

var benchmark = require('gulp-benchmark');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');

gulp.task('lint', function () {
    return gulp.src([ './lib/**/*.js' ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

/*
gulp.task('benchmark', function () {
    return gulp.src('test/benchmark.js', { read: false })
        .pipe(benchmark({
            reporters: benchmark.reporters.etalon('Emese#resources')
        }));
});
*/

gulp.task('jsdoc', shell.task('./node_modules/jsdoc/jsdoc.js -r -R README.md lib -d docs/jsdoc'));

gulp.task('default', ['lint']);