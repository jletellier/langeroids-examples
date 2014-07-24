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
                    bundleOptions: {
                        debug: true
                    },
                    watch: true,
                    keepAlive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', [ 'browserify:client' ]);
    grunt.registerTask('dev', [ 'browserify:clientDev' ]);

};