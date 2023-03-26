const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

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
	mode: 'production',
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
	externals: [nodeExternals()],
}
