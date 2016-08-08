var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(gulp.dest('./js'));
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./sass/**/*.scss", ['sass'])
  gulp.watch("./js/*.js", ['js-watch']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);