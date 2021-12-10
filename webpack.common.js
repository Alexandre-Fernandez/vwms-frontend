const {readdirSync, statSync, readFileSync} = require("fs")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const app = {
	dir: "./src/app.js",
	filename: "app.js",
	chunk: "app"
}
const pages = getPages() // [{filename, dir, chunk}, ...]
const components = getComponents() // [{filename, path}, ...]

module.exports = {
	entry: {
		[app.chunk]: app.dir,
		...pages.reduce((acc, cur) => {
			if(cur.chunk) acc[cur.chunk] = cur.dir + cur.chunk + ".js"
			return acc
		}, {})
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource"
			},
			{
			  test: /\.(woff|woff2|eot|ttf|otf)$/i,
			  type: 'asset/resource',
			},
			{
				test: /\.(mp4|webm)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
				options: {
					preprocessor: (content, loaderContext) => {
						const injections = [...components]
						// adding page sections to injections
						let path = loaderContext.resourcePath.split("\\")
						const index = path.indexOf("pages")
						if(index > -1 && /\.html$/.test(path[index + 2])) {
							const main = path.pop()
							path = path.join("/")
							readdirSync(path).forEach(cur => {
								const dir = `${path}/${cur}`
								if(statSync(dir).isFile()) return
								for(const filename of readdirSync(dir)) {
									if(/\.html$/.test(filename)) {
										injections.push({
											filename: /^index./.test(filename) 
												? cur + ".html" 
												: filename,
											path: `${dir}/${filename}`
										})
										return
									}
								}
							})
						}
						for(inject of injections) {
							content = searchAndInject(content, inject.filename, inject.path)
							let old = null
							while(content !== old ) {
								old = content
								for(const component of components) {
									content = searchAndInject(content, component.filename, component.path)
								}
							}
						}
						// absolute paths assets
						const root = "\"" + __dirname.split("\\").join("/") + "/"
						content = content.replace(/"root:\//g, root)

						return content
					}
				}
			}
		]
	},
	plugins: [
		...pages.map((page => new HtmlWebpackPlugin({
			template: page.dir + page.filename,
			filename: page.filename,
			chunks: page.chunk ? [app.chunk, page.chunk] : [app.chunk]
		})))
	],
}


function getPages() {
	const path = "./src/pages"
	return readdirSync(path).reduce((acc, cur) => {
		const page = {
			dir: `${path}/${cur}/`
		}
		if(statSync(page.dir).isFile()) return acc
		readdirSync(page.dir).forEach(filename => {
			if(/\.html$/.test(filename)) page.filename = filename
			if(page.chunk) return // one script per page (excluding app)
			if(/\.js$/.test(filename)) page.chunk = filename.match(/[^]*(?=\.js)/)[0]
		})
		acc.push(page)
		return acc
	}, [])
}


function getComponents() {
	const path = "./src/components"
	return readdirSync(path).reduce((acc, cur) => {
		const dir = `${path}/${cur}/`
		if(statSync(dir).isFile()) return acc
		for(const filename of readdirSync(dir)) {
			if(/\.html$/.test(filename)) {
				acc.push({
					filename: /^index./.test(filename) ? cur + ".html" : filename,
					path: dir + filename
				})
			}
		}
		return acc
	}, [])
}


function searchAndInject(string, filename, path) {
	const startRegex = RegExp("<" + filename, "g")
	let search
	while((search = startRegex.exec(string) !== null)) {
		const start = startRegex.lastIndex - startRegex.source.length
		if(string[startRegex.lastIndex] === "/"
		&& string[startRegex.lastIndex + 1] === ">") {
			const inject = readFileSync(path, "utf8").replace(
				"<!--children-->", ""
			)
			string = replaceBetween(string, start,
				start + startRegex.source.length + 2, inject
			)
			continue
		}
		if(string[startRegex.lastIndex] === ">") {
			const childrenRegex = new RegExp(
				`(?<=>)[^]*?(?=<\/${filename}>)`, "g"
			)
			childrenRegex.lastIndex = startRegex.lastIndex 
			const children = childrenRegex.exec(string)?.[0]
			if(children == null) {
				string = replaceBetween(string, start,
					start + startRegex.source.length + 1, ""
				)
				continue
			}
			const inject = readFileSync(path, "utf8").replace(
				"<!--children-->", children
			)
			string = replaceBetween(string, start, 
				childrenRegex.lastIndex + filename.length + 3, inject
			)
		}
	}
	return string
}

function replaceBetween(string, start, end, replacement) {
	return string.substring(0, start) + replacement + string.substring(end);
};


