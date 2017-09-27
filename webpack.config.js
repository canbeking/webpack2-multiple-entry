
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = {
    entry:{
        'home': __dirname + "/assets/entry/home.js",
        'products': __dirname + "/assets/entry/products.js",
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].js?r=[hash]"
    },
    devtool: 'none',
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        inline: true,
        hot: true
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            use: ['babel-loader'], 
            exclude: '/node_modules/'
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
          {
            test:/\.scss$/,
            use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:['css-loader','sass-loader']    
            })
          },
          {
            test:/\.less$/,
            use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:['css-loader','less-loader']    
            })
          },
          {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {limit: 8192}
              }
            ]
          }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: ['node_modules'],
        alias: {
            //'jquery': __dirname + '/assets/js/jquery-1.12.0.min.js',
        }        
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtractTextPlugin('[name].css?r=[hash]'),
        new HtmlWebpackPlugin({
          filename: '../index.html',
          template: './tmpl/index.html',
          chunks:['home', 'common.js'],
          inject: true
        }),
        new HtmlWebpackPlugin({
          filename: '../pages/products.html',
          template: './tmpl/products.html',
          chunks:['products', 'common.js'],
          inject: true
        }),
        new es3ifyPlugin() 
    ]
};
