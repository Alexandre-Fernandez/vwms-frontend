const common = require("./webpack.common")
const {merge} = require("webpack-merge")

module.exports = merge(common, {
	mode: "development",
	output: {
		filename: "[name].bundle.js",
		path: `${__dirname}/dist`
	},
	devServer: {
		hot: false
	},
	module: {
		rules : [
			{
				test: /\.(css|scss)$/,
				use: ["style-loader", "css-loader", {
					loader: "sass-loader",
					options: {
						implementation: require("sass")
					}
				}]
			}
		]
	}
})