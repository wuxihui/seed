const path = require('path');
function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	lintOnSave: true,
	runtimeCompiler: true,
	publicPath: process.env.VUE_APP_BASE_URL,
	devServer: {
		open: true, // 启动服务后是否打开浏览器
		host: process.env.VUE_APP_HOST,
		port: process.env.VUE_APP_PORT, // 服务端口
		proxy: {
			'/text': {
				target: "http://10.0.0.47:8181",
				ws: true,
				changeOrigin: true,//允许跨域
			},
			'/tc': {
				target: "http://10.0.0.47:8181",
				ws: true,
				changeOrigin: true,//允许跨域
			}
		}
	},
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@$', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('api', resolve('src/api'))
			.set('common', resolve('src/common'))
			.set('layout', resolve('src/layout'))
			.set('base', resolve('src/base'))
			.set('static', resolve('src/static'))
	},
	pages: {
		index: {
			// entry for the page
			entry: 'src/main.js',
			// the source template
			template: 'public/index.html',
			// output as dist/index.html
			filename: 'index.html',
			// when using title option,
			// template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
			title: '看高手',
			// chunks to include on this page, by default includes
			// extracted common chunks and vendor chunks.
			chunks: ['chunk-vendors', 'chunk-common', 'index']
		},
		webmain: {
			// entry for the page
			entry: 'src/main.js',
			// the source template
			template: 'public/webmain.html',
			// output as dist/index.html
			filename: 'webmain.html',
			// when using title option,
			// template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
			title: '看高手',
			// chunks to include on this page, by default includes
			// extracted common chunks and vendor chunks.
			chunks: ['chunk-vendors', 'chunk-common', 'index'],
			holderTitle: '[(${title})]',
			holderLoginUrl: '[(${loginUrl})]',
			holderToken: '[(${token})]',
			holderSessionId: '[(${sessionId})]',
		},
		// when using the entry-only string format,
		// template is inferred to be `public/subpage.html`
		// and falls back to `public/index.html` if not found.
		// Output filename is inferred to be `subpage.html`.
		// subpage: 'src/subpage/main.js'
	}
}
