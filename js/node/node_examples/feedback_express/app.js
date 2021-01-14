// 导入 Express 框架
const express = require('express')
// 导入时间处理模块
const moment = require('moment')
// 导入 Express 框架 POST 请求中间件 body-parser
const bodyParser = require('body-parser')

// 导入静态评论数据
let comments = require('./static/comments.js')


// 创建应用程序
const app = express()
// 将 views 目录和 public目录 开放出来
app.use('/public/', express.static('./public/'))
// 配置模板引擎 art-template
app.engine('html', require('express-art-template'))
// 配置POST请求处理中间件 body-parser
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

// 首页请求
app.get('/', (req, res) => {
	res.render('index.html', {
		comments: comments
	})
})
app.get('/index', (req, res) => {
	res.render('index.html', {
		comments: comments
	})
})

// 评论页面
app.get('/post', (req, res) => {
	res.render('post.html')
})

// 提交评论
app.post('/comment', (req, res) => {
	// 获取请求参数
	let comment = req.body
	// 添加单条评论时间
	Object.assign(comment, {
		dateTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
	})
	// 添加评论
	comments.unshift(comment)

	// 添加成功
	res.send({
		status: 200,
		msg: '评论成功'
	})
})

// 其它未处理的请求
app.use((req, res) => {
	res.render('404.html')
})


// 绑定端口号，启动服务
app.listen(8081, () => {
	console.log('server is running...')
	console.log('url: http://127.0.0.1:8081/')
})
