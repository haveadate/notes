// 引入 MongoDB 第三方操作模块 mongoose
const mongoose = require('mongoose')
// 获取 mongoose 架构
const Schema = mongoose.Schema

// 1. 连接数据库[事前不必存在，若不存在，MongoDB 会帮我们创建]
mongoose.connect('mongodb://localhost:27017/college', {
	useUnifiedTopology: true,
	useNewUrlParser: true
})

// 2. 设计文档结构(也就是我们熟悉的表结构)
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
const stuSchema = new Schema({
	stuName: {
		type: String,
		required: true // 进行约束：该字段必须有
	},
	stuGender: {
		type: Boolean,
		required: true
	},
	stuEmail: {
		type: String
	}
})

// 3. 将文档结构发布为模型
// mongoose.model 方法就是用来将一个架构发布为 model
// 第一个参数：传入一个首字母大写单数名词用来表示集合名称
// 		mongoose 会自动将大写名词字符串生成小写复数集合名称
// 		例如这里，Student 会变成 students
// 第二个参数：架构(Schema)
// 返回值：模型构造函数
const Student = mongoose.model('Student', stuSchema)

// 增加数据
const student = new Student({
	stuName: '张三',
	stuGender: true,
	stuEmail: 'admin@qq.com'
})

// 保存至数据库
// student.save().then(data => console.log(data))

// 查找所有数据
Student.find().then(data => console.log(data))
// 查找性别为男的数据（true: 男，false: 女）
// Student.find({ stuGender: true }).then(data => console.log(data))

// 查找第一条数据
// Student.findOne().then(data => console.log(data))
// 根据条件查找第一条数据
// Student.findOne({ stuGender: false }).then(data => console.log(data))

// 删除一条指定条件的数据
// Student.deleteOne({ stuName: '张三' }).then(data => console.log(data))
// 删除多条指定条件的数据
// Student.deleteMany({ stuGender: true }).then(data => console.log(data))

// 根据 id 修改数据
// 参数1：id，参数2：需要修改的内容
// Student.findByIdAndUpdate('5fed3be0ce8a8640848fa28a', {
// 	stuGender: true
// }).then(data => console.log(data))

// 根据指定条件修改数据
// Student.updateOne({ stuName: '李四' }, { stuEmail: 'haveadate@qq.com' }).then(data => console.log(data))