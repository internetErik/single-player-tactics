var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uncss = require('gulp-uncss'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    typescript = require('gulp-typescript'),
    immutableCss = require('immutable-css');

/*
 * Create variables for our project paths so we can change in one place
 */
var paths = {
    'sass': './public/styles/**/*.scss',
    'css': './public/styles/',
    'blitzCss': './public/styles/blitz.css',
    'allCss': './public/styles/*.css',
    'hbs': ['./views/**/*.hbs', './views/*.hbs'],
    'builtHtml': './assembled_hbs/',
    'html': './assembled_hbs/site.html',
    'typescript': './public/ts/**/*.ts',
    'tsBuildFolder': './public/js',
    'javascript': './public/js/**/*/js'
};

gulp.task('assemble', function () {
  return gulp.src(paths.hbs)
      .pipe(concat('site.html'))
      .pipe(gulp.dest(paths.builtHtml));
});

gulp.task('uncss', function(){
  return gulp.src(paths.blitzCss)
        .pipe(uncss({
            html: [paths.html],
            options: {
              ignoreSslErrors: 'true'
            }
        }))
        .pipe(gulp.dest(paths.css));
});

gulp.task('sass', function(){
  return gulp.src(paths.sass)
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'IE 9']}))
    .pipe(gulp.dest(paths.css));
});

gulp.task('buildCss', [/**'assemble',/**/'sass'/**,'uncss'/**/], function(){
    var str = gulp.src(paths.allCss)
        .pipe(concat('site.css'))
        .pipe(gulp.dest(paths.css));
        
    //https://www.npmjs.com/package/immutable-css
    immutableCss('./public/styles/blitz.css','./public/styles/site.css');

    return str;
});

gulp.task('typescript', [], function(){

  return gulp.src(paths.typescript)
    .pipe(typescript({
        module: 'commonjs'
    }))
    .pipe(gulp.dest(paths.tsBuildFolder));

})

gulp.task('watch', function() {

    gulp.start('buildCss');
    gulp.start('typescript');
    gulp.watch(paths.sass, ['buildCss']);
    gulp.watch(paths.typescript, ['typescript']);

});