var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = webpackMerge.smart(commonConfig, {
    entry: {
        'app': './src/app/main.aot.ts'
    },

    output: {
        path: './dist',
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: [
                'awesome-typescript-loader',
                'angular2-template-loader',
                'angular2-router-loader?aot=true&genDir=dist/src/app'
            ]
        }]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        }),
        new CopyWebpackPlugin([{
            from: './src/assets',
            to: './assets'
        }])
    ]
});
