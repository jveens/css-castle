const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

gulp.task('sass', () => {
    gulp.src('src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dest/styles/'))
        .pipe(browserSync.stream())
        ;
});

gulp.task('browser-sync', () => {  
    browserSync.init(['css/*.css', 'js/*.js'], {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', () => {
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('**/*.html', () => {
        browserSync.reload();
    });
});

gulp.task('default', ['sass', 'browser-sync', 'watch']);