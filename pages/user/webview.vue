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
			let title = null
			if (e.type === '2') title = this.i18n.user.community
			if (e.type === '3') title = this.i18n.user.help
			if (e.type === '4') title = this.i18n.user.about
			if (e.type === '5') title = this.i18n.user.download
			uni.setNavigationBarTitle({
				title: title
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
