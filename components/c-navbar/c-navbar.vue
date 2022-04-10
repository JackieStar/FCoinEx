<template>
	<view class="c-navbar">
		<view class="market-header">
			<u-icon class="arrow-left" @click="openPage(0)" name="arrow-left" color="#ffffff" size="44" />
			<view class="market-text">{{title}}</view>
			<image v-if="isRightIcon" @click="openPage(1)" src="../../static/images/wallet/list.png" class="right-icon" />
			<view v-else></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		isRightIcon: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			
		};
	},
	methods: {
		openPage() {
			uni.navigateBack()
		}
	}
	
};
</script>

<style lang="less" scoped>
.c-navbar {
	width: 100%;
	text-align: center;
	padding: 0 24rpx 24rpx 24rpx;
	box-sizing: border-box;
	.market-header {
		width: 100%;
		height: 88upx;
		text-align: center;
		left: 0;
		top: 0;
		right: 0;
		background-color: #070219;
		padding: 0 41upx;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 1000;
		.market-text {
			height: 80upx;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
			line-height: 88upx;
		}
		.right-icon {
			width: 35upx;
			height: 40upx;
		}
	}
}
</style>
