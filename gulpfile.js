const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('css', function (done) {
  console.log('Minifying CSS...');
  // minifying CSS (SCSS) files
  // run command `gulp css` in the terminal
  // ** stands for any folder & * stands for any file
  gulp
    .src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

  // renaming CSS files using gulp-rev
  // and storing them in './public/assets'
  // and also, creating a manifest.json file
  return gulp
    .src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(
      rev.manifest({
        cwd: 'public',
        merge: true
      })
    )
    .pipe(gulp.dest('./public/assets'));
  done(); // callback function
});

gulp.task('js', function (done) {
  console.log('Minifying js...');
  gulp
    .src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(
      rev.manifest({
        cwd: 'public',
        merge: true
      })
    )
    .pipe(gulp.dest('./public/assets'));
  done();
});

gulp.task('images', function (done) {
  console.log('Compressing images...');
  // we have used "regex" (regular expression) below
  gulp
    .src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(
      rev.manifest({
        cwd: 'public',
        merge: true
      })
    )
    .pipe(gulp.dest('./public/assets'));
  done();
});

// empty the './public/assets' directory
gulp.task('clean:assets', function (done) {
  del.sync('./public/assets');
  done();
});

// run command `gulp build` to trigger this task using gulp-CLI
gulp.task(
  'build',
  gulp.series('clean:assets', 'css', 'js', 'images'),
  function (done) {
    console.log('Building assets...');
    done();
  }
);