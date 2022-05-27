<template>
	<view class="trade-record-item">
		<view class="record-top-rise">
			<image class="rise-img" src="../../static/images/trade/top-item.png" mode=""></image>
			<view class="rise-text">
				{{infoItem.rise_fall==1?i18n.trade.rise:i18n.trade.down}}
			</view>
		</view>
		<view v-if="mode=='hold'" class="hold-item-time flex_center_box">
			<view class="time-box">
				{{first}}
			</view>
			<view class="time-middle">
				:
			</view>
			<view class="time-box">
				{{second}}
			</view>
		</view>
		<view v-if="mode=='history'&&Number(infoItem.profit)<0" class="history-result history-result-fail">
			<image class="fail-icon" src="../../static/images/trade/lose.png" mode=""></image>
			<view class="fail-text">
			   {{i18n.trade.lost}}
			</view>
		</view>
		<view v-if="mode=='history'&&Number(infoItem.profit)>=0" class="history-result history-result-success">
			<view class="success-box">
				<image class="success-img" src="../../static/images/trade/won.png" mode=""></image>
				<view class="success-content">
					<view class="success-tips">
						{{i18n.trade.won}}
					</view>
					<view class="success-amount">
						${{infoItem.profit}}
					</view>
				</view>
			</view>
			<view class="look-amount" @click="handleBalance">
				{{i18n.trade.viewBalance}}
			</view>
		</view>
		<view class="trade-item-content">
			<view class="trade-desc flex_between_box">
				<view class="label">
					{{i18n.trade.type}}
				</view>
				<view class="trade-value">
					{{infoItem.product_name}}/USDT-{{infoItem.period}}{{i18n.trade.minute}}
				</view>
			</view>
			<view class="trade-desc flex_between_box">
				<view class="label">
					{{i18n.trade.direction}}
				</view>
				<view class="trade-value">
					<view v-html="infoItem.rise_fall_label"></view>
				</view>
			</view>
			<view class="trade-desc flex_between_box">
				<view class="label">
					{{i18n.trade.InvestmentAmount}}
				</view>
				<view class="trade-value">
					${{infoItem.buy_amount}}
				</view>
			</view>
			<view class="trade-desc flex_between_box">
				<view class="label">
					{{i18n.trade.ExpectedReturn}}
				</view>
				<view class="trade-value">
					${{infoItem.expect_profit}}
				</view>
			</view>
			<view class="trade-desc flex_between_box">
				<view class="label">
					{{i18n.trade.ServiceCharge}}
				</view>
				<view class="trade-value">
					${{infoItem.fee}}
				</view>
			</view>
			<view class="trade-desc flex_between_box">
				<view class="label">
					{{i18n.trade.BillingPrice}}
				</view>
				<view class="trade-value">
					${{infoItem.buy_price}}
				</view>
			</view>
			<view class="trade-desc flex_between_box">
				<view class="label">
					{{i18n.trade.SettlementPrice}}
				</view>
				<view class="trade-value">
					${{infoItem.sell_price}}
				</view>
			</view>
		</view>
		<view v-if="mode=='hold'" class="hold-rise-box">
			<view class="hold-up-item">
				<view class="hold-up-bg " :class="[infoItem.rise_fall==1?'hold-up':'hold-down']">

				</view>
				<view class="hold-up-amount" :class="[infoItem.rise_fall==1?'hold-up':'hold-down']">
					${{infoItem.current_price}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		commonMixin
	} from '@/common/mixin/mixin.js';
	export default {
		name: 'trade-item',
		props: {
			mode: String,
			infoItem: {
				type: Object,
				default () {
					return {}
				}
			} // 数据
		},
		mixins: [commonMixin],
		data() {
			return {
				seconds: '',
				clear: null,
				first: '',
				second: ''

			}
		},
		created() {
			setTimeout(() => {
				if (this.mode == 'hold') {
					this.clear = setInterval(this.countTime, 1 * 1000)
				}
			}, 300)
		},
		methods: {
			handleBalance(){
				uni.switchTab({
					url:'/pages/me/me'
				})
			},
			countTime() {
				//获取当前时间  
				//时间差  
				var leftTime = this.infoItem.remain_seconds;
				//定义变量 d,h,m,s保存倒计时的时间
				var d, h, m, s;
				if (leftTime >= 0) {
					d = Math.floor(leftTime / 60 / 60 / 24);
					h = Math.floor(leftTime / 60 / 60 % 24);
					m = Math.floor(leftTime / 60 % 60);
					s = Math.floor(leftTime % 60);
					let hour = d * 24 + h
					let first = hour > 9 ? hour : `0${hour}`
					let second = m > 9 ? m : `0${m}`
					let third = s > 9 ? s : `0${s}`
					// this.seconds = first + ':' +
					// 	second + ':' + third
					this.first = second
					this.second = third
				} else {
					this.$emit('handleGet')
					clearInterval(this.clear);
				}
				// console.log(d, h, m, s)

				//递归每秒调用countTime方法，显示动态时间效果  
				if (leftTime > 0) {
					this.infoItem.remain_seconds--
				} else {
					this.$emit('handleGet')
					clearInterval(this.clear);
				}
			},
		}
	}
</script>

<style lang="scss">
	.trade-record-item {
		width: 100%;
		background-color: #ffffff;
		margin-bottom: 36rpx;

		.record-top-rise {
			width: 309rpx;
			height: 56rpx;
			position: relative;
			margin: auto;

			.rise-img {
				position: absolute;
				width: 309rpx;
				height: 56rpx;
				left: 0;
				z-index: 10;
			}

			.rise-text {
				position: absolute;
				width: 309rpx;
				height: 56rpx;
				left: 0;
				text-align: center;
				line-height: 56rpx;
				z-index: 11;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}

		.hold-item-time {
			border-bottom: 1px solid #EAEAEA;
			padding: 58rpx 0 46rpx 0;

			.time-box {
				width: 84rpx;
				height: 84rpx;
				background: #F2F2F2;
				border-radius: 10rpx;
				text-align: center;
				line-height: 84rpx;
				font-size: 50rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
			}

			.time-middle {
				width: 120rpx;
				height: 84rpx;
				text-align: center;
				line-height: 84rpx;
				font-size: 50rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
			}
		}

		.history-result {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		.history-result-fail {
			border-bottom: 1px solid #EAEAEA;
			padding: 54rpx 0 38rpx 0;

			.fail-icon {
				width: 159rpx;
				height: 159rpx;
			}

			.fail-text {
				width: 100%;
				text-align: center;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
				margin-top: 20rpx;
			}
		}

		.history-result-success {
			border-bottom: 1px solid #EAEAEA;
			padding: 23rpx 0 33rpx 0;

			.success-box {
				width: 554rpx;
				height: 207rpx;
				margin: auto;
				position: relative;

				.success-img {
					width: 554rpx;
					height: 207rpx;
					position: absolute;
					z-index: 10;
					left: 0;
				}

				.success-content {
					width: 554rpx;
					height: 207rpx;
					position: absolute;
					z-index: 11;
					left: 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.success-tips {
						width: 100%;
						text-align: center;
						font-size: 48rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9B6200;
					}

					.success-amount {
						width: 100%;
						text-align: center;
						font-size: 44rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #212121;
						margin-top: 28rpx;
					}
				}
			}

			.look-amount {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
				margin-top: 45rpx;
				width: 100%;
				text-align: center;
			}
		}

		.trade-item-content {
			width: 100%;
			padding-bottom: 55rpx;

			.trade-desc {
				margin-top: 54rpx;
				box-sizing: border-box;
				padding: 0 24rpx;

				.label {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
				}

				.trade-value {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #212121;
				}
			}
		}

		.hold-rise-box {
			width: 100%;
			padding: 18rpx 0;

			.hold-up-item {
				width: 616rpx;
				height: 60rpx;
				margin: auto;
				position: relative;
				display: flex;
				align-items: center;

				.hold-up-bg {
					width: 616rpx;
					position: absolute;
					z-index: 10;

					height: 10rpx;
					top: 25rpx;
				}

				.hold-up {
					background-color: #00B809;
				}

				.hold-down {
					background-color: #FF2F2F;
				}

				.hold-up-amount {
					position: relative;
					margin: auto;
					z-index: 11;
					padding: 0;
					height: 60rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;

					border-radius: 30rpx;
					padding: 0 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
