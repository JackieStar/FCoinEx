<template>
	<view class="container">
		<view class="red-packet">
			<view class="choose-me" @click="handleSubmit">{{i18n.redPacket.chooseOne}}</view>
			<view class="red-packet-wrapper">
				<view class="red-packet-btn"></view>
				<view class="red-packet-btn"></view>
				<view class="red-packet-btn"></view>
			</view>
		</view>
		<u-popup v-model="show" mode="center">
			<view class="red-success" v-if="showType" @click="handleClose">
				<view class="red-price-wrapper">
					<view class="red-price-icon">$</view>
					<view class="red-price">100</view>
				</view>
				<text class="btn">{{i18n.redPacket.btn}}</text>
			</view>
			<view class="red-fail" v-if="!showType" @click="handleClose">
				<view class="title">{{i18n.redPacket.fail}}</view>
				<view class="title-tips">{{i18n.redPacket.failTips}}</view>
				<view class="btn-text">{{i18n.redPacket.btn}}</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	mixins: [commonMixin],
	data() {
		return {
			show: false,
			showType: null
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.redPacket.title
		});
	},
	methods: {
		handleSubmit() {
			this.showType = true
			this.show = true
		},
		handleClose() {
			this.show = false
		}
	}
};
</script>

<style lang="scss" scoped>
	/deep/ .u-mode-center-box {
		background: none !important;
	}
	.container {
		height: 100%;
		.red-packet {
			width: 100%;
			height: 100%;
			background: url(../../static/images/public/red_bg.png);
			background-size: 100% 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.choose-me {
			position: absolute;
			width: 358rpx;
			height: 78rpx;
			background: url(../../static/images/public/choose_me.png);
			background-size: 100% 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-style: italic;
			color: #fff;
			top: 640rpx;
		}
		.red-packet-wrapper {
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 560rpx;
			padding: 20rpx 36rpx;
			.red-packet-btn {
				width: 198rpx;
				height: 268rpx;
				background: url(../../static/images/public/red_b.png);
				background-size: 100% 100%;
			}
		}
		.red-success {
			width: 490rpx;
			height: 611rpx;
			background: url(../../static/images/public/red_success.png);
			background-size: 100% 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
			.red-price-wrapper {
				margin-top: 140rpx;
				display: flex;
				align-items: flex-end;
			}
			.red-price-icon {
				padding-bottom: 40rpx;
				font-size: 48rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				text-shadow: 0px 4rpx 7rpx rgba(162, 62, 14, 0.47);
				background: linear-gradient(11deg, #FCDAB9 0%, #FDF4EA 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.red-price {
				margin-top: 40rpx;
				font-size: 168rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				text-shadow: 0px 4rpx 7rpx rgba(162, 62, 14, 0.47);
				background: linear-gradient(11deg, #FCDAB9 0%, #FDF4EA 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.btn {
				position: absolute;
				bottom: 70rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				font-style: italic;
				color: #FFF5F7;
				background: linear-gradient(11deg, #EA6020 0%, #F1843D 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}
		.red-fail {
			width: 490rpx;
			height: 611rpx;
			background: url(../../static/images/public/red_fail.png);
			background-size: 100% 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
			.title {
				font-size: 59rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 54rpx;
				margin-top: 76rpx;
			}
			.title-tips {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 58rpx;
			}
			.btn-text {
				position: absolute;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				font-style: italic;
				color: #FFFFFF;
				line-height: 58rpx;
				bottom: 60rpx;
			}
		}
		
	}
</style>
