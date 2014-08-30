'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            options: {
                ignore: [ 'box2d.js' ]
            },
            client: {
                src: [ 'client/main.js' ],
                dest: 'build/app.js'
            },
            clientDev: {
                src: [ '<%= browserify.client.src %>' ],
                dest: '<%= browserify.client.dest %>',
                options: {
                    bundleOptions: {
                        debug: true
                    },
                    watch: true
                }
            }
        },

        concat: {
            options: {
                //sourceMap: true
            },
            'build/app.js': [
                'node_modules/box2d.js/box2d.js',
                '<%= browserify.client.dest %>'
            ]
        },

        watch: {
            concat: {
                files: [ '<%= browserify.client.dest %>' ],
                tasks: [ 'concat' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [ 'browserify:client', 'concat' ]);
    grunt.registerTask('dev', [ 'browserify:clientDev', 'concat', 'watch' ]);

};