/**
 * Gulpfile
 * ----------------------------------------------------------------------
 * Arquivo com tasks do Gulp.
 * 
 * @type    {Object}
 * @since   0.0.1
 */

// Dependências
// ----------------------------------------------------------------------
const { dest, service, src, series, parallel, watch } = require("gulp");
const __if = require("gulp-if");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const del = require("del");
const flatten = require("gulp-flatten");
const merge = require("merge2");
const minimist = require("minimist");
const minify_css = require("gulp-clean-css");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const shell = require("gulp-shell");
const sourcemaps = require("gulp-sourcemaps");
const typescript = require("gulp-typescript");
const uglify = require("gulp-uglify");
const util = require("gulp-util");

// Config e Parâmetros
// ----------------------------------------------------------------------

// Gulpfile params
const params = require("./gulpfile.params");

// Parsed command-line args
const cmdArguments = minimist(
  process.argv.slice(2),
  params.plugins.minimist
);

// Definição de Ambiente + Caminho
// ----------------------------------------------------------------------

// Se estamos em ambiente de produção ou não
const isProduction = (
  cmdArguments.env === "production" || cmdArguments === "prod"
);

// Caminhos de arquivo para build
const pathList = {
  root: `${params.path.build + cmdArguments.env}/`,
  assets: `assets/`,
  css: `assets/css/`,
  fonts: `assets/fonts/`,
  img: `assets/img/`,
  js: `assets/js/`,
};

// Handlers
// ----------------------------------------------------------------------

/**
 * Lida com mensagens de erro.
 *
 * `emit()` é opcional, pois quebra watchers.
 * 
 * @param {*} error 
 *     Objeto com dados do erro 
 */
const handleErrors = (error) => {
  console.error(error.toString());
  // this.emit("end");
};

// Pre-build
// ----------------------------------------------------------------------

/**
 * Limpa o build anterior, antes de montar um novo.
 * 
 * @returns {*}
 */
const clean = () => {
  return del(pathList.root + "**/*");
};

// Bundling de Bibliotecas
// ----------------------------------------------------------------------

/**
 * Cria um bundle com AngularJS + extensões.
 * 
 * `params.path.module` resolve sempre para `node_modules`.
 *
 * @returns {*}
 */
const bundleAngularLibraries = () => {
  return src([
    `${params.path.module}angular/angular.min.js`,
    `${params.path.module}angular-route/angular-route.min.js`,
    `${params.path.module}angular-i18n/angular-locale_pt-br.js`,
    `${params.path.module}angular-animate/angular-animate.min.js`,
    `${params.path.module}angular-cookies/angular-cookies.min.js`,
    `${params.path.module}angular-filter/dist/angular-filter.min.js`,
    `${params.path.module}angular-recaptcha/release/angular-recaptcha.min.js`
  ]).pipe(
    plumber()
  ).pipe(
    __if(!isProduction, sourcemaps.init())
  ).pipe(
    concat("angular.js")
  ).pipe(
    uglify()
  ).pipe(
    rename(params.plugins.rename.js.angular)
  ).pipe(
    __if(!isProduction, sourcemaps.write("."))
  ).pipe(
    dest(pathList.root + pathList.js)
  );
};

/**
 * Cria um bundle com jQuery, Bootstrap e outros JavaScript não relacionados 
 * ao AngularJS.
 * 
 * `params.path.module` resolve sempre para `node_modules`.
 *
 * @returns {*}
 */
const bundleJsLibraries = () => {
  return src([
    `${params.path.module}jquery/dist/jquery.min.js`,
    `${params.path.module}bootstrap/dist/js/bootstrap.bundle.js`
  ]).pipe(
    plumber()
  ).pipe(
    __if(!isProduction, sourcemaps.init())
  ).pipe(
    concat("bundle.js")
  ).pipe(
    uglify()
  ).pipe(
    rename(params.plugins.rename.js.libs)
  ).pipe(
    __if(!isProduction, sourcemaps.write("."))
  ).pipe(
    dest(pathList.root + pathList.js)
  );
};

/**
 * Utilize esta função para criar um bundle de fontes e outros assets de 
 * bibliotecas.
 * 
 * `params.path.module` resolve sempre para `node_modules`.
 * 
 * Para SCSS/SASS, defina os imports diretamente em seu SCSS.
 *
 * @returns {*}
 */
const bundleExternalAssets = () => {
  // Fontes
  let fonts = src([
    `${params.path.module}@fortawesome/fontawesome-free/webfonts/**/*`
  ]).pipe(
    plumber()
  ).pipe(
    flatten()
  ).pipe(
    dest(pathList.root + pathList.fonts)
  );

  // Retorna stream
  return merge(fonts);
};

// Bundling de Projeto
// ----------------------------------------------------------------------

/**
 * Copia assets do projeto p/ a pasta de build.
 * 
 * @returns {*}
 */
const projectAssets = () => {
  return src([
      `${params.path.source}assets/**/*`
    ]).pipe(
      plumber()
    ).pipe(
      dest(pathList.root + pathList.assets)
    );
};

/**
 * Copia todos os arquivos HTML para a raíz do build.
 * 
 * @returns {*}
 */
const projectHtml = () => {
  return src([
      `${params.path.source}static/**/*.html`,
      `${params.path.source}ts/**/*.html`,
      `!${params.path.source}**/dummy/**/*.html`
    ]).pipe(
      plumber()
    ).pipe(
      flatten()
    ).pipe(
      dest(pathList.root)
    );
};

/**
 * Transpila o SCSS e coloca na pasta de assets do build.
 * 
 * @returns {*}
 */
const projectScss = () => {
  return src([
      `${params.path.source}scss/**/main.scss`
    ]).pipe(
      plumber()
    ).pipe(
      __if(!isProduction, sourcemaps.init())
    ).pipe(
      sass(params.plugins.sass)
    ).pipe(
      autoprefixer(params.plugins.autoprefixer)
    ).pipe(
      minify_css(params.plugins.cleanCss)
    ).pipe(
      rename(params.plugins.rename.scss)
    ).pipe(
      __if(!isProduction, sourcemaps.write("."))
    ).pipe(
      dest(pathList.root + pathList.css)
    );
};

/**
 * Transpila TypeScript para JavaScript e coloca na pasta de assets do build.
 * 
 * @returns {*}
 */
const projectTypeScript = () => {
  let tsProject = new typescript.createProject("./tsconfig.json");

  return tsProject
    .src()
    .pipe(
      plumber()
    ).pipe(
      tsProject()
    ).js
    .pipe(
      __if(!isProduction, sourcemaps.init())
    ).pipe(
      rename(params.plugins.rename.js.project)
    ).pipe(
      uglify()
    ).pipe(
      __if(!isProduction, sourcemaps.write("."))
    ).pipe(
      dest(pathList.root + pathList.js)
    );
};

// Observadores
// ----------------------------------------------------------------------

/**
 * Observa alterações nos assets do projeto.
 */
const watchAssets = () => {
  let watcher = watch([
    `${params.path.source}assets/**/*`
  ]);

  watcher.on("all", (event, path, stats) => {
    util.log(
      `Arquivo: ${path} | Evento: ${event} | Copiando assets...`
    );

    projectAssets();
  });
};

/**
 * Observa alterações nos arquivos HTML do projeto.
 */
const watchHtml = () => {
  let watcher = watch([
    `${params.path.source}static/**/*.html`,
    `${params.path.source}ts/**/*.html`,
    `!${params.path.source}**/dummy/**/*.html`
  ]);

  watcher.on("all", (event, path, stats) => {
    util.log(
      `Arquivo: ${path} | Evento: ${event} | Copiando HTML...`
    );

    projectHtml();
  });
};

/**
 * Observa alterações nos arquivos SCSS do projeto.
 */
const watchScss = () => {
  let watcher = watch([
    `${params.path.source}scss/**/_*.scss`,
    `${params.path.source}scss/**/*.scss`
  ]);

  watcher.on("all", (event, path, stats) => {
    util.log(
      `Arquivo: ${path} | Evento: ${event} | Transpilando SCSS...`
    );

    projectScss();
  });
};

/**
 * Observa alterações nos arquivos SCSS do projeto.
 */
const watchTypeScript = () => {
  let watcher = watch([
    `${params.path.source}ts/**/*.ts`,
    `!${params.path.source}ts/**/dummy/**/*.ts`
  ]);

  watcher.on("all", (event, path, stats) => {
    util.log(
      `Arquivo: ${path} | Evento: ${event} | Transpilando TypeScript...`
    );

    projectTypeScript();
  });
};

// Tarefas do Gulp
// ----------------------------------------------------------------------

/**
 * Executa o projeto com `http-server`.
 * 
 * @return {*}
 */
const run = () => {
  return src(
    pathList.root
  ).pipe(
    plumber()
  ).pipe(
    shell(`http-server -p ${params.port} ${pathList.root}`)
  );
};

/**
 * Limpa e executa linter.
 */
const prebuild = series(
  clean
);

/**
 * Monta bibliotecas e copia assets das mesmas.
 */
const libraries = parallel(
  bundleAngularLibraries,
  bundleJsLibraries,
  bundleExternalAssets
);

/**
 * Monta o projeto.
 */
const project = parallel(
  projectAssets,
  projectHtml,
  projectScss,
  projectTypeScript
);

/**
 * Build de tudo.
 */
const compile = series(
  prebuild,
  libraries,
  project
);

/**
 * Executa observadores em paralelo.
 */
const observe = parallel(
  watchAssets,
  watchHtml,
  watchScss,
  watchTypeScript
);

// Tarefas Exportadas
// ----------------------------------------------------------------------

exports.prebuild = prebuild;
exports.libraries = libraries;
exports.build = compile;
exports.watch = observe;
exports.run = series(compile, run);
exports.default = series(
  compile, 
  parallel(
    observe,
    run
  )
);
