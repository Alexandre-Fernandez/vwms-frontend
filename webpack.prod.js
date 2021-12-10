const common = require("./webpack.common")
const {merge} = require("webpack-merge")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
	mode: "production",
	output: {
		filename: "[name].[contenthash].bundle.js",
		path: `${__dirname}/dist`,
		clean: true
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css"
		})
	],
	module: {
		rules : [
			{
				test:  /\.(css|scss)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", {
					loader: "sass-loader",
					options: {
						implementation: require("sass")
					}
				}]
			},
		]
	}
})