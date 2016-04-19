var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pkg = require('./package.json'),
    header = require('gulp-header'),
    banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */\n\n'
    ].join('\n');
gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

//Watch task
gulp.task('default', function() {
    gulp.watch('sass/**/*.scss', ['styles']);
});
