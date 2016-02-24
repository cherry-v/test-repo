'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    rimraf = require('rimraf'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

var path = {
    build: { 
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        fonts: 'build/css/fonts/'
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/js/*.js',
        style: 'src/style/*.less',
        img: 'src/images/**/*.*', 
        fonts: 'src/fonts/**/*.*',
        css: 'src/css/**/*.*'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/*.js',
        style: 'src/style/**/*.less',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        css: 'src/css/**/*.*'
    },
    clean: './build'
};
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js));
});
gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});
gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('css:build', function() {
    gulp.src(path.src.css)
        .pipe(gulp.dest(path.build.css))
});
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'css:build',
    'image:build'
]);
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
});
gulp.task('default', ['build', 'watch']);