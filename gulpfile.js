var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var merge =  require('merge-stream');
var shell = require('gulp-shell');
var cleanCss = require('gulp-clean-css');
var html2js = require('gulp-html2js');
var ngAnnotate = require('gulp-ng-annotate');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var Server = require('karma').Server;

var jsDependencies = [
    'node_modules/angular/angular.min.js'
];

var cssDependencies = [
    'node_modules/normalize.css/normalize.css'
];

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['dist/*.html', 'dist/**/*.js', 'dist/**/*.css']).on("change", reload);
});

gulp.task('coveralls', ['test-once'], function() {
    return gulp.src('gulpfile.js', { read: false })
        .pipe(shell('cat coverage/lcov.info | node_modules/coveralls/bin/coveralls.js'));
});

gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
    return gulp.src(['src/merp.module.js', 'src/**/*.js', '!src/**/*.spec.js'])
        .pipe(ngAnnotate())
        .pipe(concat('merp.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
    return gulp.src(['src/**/*.css'])
        .pipe(concat('merp.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
   return gulp.src('src/index.html')
       .pipe(gulp.dest('dist'));
});

gulp.task('templates', function() {
    return gulp.src(['src/**/*.html', '!src/index.html'])
        .pipe(html2js('merp-templates.min.js', {
            adapter: 'angular',
            base: 'src',
            name: 'merp'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


gulp.task('dependencies', function() {
    var js = gulp.src(jsDependencies)
        .pipe(concat('ext.min.js'))
        .pipe(gulp.dest('dist'));

    var css =  gulp.src(cssDependencies)
        .pipe(concat('ext.min.css'))
        .pipe(gulp.dest('dist'));
    return merge(js, css);
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', {cwd:'./'}, ['lint', 'js']);
    gulp.watch('src/**/*.css', {cwd:'./'}, ['css']);
    gulp.watch('src/index.html', {cwd:'./'}, ['html']);
    gulp.watch(['src/**/*.html', '!src/index.html'], {cwd:'./'}, ['templates']);
});

gulp.task('build-app', ['dependencies', 'lint', 'js', 'css', 'html', 'templates']);

gulp.task('default', ['build-app', 'watch']);
gulp.task('build', ['build-app', 'coveralls']);

gulp.task('test', ['build-app'], function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});

gulp.task('test-once', ['build-app'], function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});