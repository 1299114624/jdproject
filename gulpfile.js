const gulp = require('gulp'),
    connect = require('gulp-connect'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin');



gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true
    });
});
gulp.task('watch', () => {
    // 监听app下面所有的html文件, 如果文件改变, 就执行后面的任务
    gulp.watch(['app/**/*.*'], ['html']);
})
gulp.task('all', function () {
    gulp.src('app/**/*.*')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});
gulp.task('html', () => {
    return gulp.src('app/**/*.html')
      .pipe(htmlmin({ collapseWhitespace: true}))
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
});
gulp.task('js', function (cb) {
    gulp.src('app/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify()) // 直接压缩hello.js
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});
gulp.task('build', [ 'html', 'js','all']);
gulp.task('default', ['connect', 'build', 'watch']);