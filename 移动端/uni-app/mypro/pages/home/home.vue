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

<style>
	
</style>