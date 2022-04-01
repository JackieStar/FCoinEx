<template>
	<view class="container">
		<view class="tabs-wrapper">
			<view class="tabs-item" @click="handleChange(1)">
				<u-image v-if="tabIndex === 1" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
				<text :style="{'color': tabIndex === 1 ? '#fff' : '#646F7B' , 'margin-top': tabIndex === 1 ? '' : '-10upx'}">充值记录</text>
			</view>
			<view class="tabs-item"  @click="handleChange(2)">
				<u-image v-if="tabIndex === 2" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
				<text :style="{'color': tabIndex === 2 ? '#fff' : '#646F7B', 'margin-top': tabIndex === 2 ? '' : '-10upx'}">充值记录</text>
			</view>
		</view>
		<view class="trade-list">
			<view class="trade-money">
				<text>充值</text>
				<text>-100.00</text>
			</view>
			<view class="trade-time">
				<text>03-03-2022 12:22:41</text>
				<text>USDT</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 1
			};
		},
		methods: {
			handleChange(type) {
				this.tabIndex = type
			}
		}
		
	};
</script>

<style lang="scss" scoped>
.tabs-wrapper {
	width: 100%;
	height: 140upx;
	display: flex;
	align-items: center;
	.tabs-item {
		width: 50%;
		height: 140upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100upx;
		// justify-content: center;
		text {
			margin-left: 2upx;
			z-index: 10;
		}
		.title-bg {
			margin-bottom: -22upx;
		}
		
	}
}
.trade-list {
	padding: 20upx 40upx;
	background-color: #1a1a1a;
	border-bottom: 1upx solid #303030;
	.trade-money {
		width: 100%;
		display: flex;
		justify-content: space-between;
		text {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
		}
	}
	.trade-time {
		width: 100%;
		display: flex;
		margin-top: 4upx;
		justify-content: space-between;
		text {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #5c6672;
		}
	}
}
</style>
