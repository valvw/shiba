const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = function(env) {
    return {
        entry: './src/script.js',
        target: 'web',

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new webpack.HotModuleReplacementPlugin()
        ],

        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: './',
            filename: '[name].[hash].js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {   
                    test: /\.(glb|gltf|fbx|obj)$/,
                    use: [
                        {
                         loader: 'file-loader',
                         options: {
                          outputPath: 'assets/models',
                          sourceMap: true
                         }
                        }
                       ]
                },
                {
                    // GLSL LOADER
                    // Reference
                    // Loads .glsl files as strings
                    test: /\.glsl$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: ["source-map-loader"],
                  },
            ]
        },

        devServer: {
            contentBase: 'http://localhost:8080/dist',
            port: 8080,
            hot: true,
            disableHostCheck: true
        },

        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }
    };
};
/ "dev": "webpack --env development --mode development",
   // "build": "webpack --env production --mode production --progress",
   // "watch": "webpack serve --mode development --env development --output-public-path=/dist/ --open chrome --hot"