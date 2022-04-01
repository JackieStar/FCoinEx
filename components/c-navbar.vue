<template>
	<view class="c-navbar">
		<u-image class="left-icon" @click="openPage" src="../../static/images/makets/avatar.png" width="56rpx" height="56rpx" mode="widthFix" />
		<view class="title">{{}}</view>
	</view>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: ''
		}
	}
	data() {
		return {
			typeList: {
				left: 'icon-zuo',
				right: 'icon-you',
				up: 'icon-shang',
				down: 'icon-xia'
			}
		};
	},
	
};
</script>

<style lang="less" scoped>
.c-navbar {
	width: 100%;
	text-align: center;
	padding: 0 24rpx 24rpx 24rpx;
	box-sizing: border-box;
	.left-icon {
		float: left;
	}
	.title {
		height: 80rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #ffffff;
		line-height: 80rpx;
		margin-right: 40rpx;
	}
}
</style>
