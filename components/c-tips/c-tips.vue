<template>
	<view class="tips-container">
		<image class="tips-icon" src="/static/images/me/tips_icon.png" />
		<text>{{text}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: ''
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tips-container {
		width: 100%;
		padding: 8upx 29upx;
		display: flex;
		align-items: center;
		
		.tips-icon {
			width: 22upx;
			height: 22upx;
			margin-right: 14upx;
			flex-shrink: 0
		}
		text {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
		}
	}
</style>
