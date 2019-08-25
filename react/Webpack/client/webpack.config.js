const path = require('path');
const babilPlugin = require('babili-webpack-plugin');

let plugins = [];

if(process.env.NODE_ENV == 'production'){
    plugins.push(new babilPlugin());
}

module.exports = {
    entry: './app-src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins
}