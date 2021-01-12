// 应用程序
// 把当前模块所有的依赖项都声明在文件模块最上面
const http = require('http')
const fs = require('fs')
const url = require('url')

// 导入第三方模块
const template = require('art-template') // 模板引擎
const moment = require('moment') // 时间处理

// 模拟数据库数据
const comments = [{
	name: '张三',
	message: '今天天气不错',
	dateTime: '2020-12-24 16:30:59'
}, {
	name: '李四',
	message: '今天天气不错',
	dateTime: '2020-12-24 16:31:27'
}, {
	name: '王五',
	message: '今天天气不错',
	dateTime: '2020-12-24 16:31:35'
}]

http
	.createServer((req, res) => {
		// 处理url
		const urlObj = url.parse(req.url, true)
		const pathname = urlObj.pathname

		if (pathname === '/' || pathname === '/index' || pathname === '/index.html') {
			// 默认显示views/index.html
			fs.readFile('./views/index.html', (err, data) => {
				if (err) {
					// 404 not found
					fileNotFound()
						.then(data => res.end(data))
						.catch(error => res.end(error))
				} else {
					// 通过模板引擎渲染
					var htmlStr = template.render(data.toString(), {
						comments: comments
					})
					res.end(htmlStr)
				}
			})
		} else if (pathname === '/post') {
			// 显示提交评论页面
			fs.readFile('./views/post.html', (err, data) => {
				if (err) {
					// 404 not found
					fileNotFound()
						.then(data => res.end(data))
						.catch(error => res.end(error))
				} else {
					res.end(data)
				}
			})
		} else if (pathname === '/leaveMsg') {
			// 处理提交的表单
			const result = {
				status: 200,
				msg: '提交成功'
			}

			// 添加数据
			Object.assign(urlObj.query, {
				dateTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
			})
			
			// 添加评论
			comments.unshift(urlObj.query)		
			
			// 返回给客户端结果
			res.end(JSON.stringify(result))
		} else {
			// 处理其它请求
			let reqUrl = req.url
			// 只开放 /public 下的资源
			if (reqUrl.startsWith('/public')) {
				// __dirname，运行文件所在目录
				fs.readFile(__dirname + reqUrl, (err, data) => {
					if (err) {
						// 404 not found
						fileNotFound()
							.then(data => res.end(data))
							.catch(error => res.end(error))
					} else {
						res.end(data)
					}
				})
			} else {
				// 404 not found
				fileNotFound()
					.then(data => res.end(data))
					.catch(error => res.end(error))
			}
		}
	})
	.listen(8080, () => {
		console.log('服务已启动，URL: http://127.0.0.1:8080/')
	})

/**
 * 返回/views/404.html的二进制流
 */
function fileNotFound() {
	return new Promise((resolve, reject) => {
		fs.readFile(__dirname + '/views/404.html', (err, data) => {
			if (err) {
				// 404.html文件损坏或者其它原因
				// throw new Error('500 one error ocurr in server.')
				reject('500 one error ocurr in server.')
			} else {
				// 成功获取到404.html的二进制流
				resolve(data)
			}
		})
	})
}
