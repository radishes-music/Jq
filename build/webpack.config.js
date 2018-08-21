'use strict'

var webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: '../JQ.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'Link-0.0.1.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, '../')
            }
        ]
    }
};