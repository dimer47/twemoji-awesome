var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pkg = require('./package.json'),
    header = require('gulp-header'),
    size = require('gulp-size'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-clean-css'),
    banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @author <%= pkg.author %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */\n\n'
    ].join('\n');
gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
        .pipe(minifyCSS('*'))
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename('twemoji-awesome.min.css'))
        .pipe(gulp.dest('./dist/'));
});

//Watch task
gulp.task('default', function() {
    gulp.watch('sass/**/*.scss', ['styles']);
});
