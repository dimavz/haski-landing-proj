/**
 * Created by Дмитрий on 19.12.2017.
 */
var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет для генерации css файлов
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов для разных браузеров
    browser = require('browser-sync'), // Подключаем сервер для обновлений Browser Sync
    cssnano = require('gulp-cssnano'), // Подключаем пакет для сжатия CSS файла
    del = require('del'); // Подключаем библиотеку для удаления файлов и папок

var config ={
    paths:{
        scss:'src/scss/**/*.scss',
        css:'src/css/**/*.css',
        html:'src/**/*.html',
        js:'src/**/*.js'
    },
    output:{
        nameFileCss:'main.min.css',
        pathCss:'src/css'
    },
    srv_options:{
        basePath:'src'
    }
};
gulp.task('browser', function(){
    browser({
        server: {
            baseDir: config.srv_options.basePath
        },
        notify: false
    });
});


gulp.task('scss', function () {
    gulp.src(config.paths.scss)
        .pipe(sass())
        .pipe(concat(config.output.nameFileCss))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(config.output.pathCss))
        .pipe(browser.reload({stream: true}));
});



gulp.task('watch',['scss','browser'], function () {
    gulp.watch(config.paths.scss, ['scss'],browser.reload);
    gulp.watch(config.paths.html,browser.reload);
    gulp.watch(config.paths.js,browser.reload);
    gulp.watch(config.paths.css,browser.reload);
});

gulp.task('default',['watch']);


