# Node 补充

## 模块机制

### 封装

Node 对每个文件模块都进行了封装，形式如下：

```javascript
(function (exports, require, module, __filename, __dirname) {
	// js 文件内容
})
```

> 所以在 Node 中，每个 JS 文件都可以使用 `exports`、`require`、`module`、`__filename`、`__dirname`。
>
> + `__filename`：文件的绝对路径；
> + `__dirname`：文件所处目录对的绝对路径；

### require 方法导入的文件类型

在 Node 中，通过 `require()`  可以导入 `.js`、`.node`、`.json` 三种文件类型，解释如下：

+ `.js` 文件：这个自不必多说，每个 JS 文件都是一个模块；
+ `.node` 文件：`c/c++` 模块的编译，效率很高，但是 `c/c++` 模块的编写门槛比较高，详细了解还需要查资料；
+ `.json` 文件：Node 利用 fs 模块同步读取 JSON 文件的内容之后，调用 JSON.parse() 方法得到对象，然后将它赋给模块对象的 exports，以供外部使用。简而言之直接将 `.json` 文件转换成对象，不用我们自己写转换过程；

