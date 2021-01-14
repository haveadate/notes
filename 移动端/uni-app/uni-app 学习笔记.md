# uni-app 学习笔记

## 相关信息

> 官方文档：https://uniapp.dcloud.io/README
>
> github: https://github.com/haveadate
>
> 码云：https://gitee.com/haveadate
>
> email：haveadate@qq.com

## 说明

> - 以下用表格列出的配置信息仅列出一部分，全部配置信息需查阅官网；
> - 

## 介绍

​		`uni-app` 是一个使用 `Vue` 开发所有前端应用的框架，开发者编写一套代码，可发布到 <u>IOS、Android、H5、以及各种小程序（微信、支付宝、百度、QQ等）多个平台</u>。

​		即使跨端，`uni-app` 同时也是更好的小程序开发框架，技术方面要求 Vue 和微信小程序开发经验。对于开发者来说，学习 `uni-app` 能大大减少学习成本。

## 初次接触

### 新建项目

<img src="https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210112193024677-1807374004.png" alt="image-20210112192811574" style="zoom: 80%;" />

### 运行

#### 运行到浏览器

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210112194808240-951879262.png)

#### 运行到微信小程序

​		在第一次运行时需要配置，告诉 **HBuilderX** 微信开发者工具的安装目录位置：

![image-20210112194536281](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210112194625795-1806585780.png)

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210112201625052-1013768174.png)

​		同时，微信开发者工具**服务端口**需要打开：

![image-20210112210630114](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210112210638170-866886232.png)

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210112201846061-1391964777.png)

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210112201937370-750013085.png)

### 项目结构介绍

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210113091933876-1258377008.png)

> - **pages：**存放路由页面；
> - **static：**存放静态资源，例如<u>图片、音频、视频、字体</u>；
> - **unpackage：**存放打包的应用，例如<u>安卓、iOS</u>；
> - **App.vue、main.js：**页面入口文件，和 Vue 应用保持一致；
> - **manifest.json：**应用配置，例如<u>应用图标、应用名称</u>；
> - **pages.json：**配置全局外观，入口文件；
> - **uni.scss：**项目 CSS 颜色变量；

### 开发规范

为了实现多端兼容，综合考虑编译速度、运行性能等因素，`uni-app` 约定了如下开发规范：

- 页面文件遵循 **<u>Vue 单文件组件 (SFC) 规范</u>**；
- 组件标签靠近**<u>小程序规范</u>**；
- 接口能力（JS API）靠近微信小程序规范，但需要将前缀 `wx` 替换为 `uni`；
- 数据绑定及事件处理同 `Vue` 规范，同时补充了 **<u>APP 及页面的生命周期函数</u>**；
- 为兼容多端运行，建议使用 `flex` 布局进行开发；

## 系统梳理

### [全局配置 (pages.json > globalStyle)](https://uniapp.dcloud.io/collocation/pages?id=globalstyle)

​		用于设置应用的状态栏、导航条、标题、窗口背景色等。以下列出常用的，详情请参照 [API](https://uniapp.dcloud.io/collocation/pages?id=globalstyle)。

| 属性                         | 类型     | 默认值  | 描述                                                         | 平台差异说明                                         |
| ---------------------------- | -------- | ------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| navigationBarBackgroundColor | HexColor | #F7F7F7 | 导航栏背景颜色（同状态栏背景色）                             | APP 与 H5 为 #F7F7F7，小程序平台请参考相应小程序文档 |
| navigationBarTextStyle       | String   | white   | 导航栏标题颜色及状态栏前景颜色，仅支持 black/white           |                                                      |
| navigationBarTitleText       | String   |         | 导航栏标题文字内容                                           |                                                      |
| backgroundColor              | HexColor | #ffffff | 下拉显示出来的窗口的背景色                                   | 微信小程序                                           |
| enablePullDownRefresh        | Boolean  | false   | 是否开启下拉刷新，详见[页面生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=页面生命周期)。 |                                                      |
| backgroundTextStyle          | String   | dark    | 下拉 loading 的样式，仅支持 dark / light                     | 微信小程序                                           |
| onReachBottomDistance        | Number   | 50      | 页面上拉触底事件触发时距页面底部距离，单位只支持px，详见[页面生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=页面生命周期) |                                                      |
| …                            | …        | …       | …                                                            | …                                                    |

### [页面配置 (pages.json > pages > style )](https://uniapp.dcloud.io/collocation/pages?id=pages)

创建页面：

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210113100246904-1375714592.png)

配置 pages.json 文件：

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210113100404893-1660162644.png)

`uni-app` 通过 pages 节点配置应用由哪些页面组成，pages 节点接收一个数组，数组每个项都是一个对象，其属性值如下：

| 属性  | 类型   | 默认值 | 描述                                                         |
| :---- | :----- | :----- | :----------------------------------------------------------- |
| path  | String |        | 配置页面路径                                                 |
| style | Object |        | 配置页面窗口表现，配置项参考下方 [pageStyle](https://uniapp.dcloud.io/collocation/pages?id=style) |

用于设置每个页面的状态栏、导航条、标题、窗口背景色等，配置方式和全局配置类似。页面中配置项会覆盖 [globalStyle](https://uniapp.dcloud.io/collocation/pages?id=globalstyle) 中相同的配置项，配置形式如下：

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210113101215688-1319663972.png)

相应的，对特定的平台，例如 `APP`，下拉刷新颜色也可以设置(H5，表示 APP)：

```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/profile/profile",
			"style": {
				"navigationBarBackgroundColor": "#E0EEE0",
				"navigationBarTitleText": "个人",
				"navigationBarTextStyle": "black",
				"h5": { // 设置 android 样式
					"pullToRefresh": { // 下拉转圈圈样式
						"color": "#CDC673"
					}
				}
			}
		},
		{
			"path": "pages/index/index"
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "white",
		"navigationBarTitleText": "mypro",
		"navigationBarBackgroundColor": "#66CDAA",
		"backgroundColor": "#9BCD9B",
		"enablePullDownRefresh": true,
		"backgroundTextStyle": "light"
	}
}
```

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210113102042849-1330688130.png)

> **注意：**每个页面在使用时，都需要在 **pages** 中进行配置；

### [tabBar 配置 (pages.json > tabBar)](https://uniapp.dcloud.io/collocation/pages?id=tabbar)

​		如果应用是一个多 tab 应用，可以通过 tabBar 配置项指定一级导航栏，以及 tab 切换时显示的对应页([API](https://uniapp.dcloud.io/collocation/pages?id=tabbar))

**Tips**

- 当设置 position 为 top 时，将不会显示 icon
- tabBar 中的 list 是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序。
- tabbar 切换第一次加载时可能渲染不及时，可以在每个tabbar页面的 onLoad 生命周期里先弹出一个等待雪花（hello uni-app使用了此方式）
- tabbar 的页面展现过一次后就保留在内存中，再次切换 tabbar 页面，只会触发每个页面的 onShow，不会再触发 onLoad。
- 顶部的 tabbar 目前仅微信小程序上支持。需要用到顶部选项卡的话，建议不使用 tabbar 的顶部设置，而是自己做顶部选项卡，可参考 hello uni-app->模板->顶部选项卡。

**属性说明：**

| 属性            | 类型     | 必填 | 默认值 | 描述                                                         | 平台差异说明                                         |
| :-------------- | :------- | :--- | :----- | :----------------------------------------------------------- | :--------------------------------------------------- |
| color           | HexColor | 是   |        | tab 上的文字默认颜色                                         |                                                      |
| selectedColor   | HexColor | 是   |        | tab 上的文字选中时的颜色                                     |                                                      |
| backgroundColor | HexColor | 是   |        | tab 的背景色                                                 |                                                      |
| borderStyle     | String   | 否   | black  | tabbar 上边框的颜色，可选值 black/white                      | App 2.3.4+ 支持其他颜色值、H5 3.0.0+                 |
| blurEffect      | String   | 否   | none   | iOS 高斯模糊效果，可选值 dark/extralight/light/none（参考:[使用说明](https://ask.dcloud.net.cn/article/36617)） | App 2.4.0+ 支持、H5 3.0.0+（只有最新版浏览器才支持） |
| list            | Array    | 是   |        | tab 的列表，详见 list 属性说明，最少2个、最多5个 tab         |                                                      |
| position        | String   | 否   | bottom | 可选值 bottom、top                                           | top 值仅微信小程序支持                               |
| fontSize        | String   | 否   | 10px   | 文字默认大小                                                 | App 2.3.4+、H5 3.0.0+                                |
| iconWidth       | String   | 否   | 24px   | 图标默认宽度（高度等比例缩放）                               | App 2.3.4+、H5 3.0.0+                                |
| spacing         | String   | 否   | 3px    | 图标和文字的间距                                             | App 2.3.4+、H5 3.0.0+                                |
| height          | String   | 否   | 50px   | tabBar 默认高度                                              | App 2.3.4+、H5 3.0.0+                                |
| …               | …        | …    | …      | …                                                            | …                                                    |

**示例：**

```json
"tabBar": {
	"color": "#87CEEB",
	"selectedColor": "#7CCD7C",
	"backgroundColor": "#FAFAD2",
	"borderStyle": "black",
	"spacing": "0px",

	"list": [{
			"text": "首页",
			"pagePath": "pages/home/home",
			"iconPath": "static/tabs/home.png",
			"selectedIconPath": "static/tabs/home-active.png"
		},
		{
			"text": "消息",
			"pagePath": "pages/message/message",
			"iconPath": "static/tabs/message.png",
			"selectedIconPath": "static/tabs/message-active.png"
		},
		{
			"text": "联系",
			"pagePath": "pages/contact/contact",
			"iconPath": "static/tabs/contact.png",
			"selectedIconPath": "static/tabs/contact-active.png"
		}
	]
}
```



### [condition 配置(页面跳转)](https://uniapp.dcloud.io/collocation/pages?id=condition)

​		启动模式配置，仅开发期间生效，用于模拟直达页面的场景，如：小程序转发后，用户点击所打开的页面。

**属性说明：**

| 属性    | 类型   | 是否必填 | 描述                             |
| :------ | :----- | :------- | :------------------------------- |
| current | Number | 是       | 当前激活的模式，list节点的索引值 |
| list    | Array  | 是       | 启动模式列表                     |

**list说明：**

| 属性  | 类型   | 是否必填 | 描述                                                         |
| :---- | :----- | :------- | :----------------------------------------------------------- |
| name  | String | 是       | 启动模式名称                                                 |
| path  | String | 是       | 启动页面路径                                                 |
| query | String | 否       | 启动参数，可在页面的 [onLoad](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=页面生命周期) 函数里获得 |

**注意：** 在 App 里真机运行可直接打开配置的页面，微信开发者工具里需要手动改变编译模式，如下图：

![img](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a4ceac70-4f2e-11eb-b680-7980c8a877b8.png)

**示例：**

```json
"condition": {
	"current": 0,
	"list": [{
		"name": "详情",
		"path": "pages/detail/detail",
		"query": "id=80"
	}]
}
```

### 基础组件

​		uni-app为开发者提供了一系列基础组件，类似HTML里的基础标签元素。

​		但uni-app的组件与HTML不同，而是与小程序相同，更适合手机端使用。

​		虽然不推荐使用HTML标签，但实际上如果开发者写了`div`等标签，在编译到非H5平台时也会被编译器转换为`view`标签，类似的还有`span`转`text`、`a`转`navigator`等，包括css里的元素选择器也会转。但为了管理方便、策略统一，新写代码时**<u>仍然建议使用view等组件</u>**。

​		开发者可以通过组合这些基础组件进行快速开发。 基于内置的基础组件，可以开发各种扩展组件，组件规范与 vue 组件相同。下面只记录比较常用的组件，其它组件请参照[官网](https://uniapp.dcloud.io/component/README)

#### [text](https://uniapp.dcloud.io/component/text?id=text)

**文本组件**：用于包裹文本内容。

**属性说明**

| 属性名     | 类型    | 默认值 | 说明         | 平台差异说明        |
| :--------- | :------ | :----- | :----------- | :------------------ |
| selectable | Boolean | false  | 文本是否可选 |                     |
| space      | String  |        | 显示连续空格 | App、H5、微信小程序 |
| decode     | Boolean | true   | 是否解码     | App、H5、微信小程序 |

**space 值说明**

| 值   | 说明                   |
| :--- | :--------------------- |
| ensp | 中文字符空格一半大小   |
| emsp | 中文字符空格大小       |
| nbsp | 根据字体设置的空格大小 |

**Tips**

- `<text>` 组件内只支持嵌套 `<text>`，不支持其它组件或自定义组件，否则会引发在不同平台的渲染差异。
- 在app-nvue下，只有`<text>`才能包裹文本内容。无法在`<view>`组件包裹文本。
- decode 可以解析的有 ` &nbsp;` `&lt;` `&gt;` `&amp;` `&apos;` `ensp;` `&emsp;`。
- 各个操作系统的空格标准并不一致。
- 除了文本节点以外的其他节点都无法长按选中。
- 支持 `\n` 方式换行。
- 如果使用 `<span>` 组件编译时会被转换为 `<text>`。

#### [view](https://uniapp.dcloud.io/component/view)

​		它类似于传统 html 中的 div，用于包裹各种元素内容。如果使用[nvue](https://uniapp.dcloud.io/nvue-outline)，则需注意，包裹文字应该使用组件。

**属性说明**

| 属性名                 | 类型    | 默认值 | 说明                                                         |
| :--------------------- | :------ | :----- | :----------------------------------------------------------- |
| hover-class            | String  | none   | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果 |
| hover-stop-propagation | Boolean | false  | 指定是否阻止本节点的祖先节点出现点击态                       |
| hover-start-time       | Number  | 50     | 按住后多久出现点击态，单位毫秒                               |
| hover-stay-time        | Number  | 400    | 手指松开后点击态保留时间，单位毫秒                           |

#### [button](https://uniapp.dcloud.io/component/button)

**属性说明**

| 属性名   | 类型    | 默认值  | 说明                      | 生效时机 | 平台差异说明                                    |
| :------- | :------ | :------ | :------------------------ | :------- | :---------------------------------------------- |
| size     | String  | default | 按钮的大小                |          |                                                 |
| type     | String  | default | 按钮的样式类型            |          |                                                 |
| plain    | Boolean | false   | 按钮是否镂空，背景色透明  |          |                                                 |
| disabled | Boolean | false   | 是否禁用                  |          |                                                 |
| loading  | Boolean | false   | 名称前是否带 loading 图标 |          | App-nvue 平台，在 ios 上为雪花，Android上为圆圈 |
| …        | …       | …       | …                         | …        | …                                               |

**size 有效值**

| 值      | 说明     |
| :------ | :------- |
| default | 默认大小 |
| mini    | 小尺寸   |

**type 有效值**

| 值      | 说明                                                         |
| :------ | :----------------------------------------------------------- |
| primary | 微信小程序、360小程序为绿色，App、H5、百度小程序、支付宝小程序、快应用为蓝色，字节跳动小程序为红色，QQ小程序为浅蓝色。如想在多端统一颜色，请改用default，然后自行写样式 |
| default | 白色                                                         |
| warn    | 红色                                                         |

#### [image](https://uniapp.dcloud.io/component/image)

| 属性名 | 类型   | 默认值        | 说明                 | 平台差异说明 |
| :----- | :----- | :------------ | :------------------- | :----------- |
| src    | String |               | 图片资源地址         |              |
| mode   | String | 'scaleToFill' | 图片裁剪、缩放的模式 |              |
| …      | …      | …             | …                    | …            |

**mode 有效值：**

mode 有 13 种模式，其中 4 种是缩放模式，9 种是裁剪模式。

| 模式 | 值          | 说明                                                         |
| :--- | :---------- | :----------------------------------------------------------- |
| 缩放 | scaleToFill | 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素  |
| 缩放 | aspectFit   | 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 |
| 缩放 | aspectFill  | 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 |
| …    | …           | …                                                            |

**Tips**

- `<image>` 组件默认宽度 300px、高度 225px；`app-nvue平台，暂时默认为屏幕宽度`
- `src` 仅支持相对路径、绝对路径，支持 base64 码；
- 页面结构复杂，css样式太多的情况，使用 image 可能导致样式生效较慢，出现 “闪一下” 的情况，此时设置 `image{will-change: transform}` ,可优化此问题。
- 自定义组件里面使用 `<image>`时，若 `src` 使用相对路径可能出现路径查找失败的情况，故建议使用绝对路径。
- webp格式的图片在Android上是内置支持的。iOS上不同平台不一样，具体如下：app-vue下，iOS不支持；app-nvue下，iOS支持；微信小程序2.9.0起，iOS支持。
- svg 格式的图片在不同的平台支持情况不同。具体为：app-nvue 不支持 svg 格式的图片，小程序上只支持网络地址。

### 与 Web 开发的区别

> - **单位(rpx)：**rpx 即响应式的 px，一种根据屏幕宽度自适应的动态单位，以 `750` 宽为基准，即 `750rpx` 恰好为屏幕宽度。若屏幕变宽，rpx 实际显示效果会等比放大；
> - 支持 **css 文件导入**，例如： `xxx.vue > style > @import("url");`
> - 支持基本常用选择器，例如 class、id，不能使用 `*` 选择器；
> - 定义在 App.vue 中的样式为全局样式，作用于每一个页面。在 pages 目录下的 vue 文件定义的样式为局部样式，只作用于对应的页面，并会覆盖 App.vue 中相同的选择器。<u>总而言之，父组件的样式子组件能使用，子组件的样式父组件不能使用。若父组件 style 标签添加了 scoped 修饰，则子组件不能使用父组件样式</u>；
> - 支持使用字体图标，使用方式与普通 web 项目相同，需要注意以下几点：
>   - 字体文件小于 40kB 时，uni-app 会自动将其转化为 base64 格式；
>   - 字体文件大于等于 40kB 时，需要开发者自己转换，否则使用将不生效；
>   - 字体文件引用路径推荐使用以 `~@` 开头的决定路径；

### [生命周期](https://uniapp.dcloud.io/api/lifecycle)

#### [应用生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%e5%ba%94%e7%94%a8%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)

| 函数名   | 说明                                           |
| :------- | :--------------------------------------------- |
| onLaunch | 当`uni-app` 初始化完成时触发（全局只触发一次） |
| onShow   | 当 `uni-app` 启动，或从后台进入前台显示        |
| onHide   | 当 `uni-app` 从前台进入后台                    |
| onError  | 当 `uni-app` 报错时触发                        |
| …        | …                                              |

> 应用生命周期函数在 `App.vue` 的 `script` 标签中声明

#### [页面生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)

| 函数名   | 说明                                                         | 平台差异说明 | 最低版本 |
| :------- | :----------------------------------------------------------- | :----------- | :------- |
| onLoad   | 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参），参考[示例](https://uniapp.dcloud.io/api/router?id=navigateto) |              |          |
| onShow   | 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面 |              |          |
| onReady  | 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发 |              |          |
| onHide   | 监听页面隐藏                                                 |              |          |
| onUnload | 监听页面卸载                                                 |              |          |
| …        | …                                                            | …            | …        |

### [下拉刷新](https://uniapp.dcloud.io/api/ui/pulldown)

#### 通过配置触发

​		即在 `pages.json` 文件中，对某一页面进行配置 / 全局配置 `enablePullDownRefresh` 属性为 `true`，此时在页面中通过下拉即可实现下拉刷新。

#### 通过代码触发

​		在某一事件中，通过 `uni.startPullDownRefresh()`进行触发。

#### 处理 (onPullDownRefresh)

​		在通过以上两种方式触发上拉刷新事件后，当然要进行处理，代码如下：

```vue
export default {
	// ...
	onPullDownRefresh() {
		// 耗时操作		
		uni.stopPullDownRefresh() // 隐藏下拉刷新的图标
	}
}
```

### 上拉加载

#### 通过配置触发

​		即在 `pages.json` 文件中，对某一页面进行配置 `onReachBottomDistance` 属性的值，设置触发上拉加载时间的距离。

#### 处理 (onReachBottom)

```vue
export default {
	// ...
	onReachBottom() {
		// 请求下一页数据
		// ...
	}
}
```

### [网络请求](https://uniapp.dcloud.io/api/request/request)

​		形如这样的形式

```vue
getNetworkData() {
	uni.request({
		url: 'xxx',
		method: 'POST',
		data: {
			// ..
		},
		success(data) {
			console.log(data)
		}
	})
}
```

### [数据缓存](https://uniapp.dcloud.io/api/storage/storage?id=setstorage)

#### [uni.setStorage(OBJECT)](https://uniapp.dcloud.io/api/storage/storage?id=setstorage)

​		将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。

**OBJECT 参数说明**

| 参数名   | 类型     | 必填 | 说明                                                         |
| :------- | :------- | :--- | :----------------------------------------------------------- |
| key      | String   | 是   | 本地缓存中的指定的 key                                       |
| data     | Any      | 是   | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |
| success  | Function | 否   | 接口调用成功的回调函数                                       |
| fail     | Function | 否   | 接口调用失败的回调函数                                       |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

**示例：**

```javascript
setStorage() {
	uni.setStorage({
		key: 'username',
		data: 'lvdm',
		success() {
			console.log('存储成功')
		},
		fail() {
			console.log('存储失败')
		},
		complete() {
			console.log('执行了存储操作')
		}
	})
}
```

网页存储位置如下：

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210113194014597-1824202574.png)

小程序存储位置如下：

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210113194228257-1351806626.png)

#### [uni.setStorageSync(KEY,DATA)](https://uniapp.dcloud.io/api/storage/storage?id=setstoragesync)

​		将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个**同步**接口。

**参数说明**

| 参数 | 类型   | 必填 | 说明                                                         |
| :--- | :----- | :--- | :----------------------------------------------------------- |
| key  | String | 是   | 本地缓存中的指定的 key                                       |
| data | Any    | 是   | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |

#### [uni.getStorage(OBJECT)](https://uniapp.dcloud.io/api/storage/storage?id=getstorage)

​		从本地缓存中异步获取指定 key 对应的内容。

**OBJECT 参数说明**

| 参数名   | 类型     | 必填 | 说明                                             |
| :------- | :------- | :--- | :----------------------------------------------- |
| key      | String   | 是   | 本地缓存中的指定的 key                           |
| success  | Function | 是   | 接口调用的回调函数，res = {data: key对应的内容}  |
| fail     | Function | 否   | 接口调用失败的回调函数                           |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

**示例：**

```javascript
getStorage() {
	uni.getStorage({
		key: 'username',
		success(res) {
			console.log('获取成功', res)
		},
		fail() {
			console.log('获取失败')
		},
		complete() {
			console.log('执行了获取操作')
		}
	})
}
```

结果如下：

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210113200436603-803203632.png)

#### [uni.getStorageSync(KEY)](https://uniapp.dcloud.io/api/storage/storage?id=getstoragesync)

从本地缓存中**同步**获取指定 key 对应的内容。

**参数说明**

| 参数 | 类型   | 必填 | 说明                   |
| :--- | :----- | :--- | :--------------------- |
| key  | String | 是   | 本地缓存中的指定的 key |

#### [uni.removeStorage(OBJECT)](https://uniapp.dcloud.io/api/storage/storage?id=removestorage)

​		从本地缓存中异步移除指定 key。

**OBJECT 参数说明**

| 参数名   | 类型     | 必填 | 说明                                             |
| :------- | :------- | :--- | :----------------------------------------------- |
| key      | String   | 是   | 本地缓存中的指定的 key                           |
| success  | Function | 是   | 接口调用的回调函数                               |
| fail     | Function | 否   | 接口调用失败的回调函数                           |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

**示例：**

```javascript
removeStorage() {
	uni.removeStorage({
		key: 'username',
		success() {
			console.log('删除成功')
		},
		fail() {
			console.log('删除失败')
		},
		complete() {
			console.log('执行了删除操作')
		}
	})
}
```

结果如下：

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210113201237833-505603755.png)

#### [uni.removeStorageSync(KEY)](https://uniapp.dcloud.io/api/storage/storage?id=removestoragesync)

​		从本地缓存中**同步**移除指定 key。

**参数说明**

| 参数名 | 类型   | 必填 | 说明                   |
| :----- | :----- | :--- | :--------------------- |
| key    | String | 是   | 本地缓存中的指定的 key |

### [图片处理](https://uniapp.dcloud.io/api/media/image)

#### [uni.chooseImage(OBJECT)](https://uniapp.dcloud.io/api/media/image?id=chooseimage)

​		从本地相册选择图片或使用相机拍照。App端如需要更丰富的相机拍照API（如直接调用前置摄像头），参考[plus.camera](https://www.html5plus.org/doc/zh_cn/camera.html)

**OBJECT 参数说明**

| 参数名     | 类型          | 必填 | 说明                                                         | 平台差异说明                              |
| :--------- | :------------ | :--- | :----------------------------------------------------------- | :---------------------------------------- |
| count      | Number        | 否   | 最多可以选择的图片张数，默认9                                | 见下方说明                                |
| sizeType   | Array<String> | 否   | original 原图，compressed 压缩图，默认二者都有               | App、微信小程序、支付宝小程序、百度小程序 |
| extension  | Array<String> | 否   | 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。     | H5(HBuilder X2.9.9+)                      |
| sourceType | Array<String> | 否   | album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项 |                                           |
| success    | Function      | 是   | 成功则返回图片的本地文件路径列表 tempFilePaths               |                                           |
| fail       | Function      | 否   | 接口调用失败的回调函数                                       | 小程序、App                               |
| complete   | Function      | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |                                           |

**示例：**

```javascript
getLocalImages() {
	uni.chooseImage({
		count: 8, // 实际上没什么效果
		success: data => { // 此处代理未设置完全，使用this，必须要用箭头函数
			this.imgs = data.tempFilePaths
			console.log(this.imgs)
		}
	})
}
```

结果如下：

```shell
["blob:http://localhost:8080/394cfd40-4667-4040-bb8f-4615e3a171b6"]
```

#### [uni.previewImage(OBJECT)](https://uniapp.dcloud.io/api/media/image?id=unipreviewimageobject)

​		预览图片。

**OBJECT 参数说明**

| 参数名           | 类型          | 必填         | 说明                                                         | 平台差异说明 |
| :--------------- | :------------ | :----------- | :----------------------------------------------------------- | :----------- |
| current          | String/Number | 详见下方说明 | 详见下方说明                                                 |              |
| urls             | Array<String> | 是           | 需要预览的图片链接列表                                       |              |
| indicator        | String        | 否           | 图片指示器样式，可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。 | App          |
| loop             | Boolean       | 否           | 是否可循环预览，默认值为 false                               | App          |
| longPressActions | Object        | 否           | 长按图片显示操作菜单，如不填默认为**保存相册**               | App 1.9.5+   |
| success          | Function      | 否           | 接口调用成功的回调函数                                       |              |
| fail             | Function      | 否           | 接口调用失败的回调函数                                       |              |
| complete         | Function      | 否           | 接口调用结束的回调函数（调用成功、失败都会执行）             |              |

**示例：**

​		该示例就是通过上一节选择图片，然后将它们成列出来，然后给每张图片绑定一个点击事件。点击图片后，放大图片，然后左右滑动查看图片列表图片。

```javascript
// 预览图片
previewImages(current) {
	uni.previewImage({
		current: current, // 当前点击图片地址
		urls: this.imgs, // 图片地址列表
		loop: true // 循环轮播显示图片
	})
}
```

### [跨端兼容与条件编译](https://uniapp.dcloud.io/platform?id=%e8%b7%a8%e7%ab%af%e5%85%bc%e5%ae%b9)

​		uni-app 已将常用的组件、JS API 封装到框架中，开发者按照 uni-app 规范开发即可保证多平台兼容，大部分业务均可直接满足。但每个平台有自己的一些特性，因此会存在一些无法跨平台的情况。这就需要用到条件编译：

​		**条件编译**是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

**写法：**以 #ifdef 或 #ifndef 加 **%PLATFORM%** 开头，以 #endif 结尾。

- \#ifdef：if defined 仅在某平台存在
- \#ifndef：if not defined 除了某平台均存在
- **%PLATFORM%**：平台名称

| 条件编译写法                                             | 说明                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| #ifdef **APP-PLUS** 需条件编译的代码 #endif              | 仅出现在 App 平台下的代码                                    |
| #ifndef **H5** 需条件编译的代码 #endif                   | 除了 H5 平台，其它平台均存在的代码                           |
| #ifdef **H5** \|\| **MP-WEIXIN** 需条件编译的代码 #endif | 在 H5 平台或微信小程序平台存在的代码（这里只有\|\|，不可能出现&&，因为没有交集） |

**%PLATFORM%** **可取值如下：**

| 值                      | 平台                                                         |
| :---------------------- | :----------------------------------------------------------- |
| APP-PLUS                | App                                                          |
| APP-PLUS-NVUE或APP-NVUE | App nvue                                                     |
| H5                      | H5                                                           |
| MP-WEIXIN               | 微信小程序                                                   |
| MP-ALIPAY               | 支付宝小程序                                                 |
| MP-BAIDU                | 百度小程序                                                   |
| MP-TOUTIAO              | 字节跳动小程序                                               |
| MP-QQ                   | QQ小程序                                                     |
| MP-360                  | 360小程序                                                    |
| MP                      | 微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序 |
| QUICKAPP-WEBVIEW        | 快应用通用(包含联盟、华为)                                   |
| QUICKAPP-WEBVIEW-UNION  | 快应用联盟                                                   |
| QUICKAPP-WEBVIEW-HUAWEI | 快应用华为                                                   |

**支持的文件**

- .vue
- .js
- .css
- pages.json
- 各预编译语言文件，如：.scss、.less、.stylus、.ts、.pug

**注意：**

- 条件编译是利用注释实现的，在不同语法里注释写法不一样，js使用 `// 注释`、css 使用 `/* 注释 */`、vue/nvue 模板里使用 `<!-- 注释 -->`；
- 条件编译APP-PLUS包含APP-NVUE和APP-VUE，APP-PLUS-NVUE和APP-NVUE没什么区别，为了简写后面出了APP-NVUE ；

**示例：**

```vue
<template>
	<view>
		<!-- #ifdef H5 || APP-PLUS -->
		<text>该条文本只出现在 H5 | APP 中</text>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<text>该条文本只出现在微信小程序中</text>
		<!-- #endif -->
	</view>
</template>
```

```vue
<script>
	export default {
		onLoad() {
			// #ifdef H5 || APP-PLUS
			console.log('这条消息只能出现在 H5 | APP 中')
			// #endif
			// #ifdef MP-WEIXIN
			console.log('这条消息只能出现在微信小程序中')
			// #endif
		}
	}
</script>
```

> 从以上两种情况可以看出，<u>条件编译是通过特殊定义出现在注释中的</u>，`HTML` 中条件编译定义在 `HTML` 注释中，`JS` 代码中的条件编译则定义在 `JS` 代码的注释中，同理 `CSS` 代码条件编译也定义在 `CSS` 注释中。

### 导航跳转

#### [navigator (通过组件跳转)](https://uniapp.dcloud.io/component/navigator)

​		该组件类似HTML中的`<a>`组件，但只能跳转本地页面。目标页面必须在pages.json中注册。

**属性说明**

| 属性名    | 类型   | 默认值   | 说明                                                         | 平台差异说明 |
| :-------- | :----- | :------- | :----------------------------------------------------------- | :----------- |
| url       | String |          | 应用内的跳转链接，值为相对路径或绝对路径，如："../first/first"，"/pages/first/first"，注意不能加 `.vue` 后缀 |              |
| open-type | String | navigate | 跳转方式                                                     |              |
| …         | …      | …        | …                                                            |              |

**open-type 有效值**

| 值           | 说明                                   | 平台差异说明                     |
| :----------- | :------------------------------------- | :------------------------------- |
| navigate     | 对应 uni.navigateTo 的功能             |                                  |
| redirect     | 对应 uni.redirectTo 的功能             |                                  |
| switchTab    | 对应 uni.switchTab 的功能              |                                  |
| reLaunch     | 对应 uni.reLaunch 的功能               | 字节跳动小程序不支持             |
| navigateBack | 对应 uni.navigateBack 的功能           |                                  |
| exit         | 退出小程序，target="miniProgram"时生效 | 微信2.1.0+、百度2.5.2+、QQ1.4.7+ |

**示例：**

```vue
<template>
	<view>
		<navigator url="/pages/detail/detail">跳转至详情</navigator>
		<navigator url="../home/home" open-type="switchTab">跳转至首页</navigator>
	</view>
</template>
```

> **注意：**
>
> + **url** 的值可以是相对路径，也可以是绝对路径；
> + 跳转tabbar页面，必须设置 open-type="switchTab"
> + navigator-hover 默认为 {background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}, `<navigator>` 的子节点背景色应为透明色。
> + app-nvue 平台只有纯nvue项目（render为native）才支持 `<navigator>`。非render为native的情况下，nvue暂不支持navigator组件，请使用API跳转。
> + app下退出应用，Android平台可以使用[plus.runtime.quit](https://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.quit)。iOS没有退出应用的概念。
> + 如果想实现web外链跳转，可参考[uLink组件](https://ext.dcloud.net.cn/plugin?id=1182)

​		上述**第一个跳转代码**实现效果如下：

![](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210114102522890-1544607449.png)

​		我们可以看到，跳转后，顶部标题栏会自动出现一个返回案例（跳转前的页面仍然存在）。如果不想要此按钮，则需要设置 `open-type` 属性值为 `redirect`（跳转前的页面会被销毁）。

```vue
<template>
	<view>
		<navigator url="/pages/detail/detail" open-type="redirect">跳转至详情页面并关闭当前页面</navigator>
		<navigator url="../home/home" open-type="switchTab">跳转至首页</navigator>
	</view>
</template>
```

#### [通过代码跳转](https://uniapp.dcloud.io/api/router?id=navigateto)

通过代码跳转，实际上就是将通过组件跳转的配置属性以代码方式实现，包含：

+ [uni.navigateTo(OBJECT)](https://uniapp.dcloud.io/api/router?id=navigateto)
+ [uni.redirectTo(OBJECT)](https://uniapp.dcloud.io/api/router?id=redirectto)
+ [uni.switchTab(OBJECT)](https://uniapp.dcloud.io/api/router?id=switchtab)
+ ……

#### 传递参数

​		无论是通过组件跳转，还是通过代码跳转，在跳转页面传递参数时，通过设置 `url` 的 `query` 即可，在跳转后的页面 `onLoad` 方法第一个参数即可接收（自动将 `query` 转换成 对象）：

```vue
<template>
	<view>
		<navigator url="/pages/detail/detail?username=lvdm&gender=man" open-type="redirect">跳转至详情页面并关闭当前页面</navigator>
		<navigator url="../home/home" open-type="switchTab">跳转至首页</navigator>
	</view>
</template>
```

```vue
<script>
	export default {
		// ...
		onLoad(options) {
			console.log(options) // {username: "lvdm", gender: "man"}
		}
	}
</script>
```

### 组件

> 创建和使用方式和 **Vue** 相同。

## [扩展组件 (uni-ui)](https://uniapp.dcloud.io/component/README?id=uniui)

​		uni-ui是DCloud提供的一个跨端ui库，它是基于vue组件的、flex布局的、无dom的跨全端ui框架。uni-ui不包括基础组件，**它是基础组件的补充**。

> 请查阅 API：https://uniapp.dcloud.io/component/README?id=uniui

## 打包

### 小程序

### H5

### APP