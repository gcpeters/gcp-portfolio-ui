// webpack config

var path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	loaders = require('./webpack.loaders');

const HOST = process.env.HOST || 'gcp.dev';
const PORT = process.env.PORT || '3000';

module.exports = {
	entry: `./src/js/client/App.jsx`,
	output: {
		path: path.join(__dirname, 'build/js'),
		filename: 'client.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders
	}
	// devServer: {
	// 	contentBase: "./build",
	// 	// do not print bundle build stats
	// 	noInfo: true,
	// 	// enable HMR
	// 	hot: true,
	// 	// embed the webpack-dev-server runtime into the bundle
	// 	inline: true,
	// 	// serve index.html in place of 404 responses to allow HTML5 history
	// 	historyApiFallback: true,
	// 	port: PORT,
	// 	host: HOST
	// },
	// plugins: [
	// 	new webpack.NoErrorsPlugin(),
	// 	new webpack.HotModuleReplacementPlugin()
	// 	// new HtmlWebpackPlugin({
	// 	// 	template: './src/template.html'
	// 	// })
	// ]
};
