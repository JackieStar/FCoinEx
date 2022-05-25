<template>
	<view class="container">
		<view class="red-packet">
			<view class="choose-me">{{i18n.redPacket.chooseOne}} {{drawCount}}</view>
			<view class="red-packet-wrapper">
				<view class="red-packet-btn" @click="handleSubmit"></view>
				<view class="red-packet-btn" @click="handleSubmit"></view>
				<view class="red-packet-btn" @click="handleSubmit"></view>
			</view>
			<view class="bottom-tips">首次充值后，每日都可以免费获得一次抽取幸运红包都机会</view>
		</view>
		<u-popup v-model="show" mode="center">
			<view class="red-success" v-if="showType == 1" @click="handleClose">
				<view class="red-price-wrapper">
					<view class="red-price-icon">$</view>
					<view class="red-price">100</view>
				</view>
				<text class="btn">{{i18n.redPacket.btn}}</text>
			</view>
			<view class="red-fail" v-if="showType == 0" @click="handleClose">
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
			showType: null,
			drawCount: 0
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.redPacket.title
		});
		this.getConfig()
	},
	methods: {
		...mapActions('lottery', ['lotteryConfig', 'lotteryDraw']),
		getConfig() {
			this.lotteryConfig({type: 'lucky_hongbao'}).then(res => {
				this.drawCount = res.data.chance;
			});
		},
		handleSubmit() {
			this.showType = null
			this.show = true
			this.lotteryDraw({type: 'lucky_hongbao'}).then(res => {
				if (res.data.luck) {
					this.showType = 1
				} else {
					this.showType = 0
				}
				this.$api.msg(res.data.tips);
			})
			
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
			flex-direction: column;
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
			top: 600rpx;
		}
		.red-packet-wrapper {
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 600rpx;
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
		.bottom-tips {
			text-align: center;
			margin-top: 60rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 30rpx;
		}
		
	}
</style>
