const path = require('path');
console.log("hi");
console.log(require.resolve("babel-preset-react"));
console.log("hi");
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
							presets: ['es2015','react','stage-2' ]
						}
					}
				],
				exclude: path.join(__dirname, 'node_modules')
			}
		]
	}
}
