/**
 * Gulpfile.Params
 * ----------------------------------------------------------------------
 * Arquivo com definições para execução, caminhos de projeto e options para 
 * plugins do Gulp.
 *
 * @type    {Object}
 * @since   0.0.1
 */
module.exports = {
  /**
   * Porta de execução do `http-server` ou `serve`.
   * 
   * @type {Number}
   */
  port: 1280,

  /**
   * Caminhos para pastas de build, módulos e fonte.
   * 
   * @type {Object}
   */
  path: {
    build: "./build/",
    module: "./node_modules/",
    source: "./src/"
  },

  /**
   * Parâmetros para plugins.
   * 
   * @type {Object}
   */
  plugins: {
    // CSS Autoprefixer
    autoprefixer: [
      "Android 2.3",
      "Android >= 4",
      "Chrome >= 20",
      "Firefox >= 24",
      "Explorer >= 8",
      "iOS >= 6",
      "Opera >= 12",
      "Safari >= 6"
    ],

    // Clean CSS
    cleanCss: {
      level: {
        1: {
          specialComments: "none"
        }
      }
    },

    // Minimist
    minimist: {
      string: "env",
      default: {
        env: "dev"
      }
    },

    // Rename
    rename: {
      js: {
        angular: {
          basename: "angular",
          dirname: "",
          suffix: ".min"
        },
        libs: {
          basename: "bundle",
          dirname: "",
          suffix: ".min"
        },
        project: {
          js: "build",
          dirname: "",
          suffix: ".min"
        }
      },
      scss: {
        basename: "build",
        dirname: "",
        suffix: ".min"
      }
    },

    // SASS/SCSS
    sass: {
      outputStyle: "compressed",
      precision: 8,
      includePaths: [
        "node_modules"
      ]
    }
  }
};
