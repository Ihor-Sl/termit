const buildFolder = './build'
const sourceFolder = './src'

const path = {
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        img: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
    },
    src: {
        html: [`${sourceFolder}/*.html`, `!${sourceFolder}/_*.html`],
        css: `${sourceFolder}/scss/style.scss`,
        js: `${sourceFolder}/js/script.js`,
        img: `${sourceFolder}/img/**/*.+(png|jpg|jpeg|ico|svg|webp|gif)`,
        fonts: `${sourceFolder}/fonts/*`
    },
    watch: {
        html: `${sourceFolder}/**/*.html`,
        css: `${sourceFolder}/scss/**/*.scss`,
        js: `${sourceFolder}/js/**/*.js`,
        img: `${sourceFolder}/img/**/*.+(png|jpg|jpeg|ico|svg|webp|gif)`,
        fonts: `${sourceFolder}/fonts/*`
    },
    clean: `${buildFolder}/`
}

const { src, dest, series, watch, parallel } = require('gulp')
const fileinclude = require('gulp-file-include')
const browsersync = require('browser-sync').create()
const scss = require('gulp-sass')(require('sass'))
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const groupMedia = require('gulp-group-css-media-queries')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')

function browserSync() {
    browsersync.init({
        server: { baseDir: path.build },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(scss({ outputStyle: "expanded" }))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(dest(path.build.css))
        .pipe(groupMedia())
        .pipe(cleanCss())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(rename({ extname: ".min.js" }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function img() {
    return src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 3,
            interlaced: true
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function clean() {
    return del(path.clean)
}

function watchFiles() {
    watch([path.watch.html], html)
    watch([path.watch.css], css)
    watch([path.watch.js], js)
    watch([path.watch.img], img)
}

const build = series(clean, parallel(img, js, css, html))
const dev = parallel(build, watchFiles, browserSync)

exports.build = build
exports.dev = dev
exports.default = dev