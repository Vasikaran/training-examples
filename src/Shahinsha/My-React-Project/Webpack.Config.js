const path = require('path');
const webpack = require("webpack");

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
					},
					{
						loader: require.resolve('./loaders/loader.js')
					}
				],
				exclude: path.join(__dirname, 'node_modules')
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			}
		]
	}
};
