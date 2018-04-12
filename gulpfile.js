/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gwatch = require('gulp-watch');

gulp.task('default', ['copy-html', 'copy-images', 'copy-vendor', 'styles', 'lint', 'scripts'], function() {
    gulp.watch('sass/**/*.scss', ['styles']).on('end', browserSync.reload);
    gulp.watch('js/**/*.js', ['lint', 'scripts']).on('end', browserSync.reload);
    gulp.watch('./index.html', ['copy-html']).on('end', browserSync.reload);
    gulp.watch('./dist/index.html').on('change', browserSync.reload);

    gwatch('img/**/*', function() {
        console.log('copy images');
        gulp.start('copy-images');
    });

    gwatch('vendor/**/*', function() {
        console.log('copy vendor');
        gulp.start('copy-vendor');
    });

    browserSync.init({
        server: './dist'
    });
});

gulp.task('dist', [
    'copy-html',
    'copy-images',
    'copy-vendor',
    'styles',
    'lint',
    'scripts-dist'
]);

gulp.task('scripts', function() {
    gulp.src('js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
    gulp.src('js/**/*.js')
        .pipe(concat('all.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {
    gulp.src('./*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function() {
    gulp.src('img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('copy-vendor', function() {
    gulp.src('vendor/**/*')
        .pipe(gulp.dest('dist/vendor'));
});

gulp.task('styles', function() {
    gulp.src('sass/main.scss')
        .pipe(sass({
            //outputStyle: 'compressed'
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            //browsers: ['last 2 versions']
            browsers: ['> 0%']
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('lint', function () {
    return gulp.src(['js/**/*.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());
});

gulp.task('tests', function () {
    gulp.src('tests/spec/extraSpec.js')
        .pipe(jasmine({
            integration: true,
            vendor: 'js/**/*.js'
        }));
});