var config = function (grunt) {
  
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Compile Jade templates
    // Ex: grunt jade --[dev, production]
    
    jade: {
      
      //Target: dev
      dev : {
        options: {
          pretty: true,
          data: {
            debug: true
          }
        },
        files: {
          'src/index.html': 'src/templates/index-dev.jade'
        }
      },

      // Target: production
      production: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          'dist/index.html': 'src/templates/index-production.jade'
        }
      }
      
    },

    // Minify CSS
    //Ex: grunt cssmin
    
    cssmin: {

      // Target: production
      production: {
        src: 'src/assets/style/compiled/bebop.css',
        dest: 'dist/assets/style/bebop.min.css',
      }
    },

    // Minify JS
    // Ex: grunt uglify
    
    uglify: {

      // Options
      options: {
        report: 'min',
        mangle: true
      },

      // Target: production
      production: {
        files: [
          {
            src: [
              // main module
              'src/app.js',
              // any additional lib files not managed by bower or npm
              'src/assets/code/*.js',
              // config files
              'src/config/constants-prod.js',
              'src/config/themes.js',
              // app modules                           
              'src/modules/*.js',           
              'src/modules/**/*.js',
              'src/modules/**/**/*.js',
            ],
            dest: 'dist/bebop.min.js'
          }
        ]
      }
    },
    
    // Watch for file changes
    // Ex: grunt watch
    watch: {
      script: {
        files: [
          'src/templates/*.jade', 
          'src/assets/style/*.scss'
        ],
        tasks: ['build-dev'],
        options: {
          spawn: false,
          reload: true
        }
      }  
    },
    
    // Static analysis
    jshint: {
      files: {
        src: [
          'app.js',
          'app/config/*.js',
          'app/modules/*.js',
          'app/modules/**/*.js',
          'app/global/*.js',
          'app/global/**/*.js'
        ]
      }
    },
    
    // Compile sass
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/assets/style',
          src: ['*.scss'],
          dest: 'src/assets/style/compiled',
          ext: '.css'
        }]
      }
    },
    
    // Copy files
    copy: {
      components: {
        files: [
          // includes files within path
          {
            cwd: 'src/bower_components',
            expand: true, 
            src: ['**/*', ], 
            dest: 'dist/bower_components/'
          },
        ]
      },
      fonts: {
        files: [
          // includes files within path
          { 
            expand: true, 
            src: ['src/assets/style/fonts/junglefever/*'], 
            dest: 'src/assets/style/compiled/fonts/junglefever', 
            flatten: true, 
            filter: 'isFile'
          },
        ]
      },
      fonts_prod: {
        files: [
          // includes files within path
          { 
            expand: true, 
            src: ['src/assets/style/compiled/fonts/junglefever/*'], 
            dest: 'dist/assets/style/fonts/junglefever', 
            flatten: true
          },
        ]
      },
      images: {
        files: [
          // includes files within path
          {
            cwd: 'src/assets/images',
            expand: true, 
            src: ['**/*', ], 
            dest: 'dist/assets/images'
          },
        ]
      }
    },
    
    // Test runner
    // karma: {
    //   unit: {
    //     configFile: 'karma.conf.js'
    //   }
    // }
    
  });
  
  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-karma');
  
  // Register custom tasks
  grunt.registerTask('compile-sass', ['sass', 'copy:fonts'])
  grunt.registerTask('build-dev', ['compile-sass', 'jade:dev']);
  grunt.registerTask('build-prod', ['compile-sass', 'cssmin:production', 'jade:production', 'uglify:production', 'copy:components', 'copy:fonts_prod', 'copy:images']);
    
};

module.exports = config;