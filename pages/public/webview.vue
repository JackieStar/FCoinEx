<template>
	<view class="webview">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	import { commonMixin } from '@/common/mixin/mixin.js';
	export default {
		mixins: [commonMixin],
		data() {
			return {
				url: ''
			}
		},
		onLoad(e) {
			this.url = e.url
			console.log('this.url', this.url)
			uni.setNavigationBarTitle({
				title: e.title
			});
		},
		
	}
</script>

<style lang="scss" scoped>
	page {
		background: #fff;
		padding-top: 140upx;
	}
</style>
