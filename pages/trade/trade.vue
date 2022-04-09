<template>
	<view class="container">
		<Kline ref="line" @changePro="handleChangePro" :productName="productName" :list="line"
			:productData="productData" :productCode="productCode"></Kline>
		<!-- <view>
			<canvas
				id="kline2"
				canvas-id="kline2"
				class="kline2"
				v-bind:style="{ width: ChartWidth + 'px', height: ChartHeight + 'px' }"
				v-show="KLine.IsShow"
				@touchstart="KLineTouchStart"
				@touchmove="KLineTouchMove"
				@touchend="KLineTouchEnd"
			></canvas>
			<canvas
				id="minute2"
				canvas-id="minute2"
				class="minute"
				v-bind:style="{ width: ChartWidth + 'px', height: ChartHeight + 'px' }"
				v-show="Minute.IsShow"
				@touchstart="MinuteTouchStart"
				@touchmove="MinuteTouchMove"
				@touchend="MinuteTouchEnd"
			></canvas>
		</view>
 -->
		<view class="card-item-wrapper" flex="main:justify cross:center">
			<view class="card-item">
				<text>{{priceInfo.total_assets}}</text>
				<view>{{ i18n.trade.totalEquity }}(USDT)</view>
			</view>
			<view class="card-item">
				<text>{{ userData.balance }}</text>
				<view>{{ i18n.trade.balance }}(USDT)</view>
			</view>
		</view>
		<view class="title">
			<text>{{ i18n.trade.lever }}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx"
				mode="" />
		</view>
		<view class="lever-wrapper">
			<view v-for="item in productData.lever" :key="item" class="lever-btn" @click="handelChooseMultiple(item)">
				<view class="lever-text">x{{ item }}</view>
				<image v-if="item == multipleValue" class="btn-bg-image" src="../../static/images/trade/btn-radio.png"
					mode=""></image>
			</view>
		</view>
		<view class="title">
			<text>{{ i18n.trade.openPrice }}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx"
				mode="" />
		</view>
		<view class="lever-wrapper">
			<view class="open-btn">
				<view @click="handleChoosePrice(productData.price)" class="lever-text"
					:class="[price == productData.price?'bg-btn':'']">{{productData.price}}</view>
				<!-- <image v-if="price == productData.price" class="btn-bg-image"
					src="../../static/images/trade/btn-radio.png" mode=""></image> -->
			</view>

			<view class="open-btn" @click="handleChoosePrice('Market')" :class="[price == 'Market'?'bg-btn':'']">
				<view class="lever-text">Market</view>
			</view>
		</view>
		<view class="title">
			<text>{{ i18n.trade.openAmount }}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx"
				mode="" />
		</view>
		<view class="lever-wrapper">
			<view v-for="item in productData.set_amount" :key="item" class="lever-btn"
				@click="handelChooseAmount(item)">
				<view class="lever-text">{{ item }}</view>
				<image v-if="item == amountValue" class="btn-bg-image" src="../../static/images/trade/btn-radio.png"
					mode=""></image>
			</view>
			<view class="custom-box" :class="[amountValue == amount?'bg-btn':'']" @click="handelChooseAmount(amount)">
				<view class="custom-btn flex_left_box">
					<input type="number" v-model="amount" placeholder="自定义" placeholder-style="background: linear-gradient(-51deg, #3FBBFE 0%, #A541FF 100%);-webkit-background-clip: text;
-webkit-text-fill-color: transparent;font-size: 30upx" />
				</view>

			</view>
		</view>
		<view class="handle-btn-wrapper" flex="main:justify cross:center">
			<view class="rise-btn" @click="handleTransaction(1)">{{ i18n.trade.rise }}</view>
			<view class="down-btn" @click="handleTransaction(2)">{{ i18n.trade.down }}</view>
		</view>
		<!-- 当前、历史 -->
		<view class="tabs-switch-wrapper flex_between_box">
			<view class="tabs-left-box">
				<view class="tab-item" @click="handleChangeType('handup')">
					<view class="item-color" :class="[activeType == 'handup' ? 'active-color' : '']">
						{{ i18n.trade.now }}
					</view>
					<view v-if="activeType == 'handup'" class="text-line-box">
						<image class="text-line" src="../../static/images/trade/text-line.png" mode=""></image>
					</view>
				</view>
				<view class="tab-item mar-left-67" @click="handleChangeType('hold')">
					<view class="item-color" :class="[activeType == 'hold' ? 'active-color' : '']">{{ i18n.trade.hold }}
					</view>
					<view v-if="activeType == 'hold'" class="text-line-box">
						<image class="text-line" src="../../static/images/trade/text-line.png" mode=""></image>
					</view>
				</view>
				<view class="tab-item mar-left-67" @click="handleChangeType('history')">
					<view class="item-color" :class="[activeType == 'history' ? 'active-color' : '']">
						{{ i18n.trade.histroy }}
					</view>
					<view v-if="activeType == 'history'" class="text-line-box">
						<image class="text-line" src="../../static/images/trade/text-line.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="right-text-box flex_right_box">
				<view class="right-text">{{ i18n.trade.showAll }}</view>
				<image @click="handleChangeOpen" v-if="!isOpen" class="right-open"
					src="../../static/images/trade/close.png" mode=""></image>
				<image @click="handleChangeOpen" v-if="isOpen" class="right-open"
					src="../../static/images/trade/open.png" mode=""></image>
			</view>
		</view>


		<view class="" v-if="activeType == 'history'">
			<view class="item-card-box" v-for="item in orderDate" :key="item.id">
				<view class="triangle-box"></view>
				<view class="card-head">{{item.product_name}} {{item.lever}}x</view>
				<view class="card-content-box">
					<view class="content-item flex_between_box">
						<view class="content-text-box">
							<view class="label">{{ i18n.trade.openNumber }}</view>
							<view class="amount">{{item.buy_total_price}}</view>
						</view>
						<view class="content-text-box">
							<view class="label">{{ i18n.trade.openPrice }}</view>
							<view class="amount">{{item.price}}</view>
						</view>
						<view class="content-text-box">
							<view class="label">{{ i18n.trade.riseDown }}</view>
							<view class="amount" :class="[item.rise_fall==1?'green-text':'red-text']">
								{{item.rise_fall_label}}
							</view>
						</view>
					</view>
					<view class="content-item flex_between_box">
						<view class="content-text-box">
							<view class="label">{{i18n.trade.sellPrice}}</view>
							<view class="amount">{{item.sell_price}}</view>
						</view>
						<view class="content-text-box">
							<view class="label">{{i18n.trade.profit}}</view>
							<view class="amount">{{item.profit}}</view>
						</view>
						<view class="content-text-box">
							<view class="label">{{i18n.trade.profitRate}}</view>
							<view class="amount " :class="[item.profit_rate>0?'green-text':'red-text']">{{item.profit_rate>0?'+':''}}{{(item.profit_rate*100).toFixed(2)}}%</view>
						</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="footer-item flex_between_box">
						<view class="left-text">{{ i18n.trade.fee }}</view>
						<view class="right-text">{{item.fee}} USDT</view>
					</view>
					<view class="footer-item flex_between_box">
						<view class="left-text">{{ i18n.trade.openTime }}</view>
						<view class="right-text">{{item.created_at}}</view>
					</view>
					<view class="footer-item flex_between_box">
						<view class="left-text">{{ i18n.trade.pingcan }}</view>
						<view class="right-text">{{item.pingcang_at}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<handleup-item v-for="item in orderDate" @refreshOrder="getOrderList" :key="item.id" :infoItem="item"
				:type="activeType"></handleup-item>
		</view>

		<u-popup v-model="productPopup" mode="top">
			<view class="top-popup-box">
				<view class="popup-coin-section">
					<view class="s-header">
						<view class="col">{{ i18n.index.market.title1 }}</view>
						<view class="col r">{{ i18n.index.market.title2 }}</view>
						<view class="col r">{{ i18n.index.market.title3 }}</view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 80vh;">
						<product-item :item="item" v-for="(item, i) in markets" @handleChoose="chooseProduct"
							:key="item.symbol"></product-item>
					</scroll-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Kline from './kline.vue'
	import handleupItem from './handup-item.vue'
	import productItem from '../../components/product-item.vue'
	import {
		mapState,
		mapActions
	} from 'vuex';
	import {
		commonMixin
	} from '@/common/mixin/mixin.js';
	export default {
		mixins: [commonMixin],
		components: {
			Kline,
			handleupItem,
			productItem
		},
		data() {
			return {
				productPopup: false, // 切换产品弹层
				userData: {}, // 用户信息
				productData: {}, // 产品详情
				amount: null, // 自定义价格
				multipleValue: 1, // 倍数
				amountValue: 1, // 数量
				price: '', // 价格
				isOpen: false, // 是否查看全部
				activeType: 'handup', //  订单类型：hold持仓；handup挂单情况；history历史

				orderDate: [], // 订单列表数据
				isSendHttp: false, // 是否点击发送请求中

				productCode: 'btc', // 产品code
				productName: 'btc usdt',

				markets: [],
				line: [],
				priceInfo: {},
				clear: '',
				isHavePage: false,
				isSendLoading: false,
				page: 1

			};
		},
		onLoad(e) {
			this.getUserInfo();
			this.getMaketList();
		},
		onShow() {


			this.clear = setInterval(this.getProductInfo, 5000)
		},
		//隐藏的时候 停止定时器和清空hqchart的实例
		onHide() {
			clearInterval(this.clear);
		},
		//退出的时候 停止定时器和清空hqchart的实例
		onUnload() {
			clearInterval(this.clear);
		},
		onReachBottom() {
			if (!this.isSendLoading) {
				this.page++
				this.getOrderList()
			}
		},
		methods: {
			...mapActions('user', ['userInfo']),
			...mapActions('trade', ['getProductList', 'productInfo', 'submitOrder', 'orderList', 'productPrice']),
			...mapActions('common', ['marketList']),
			handleChangePro() {
				this.productPopup = true
			},
			chooseProduct(item) {
				this.productCode = item.code
				this.productName = item.name
				this.getProductInfo(1);
				if (!this.isOpen) {
					this.getOrderList()
				}
				this.productPopup = false
			},
			getMaketList() {
				this.marketList().then(res => {
					this.markets = res.data.data;
					this.productCode = this.markets[0].code
					this.productName = this.markets[0].name
					this.getProductInfo(1);
					this.getOrderList()
					this.getProductPrice()
				});
			},
			getProductPrice() {

				this.productPrice({
					code: this.productCode
				}).then(res => {

					this.priceInfo = res.data

				});
			},
			getProductInfo(type) {
				if (!this.productCode) {
					return
				}
				let params = {
					code: this.productCode
				};
				this.productInfo(params).then(res => {
					this.productData = res.data;
					this.price = this.productData.price
					this.amountValue = this.productData.set_amount[0]
					this.multipleValue = this.productData.lever[0]
					this.line = res.data.line
					if (type == 1) {
						setTimeout(() => {
							this.$refs.line.CreateMinuteChart_app()
							this.$refs.line.CreateKLineChart()

						}, 500)
					}

				});
			},

			// 获取用户信息
			getUserInfo() {
				this.userInfo().then(res => {
					this.userData = res.data;
				});
			},
			getOrderList() {
				this.isSendLoading = true
				let params = {
					type: this.activeType,
					code: this.isOpen ? '' : this.productCode,
					status: 0,
					page: this.page,
					limit: 10
				}

				this.orderList(params).then(res => {
					console.log(res.data)
					this.isSendLoading = false
					if (this.activeType == 'hold') {
						this.orderDate = res.data;
					} else {
						let records = res.data.data
						if (this.page == 1) {
							this.orderDate = records
						} else {
							if (records && records.length > 0) {
								if (records.length >= 10) {
									this.isHavePage = true
								} else {
									this.isHavePage = false
								}
								this.orderDate = this.orderDate.concat(records)
							}
						}
					}
				});
			},
			// 开仓买入
			handleTransaction(type) {
				if (!this.isSendHttp) {
					this.isSendHttp = true
					let params = {
						code: this.productCode,
						amount: this.amountValue,
						price: this.price,
						lever: this.multipleValue,
						rise_fall: type
					}
					this.submitOrder(params).then(res => {

						this.getOrderList()
						setTimeout(() => {
							this.$u.toast(res.message)
						}, 1000)
						this.isSendHttp = false
					}).catch(err => {
						this.isSendHttp = false
					})
				} else {
					return false
				}
			},
			// 选择倍数
			handelChooseMultiple(index) {
				this.multipleValue = index;
			},
			// 选择买入的数量
			handelChooseAmount(index) {
				this.amountValue = index;
			},
			// 切换是否查看全部
			handleChangeOpen() {
				this.isOpen = !this.isOpen;
				this.page = 1
				this.getOrderList()
			},
			// 切换订单类型
			handleChangeType(type) {
				this.activeType = type;
				this.page = 1
				this.getOrderList()
			},
			handleChoosePrice(price) {
				this.price = price
			}
		}
	};
</script>

<style lang="scss" scoped>
	.popup-coin-section {
		padding: 4upx 30upx 24upx;

		.s-header {
			display: flex;
			align-items: center;
			height: 30upx;
			line-height: 30upx;
			padding-top: 30upx;
			padding-bottom: 30upx;

			.col {
				font-size: $font-base;
				color: $font-color-dark;
				flex: 1;
			}

			.r {
				text-align: center;
			}
		}
	}

	.top-popup-box {
		width: 750rpx;
		background-color: #000000;
		margin: auto;
		margin-top: 30rpx;
		color: #fff;
	}

	/deep/.u-drawer-top {
		background-color: #000000 !important;
	}

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

	.card-item-wrapper {
		padding: 34upx;

		.card-item {
			width: 328upx;
			height: 173upx;
			background: #1a1a1a;
			border: 2upx solid;
			border-radius: 0px 30upx 0px 30upx;
			padding-left: 36upx;
			padding-top: 23upx;

			text {
				font-size: 55upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}

			view {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #9294ab;
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
		color: #ffffff;
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
			// width: 100upx;
			height: 60upx;
			background: #1a1a1a;
			border-radius: 8upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
			line-height: 60upx;
			text-align: center;
			margin-right: 47rpx;
			margin-bottom: 24rpx;
			position: relative;
			min-width: 100rpx;


			.lever-text {
				width: 100%;
				height: 60upx;
				line-height: 60upx;
				position: absolute;
				text-align: center;
				z-index: 20;
				box-sizing: border-box;
				padding: 0 12rpx;
			}

			.btn-bg-image {
				width: 100%;
				height: 60upx;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
			}

			// &:nth-child(5n) {
			// 	margin-right: 0px;
			// }
		}

		.open-btn {
			width: 299upx;
			height: 61upx;
			background: #1a1a1a;
			border-radius: 8upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
			line-height: 60upx;
			text-align: center;
			margin-right: 32rpx;
			margin-bottom: 24rpx;
			position: relative;

			.lever-text {
				width: 299upx;
				height: 61upx;
				line-height: 61upx;
				position: absolute;
				text-align: center;
				z-index: 20;
			}


		}

		.bg-btn {
			border-radius: 8upx;
			background: linear-gradient(31deg, #3FBBFE, #A541FF);
		}

		.custom-box {
			width: 140rpx;
			height: 61rpx;
			border-radius: 8rpx;
			border: 1px solid;
			overflow: hidden;
			box-sizing: border-box;
			position: relative;

			.custom-btn {
				width: 100%;
				height: 100%;
				background: #1a1b28;
				line-height: 58rpx;
				box-sizing: border-box;
				border: 1px solid;
				border-image: linear-gradient(-180deg, #3fbbfe, #a541ff) 1 1;
				border-radius: 8rpx;
				text-align: center;
				color: #fff;
			}

		}
	}

	.handle-btn-wrapper {
		margin: 20upx 0;
		padding: 0 20upx;

		.rise-btn {
			width: 340upx;
			height: 88upx;
			background: #23b57d;
			border-radius: 14upx;
			text-align: center;
			line-height: 88upx;
		}

		.down-btn {
			width: 340upx;
			height: 88upx;
			background: #d83a53;
			border-radius: 14upx;
			text-align: center;
			line-height: 88upx;
		}
	}

	.tabs-switch-wrapper {
		width: 100%;
		box-sizing: border-box;
		background: #1a1b28;
		height: 94rpx;
		padding: 0 34rpx 0 60rpx;
		margin-bottom: 34rpx;
		margin-top: 30rpx;

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
					color: #ffffff;
					line-height: 94rpx;
					opacity: 0.6;
				}

				.active-color {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #ffffff;
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
				color: #ffffff;
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
		background: #1a1b28;
		margin-bottom: 39rpx;
		position: relative;

		.card-head {
			height: 100rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			border-bottom: 1rpx solid #484e65;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ffffff;
			line-height: 49rpx;
			display: flex;
			align-items: center;
		}

		.card-content-box {
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1rpx solid #484e65;
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
			border-bottom: 1rpx solid #484e65;
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
					width: 211rpx;
					height: 80rpx;
					background: #23b57d;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #1a1b28;
					text-align: center;
					line-height: 80rpx;
				}

				.handle-red {
					width: 211rpx;
					height: 80rpx;
					background: #d83a53;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #1a1b28;
					text-align: center;
					line-height: 80rpx;
					margin-left: 36rpx;
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
