var webpack = require('webpack');
var path = require('path');
var rootDir = process.cwd();

var entryPath = path.resolve(rootDir, 'src/app/js/app.js');
var outputPath = path.resolve(rootDir, 'src/client');

var isProd = process.env.NODE_ENV === 'production';

var config = {
    entry: entryPath,
    output: {
        filename: 'music-app.js',
        path: outputPath
    },
    resolve: {
        alias: {
            jquery: path.resolve(rootDir, 'src/app/js/vendor/jquery.min.js'),
            bluebird: path.resolve(rootDir, 'src/app/js/vendor/bluebird.min.js')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
    }
};

if (isProd) {
    config.plugins = [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ];
} else {
    config.devtool = 'inline-source-maps';
}

module.exports = config;
