'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            client: {
                src: [ 'client/main.js' ],
                dest: 'build/app.js'
            },
            clientDev: {
                src: [ '<%= browserify.client.src %>' ],
                dest: '<%= browserify.client.dest %>',
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },

        watch: {
            app: {
                files: [
                    'client/**/*.js',
                    'lib/**/*.js',
                    'index.html'
                ],
                tasks: [ 'browserify:clientDev' ],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', [ 'browserify:client' ]);
    grunt.registerTask('dev', [ 'browserify:clientDev', 'watch' ]);

};