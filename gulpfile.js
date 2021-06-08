const { series, src, dest, watch } = require('gulp'); // La dependencia Gulp, tiene multiples funciones, por lo tanto, debemos especificar cuales estamos llamando 
const sass = require('gulp-sass'); // gulp-sass solo tiene una funcion, no es necesario el uso de las llaves
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

/*----UTILIDADES CSS----*/
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

/*----UTILIDADES JS----*/

const terser = require('gulp-terser-js');
const rename = require('gulp-rename');


const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

/*
Series: Compila todas las funciones que escribamos en el archivo en el orden que fueron escrritas, para no tener que ejecutarlas a mano
Parallel ejectua todas las tareas al mismo tiempo
function css ( done ) {
    console.log('Compilando.... CSS');

    done();
}
function javascript ( done ) {
    console.log('Compilando.... JavaScript');

    done();
}
function minificandoHTML( done ) {
    console.log('Minificando.... HTML');

    done();
}
exports.css = css; 
exports.javascript = javascript;
exports.minificandoHTML = minificandoHTML;
exports.tareas = series ( css, javascript, minificandoHTML);
exports.default = parallel (css, javascript, minificandoHTML)
*/

// Funcion que compilas SASS A CSS

function css() {
    return src(paths.scss) // Ruta del archivo de Sass
        .pipe(sourcemaps.init())
        .pipe(sass()) //{outputStyle: 'expanded' //Pipe que ejecuta la compilacion de SASS A CSSS 'expanded' Saltos de Linea 'compressed' sin saltos de linea o espacios }
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css')) // Archivo destino del codigo compilado en CSS 
}

function minificarcss() {
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed' //compressed' sin saltos de linea o espacios, ideal para exportar al servidor
        }))
        .pipe(dest('./build/css'))
}

function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./build/js'))
}


function imagenes() {
    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Imagen Minificada' }))
}

function versionWebP() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Imagen Convertida al Formato WebP' }))
}




function watchArchivos() {
    watch(paths.scss, css); // watch esta a la espera de cambios en el archivo origen (SASS) y ejecuta la funcion que se le pasa en el segundo paraemtro, en este caso la funcion css que compila el codigo de sass a css.
    watch(paths.js, javascript);
}


exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.javascript = javascript;

exports.default = series(css, javascript, imagenes, versionWebP, watchArchivos);