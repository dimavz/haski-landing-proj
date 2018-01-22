/**
 * Created by Дмитрий on 19.12.2017.
 */
var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет для генерации css файлов
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов для разных браузеров
    browser = require('browser-sync'), // Подключаем сервер для обновлений Browser Sync
    cssnano = require('gulp-cssnano'), // Подключаем пакет для сжатия CSS файла
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache = require('gulp-cache'); // Подключаем библиотеку кеширования

var config ={
    paths:{
        src:'src',
        css:'src/css/**/*.css',
        fonts:'src/fonts/**/*',
        images:'src/images/**/*',
        js:'src/js/**/*.js',
        libs:'src/libs/**/*',
        scss:'src/scss/**/*.scss',
        html:'src/**/*.html',
        php:'src/*.php'
    },
    output:{
        nameFileCss:'main.min.css',
        pathCss:'src/css',
        pathDist: 'dist',
        pathCssDist:'dist/css',
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

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('compress_css', function() {
    gulp.src(config.output.pathCss +"/"+ config.output.nameFileCss)// Выбираем основной файл стилей main.min.css
        .pipe(cssnano()) // Сжимаем его
        .pipe(gulp.dest(config.output.pathCss)); // Переносим в папку src/css
});

gulp.task('compress_img', function() {
    return gulp.src('src/imgages/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/imgages')); // Выгружаем на продакшен
});

gulp.task('build',['clean','scss','compress_css'], function () {

    // Переносим файлы css в продакшен
    var buildCss = gulp.src(config.paths.css)// Выбираем все файлы css
        .pipe(gulp.dest(config.output.pathCssDist));

    // Переносим стили шрифтов в продакшен
    var buildCssFonts = gulp.src(config.output.pathCss +'/fonts.css')
        .pipe(gulp.dest(config.output.pathCssDist));

    // Переносим шрифты в продакшен
    var buildFonts = gulp.src(config.paths.fonts)
        .pipe(gulp.dest( config.output.pathDist+'/fonts'));

    // Переносим картинки в продакшен
    var buildImages = gulp.src(config.paths.images)
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest( config.output.pathDist+'/images'));
    var buildJS = gulp.src(config.paths.js) // Переносим скрипты в продакшен
        .pipe(gulp.dest( config.output.pathDist+'/js'));
    var buildLibs = gulp.src(config.paths.libs) // Переносим скрипты в продакшен
        .pipe(gulp.dest( config.output.pathDist+'/libs'));
    var buildHtml = gulp.src(config.paths.html) // Переносим скрипты в продакшен
        .pipe(gulp.dest( config.output.pathDist));
    var buildPhp = gulp.src(config.paths.php) // Переносим PHP в продакшен
        .pipe(gulp.dest( config.output.pathDist));

});

gulp.task('default',['watch']);


