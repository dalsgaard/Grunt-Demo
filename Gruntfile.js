/*jshint node:true */

module.exports = function(grunt) {
	
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      source: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: 'test/**/*.js'
      },
      amd: {
        options: {
          jshintrc: 'amd/.jshintrc'
        },
        src: 'amd/**/*.js'
      },
      gruntfile: {
        options: {
          undef: true,
          node: true
        },
        src: 'Gruntfile.js'
      },
      build: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'public/*.js'
      }
    },

    mochaTest: {
      unit: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    jade: {
      compile: {
        expand: true,
        cwd: 'jade/',
        src: ['*.jade'],
        dest: 'public/',
        ext: '.html'
      }
    },

    sass: {
      demo: {
        expand: true,
        cwd: 'sass/',
        src: ['*.scss', '!_*.scss'],
        dest: 'public/',
        ext: '.css',
        options: {
          sourcemap: true
        }
      }
    },

    concat_sourcemap: {
      options: {
        //sourcesContent: true
      },
      files: {
        src: ['src/foo/*.js'],
        dest: 'public/main.js'
      }
    },

    requirejs: {
      foo: {
        options: {
          dir: "./build/",
          baseUrl: "amd/src",
          modules: grunt.file.readJSON('amd/build.json').modules
        },
      }
    },

    watch: {
      scripts: {
        files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        tasks: ['dev'],
        options: {
          spawn: false
          
        }
      },
      jade: {
        files: '<%= jade.compile.cwd %><%= jade.compile.src %>',
        tasks: ['jade']
      },
      sass: {
        files: '<%= sass.demo.cwd %><%= sass.demo.src %>',
        tasks: ['sass']
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-concat-sourcemap');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('lint', ['jshint:amd', 'jshint:source', 'jshint:test', 'jshint:gruntfile']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('dev', ['lint', 'test']);
  grunt.registerTask('demo', ['concat_sourcemap']);
  grunt.registerTask('build', ['concat_sourcemap', 'jshint:build']);

  grunt.registerTask('default', ['dev']);

};
