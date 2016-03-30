var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname,"node_modules");
var react_path = path.resolve(node_modules, 'react/dist/react.js');
var react_dom = path.resolve(node_modules,"react-dom/dist/react-dom.js");
module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        "./public/javascripts/components/entry.js"

    ],
    output: {
        path: path.join(__dirname,'public/dist'),
        filename: "bundle.js",
        publicPath:'/dist/'
    },

    resolve: {
        alias: {
            'react': react_path,
            'react-dom':react_dom,
            'socket.io-client':path.join(node_modules,'socket.io-client','socket.io.js')
        }
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader:'babel'
            },

            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.less$/,
                    loader: 'style!css!less-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            },
            { test: /\.(eot|woff|woff2)$/, loader: "file-loader" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ],
        noParse:[/socket.io-client/]

    },
    plugins:[
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]

};
