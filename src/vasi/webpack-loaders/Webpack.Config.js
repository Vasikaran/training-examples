const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: require.resolve('./loaders/loader.js')
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                require.resolve('babel-preset-es2015')
                            ]
                        }
                    }
                ]
            }
        ]
    }
}
