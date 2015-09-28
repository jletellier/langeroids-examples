var path = require('path');

module.exports = {
    entry: {
        'hello-world': './hello-world/client/main.js'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/build/',
        filename: '[name].js'
    },
    devtool: 'source-map'
};