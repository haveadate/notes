<template>
	<view>
		<navigator url="/pages/detail/detail?username=lvdm&gender=man" open-type="redirect">跳转至详情页面并关闭当前页面</navigator>
		<navigator url="../home/home" open-type="switchTab">跳转至首页</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toDetail() {
				uni.navigateTo({
					url: '../detail/detail'
				})
			}
		},
		onUnload() {
			console.log('页面被卸载了')
		}
	}
</script>

<style>

</style>
