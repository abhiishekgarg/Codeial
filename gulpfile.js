const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');

gulp.task('css', function(done) 
{
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
        rev.manifest
        ({
          cwd: 'public',
          merge: true
        })
      )
      .pipe(gulp.dest('./public/assets'));
    done(); // callback function
  });