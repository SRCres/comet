module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      js: {
        src: ['dist']
      }
    },

    jshint: {
      options: {
        globals: {
          jQuery: true
        },
      },
      all: ['Gruntfile.js', 'app/js/**/*.js', 'dist/**/*.js']
    },

    requirejs: {
      options: {
        baseUrl: 'app',
        name: 'init',
        mainConfigFile: './app/requireConfig.js',
        include: ['vendor/requirejs/require']
      },
      dev: {
        options: {
          out: 'dist/<%= pkg.name %>.js',
          optimize: 'none'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['clean:js', 'jshint', 'requirejs']);
};
