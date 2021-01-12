# Less 学习笔记

## 相关信息

> 视频地址：https://www.bilibili.com/video/BV1YW411T7vd?p=1
>
> github：https://github.com/haveadate
>
> 码云：https://gitee.com/haveadate
>
> email：haveadate@qq.com

## 初次邂逅Less

### 什么是Less

Less是一种动态样式语言，属于CSS预处理器的范畴，它扩展了CSS语言，增加了变量(variables)、混合(mixin)、函数等特性，使CSS更容易维护和扩展。Less可以在客户端上运行，也可以借助Node.js在服务端运行。

Less中文官网：http://lesscss.cn/

英文官网：https://lesscss.org/

bootstrap中Less教程：https://less.bootcss.com/

### Less编译工具

koala 官网：http://koala-app.com/

## Less的语法

### Less中的注释

以 `//`开头的注释，不会被编译到**CSS**文件中；

以`/* */`包裹的注释才能编译到**CSS**文件中；

这从另一个方面说明了，Less的注释有`//`和`/**/`两种。

### Less的变量

使用`@`来声明一个变量，例如：`@height: 600px;`，有以下规则：

- 用作普通属性值时，在使用的位置通过`@定义的变量`直接使用，以上面定义的height变量为例：`height: @height;`；
- 作为选择器、属性名、URL时，通过`@{定义的变量}`来使用(**一般很少使用**)，下面有例子；
- 定义的变量具有`块级作用域`、`延迟加载`的特性，`延迟加载`即先遍历代码，到遇到`}`时，才会将代码中的变量用定义的值替换；

**注意**：Less中的的变量值不需要添加`""`；


#### 替换的栗子(定义变量用于属性值、属性名、选择器)

```less
@margin_vertical: 50px;
@selector: #app;
@margin: margin;

@{selector} {
	@{margin}: @margin_vertical auto;	
}
```

对应CSS代码：

```css
#app {
  margin: 50px auto;
}
```

#### 延迟加载的栗子

```less
@num: 1;
.wrapper {
	@num: 2;
	/* 块级作用域，以最近的 @num 作为值 */
	z-index: @num;
	.inner {
		@num: 3;
		/* 延迟加载，直到.inner结尾(遇到 } )，才将里面的变量用变量的值替换 */
		z-index: @num;
		@num: 4;
	}
}
```

对应CSS代码：

```css
.wrapper {
  /* 块级作用域，以最近的 @num 作为值 */
  z-index: 2;
}
.wrapper .inner {
  /* 延迟加载，直到.inner结尾(遇到 } )，才将里面的变量用变量的值替换 */
  z-index: 4;
}
```

### Less的嵌套规则

在.css文件中，我们通常使用`后代选择器`表示层级关系，例如`.wrapper .inner`。这样变现力并不是很强，使用Less的嵌套就特别明显，例如以下案例(子组件在父组件中水平垂直居中)：

```less
.wrapper {
	position: relative;
	width: 300px;
	height: 300px;
	border: 1px solid;
	margin: 50px auto;

	.inner {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100px;
		height: 100px;
		border: 1px solid;
		margin: auto;
	}
}
```

使用Koala工具将`.less`文件编译成的`.css`文件如下：

```css
.wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid;
  margin: 50px auto;
}
.wrapper .inner {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border: 1px solid;
  margin: auto;
}
```

我们可以看到，**父子**元素CSS层级嵌套，Koala编译工具自动编译成空格分隔，例如上述代码的`.wrapper .inner`，如果想要添加**伪类、伪元素**该怎么办呢？这就需要使用下面的&操作符，表示**同级**结构：

```less
.inner {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100px;
	height: 100px;
	border: 1px solid;
	margin: auto;
	
	&:hover {
		background-color: skyblue;
	}
}
```

此时，对应的`.css`文件对应内容为：

```css
.wrapper .inner {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border: 1px solid;
  margin: auto;
}
.wrapper .inner:hover {
  background-color: skyblue;
}
```

### Less混合(mixin)

**概念**：混合就是将一系列的属性从一个规则集引入到另一个规则集的方式。定义方式类似于`"类选择器"`的定义。

原`.css`文件如下：

```css
.box1 {
	width: 100px;
	height: 100px;
	background-color: blue;
	border: 1px solid #ccc;
}

.box2 {
	width: 100px;
	height: 100px;
	background-color: orange;
	border: 1px solid #ddd;
}
```

#### 普通混合

`.less`文件定义如下：

```less
/* 这是定义的混合 */
.common {
	width: 100px;
	height: 100px;
}

.box1 {
	.common;
	background-color: blue;
	border: 1px solid #ccc;
}

.box2 {
	.common;
	background-color: orange;
	border: 1px solid #ddd;
}
```

用解析器生成的`.css`文件如下：

```css
/* 这是定义的混合 */
.common {
  width: 100px;
  height: 100px;
}

.box1 {
  width: 100px;
  height: 100px;
  background-color: blue;
  border: 1px solid #ccc;
}

.box2 {
  width: 100px;
  height: 100px;
  background-color: orange;
  border: 1px solid #ddd;
}
```

#### 不带输出的混合

在普通混合输出的`.css`文件中，我们发现`.less`文件中定义的**混合**也被当做**类**输出到`.css`中去了，不带输出的混合定义方式如下：

```less
// 这是定义的混合
.common() {
	width: 100px;
	height: 100px;
}

.box1 {
	.common;
	background-color: blue;
	border: 1px solid #ccc;
}

.box2 {
	.common;
	background-color: orange;
	border: 1px solid #ddd;
}
```

生成的`.css`文件如下：

```css
.box1 {
  width: 100px;
  height: 100px;
  background-color: blue;
  border: 1px solid #ccc;
}
.box2 {
  width: 100px;
  height: 100px;
  background-color: orange;
  border: 1px solid #ddd;
}
```

#### 带参数的混合

```less
// 这是定义的混合
.common(@bgColor, @borderColor) {
	width: 100px;
	height: 100px;
	background-color: @bgColor;
	border: 1px solid @borderColor;
}

.box1 {
	.common(red, #ccc);
}

.box2 {
	.common(green, #ddd);
}
```

生成的`.css`文件如下：

```css
.box1 {
	width: 100px;
	height: 100px;
	background-color: #ff0000;
	border: 1px solid #cccccc;
}

.box2 {
	width: 100px;
	height: 100px;
	background-color: #008000;
	border: 1px solid #dddddd;
}
```

#### 带参数且有默认值的混合

```less
// 这是定义的混合
.common(@bgColor: orange, @borderColor: #ccc) {
	width: 100px;
	height: 100px;
	background-color: @bgColor;
	border: 1px solid @borderColor;
}

.box1 {
	.common;
}

.box2 {
	.common(green, #ddd);
}
```

生成的`.css`文件如下：

```css
.box1 {
	width: 100px;
	height: 100px;
	background-color: #ffa500;
	border: 1px solid #cccccc;
}

.box2 {
	width: 100px;
	height: 100px;
	background-color: #008000;
	border: 1px solid #dddddd;
}
```

若有的参数使用默认值，有的参数使用指定值，需要**指定**相应的参数：

```less
// 这是定义的混合
.common(@bgColor: orange, @borderColor: #ccc) {
	width: 100px;
	height: 100px;
	background-color: @bgColor;
	border: 1px solid @borderColor;
}

.box1 {
	.common(@borderColor: #aaa);
}

.box2 {
	.common(green, #ddd);
}
```

生成的`.css`文件如下：

```css
.box1 {
	width: 100px;
	height: 100px;
	background-color: #ffa500;
	border: 1px solid #aaaaaa;
}

.box2 {
	width: 100px;
	height: 100px;
	background-color: #008000;
	border: 1px solid #dddddd;
}
```

#### 匹配模式

> 对于某些特殊的情况，比如在不同的应用场景，需要在盒子不同的位置设置边框，那么使用模式匹配就非常非常使用，这样能大大减少我们的代码量，话不多说，见代码【用“边框”设置不同方向的三角形】

```less
// 定义默认混合
.triangle(@color, @width, @_) {
	width: 0;
	height: 0;
	margin: 50px auto;
	border-style: solid;
	border-width: @width;
}

// 定义三角形混合[匹配模式]
// 箭头向上
.triangle(@color, @width, top) {	
	border-color: transparent transparent @color transparent;
}
// 箭头向右
.triangle(@color, @width, right) {	
	border-color: transparent transparent transparent @color;
}
// 箭头向下
.triangle(@color, @width, bottom) {	
	border-color: @color transparent transparent transparent;
}
// 箭头向左
.triangle(@color, @width, left) {	
	border-color: transparent @color transparent transparent;
}
```

以上是自定义的三角形less文件；

```less
// 导入其它less文件
@import './triangle.less';

#app {
	.triangle(#a01b02, 75px, left);
}
```

以上通过使用前面自定义的triangle.less文件创建不同方向的三角形样式；

> 注意：定义的默认混合会自动被调用，参数位置需要和模式匹配的混合相匹配，注意模式匹配时的模式位置是可变的，各定义之间位置要相同。

#### arguments变量

```less
// arguments变量
.common_border(@arg1, @arg2, @arg3) {
	border: @arguments;
}

#app {
	.common_border(1px, solid, #ccc);
}
```

输出的css如下：

```css
#app {
  border: 1px solid #cccccc;
}
```

> 对于`arguments`变量来说，其实比较好理解，相当于ES5之前的内置arguments参数，代指传入的所有参数。

### less计算

```less
#app {
	width: (100 + 200px);
}
// or
#app {
	width: (100px + 200);
}
```

输出的css如下：

```css
#app {
  width: 300px;
}
```

> 在less基本计算(加减乘除)中，只需要有一方带单位就可以了

### less继承

后续less代码基于的HTML结构：

```html
<div id="wrap">
	<div class="inner">
		inner1
	</div>
	<div class="inner">
		inner2
	</div>
</div>
```

定义“类”：

```
.center {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
}
```

我们发现：类和前面的混合类似只是**类不能有参数**。

继承类：

```less
.inner {
    //-------------------
	&:extend(.center);
    //-------------------
    // 下面为其它代码
	&:nth-child(1) {
		width: 100px;
		height: 100px;
		background-color: skyblue;
		border: 1px dashed #333;
	}

	&:nth-child(2) {
		width: 50px;
		height: 50px;
		background-color: coral;
		border: 1px dashed #333;
	}
}
```

生成的css：

```css
.center,
#wrap .inner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
```

> 本质上，less的继承解决了css中的**代码复用**[ `,` 选择器]问题，通过继承，使less生成能减少生成的css代码。

例如：如果在**#wrap**下再添加一个**.box**元素，也让它继承**center**：

```less
.inner {
	&:extend(.center);
}
.box {
	&:extend(.center);
}
```

生成的css：

```css
.center,
#wrap .inner,
#wrap .box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
```

> 直接用`:extend(.center);`继承时，只会继承`.center`的效果（表述有点拗口，请读完本句），如果想要像前面那样以更好的方式组织css代码，但是又要实现诸如`:hover`、`:link`等等效果时，需要通过`:extend(.center all)`来实现：

定义`.center:hover`：

```less
.center:hover {
	text-decoration: underline;
}

.center:focus {
	color: red;
}
```

使用`all`来继承所有与`.center`相关的类(包括伪类)：

```less
.inner {
	&:extend(.center all);
}
```

生成的css：

```css
.center:hover,
#wrap .inner:hover {
  text-decoration: underline;
}
.center:focus,
#wrap .inner:focus {
  color: red;
}
```

### less避免编译

有些时候，我们并不希望less去计算，例如`calc(100% - 20px);`:

```less
* {
	margin: calc(100% - 20px);
	padding: 0;
}
```

生成的css：

```css
* {
  margin: calc(80%);
  padding: 0;
}
```

所以我们需要less避免编译某些东西，使用`~"content"`可使less原封不动地将content输出到css中：

```less
* {
	margin: ~"calc(100% - 20px)";
	padding: 0;
}
```

生成的css：

```css
* {
  margin: calc(100% - 20px);
  padding: 0;
}
```

### 导入其它.less文件

```less
@import './triangle.less';
```

