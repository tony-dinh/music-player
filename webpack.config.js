var webpack = require('webpack');
var path = require('path');
var rootDir = process.cwd();

var entryPath = path.resolve(rootDir, 'src/app/js/app.js');
var outputPath = path.resolve(rootDir, 'src/client');

var isProd = process.env.NODE_ENV === 'production';

var config = {
    entry: entryPath,
    output: {
        filename: 'client.js',
        path: outputPath
    },
    resolve: {
        alias: {
            jquery: path.resolve(rootDir, 'src/app/js/vendor/jquery-3.1.1.min.js'),
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
    config.plugins = config.plugins.concat([
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]);
} else {
    config.devtool = 'inline-source-maps';
}

module.exports = config;
