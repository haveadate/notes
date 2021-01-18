# Vue 补充笔记

## 使用 less

### 安装

```shell
$ npm i less less-loader -S
```

### 使用

```vue
<style lang="less">
	@margin-size: 10px;

	img {
		margin: @margin-size;
	}
</style>
```



