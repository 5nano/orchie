const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const brotliCompress = require('iltorb').compress; // Sadly i couldnt get it to work in time
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');

const {
	NODE_ENV,
	npm_config_analyze: analyzeBundle
} = process.env;

const devMode = NODE_ENV === 'development';

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {
	mode: NODE_ENV,
	entry: ['./src/mobile/index.js','./src/mobile/styles.scss'],
	context: path.resolve(__dirname),

	output: {
		filename: devMode ? '[name].js' : '[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new webpack.ProgressPlugin(), 
		new CleanWebpackPlugin(),
		new ManifestPlugin(),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
		}),
		new CopyPlugin([
			{ 
				from: './src/assets', 
				to: './assets',
				force: true,
			},
		  ]),
		...(() => analyzeBundle ? [new BundleAnalyzerPlugin()] : [])(),
		...(devMode ? [] : [
			new CleanWebpackPlugin(),
			new CompressionPlugin({
			  deleteOriginalAssets: true,
			}),
			new ManifestPlugin(),
		  ])
		  
			// new CompressionPlugin({ Sadly I couldnt get it to work in time
			// 	test: /\.js(\?.*)?$/i,
			// 	filename(info) {
			// 		return info.path.replace(/(.js)$/gm, '.br.js');
			// 	},
			// 	compressionOptions: {
			// 		numiterations: 3,
			// 	},
			// 	algorithm(input, compressionOptions, callback) {
			// 		return brotliCompress(input, callback);
			// 	},
			// }),
		
	],

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
				  loader: 'babel-loader',
				  options: {
					presets: ['@babel/preset-env']
				  }
				}
			  },
			{
				test: /\.(css|scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							publicPath: '../',
							hmr: devMode === 'development',
							sourceMap: !!devMode,
						},
					},
					// css-loader
					{
							loader: 'css-loader',
							options: {
							modules: {
								localIdentName: '[local]',
							},
							localsConvention: 'camelCaseOnly',
							importLoaders: 3,
						}
					},
					// sass-loader
					{ loader: 'sass-loader' },
					{
						loader: 'postcss-loader',
						options: {
							config: {
								ctx: {
								'postcss-preset-env': true,
								}
							}
						}
					}
				]
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,  
				use: [{
					loader: 'url-loader',
					options: { 
						name: '[hash]-[name].[ext]'
					} 
				}]
			},
			
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},
	watch: devMode,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 200
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.scss']
	}
};
