var gulp  = require('gulp'),
    less  = require('gulp-less'),
    browserSync  = require('browser-sync'),
    plumber      = require('gulp-plumber'),
    rename       = require('gulp-rename'),
    cleanCSS     = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('less', function(){
return gulp.src('less/style.less') 
.pipe(plumber())
.pipe(less())
.pipe(cleanCSS())
.pipe(rename(function (path) {
  path.dirname += "/../css";
  path.extname = ".min.css";
}))
.pipe(autoprefixer({overrideBrowserslist: ['last 5 versions']}))
.pipe(cleanCSS({compatibility: 'ie10', keepSpecialComments: 1}))
    .pipe(gulp.dest('css')) 
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() { 
  browserSync({ 
      server: { 
          baseDir: './' 
      },
      notify: false 
  });
});


gulp.task('watch',  function() {
  gulp.watch('less/**/*.less', gulp.parallel('less'));
    gulp.watch(['index.html']);
    gulp.watch(['img/**/*']);
});


gulp.task('default', gulp.parallel("less", 'browser-sync', 'watch'));