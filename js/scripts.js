/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project'use strict';

// Requerimientos principales
const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const chokidar = require('chokidar');
const concurrently = require('concurrently');
const fs = require('fs');
const packageJSON = require('../package.json');
const pug = require('pug');
const postcss = require('postcss');
const prettier = require('prettier');
const sass = require('sass');
const sh = require('shelljs');
const upath = require('upath');

// Configuración de paths
const srcPath = upath.resolve(upath.dirname(__filename), '../src');
const destPath = upath.resolve(upath.dirname(__filename), '../dist');
const stylesPath = '../src/scss/styles.scss';
const cssDestPath = upath.resolve(upath.dirname(__filename), '../dist/css/styles.css');

// Función para limpiar el directorio dist
function cleanDist() {
    sh.rm('-rf', `${destPath}/*`);
}

// Función para renderizar assets
function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    sh.cp('-R', sourcePath, destPath);
}

// Función para renderizar Pug
function renderPug(filePath) {
    const destPath = filePath.replace(/src\/pug\//, 'dist/').replace(/\.pug$/, '.html');
    const srcPath = upath.resolve(upath.dirname(__filename), '../src');

    console.log(`### INFO: Rendering ${filePath} to ${destPath}`);
    const html = pug.renderFile(filePath, {
        doctype: 'html',
        filename: filePath,
        basedir: srcPath
    });

    const destPathDirname = upath.dirname(destPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }

    const prettified = prettier.format(html, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore'
    });

    fs.writeFileSync(destPath, prettified);
}

// Función para renderizar scripts JS
function renderScripts() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/js');
    sh.cp('-R', sourcePath, destPath);

    const sourcePathScriptsJS = upath.resolve(upath.dirname(__filename), '../src/js/scripts.js');
    const destPathScriptsJS = upath.resolve(upath.dirname(__filename), '../dist/js/scripts.js');
    
    const copyright = `/*!
* Start Bootstrap - ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
* Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
* Licensed under ${packageJSON.license} (https://github.com/StartBootstrap/${packageJSON.name}/blob/master/LICENSE)
*/
`;
    const scriptsJS = fs.readFileSync(sourcePathScriptsJS);
    fs.writeFileSync(destPathScriptsJS, copyright + scriptsJS);
}

// Función para renderizar SCSS
function renderSCSS() {
    const entryPoint = `/*!
* Start Bootstrap - ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
* Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
* Licensed under ${packageJSON.license} (https://github.com/StartBootstrap/${packageJSON.name}/blob/master/LICENSE)
*/
@import "${stylesPath}"
`;
    
    const results = sass.renderSync({
        data: entryPoint,
        includePaths: [
            upath.resolve(upath.dirname(__filename), '../node_modules')
        ],
    });

    const destPathDirname = upath.dirname(cssDestPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }

    postcss([autoprefixer]).process(results.css, {from: 'styles.css', to: 'styles.css'}).then(result => {
        result.warnings().forEach(warn => {
            console.warn(warn.toString());
        });
        fs.writeFileSync(cssDestPath, result.css.toString());
    });
}

// Función para observar cambios
function watchFiles() {
    const watcher = chokidar.watch('src', {
        persistent: true,
    });

    let READY = false;
    let allPugFiles = {};

    process.title = 'pug-watch';
    process.stdout.write('Loading');

    watcher.on('add', filePath => _processFile(upath.normalize(filePath), 'add'));
    watcher.on('change', filePath => _processFile(upath.normalize(filePath), 'change'));
    watcher.on('ready', () => {
        READY = true;
        console.log(' READY TO ROLL!');
    });

    function _processFile(filePath, watchEvent) {
        if (!READY) {
            if (filePath.match(/\.pug$/) && !filePath.match(/includes|mixins|\/pug\/layouts\//)) {
                allPugFiles[filePath] = true;
            }
            process.stdout.write('.');
            return;
        }

        console.log(`### INFO: File event: ${watchEvent}: ${filePath}`);

        if (filePath.match(/\.pug$/)) {
            return _handlePug(filePath, watchEvent);
        }

        if (filePath.match(/\.scss$/)) {
            if (watchEvent === 'change') {
                return renderSCSS();
            }
            return;
        }

        if (filePath.match(/src\/js\//)) {
            return renderScripts();
        }

        if (filePath.match(/src\/assets\//)) {
            return renderAssets();
        }
    }

    function _handlePug(filePath, watchEvent) {
        if (watchEvent === 'change') {
            if (filePath.match(/includes|mixins|\/pug\/layouts\//)) {
                return _renderAllPug();
            }
            return renderPug(filePath);
        }
        if (!filePath.match(/includes|mixins|\/pug\/layouts\//)) {
            return renderPug(filePath);
        }
    }

    function _renderAllPug() {
        console.log('### INFO: Rendering All');
        _.each(allPugFiles, (value, filePath) => {
            renderPug(filePath);
        });
    }

    // Procesar SCSS inicialmente
    renderSCSS();
}

// Función para iniciar el servidor de desarrollo
function startDevServer() {
    const browserSyncPath = upath.resolve(upath.dirname(__filename), '../node_modules/.bin/browser-sync');

    concurrently([
        { 
            command: 'node scripts/sb-watch.js', 
            name: 'SB_WATCH', 
            prefixColor: 'bgBlue.bold' 
        },
        { 
            command: `"${browserSyncPath}" --reload-delay 2000 --reload-debounce 2000 dist -w --no-online`,
            name: 'SB_BROWSER_SYNC', 
            prefixColor: 'bgGreen.bold',
        }
    ], {
        prefix: 'name',
        killOthers: ['failure', 'success'],
    }).then(
        () => console.log('Success'),
        () => console.log('Failure')
    );
}

// Ejecutar las funciones necesarias
cleanDist();
renderAssets();
renderScripts();

// Procesar archivos Pug inicialmente
sh.find(srcPath).forEach(filePath => {
    if (filePath.match(/\.pug$/) && !filePath.match(/include|mixin|\/pug\/layouts\//)) {
        renderPug(filePath);
    }
});

// Iniciar observación de cambios y servidor de desarrollo
watchFiles();
startDevServer();
// Selecciondocument.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("DOMContentLoaded", () => {
        const modal = document.getElementById("imgModal");
        const modalImg = document.getElementById("modalImg");
        const closeBtn = document.querySelector(".close-modal");
      
        document.querySelectorAll(".card-img-top").forEach(img => {
          img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
            modalImg.alt = img.alt;
          });
        });
      
        closeBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });
      
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.display = "none";
          }
        });
      });
      function expandImage(imgElement, secondImgSrc = null) {
        const modal = document.getElementById("imageModal");
        const img1 = document.getElementById("expandedImg1");
        const img2 = document.getElementById("expandedImg2");
      
        img1.src = imgElement.src;
      
        if (secondImgSrc) {
          img2.src = secondImgSrc;
          img2.style.display = "block";
        } else {
          img2.style.display = "none";
        }
      
        modal.style.display = "block";
      }
      
      function closeModal() {
        document.getElementById("imageModal").style.display = "none";
      }
      