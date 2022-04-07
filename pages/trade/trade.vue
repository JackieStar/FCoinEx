<template>
	<view class="container">
		<!-- <kLine></kLine> -->
		<view class="card-item-wrapper" flex="main:justify cross:center">
			<view class="card-item">
				<text>100.2</text>
				<view>总权益(USDT)</view>
			</view>
			<view class="card-item">
				<text>100.2</text>
				<view>可用余额(USDT)</view>
			</view>
		</view>
		<view class="title">
			<text>杠杆倍数</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx"
				mode="" />
		</view>
		<view class="lever-wrapper">
			<view v-for="item in 6" :key="item" class="lever-btn" @click="handelChooseMultiple(item)">
				<view class="lever-text">x{{item+1}}</view>
				<image v-if="item==multipleValue" class="btn-bg-image" src="../../static/images/trade/btn-radio.png"
					mode=""></image>
			</view>
		</view>
		<view class="title">
			<text>开仓价</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx"
				mode="" />
		</view>
		<view class="lever-wrapper">
			<view class="open-btn">
				35345435
			</view>
			<view class="open-btn">
				Market
			</view>
		</view>
		<view class="title">
			<text>Open amount</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx"
				mode="" />
		</view>
		<view class="lever-wrapper">
			<view v-for="item in 8" :key="item" class="lever-btn" @click="handelChooseAmount(item)">
				<view class="lever-text">{{item}}0</view>
				<image v-if="item==amountValue" class="btn-bg-image" src="../../static/images/trade/btn-radio.png"
					mode=""></image>
			</view>
			<view class="custom-box">
				<view class="custom-btn">
					自定义
				</view>
			</view>
		</view>
		<view class="handle-btn-wrapper" flex="main:justify cross:center">
			<view class="rise-btn">买/涨</view>
			<view class="down-btn">卖/跌</view>
		</view>
		<!-- 当前、历史 -->
		<view class="tabs-switch-wrapper flex_between_box">
			<view class="tabs-left-box">
				<view class="tab-item" @click="handleChangeType(1)">
					<view class="item-color" :class="[activeType==1?'active-color':'']">
						当前
					</view>
					<view v-if="activeType==1" class="text-line-box">
						<image class="text-line" src="../../static/images/trade/text-line.png" mode=""></image>
					</view>

				</view>
				<view class="tab-item mar-left-67" @click="handleChangeType(2)">
					<view class="item-color" :class="[activeType==2?'active-color':'']">
						历史
					</view>
					<view v-if="activeType==2" class="text-line-box">
						<image class="text-line" src="../../static/images/trade/text-line.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="right-text-box flex_right_box">
				<view class="right-text">
					显示全部
				</view>
				<image @click="handleChangeOpen" v-if="!isOpen" class="right-open"
					src="../../static/images/trade/close.png" mode=""></image>
				<image @click="handleChangeOpen" v-if="isOpen" class="right-open"
					src="../../static/images/trade/open.png" mode=""></image>
			</view>
		</view>
		<view class="" v-if="activeType==1">
			<view class="history-card-box">
				<view class="triangle-box"></view>
				<view class="history-head flex_between_box">
					<view class="title">
						BTC_USDT 1.0x
					</view>
					<view class="">
						<view class="num green-text">
							+1000.22
						</view>
						<view class="rate green-text">
							+180%
						</view>
					</view>
				</view>
				<view class="history-content-box">
					<view class="content-item flex_between_box">
						<view class="content-text-box">
							<view class="label">
								开仓数量
							</view>
							<view class="amount">
								100
							</view>
						</view>
						<view class="content-text-box">
							<view class="label">
								开仓价格
							</view>
							<view class="amount">
								100.33
							</view>
						</view>
						<view class="content-text-box">
							<view class="label">
								涨跌
							</view>
							<view class="amount red-text">
								Long
							</view>
						</view>
					</view>
				</view>
				<view class="card-info">
					<view class="info-item flex_between_box">
						<view class="left-text">
							手续费
						</view>
						<view class="right-text">
							5 USDT
						</view>
					</view>
					<view class="info-item flex_between_box">
						<view class="left-text">
							开仓时间
						</view>
						<view class="right-text">
							03-04-2022 12:00
						</view>
					</view>
				</view>
				<view class="card-handle-wrapper">
					<view class="form-item-box flex_left_box">
						<input v-model="inputValue" class="login-input" placeholder-class="dart-input" type="text"
							value="" placeholder="请输入" />
					</view>
					<view class="form-item-box flex_between_box mar-t-22">
						<view class="dart-input left-width">
							AMT
						</view>
						<image class="arrow-image" src="../../static/images/trade/xiala@2x.png" mode=""></image>
					</view>
					<view class="handle-flex flex_center_box">
						<view class="handle-green">
							平仓
						</view>
						<view class="handle-red">
							市场价全平
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="activeType==2">
			<view class="item-card-box">
				<view class="triangle-box"></view>
				<view class="card-head">
					BTC_USDT 1.0x
				</view>
				<view class="card-content-box">
					<view class="content-item flex_between_box">
						<view class="content-text-box">
							<view class="label">
								开仓数量
							</view>
							<view class="amount">
								100
							</view>
						</view>
						<view class="content-text-box">
							<view class="label">
								开仓价格
							</view>
							<view class="amount">
								100.33
							</view>
						</view>
						<view class="content-text-box">
							<view class="label">
								涨跌
							</view>
							<view class="amount red-text">
								Long
							</view>
						</view>
					</view>
					<view class="content-item flex_between_box">
						<view class="content-text-box">
							<view class="label">
								平仓价格
							</view>
							<view class="amount">
								100
							</view>
						</view>
						<view class="content-text-box">
							<view class="label">
								收益
							</view>
							<view class="amount">
								100
							</view>
						</view>
						<view class="content-text-box">
							<view class="label">
								收益率
							</view>
							<view class="amount green-text">
								100
							</view>
						</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="footer-item flex_between_box">
						<view class="left-text">
							手续费
						</view>
						<view class="right-text">
							5 USDT
						</view>
					</view>
					<view class="footer-item flex_between_box">
						<view class="left-text">
							开仓时间
						</view>
						<view class="right-text">
							03-04-2022 12:00
						</view>
					</view>
					<view class="footer-item flex_between_box">
						<view class="left-text">
							平仓时间
						</view>
						<view class="right-text">
							03-04-2022 12:00
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	import kLine from '../public/kline.vue';
	export default {
		components: {
			kLine
		},
		data() {
			return {
				multipleValue: 1,
				amountValue: 1,
				isOpen: false,
				activeType: 1,
				inputValue: ''
			}
		},
		onLoad() {
			this.getLine()
			this.getProduct()
		},
		methods: {
			...mapActions('trade', ['getProductLine', 'getProductList', 'getProductInfo']),
			getLine() {
				this.getProductLine({
					code: 'btc',
					k: '5min'
				}).then(res => {
					console.log(res)
				});
			},
			getProduct() {
				this.getProductList({
					limit: 15
				}).then(res => {
					console.log(res)
				});
			},
			handelChooseMultiple(index) {
				this.multipleValue = index
			},
			handelChooseAmount(index) {
				this.amountValue = index
			},
			handleChangeOpen() {
				this.isOpen = !this.isOpen
			},
			handleChangeType(type) {
				this.activeType = type
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
		border-top-color: #5A9BFE;
		border-right-color: transparent;
		position: absolute;
		top: 0;
		left: 0;
	}

	.red-text {
		color: #FF0101;
	}

	.green-text {
		color: #01FF37;
	}

	.flex_center_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.flex_left_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.flex-r-satrt {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.flex_right_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.flex_between_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.card-item-wrapper {
		padding: 34upx;

		.card-item {
			width: 328upx;
			height: 173upx;
			background: #1A1A1A;
			border: 2upx solid;
			border-radius: 0px 30upx 0px 30upx;
			padding-left: 36upx;
			padding-top: 23upx;

			text {
				font-size: 55upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}

			view {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #9294AB;
				margin-top: 14upx;
			}
		}
	}

	.title {
		width: 100%;
		height: 28upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		padding: 0 26upx;
		display: flex;
		flex-direction: column;

		text {
			margin-left: 6upx;
			z-index: 10;
		}

		.title-bg {
			margin-top: -30upx;
		}
	}

	.lever-wrapper {
		margin-top: 30upx;
		padding: 20upx 26upx;
		display: flex;
		flex-wrap: wrap;

		.lever-btn {
			width: 100upx;
			height: 60upx;
			background: #1A1A1A;
			border-radius: 8upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 60upx;
			text-align: center;
			margin-right: 47rpx;
			margin-bottom: 24rpx;
			position: relative;

			.lever-text {
				width: 100upx;
				height: 60upx;
				line-height: 60upx;
				position: absolute;
				text-align: center;
				z-index: 20;
			}

			.btn-bg-image {
				width: 100upx;
				height: 60upx;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
			}

			&:nth-child(5n) {
				margin-right: 0px;
			}

		}

		.open-btn {
			width: 299upx;
			height: 61upx;
			background: #1A1A1A;
			border-radius: 8upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 60upx;
			text-align: center;
			margin-right: 32rpx;
			margin-bottom: 24rpx;
		}

		.custom-box {
			width: 101rpx;
			height: 61rpx;
			border-radius: 8rpx;
			border: 1px solid;
			overflow: hidden;
			box-sizing: border-box;

			.custom-btn {
				width: 100%;
				height: 100%;
				background: #1A1B28;
				line-height: 58rpx;
				box-sizing: border-box;
				border: 1px solid;
				border-image: linear-gradient(-180deg, #3FBBFE, #A541FF) 1 1;
				border-radius: 8rpx;
				text-align: center;
				background: linear-gradient(-51deg, #3FBBFE 0%, #A541FF 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}

	}

	.handle-btn-wrapper {
		margin: 20upx 0;
		padding: 0 20upx;

		.rise-btn {
			width: 340upx;
			height: 88upx;
			background: #23B57D;
			border-radius: 14upx;
			text-align: center;
			line-height: 88upx;
		}

		.down-btn {
			width: 340upx;
			height: 88upx;
			background: #D83A53;
			border-radius: 14upx;
			text-align: center;
			line-height: 88upx;
		}
	}

	.tabs-switch-wrapper {
		width: 100%;
		box-sizing: border-box;
		background: #1A1B28;
		height: 94rpx;
		padding: 0 34rpx 0 60rpx;
		margin-bottom: 34rpx;

		.tabs-left-box {
			height: 94rpx;
			display: flex;
			align-items: center;

			.tab-item {
				height: 94rpx;
				line-height: 94rpx;
				position: relative;

				.text-line-box {
					width: 100%;
					height: 6rpx;
					margin-top: -6rpx;
					text-align: center;
					position: absolute;

					.text-line {
						width: 36rpx;
						height: 6rpx;
						position: absolute;
						margin-left: -18rpx;
					}
				}

				.item-color {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 94rpx;
					opacity: 0.6;
				}

				.active-color {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 94rpx;
					opacity: 1;
				}
			}

			.mar-left-67 {
				margin-left: 67rpx;
			}
		}

		.right-text-box {
			height: 100%;

			.right-text {
				font-size: 26rpx;
				color: #FFFFFF;
				line-height: 30rpx;
				opacity: 0.6;
				margin-right: 14rpx;
			}

			.right-open {
				width: 77rpx;
				height: 47rpx;
			}
		}
	}

	.item-card-box {
		width: 694rpx;
		margin: auto;
		background: #1A1B28;
		margin-bottom: 39rpx;
		position: relative;

		.card-head {
			height: 100rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			border-bottom: 1rpx solid #484E65;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 49rpx;
			display: flex;
			align-items: center;
		}

		.card-content-box {
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1rpx solid #484E65;
			padding-bottom: 10rpx;

			.content-item {
				width: 100%;
				box-sizing: border-box;
				padding: 29rpx 0;

				.content-text-box {
					width: 33.3%;
					text-align: center;

					.label {
						height: 23rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #8FA9D3;
						line-height: 23rpx;
					}

					.amount {
						height: 30rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 30rpx;
						margin-top: 21rpx;
					}
				}
			}
		}

		.card-footer {
			width: 100%;
			box-sizing: border-box;
			padding: 19rpx 18rpx 19rpx 31rpx;

			.footer-item {
				padding: 19rpx 0;

				.left-text {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #8FA9D3;
				}

				.right-text {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}
	}

	.history-card-box {
		width: 694rpx;
		margin: auto;
		background: #1A1B28;
		margin-bottom: 39rpx;
		position: relative;

		.history-head {
			box-sizing: border-box;
			padding: 27rpx 18rpx 32rpx 30rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;

			.title {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}

			.rate {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #10FF16;
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
			border-bottom: 1rpx solid #484E65;
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
						color: #8FA9D3;
						line-height: 23rpx;
					}

					.amount {
						height: 30rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 30rpx;
						margin-top: 21rpx;
					}
				}
			}
		}

		.card-info {
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1rpx solid #484E65;
			padding: 12rpx 18rpx 16rpx 31rpx;

			.info-item {
				padding: 19rpx 0;

				.left-text {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #8FA9D3;
				}

				.right-text {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}

		.card-handle-wrapper {
			padding: 27rpx 27rpx 41rpx 27rpx;

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
					color: #FFFFFF;
				}

				.dart-input {
					font-size: 24rpx;
					font-weight: 500;
					color: #77798F;
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
					width: 211rpx;
					height: 80rpx;
					background: #23B57D;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #1A1B28;
					text-align: center;
					line-height: 80rpx;
				}

				.handle-red {
					width: 211rpx;
					height: 80rpx;
					background: #D83A53;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #1A1B28;
					text-align: center;
					line-height: 80rpx;
					margin-left: 36rpx;
				}
			}
		}
	}
</style>
