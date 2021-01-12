# TypeScript 学习笔记

## 相关信息

> 视频地址：https://www.bilibili.com/video/BV1Xy4y1v7S2?from=search&seid=335637898792380515
>
> github：https://github.com/haveadate
>
> 码云：https://gitee.com/haveadate
>
> email：haveadate@qq.com

## 初识 TS

### 安装

```shell
# 安装
npm i typescript -g
```

```shell
# 验证是否安装成功
C:\Users\haveadate>tsc -v
Version 4.1.3
```

### 初步介绍

- 以 `JavaScript` 为基础构建的语言；
- 可以在任何支持 `JavaScript` 的平台中执行；
- **不能**被 JS 解析器直接执行（预先需要将 `.ts` 文件转成 `.js` 文件）；
- 是一个 `JavaScript` 的超集；
- `TypeScript` 扩展了 `JavaScript`，并添加了类型；

### 将 .ts 文件解析成 .js 文件

```shell
tsc xxx.ts
```

## 语法

### 声明变量并指定类型

```typescript
// 声明一个变量 stuName 同时指定它的类型为 string
let stuName: string;
// stuName 的类型设置成了 string，在以后的使用过程中，stuName 的值只能是 string 类型
stuName = '张三';
// 报错：不能将 number 类型赋值给 string 类型
stuName = 123;
```

```shell
$ tsc index
index.ts:6:1 - error TS2322: Type 'number' is not assignable to type 'string'.
```

### 声明变量并赋值、指定类型

```typescript
// 声明一个变量并赋值，同时隐式指定变量类型是 string
let stuName = '张三';
// 抛出错误，类型不匹配
// index.ts:4:1 - error TS2322: Type 'number' is not assignable to type 'string'.
stuName = 123;
```

### 指定函数参数类型和返回值类型

```typescript
// 若类型不匹配，同样会报错
function sum(num1: number, num2: number): number {
	return num1 + num2;
}
```

### TS 变量类型

#### 基本类型
​		`string、number、boolean`；

#### 字面量类型

​		`let num: 10;`，此时该变量值**只能**是 **10**，若赋其它值给 num，编译成 JS 时会报错；

#### 联合类型

​		`let gender = 'male' | 'female';`，此时 **gender** 可以为 `'male'`，也可以为 `'female'`；不仅仅是如此，还可以指定变量可以是多个变量类型：`let gender = string | boolean;`；

#### any

​		表示任意类型。一个变量指定类型为 any，相当于对该变量关闭了 TS 的类型检测，若声明变量(不赋值)不指定类型，则 TS 解析器会**自动**指定变量的类型为 any（隐式的 any）； 

#### unknown 

​		实际上是一个**安全的 any**。和 any 类型变量相比，**unknown** 类型的变量同样可以是**任意类型**，不过any 类型的变量**可以**直接赋值给其它类型的变量（编译不会报错，但是这样操作是不安全的），unknown 类型的变量**不能**直接赋值给其它类型的变量（可通过 **类型断言** 赋值给其它类型的变量）；

#### void

​		空值(undefined)，常用于表示函数返回值类型为 `null、undefined`；

####  never

​		没有值，常用于表示函数没有返回值，即函数不能执行完，执行过程必须中断（例如抛出异常）；

#### object

​		使用方式和其它类型类似，不同的是，在 JS 中数组、函数、{} 等都是 object 类型，以下代码都能成功编译：

```typescript
let _var: object;
_var = [1, 2, 3];
_var = {};
_var = (num1, num2) => num1 + num2;
```

​		以上代码说明在指定类型为 **object** 时并没有很好的效果，不过比较有用的是**结合字面量类型限制对象的属性**：

```typescript
// obj1 变量存储的对象有且只能有一个值类型为 string 的 name 属性
let obj1: { name: string };
obj1 = { name: '张三' };

// 在属性名后面加上 ?，表示该属性是可选的（obj2 变量存储对象包含该属性是可选的）
let obj2: { name: string; age?: number };
obj2 = { name: '李四' };
obj2 = { name: '李四', age: 22 };

// 通过以下语法，表示 obj3 对象必须包含 name 属性，其它的随意
let obj3: { name: string; [propName: string]: any };
obj3 = { name: '王五', age: 22, sex: 'male' };
```

#### Fuction

​		指定变量类型为**函数(Function)**。类似地，给直接指定变量类型为 Function 也没有太多意义，最主要的是限制函数的结构，语法和限制 object 类似。

```typescript
// 类似地，也可以指定函数结构声明：
// 		语法：(形参:类型, 形参:类型...) => 返回值类型
let sum: (num1: number, num2: number) => number;
// 形参名不一定保持一致，即 num1、num2变量名不要求保持一致
sum = (n1, n2) => n1 + n2;
```

#### Array

```typescript
// 数组的类型声明：
// 		类型[]
// 		Array<类型>
let arr1: string[];
arr1 = ['香蕉', '苹果', '梨'];
let arr2: Array<string>;
arr2 = ['香蕉', '苹果', '梨']
```

#### tuple(元组)

```typescript
// 元组：固定长度的数组
// 		语法：[类型, 类型, 类型...]
let tuple1: [string, string, string];
tuple1 = ['20173101', '张三', 'male'];
```

#### enum(枚举)

```typescript
// 定义一个枚举
enum Gender {
	Male = 0,
	Female = 1
}

// 指定变量类型为枚举
let sex: Gender;
sex = Gender.Male;
```

### & 操作符

```typescript
// & 表示同时
let obj: { name: string } & { gender: number };
obj = { name: '张三', gender: 1 };
```

### 类型别名

```typescript
// 定义类型别名
type stuInfo = { name: string } & { gender: number };
let obj: stuInfo;
obj = { name: '李四', gender: 0 };
```

###  类型断言

> 语法：
>
> ​		变量	as	类型
>
> ​		or
>
> ​		<类型>变量

​		通过类型断言，可以将 `unknown` 类型变量赋值给其它类型变量，如果类型 unknown 类型变量值和其它类型不匹配也不会报错【感觉会埋下隐患】。

```typescript
let variable: unknown;
variable = '张三';
let uName: string = variable as string;
variable = 22;
let uAge: number = <number>variable;
```

### TS 编译选项

#### 对某个文件进行监视

```shell
# 对 index.ts 文件进行监视，-w 就是监听监视的意思(watch)；
# 如果文件发生改变，就会自动进行编译
tsc index -w
```

​		通过 `Ctrl + C`命令关闭监视；通过此方式，如果要监视多个文件，这意味着要开启多个命令行窗口，对不同的文件进行监视，这显然不是很方便的。

#### 对多个文件进行编译和监视

​		若要同时对多个文件进行编译、监视，那么需要添加 **TS 编译器**的配置文件 `tsconfig.json` 文件(为 `{}` 就可以了)并执行以下命令：

```shell
# 对指定目录下的所有 .ts 文件进行编译
$ tsc
```

```shell
# 对指定目录下的所有 .ts 文件进行监视
$ tsc -w
```

#### 配置tsconfig.json

​		`tsconfig.json` 是 TS 编译器的配置文件，TS 编译器可以根据它的信息来对代码进行编译【在路径中，`**` 表示任意目录，`*` 表示任意文件】。

配置项：

- **"include"**：用来指定哪些**目录**需要被编译(相对于 **tsconfig.json** 文件而言)【Array】;

- **"exclude"**：用来指定需要排除编译的**目录**【Array】；与 **"include"**通常只需要使用其中一个就可以了，默认值为 **["node_modules", "bower_components", "jspm_packages"]**；

- **"extends"**：定义被**继承**的配置文件；**"extends": "./config.base"**：表示当前配置文件会自动包含 **config**目录下 **base.json** 中所有配置信息；

- **"files"**：指定被编译**文件**的列表，只有需要被编译的文件少时才会用到【Array】；

- **"compilerOptions"**：编译选项是配置文件中非常重要也比较复杂的配置选项【Object】；

  + **"target"**：用来指定 TS 被编译为 ES 的版本；可选值为： **<u>'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'esnext'</u>**，默认为 **'es3'**；
  + **"module"**：用来指定要使用的模块化规范；可选值为：**<u>'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'esnext'</u>**【'es6' <=> 'es2015'】；
  + **"lib"**：用来指定项目中要使用的库，在**前端**页面开发时通常都**不**修改，在使用 **Node** 时，通常**需要**修改【可通过乱写一个运行，通过报错结果查看可填写的值】【Array】；
  + **"outDir"**：用来指定编译后文件所在目录；通常为 **"./dist"**；
  + **"outFile"**：将代码合并为一个文件，设置 outFile 后，所有的全局作用域中的代码会合并到同一个文件中；
  + **"allowJs"**：是否对 JS 文件进行编译（特别是在设置编译输出目录时），默认为 **false**；
  + **"checkJs"**：是否检查 JS 代码是否符合 TS 语法规范（类型赋值必须一致），默认为 **false**；
  + **"removeComments"**：编译时，是否移除注释，默认为 **false**；
  + **"noEmit"**：不生成编译后的文件，即是否只执行编译，检查 TS 文件的语法，不生成 JS 文件，默认值为 **false**；
  + **"noEmitOnError"**：编译当有错误时，不生成编译后的文件，默认值为 **false**；

  **编写代码具体的设置：**

  - **"alwaysStrict"**：用来设置编译后的文件是否使用严格模式，默认为 **false**；
  - **"noImplicitAny"**：不允许使用隐式的 any 类型，默认为 **false**；
  - **"noImplicitThis"**：不允许使用不明确类型的 this，默认为 **false**；
  - **"strictNullChecks"**：严格地检查空值，默认为 **false**；
  - **"strict"**：上面 4 个严格代码检查的总开关；

### webpack 打包 TS 代码

#### 安装 webpack 和 TS 相关包

```shell
# 快速生成 package.json 文件
$ npm init -y

# -D 表示 --save-dev，与之对应的 -S 表示 --save
$ npm i -S webpack webpack-cli typescript ts-loader
```

#### 添加 webpack 配置文件 webpack.config.js

```js
// 引入路径包
const path = require('path')

// webpack 中的所有配置信息都应该写在 module.exports 中
module.exports = {
	// 指定入口文件
	entry: './src/index.ts',
	// 指定打包文件所在目录
	output: {
		// 指定打包文件的目录
		path: path.resolve(__dirname, 'dist'), // 当前目录下创建 dist 文件夹
		// 设置打包后的文件名
		filename: 'bundle.js'
	},
	// 指定 webpack 打包时要使用的模块
	module: {
		// 指定要加载的规则
		rules: [{
			// test 指定的是规则生效的文件
			test: /\.ts$/,
			// 要使用的 loader
			use: 'ts-loader',
			// 要排除的文件
			exclude: /node_modules/
		}]
	}
}
```

#### 添加 ts 配置文件 tsconfig.json

```json
{
	"compilerOptions": {
		"module": "es2015",
		"target": "es2015",
		"strict": true
	}
}
```

#### webpack 插件之 html-webpack-plugin 

​		对于 **html-webpack-plugin** 插件，其作用就是根据打包生成的 `.js、.css` 文件，自动生成引用这些文件的 `.html` 文件。

**安装**：

```shell
$ npm i html-webpack-plugin -D
```

**基础配置 (in webpack.config.js)**：

```javascript
// ...
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  // 配置 webpack 插件
	plugins: [
		new HtmlWebpackPlugin()
	]
}
```

**使用 html 模板 (in webpack.config.js)**：

```javascript
// ...
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  // 配置 webpack 插件
	plugins: [
		new HtmlWebpackPlugin({
      template: './src/index.html'
    })
	]
}
```

#### webpack 服务器(webpack-dev-server)

​		**webpack-dev-server** 能根据代码改变而自动刷新页面，和 HBuilderX 内置服务器类似；不过不同的是，就算是修改 TS 文件后，也能自动监听并编译，刷新网页。

**安装**：

```shell
$ npm i webpack-dev-server -D
```

**在 package.json 文件 scripts 属性中添加如下：**

```json
"scripts": {
		"start": "webpack serve --open chrome.exe"
}
```

​		使用 `npm run start` 命令通过 **Chrome** 浏览器运行 **webpack** 服务器上的网页，从而达到修改代码，网页自动响应的效果。

#### webpack 插件之 clean-webpack-plugin

​		事实上，对于 `dist` 文件夹下打包的文件，每次打包时都是生成的新文件覆盖旧文件，在某些情况下可能出现旧文件遗留的情况，这样不是好。**clean-webpack-plugin** 插件的作用就是每次打包文件时都会先清除掉旧文件。

**安装：**

```shell
$ npm i clean-webpack-plugin -D
```

**配置 (in webpack.config.js)：**

```javascript
// ...
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // ...
  // 配置 webpack 插件
	plugins: [
    // ...
		new CleanWebpackPlugin()
	]
}
```

#### webpack 设置引用模块

​		默认地，在 JS、TS 文件模块之间的互相引用，webpack 打包时并不认识，通过以下配置，使 webpack 认识到哪些模块是可以引用的 (in webpack.config.js)：

```javascript
// ...
module.exports = {
  // ...
  
  // 设置引用模块
	resolve: {
		extensions: ['.ts', '.js']
	}
}
```

#### 浏览器兼容插件之 babel

​		对于 TS 来说，本身 `tsconfig.json` 文件已经能够将 TS 编译成指定版本的 JS 文件，但是在浏览器兼容方面，这是远远不够的，需要用到 babel 这个第三方模块。

**安装：**

```shell
$ npm i @babel/core @babel/preset-env babel-loader core-js -D
```

**配置 (in webpack.config.js)：**

```javascript
// 指定 webpack 打包时要使用的模块
module: {
	// 指定要加载的规则
	rules: [{
		// test 指定的是规则生效的文件
		test: /\.ts$/,
		// 要使用的 loader, babel 同样也需要对此进行加载
		use: [{
				loader: 'babel-loader', // 指定加载器
				options: { // 设置 babel
					presets: [ // 设置预定义环境
						[
							"@babel/preset-env", // 指定环境插件
							// 配置信息
							{
								targets: { // 需要适配的浏览器版本
									"ie": "8"
								},
								"corejs": "3", // 指定 corejs 的版本
								"useBuiltIns": "usage" // 使用 corejs 的方式，"usage" 表示按需加载
							}
						]
					]
				}
			},
			'ts-loader' // 相对位置越靠后，越先执行
		],
		// 要排除的文件
		exclude: /node_modules/
	}]
}
```

### 面向对象

#### 实例属性

```typescript
// 定义 Person 类
class Person {
	name: string;
	gender: string = 'male';
}
```

#### 静态属性

```typescript
class Login {
	static State: boolean = false;
}

// 使用
console.log(Login.State)
```

#### 只读属性

```typescript
// 定义 Person 类
class Person {
	// 有类型自动判断，不需要写 name: string 也可以
	readonly name = '张三';
}
```

​		值得注意的是：readonly 关键字也可以用在**静态属性**上。

#### 实例方法

```typescript
// 定义 Person 类
class Person {
	// 定义实例属性
	name: string = '张三';
	gender: string = '男';

	// 定义实例方法
	sayHello() {
		console.log('大家好');
	}
}

const person = new Person();
person.sayHello();
```

#### 静态方法

```typescript
// 定义 Person 类
class Person {
	// 定义实例属性
	name: string = '张三';
	gender: string = '男';

	// 定义实例方法
	static sayHello() {
		console.log('大家好');
	}
}

Person.sayHello();
```

#### 构造函数

```typescript
// 定义 Person 类
class Person {
	name: string;
	age: number;

	// 构造函数
	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	introduce() {
		console.log(`大家好，我叫${this.name}，今年${this.age}岁。`);
	}
}

const zhangsan = new Person('张三', 22);
zhangsan.introduce(); // 大家好，我叫张三，今年22岁。
```

#### 继承

```typescript
// 定义动物类
class Animal {
	name: string;
	age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	sayHello() {
		console.log('动物在叫');
	}
}

// 定义猫类，并继承动物类
class Cat extends Animal {
	// 重写 sayHello 方法
	sayHello() {
		console.log('喵喵喵~~~');
	}
}

// 定义狗类，并继承动物类
class Dog extends Animal {
	// 重写 sayHello 方法
	sayHello() {
		console.log('汪汪汪~~~');
	}
}

// 实例化阿猫、阿狗
const cat = new Cat('猫咪', 2);
const dog = new Dog('旺财', 4);
console.log(cat); // Cat { name: '猫咪', age: 2 }
console.log(dog); // Dog { name: '旺财', age: 4 }
cat.sayHello(); // 喵喵喵~~~
dog.sayHello(); // 汪汪汪~~~
```

#### super 关键字

```typescript
// 定义动物类
class Animal {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	sayHello() {
		console.log('动物在叫~~');
	}
}

// 定义狗类
class Dog extends Animal {
	age: number;

	constructor(name: string, age: number) {
		// 如果子类写了构造函数，在子类构造函数中必须对父类构造函数进行调用
		super(name);
		this.age = age;
	}

	// 重写 sayHello 方法
	sayHello() {
		// 调用父类 sayHello 方法
		// super.sayHello();

		console.log('汪汪汪~~');
	}
}

const dog = new Dog('旺财', 2);
dog.sayHello();
```

​		`super` 关键字，在子类中表示父类对象；如果子类中没有写构造函数，那么在创建子类对象时，会默认调用父类构造函数。

#### 抽象类

```typescript
// 定义动物抽象类
abstract class Animal {
	name: string;
	constructor(name: string) {
		this.name = name;
	}

	// 定义抽象方法
	// 抽象方法使用 abstract 开头，没有方法体
	// 抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写
	abstract sayHello(): void;
}

// 定义狗类
class Dog extends Animal {
	// 没有重写构造方法，默认会调用父类构造方法

	// 重写 sayHello 方法
	sayHello() {
		console.log('汪汪汪~~~');
	}
}

const dog = new Dog('旺财');
dog.sayHello();
```

​		抽象类与其它类区别不大，只是不能用来创建对象，只能用来**继承**。

#### 接口

```typescript
// 定义基本信息接口
interface IBaseInfo {
	name: string;
	age: number;

	sayHello(): void;
}

class Dog implements IBaseInfo {
	name: string;
	age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	sayHello() {
		console.log('汪汪汪~~~');
	}
}
```

​		接口用来定义一个类结构，用来定义一个类应该包含哪些属性和哪些方法，同时接口也可以当成类型声明去使用。在定义时，所有的属性都不能有实际的值，所有的方法都没有方法体，接口只定义对象的结构而不考虑实际值。

#### 属性的封装

​		和其它高级语言类似，TS 同样有 `public(默认值)、protected、private` 关键字修饰**<u>属性和方法</u>**，对属性而言，同样也有 **getter、setter**，和 **C#** 尤为相像，是同一个公司设计的语言。**getter、setter** 使用方式如下：

```typescript
class Dog {
	private _name: string;

	constructor(name: string) {
		this._name = name;
	}

	// getter、setter
	get name() {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}
}
```

​		对于声明类的结构，还有一种简便的方式，即可以直接将属性定义在构造函数中：

```typescript
class Dog {
	constructor(public name: string, public age: number) {}
}

const dog = new Dog('旺财', 2);
console.log(dog.name, dog.age); // 旺财 2
```

#### 泛型

```typescript
// 在定义函数或者类时，如果遇到类型不明确就可以使用泛型
// 泛型指代字母是任意的，并没有明确规定是 T
function print1(data) {
    console.log(data);
}
print1('hello, typescript'); // 不指定泛型，TS 可以自动对类型进行判断
print1(123); // 显示指定泛型，不容易出错
// 指定多个泛型
function print2(data1, data2) {
    console.log(data1, data2);
}
print2('张三', 22);
// T extends IToString 表示泛型 T （数据 data）必须实现 IToString 接口
function print3(data) {
    console.log(data);
    data.introduce();
}
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    introduce() {
        console.log(`你好，我叫${this.name}，今年${this.age}岁。`);
    }
}
const lisi = new Person('李四', 20);
print3(lisi);
// 在类中同样也可以使用泛型
class MyClass {
    constructor(info) {
        this.info = info;
    }
    getType() {
        console.log(typeof this.info);
    }
}
const mc = new MyClass('张三');
mc.getType();
```

## 贪吃蛇案例

### 项目环境搭建(基于 webpack)

#### 添加 package.json (使用 Node 管理包)

```shell
# 快速生成 package.json
$ npm init -y
```

#### 安装 webpack 、ts 相关包

```shell
$ npm i webpack webpack-cli typescript ts-loader -S
```

#### 添加 tsconfig.json

```json
{
	"compilerOptions": {
		"module": "es6",
		"target": "es3",
		"removeComments": true,
		"strict": true,
		"noEmitOnError": true
	}
}
```

#### 安装 html-webpack-plugin、clean-webpack-plugin 等 webpack 插件

```shell
$ npm i html-webpack-plugin clean-webpack-plugin webpack-dev-server -D
```

#### 安装项目兼容工具 babel

```shell
$ npm i @babel/core @babel/preset-env babel-loader core-js -D
```

#### 添加 webpack.config.js，对以上内容配置如下

```javascript
// 引入路径包
const path = require('path')
// 引入 webpack 插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 以某个 .html 文件为模板，生成引用 TS 生成 .js 文件的 .html 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 每次 TS 生成 dist 文件夹时，都清空 dist 文件夹下的文件, 做到旧结果不干扰结果

// webpack 中的所有配置信息都应该写在 module.exports 中
module.exports = {
	// 指定入口文件
	entry: './src/index.ts',
	// 指定打包文件所在目录
	output: {
		// 指定打包文件的目录
		path: path.resolve(__dirname, 'dist'), // 当前目录下创建 dist 文件夹
		// 设置打包后的文件名
		filename: 'bundle.js',
		// 告诉 webpack 不使用箭头函数
		environment: {
			arrowFunction: false
		}
	},
	// 指定 webpack 打包时要使用的模块
	module: {
		// 指定要加载的规则
		rules: [
			{
				// test 指定的是规则生效的文件
				test: /\.ts$/,
				// 要使用的 loader, babel 同样也需要对此进行加载
				use: [
					{ // 【再将 JS 代码通过 babel 转换】
						loader: 'babel-loader', // 指定加载器
						options: { // 设置 babel
							presets: [ // 设置预定义环境
								[
									"@babel/preset-env", // 指定环境插件
									// 配置信息
									{
										targets: { // 需要适配的浏览器版本
											"ie": "8"
										},
										"corejs": "3", // 指定 corejs 的版本
										"useBuiltIns": "usage" // 使用 corejs 的方式，"usage" 表示按需加载
									}
								]
							]
						}
					},
					'ts-loader' // 相对位置越靠后，越先执行【先将 TS 代码转换】
				],
				// 要排除的文件
				exclude: /node_modules/
			},
		]
	},
	// 配置 webpack 插件
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CleanWebpackPlugin()
	],
	// 设置引用模块
	resolve: {
		extensions: ['.ts', '.js']
	},
	mode: "production" // 打包的环境，"development" | "production" | "none"，开发|实际运用|无 
}
```

​		当然，这只是对于 webpack 打包 TS 而言，还有其它内容暂未添加。

> 具体的，还是参照本文档的 snake 案例中 webpack.config.js 文件配置。

#### 添加 less 处理模块

```shell
$ npm i less less-loader css-loader style-loader -D
```

#### 添加 css 兼容性处理(postcss)

```shell
$ npm i postcss postcss-loader postcss-preset-env -D
```

