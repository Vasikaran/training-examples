const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
              								require.resolve('babel-preset-es2015'),
              								require.resolve('babel-preset-react'),
              								require.resolve('babel-preset-stage-2')
                            ]
                        }
                    }
                ],
        				exclude: path.join(__dirname, 'node_modules')
            },{
              test:/\.css$/,
              use: [ "style-loader" , "css-loader"]
            }
        ]
    },
    plugins:[
      new webpack.optimize.UglifyJsPlugin({})
    ]
}
