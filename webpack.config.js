var webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './JQ.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Jquery.js'
    }
};