'use strict';

var path = require('path');

var config = {
    entry: {
        'gravity-test': './gravity-test/client/main.js',
        'hello-world': './hello-world/client/main.js'
    },
    resolve: {
        alias: {}
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/build/',
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        noParse: []
    },
    externals: []
};

config.addVendor = function(name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp('^' + name + '$'));
};

config.addVendor('pixi.js', path.resolve(__dirname, './node_modules/pixi.js/bin/pixi.min.js'));

module.exports = config;
