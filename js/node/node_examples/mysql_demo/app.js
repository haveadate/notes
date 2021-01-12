const mysql = require('mysql')

// 1. 创建连接
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '000000',
	database: 'college'
})

// 2. 连接数据库
connection.connect()

// 3. 执行数据操作
connection.query(
	"INSERT INTO STUDENTS (STU_ID, STU_NAME, STU_AGE) VALUES ('20173105', '赵六', 22)",
	(error, results, fields) => {
		if (error) throw error
		console.log('The create solution is:')
		console.log(results)
	})

connection.query('SELECT * FROM STUDENTS', (error, results, fields) => {
	if (error) throw error
	console.log('The query solution is:')
	console.log(results)
})

// 4. 关闭连接
connection.end()
