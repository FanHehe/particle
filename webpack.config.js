var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
    entry: './src/main.js',
    devtool: 'eval-cheap-module-source-map',
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        publicPath: '/',
        chunkFilename: '[name].[id].[chunkhash].js'
    },
    module: {
        rules: [
            { test: /\.jsx?/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css/, use:  ExtractTextPlugin.extract(['style-loader', 'css-loader']) },
            { test: /\.scss/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [{ loader: 'css-loader', options: { modules: true, localIdentName: '[path][name]-[hash:base64:5]' } } , 'postcss-loader', 'sass-loader']}) }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new ExtractTextPlugin({ filename: 'css/[name].[id].css?[contenthash:6]', allChunks: true  }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss']
    },
};

module.exports = config;
