<template>
	<view class="history-card-box">
		<view class="triangle-box"></view>
		<view class="history-head flex_between_box">
			<view class="title">{{infoItem.product_name}}_USDT <text style="padding-left: 16rpx;" v-if="mode=='heyue'">{{infoItem.lever}}x</text>
			</view>
			<block v-if="mode=='heyue'">
				<view class="" v-if="type=='hold'">
					<view class="num" :class="[infoItem.profit_rate>0?'green-text':'red-text']">{{infoItem.profit}}
					</view>
					<view class="rate" :class="[infoItem.profit_rate>0?'green-text':'red-text']">
						{{infoItem.profit_rate}}%
					</view>
				</view>
				<view class="num" v-if="type=='handup'" @click="handleCancel">
					{{i18n.trade.revoke}}
				</view>
			</block>
			<view v-if="mode=='qiquan'" class="num red-text">{{seconds}}</view>
		</view>
		<view class="history-content-box">
			<view class="content-item flex_between_box">
				<view class="content-text-box">
					<view class="label">{{ i18n.trade.openAmount }}</view>
					<view class="amount">{{infoItem.hand_number}}</view>
				</view>
				<view class="content-text-box">
					<view class="label">{{ i18n.trade.openPrice }}</view>
					<view class="amount">{{infoItem.price}}</view>
				</view>
				<view class="content-text-box">
					<view class="label">{{ i18n.trade.riseDown }}</view>
					<view class="amount" v-html="infoItem.rise_fall_label"></view>
					<!-- <view class="amount" :class="{
                    'green-text': infoItem.rise_fall==1,
                    'red-text': infoItem.rise_fall==2
                  }">
						{{infoItem.rise_fall_label}}
					</view> -->
				</view>
			</view>
		</view>
		<view class="card-info">
			<view class="info-item flex_between_box">
				<view v-if="mode=='heyue'" class="left-text">{{ i18n.trade.fee }}</view>
				<view v-if="mode=='qiquan'" class="left-text">{{ i18n.withdraw.fee }}</view>
				<view class="right-text">{{infoItem.fee}} USDT</view>
			</view>
			<view class="info-item flex_between_box">
				<view class="left-text">{{ i18n.trade.openTime }}</view>
				<view class="right-text">{{infoItem.created_at}}</view>
			</view>
		</view>
		<view v-if="mode=='heyue'&&type=='hold'" class="card-handle-wrapper">
			<view class="form-item-box flex_left_box">
				<input v-model="inputValue" class="login-input" placeholder-class="dart-input" type="text" value=""
					:placeholder="i18n.trade.placeholder" />
			</view>
			<view class="form-item-box flex_between_box mar-t-22" @click="handleSelectRate()">
				<view class="dart-input left-width">{{rateValue?rateValue:i18n.trade.AMT}}</view>
				<image class="arrow-image" src="../../static/images/trade/xiala@2x.png" mode=""></image>
			</view>
			<view class="handle-flex flex_center_box">
				<view class="handle-green" @click="handleSubmitSell(1)">{{ i18n.trade.btn1 }}</view>
				<view class="handle-red" @click="handleSubmitSell(2)">{{ i18n.trade.btn2 }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		commonMixin
	} from '@/common/mixin/mixin.js';
	import {
		mapState,
		mapActions
	} from 'vuex';
	export default {
		name: 'handup-item',
		props: {
			type: String,
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
				inputValue: '', // 输入的价格
				rateValue: '', // 买平的比例
				seconds: '',
				clear: null
			}
		},
		created() {
			setTimeout(() => {
				if (this.infoItem.mode == 'qiquan') {
					this.clear = setInterval(this.countTime, 1 * 1000)
				}
			}, 300)
		},

		methods: {
			...mapActions('trade', ['orderSell', 'orderCancel']),
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
					this.seconds = first + ':' +
						second + ':' + third
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
			handleSubmitSell(type) {
				let num = 1
				switch (this.rateValue) {
					case '20%':
						num = 0.2;
						break;
					case '50%':
						num = 0.5;
						break;
					case '100%':
						num = 1;
						break;
				}
				if (type == 1) {
					if (!this.inputValue) {
						this.$u.toast(this.i18n.trade.errorAmount);
						return
					}
					if (!this.rateValue) {
						this.$u.toast(this.i18n.trade.errorRate);
						return
					}
				}
				uni.showLoading({

				})
				let params = {
					order_id: this.infoItem.id,
					price: type == 2 ? 'market' : this.inputValue,
					number: num
				}
				this.orderSell(params).then(res => {
					this.$u.toast(res.message);

					this.$emit('refreshOrder')
				}).catch(() => {
					uni.hideLoading()
				})
			},
			handleCancel() {
				let that = this
				uni.showModal({
					title: this.i18n.common.tip,
					content: this.i18n.trade.cancelOrder,
					success: function(res) {
						if (res.confirm) {
							that.orderCancel({
								order_id: that.infoItem.id
							}).then(res => {
								that.$u.toast(res.message);
								that.$emit('refreshOrder')
							})
						} else if (res.cancel) {
							// 取消弹窗
						}
					}
				})
			},
			// 选择百分比
			handleSelectRate() {
				let that = this
				let select = ['20%', '50%', '100%']
				uni.showActionSheet({
					itemList: select,
					success(res) {
						that.rateValue = select[res.tapIndex]
						console.log(that.rateValue)
					},
					fail(res) {

					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.triangle-box {
		width: 0px;
		height: 0px;
		border-style: solid;
		border-width: 22rpx 31rpx 0px 0px;
		border-top-color: #5a9bfe;
		border-right-color: transparent;
		position: absolute;
		top: 0;
		left: 0;
	}

	.history-card-box {
		width: 694rpx;
		margin: auto;
		background: #1a1b28;
		margin-bottom: 39rpx;
		position: relative;

		.history-head {
			box-sizing: border-box;
			padding: 27rpx 18rpx 32rpx 30rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ffffff;

			.title {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}

			.rate {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #10ff16;
				margin-top: 21rpx;
				text-align: right;
			}

			.num {
				font-size: 30rpx;
				text-align: right;
				font-family: PingFang SC;
				font-weight: 500;
			}
		}

		.history-content-box {
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1rpx solid #484e65;
			padding-bottom: 40rpx;

			.content-item {
				width: 100%;
				box-sizing: border-box;

				.content-text-box {
					width: 33.3%;
					text-align: center;

					.label {
						height: 23rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #8fa9d3;
						line-height: 23rpx;
					}

					.amount {
						height: 30rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #ffffff;
						line-height: 30rpx;
						margin-top: 21rpx;
					}
				}
			}
		}

		.card-info {
			width: 100%;
			box-sizing: border-box;

			padding: 12rpx 18rpx 16rpx 31rpx;

			.info-item {
				padding: 19rpx 0;

				.left-text {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #8fa9d3;
				}

				.right-text {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #ffffff;
				}
			}
		}

		.card-handle-wrapper {
			padding: 27rpx 27rpx 41rpx 27rpx;
			border-top: 1rpx solid #484e65;

			.form-item-box {
				width: 639rpx;
				height: 80rpx;
				background: #333333;
				margin: auto;
				box-sizing: border-box;
				padding: 0 33rpx 0 23rpx;

				.login-input {
					flex: 1;
					font-size: 24rpx;
					font-weight: 500;
					color: #ffffff;
				}

				.dart-input {
					font-size: 24rpx;
					font-weight: 500;
					color: #77798f;
				}

				.left-width {
					width: 550rpx;
				}

				.arrow-image {
					width: 22rpx;
					height: 13rpx;
				}
			}

			.mar-t-22 {
				margin-top: 22rpx;
			}

			.handle-flex {
				margin-top: 37rpx;

				.handle-green {
					width: 300rpx;
					height: 80rpx;
					background: #23b57d;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
					line-height: 80rpx;
					border-radius: 10upx;
				}

				.handle-red {
					width: 300rpx;
					height: 80rpx;
					background: #d83a53;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
					line-height: 80rpx;
					margin-left: 36rpx;
					border-radius: 10upx;
				}
			}
		}
	}

	.red-text {
		color: #ff0101 !important;
	}

	.green-text {
		color: #01ff37 !important;
	}
</style>
