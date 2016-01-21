
module.exports = function(grunt) {


  grunt.initConfig({

    // pkg: grunt.file.readJSON('package.json'),

    watch: {
      styles: {
        files: 'public/css/*.css',
        tasks: ['postcss']
      },
      options: {
        livereload: true,
      },
      grunt: {
        files: 'Gruntfile.js'
      },
      options: {
        spawn: false
      }
    },
    postcss: {
      options: {
        processors: [
          require('precss')(),
          require('autoprefixer-core')(),
          require('cssnano')()
        ]
      },
      dist: {
        src: 'public/css/*.css',
        dest: 'src/static/css/style.min.css'
      }
    },

    // cssnano: {
    //   dist: {
    //     src: '_public/css/dist/processed.css',
    //     dest: 'app/static/css/main.min.css'
    //   }
    // },
    // uglify: {
    //   my_target: {
    //     files: {
    //       'static/output.min.js': ['static/js/app.js']
    //     }
    //   }
    // },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'src/static/css/*.*',
            'src/*.html',
            'src/static/js/*.*',
            'src/static/js/collections/*.*',
            'src/static/js/models/*.*',
            'src/static/js/views/*.*'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "src",
            index: "SRC.html"
          }
        }
      } 
    }


  });

  // grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  // grunt.registerTask('boot', ['postcss', 'cssnano']);
  grunt.registerTask('default', ['browserSync', 'watch']);
  // grunt.registerTask('test', ['browserSync', 'watch']); 
  // grunt.registerTask('deploy', ['browserSync', 'watch']);   

};

