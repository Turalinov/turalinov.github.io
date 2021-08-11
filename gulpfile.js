const { src, dest, task, series, watch, parallel} = require('gulp'); //src - считывает файл, dest - копирует файлы в новое место, task - создает задачу, series - для выполнения несколько задач за 1 раз и порядка их очереди, whatch - для отслеживания изменения файлов в каталоге и запуска задач
const rm = require('gulp-rm'); //rm - плагин для очистки файлов каталоге
const sass = require('gulp-sass')(require('sass')); //sass - для преобразования scss  в css
const concat = require('gulp-concat'); //concat - для объяединение несколько файлов в один
const browserSync = require('browser-sync').create(); // browserSync - для поднятия сервера
const reload = browserSync.reload; // reload для автоматической перезагрузки страницы после изменения в html
const sassGlob = require('gulp-sass-glob'); //sassGlob  -для поддержки поделючения файлов scss через * паттерн в @import
const autoprefixer = require('gulp-autoprefixer'); //для проставления префиксов
const px2rem = require('gulp-smile-px2rem'); // для рассчета px в rem
const gcmq = require('gulp-group-css-media-queries'); // для группировки media queries
const cleanCSS = require('gulp-clean-css'); // улаляет комментарий и минифицирует в одну строку
const sourcemaps = require('gulp-sourcemaps'); // для создания sourcemaps
const babel = require('gulp-babel'); //для трансляции es6 js 
const uglify = require('gulp-uglify'); //для минификации js
const svgo = require('gulp-svgo'); // для удаления ненужных свойств в svg
const svgSprite = require('gulp-svg-sprite'); // для создания спрайта
const gulpif  = require('gulp-if'); // для условий 

const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS } =require('./gulp.config')

task("clean", () => {
  return src(`${DIST_PATH}/**/*`, { read: false })
    .pipe(rm())
});


task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}))
});

task('styles', () => {
  return src([
    ...STYLES_LIBS,
    `${SRC_PATH}/styles/main.scss`
  ])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem())
    .pipe(gulpif(env === 'prod',
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false 
      }))
    )
    .pipe(gulpif(env === 'prod',gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }))
});
task('images', () => {
  return src([`${SRC_PATH}/images/*.png`, `${SRC_PATH}/images/*.svg`])
    .pipe(dest(`${DIST_PATH}/images/`))
})

task('icons', () => {
  return src(`${SRC_PATH}/images/icons/*.svg`)
    .pipe(svgo({
        plugins: [
          {
            removeAttrs: { attrs: "(fill|stroke|style|width|height|data.*)" }
          }
        ]
      })
    )
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    
    .pipe(dest(`${DIST_PATH}/images/icons`))
  })


task('favicon', () => {
  return src(`${SRC_PATH}/*.ico`).pipe(dest(`${DIST_PATH}`))
})


task('scripts', () => {
  return src([
    ...JS_LIBS,
    `${SRC_PATH}/scripts/*.js`
  ])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ";"}))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }))
})



task('server', function() {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}`
    },
    open: false
  });
})


task('watch', () => {

  watch(`./${SRC_PATH}/styles/**/*`, series('styles'))
  watch(`./${SRC_PATH}/*.html`, series('copy:html'))
  watch(`./${SRC_PATH}/scripts/*.js`, series('scripts'))
  watch(`./${SRC_PATH}/images/icons/*.svg`, series('icons'))
  watch(`./${SRC_PATH}/images/*.png`, series('images'))

})


  
task("default", 
    series(
      "clean",
      parallel("copy:html", "styles", "scripts", "icons", "favicon", "images"),
      parallel("watch", "server")
    )
)

task("build",
  series(
    "clean",
    parallel("copy:html", "styles", "scripts", "icons", "favicon", "images")
  )
)