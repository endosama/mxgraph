const path = require('path');
const webpack = require('webpack');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpackMerge = require("webpack-merge");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		main: './javascript/src/js/mxDependencies.js',
		graphEditor: './javascript/examples/grapheditor/www/js/Dependencies.js'
	},
	mode: 'production',
	devtool: 'source-map',
	module: {
		rules: [{
				test: /\.js$/,
				use: ["babel-loader"],
				exclude: [
					path.resolve(__dirname, 'node_modules')
				]
			},
			{
				test: /\.(png|jpg|bmp!gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						emitFile: true
					}
				}]
			}, {
				test: /\.(css)$/,
				use: [{
					loader: 'style-loader',
				},{
					loader: 'css-loader',
				}]
			}
		]
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'@js': path.resolve(__dirname, 'javascript', 'src', 'js'),
			'@grapheditor': path.resolve(__dirname, 'javascript', 'examples', 'grapheditor', 'www'),
			'@javascript': path.resolve(__dirname, 'javascript'),
		}
	},
	output: {
		globalObject: "this",
		filename: '[name].js',
		sourceMapFilename: '[file].map',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	plugins: [
		new CleanWebpackPlugin({}),
		new HtmlWebPackPlugin({
			title: 'MxGraph'
		}),
		new CopyWebpackPlugin([
			{
				from: './javascript/src/resources',
				to: path.join(__dirname, 'dist', 'mxgraph', 'resources'),
				toType: 'dir'
			},
			{
				from: './javascript/examples/grapheditor/www',
				to: path.join(__dirname, 'dist', 'grapheditor'),
				toType: 'dir'
			},
		])
	],
	devServer: {
		contentBase: path.join(__dirname,'dist'),
		compress: true,
		open: true,
		port: 9000,
		filename: 'main.js',
		index: 'index.html'
	}
}
