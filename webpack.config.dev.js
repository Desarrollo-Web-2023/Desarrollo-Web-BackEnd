const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.ts',
	target: 'node',
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'index.js',
		publicPath: "/",
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
	],
}
