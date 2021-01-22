

const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	lintOnSave: false, // 关闭eslint
	// 基本路径
	baseUrl: '/',
	// 输出文件目录
	outputDir: 'dist',

	assetsDir: 'alfa-js',

	indexPath: 'index.html',

	devServer: {
		open: true,
		host: '0.0.0.0',
		proxy: 'http://hrms.com', //允许跨域的域名
	},
	chainWebpack: config => {
		config.resolve.alias
			.set('@$', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('style', resolve('src/style'))
			.set('views', resolve('src/views'))
	}

}