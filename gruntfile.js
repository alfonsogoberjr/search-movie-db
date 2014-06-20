module.exports = function(grunt) {
  grunt.initConfig ({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'server.coffee',
        options: {
          "ext": "json js coffee dust scss",
          "ignore": [
            "node_modules/",
            "public/"
          ],
          "verbose": true
        }
      }
    },

    dust: {
      defaults: {
        files: {
          "public/js/vendor/dust/dusts.js": "views/dust/**/*.dust"
        },
        options: {
          wrapper: false,
          basePath: "views/dust",
          useBaseName: true
        }
      }
    },

    sass: {
      dist: {
        options: {
          includePaths: require('node-bourbon').includePaths,
          includePaths: require('node-neat').includePaths
        },
        files: {
          'public/stylesheets/vendor/sass-build.css' : 'public/stylesheets/sass/main.scss'
        }
      }
    },

    cssmin: {
      build: {
        files: {
          'public/stylesheets/app.min.css': 'public/stylesheets/vendor/*.css'
        }
      }
    },

    coffee: {
      compile: {
        files: {
          'public/js/vendor/coffee-build.js': ['public/js/coffee/init.coffee', 'public/js/coffee/models/*.coffee', 'public/js/coffee/views/*.coffee', 'public/js/coffee/mixins/*.coffee',], // compile and concat into single file
        }
      }
    },

    uglify: {
      target: {
        options: {
          sourceMap: true,
          sourceMapName: 'public/js/app.js.map'
        },
        files: {
          'public/js/app.min.js': ['public/js/vendor/jquery-1.11.1.js', 'public/js/vendor/underscore.js', 'public/js/vendor/backbone.js', 'public/js/vendor/dust/*.js', 'public/js/vendor/modernizr.js', 'public/js/vendor/*.js']
        }
      }
    },

    watch: {
      source: {
        files: ['public/stylesheets/sass/**/*.scss', 'public/stylesheets/vendor/*.css', 'public/js/coffee/**/*.coffee', 'public/js/vendor/**/*.js', 'views/dust/**/*.dust'],
        tasks: ['sass', 'coffee', 'dust', 'cssmin', 'uglify']
      }
    },

    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true,
          limit: require('os').cpus().length
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          colors: true,
          require: 'coffee-script/register'
        },
        src: ['test/**/*.coffee']
      }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-dust');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', ['concurrent:target', 'nodemon', 'sass', 'coffee', 'cssmin', 'uglify']);
  grunt.registerTask('test', ['mochaTest']);
};
