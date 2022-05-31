<template>
	<view class="container">
		<view class="head-box-wrapper">
			<view class="flex_between_box">
				<view class="head-box" @click="handleChangePro">
					<view class="head-name">
						{{productName}} USDT
					</view>
					<image class="head-img" src="../../static/images/trade/qiehuan@2x.png" mode=""></image>
				</view>
				<view class="go-histoory" @click="handleGoRecord">
					{{i18n.trade.nowhold}}
				</view>
			</view>
			<view class="flex_between_box mar-t-24">
				<view class=" price-item ">
					<view class="high-text price-big" :class=" { 'green-text' : Number(priceInfo.diff_rate)>=0,
							'red-text': Number(priceInfo.diff_rate)<0 }">
						{{priceInfo.price}}
					</view>
					<view class="high-text flex_left_box mar-t-20">
						<text
							:class=" { 'green-text' : Number(priceInfo.diff_rate)>=0,
							'red-text': Number(priceInfo.diff_rate)<0 }">{{Number(priceInfo.diff_rate)>0?'+':''}}{{priceInfo.diff_rate}}%</text>
					</view>
				</view>
				<view class=" price-item flex_right_box">
					<view class="">
						<view class="price-text">
							{{ i18n.trade.high }}：{{priceInfo.high}}
						</view>
						<view class="price-text mar-t-20">
							{{ i18n.trade.open }}：{{priceInfo.open}}
						</view>
						
					</view>
					<view class="">
						<view class="price-text price-after">
							{{ i18n.trade.low }}：{{priceInfo.low}}
						</view>
						<view class="price-text price-after mar-t-20">
							{{ i18n.trade.messageTime }}：{{priceInfo.volume_format}}
						</view>
					</view>
				</view>
			</view>
			
			
		</view>
		<view class="">

		</view>
		<Kline ref="line" :productName="productName" :list="line" :productData="productData" :price="priceInfo.price"
			:rate="priceInfo.diff_rate" :productCode="productCode"></Kline>
		<view class="handle-btn-wrapper flex_between_box">
			<view class="rise-btn" @click="handleTransaction(1)">
				{{ i18n.trade.rise }}
			</view>
			<view class="down-btn" @click="handleTransaction(2)">
				{{ i18n.trade.down }}
			</view>
		</view>
		<u-popup v-model="productPopup" mode="top">
			<view class="top-popup-box">
				<view class="popup-coin-section">
					<view class="s-header">
						<view class="col">{{ i18n.home.market.title1 }}</view>
						<view class="col r">{{ i18n.home.market.title2 }}</view>
						<view class="col r">{{ i18n.home.market.title3 }}</view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 50vh;">
						<product-item v-if="productPopup" v-for="(item, i) in markets" :item="item"
							@handleChoose="chooseProduct" :key="item.id"></product-item>
					</scroll-view>
				</view>
			</view>
		</u-popup>

		<u-popup v-model="tradePopup" mode="bottom" border-radius="10" closeable>
			<view class="trade-popup-box">
				<view class="popup-title">
					{{i18n.trade.OrderConfirmation}}
				</view>
				<scroll-view scroll-y="true" style="max-height: 80vh;">
					<view class="content-box">
						<view class="trade-form-item flex_between_box">
							<view class="label">
								{{i18n.trade.InvestmentVarieties}}
							</view>
							<view class="right-text">
								{{productName}}/USDT
							</view>
						</view>
						<view class="trade-form-item flex_between_box">
							<view class="label">
								{{i18n.trade.TradingDirection}}
							</view>
							<view class="right-text red-text" v-if="rise_fall==2">
								{{ i18n.trade.down }}
							</view>
							<view class="right-text green-text " v-if="rise_fall==1">
								{{ i18n.trade.rise }}
							</view>
						</view>
						<view class="trade-form-item flex_between_box">
							<view class="label">
								{{i18n.trade.presentPrice}}
							</view>
							<view class="right-text">
								{{priceInfo.price}}
							</view>
						</view>
						<view class="trade-form-item flex_between_box">
							<view class="label">
								{{i18n.trade.TransactionMode}}
							</view>
							<view class="right-text">
								<view class="mode-btn">
									USDT
								</view>
							</view>
						</view>
						<view class="mode-show">
							<view class="mode-item  flex_between_box" v-for="(item,index) in set_times" :key="item.min"
								:class="[modeActive==index?'mode-active':'']" @click="changeModeTrade(index)">
								<view class="flex_left_box">
									<view class="mode-choose-box flex_center_box">
										<image v-if="modeActive==index" class="mode-choose-icon"
											src="../../static/images/trade/duigou@2x.png" mode=""></image>
									</view>
									<view class="mode-minute">
										{{item.min}}{{i18n.trade.minute}}
									</view>
								</view>
								<view class="mode-rate">
									{{item.odds}}%
								</view>
							</view>
						</view>
						<view class="lever-wrapper">
							<view v-for="item in set_amounts" :key="item" class="lever-btn"
								:class="[amountValue == item?'bg-btn':'']" @click="handelChooseAmount(item)">
								<view class="lever-text">${{ item }}</view>
								<!-- <image v-if="item == amountValue" class="btn-bg-image"
									src="../../static/images/trade/btn-radio.png" mode=""></image> -->
							</view>
							<view class="custom-box" :class="[amountValue == amount?'bg-btn':'']"
								@click="handelChooseAmount(amount)">
								<view class="custom-btn flex_left_box">
									<input type="number" v-model="amount" @input="handleInputPrice"
										:placeholder="i18n.trade.custom" />
								</view>

							</view>
						</view>
						<view class="trade-form-item flex_between_box">
							<view class="label user-amount">
								{{i18n.wallet.balance}}${{userData.balance || 0}}
							</view>
							<view class="right-text">
								<text class="fee-desc">{{i18n.trade.ServiceCharge}}：</text>
								<text class="fee-color">${{selfFee}}</text>
							</view>
						</view>
						<view class="trade-form-item flex_between_box">
							<view class="label">
								{{i18n.trade.EstimatedIncome}}
							</view>
							<view class="right-text">
								<text class="red-text">${{aboutNum}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="popup-confirm-btn" @click="handleSave">
					{{i18n.trade.ConfirmOrder}}
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Kline from './kline.vue'
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
			productItem
		},
		data() {
			return {
				tradePopup: false,
				mode: 'heyue', //模式：heyue合约，qiquan期权
				period: '',
				set_qi_amount: '',
				productPopup: false, // 切换产品弹层
				userData: {}, // 用户信息
				productData: {}, // 产品详情
				amount: null, // 自定义价格
				qiamount: null,
				multipleValue: '', // 倍数
				amountValue: '', // 数量
				firstAmount: '',
				inputPrice: '', // 开仓价格
				price: '', // 价格
				isOpen: false, // 是否查看全部
				activeType: 'handup', //  订单类型：hold持仓；handup挂单情况；history历史

				orderDate: [], // 订单列表数据
				isSendHttp: false, // 是否点击发送请求中

				productCode: '', // 产品code
				productName: '',

				markets: [],
				line: [],
				priceInfo: {},
				clear: '',
				clearMarket: '',
				isHavePage: false,
				isSendLoading: false,
				page: 1,
				total: 0,

				totalHandup: 0,
				totalHold: 0,
				haveProCode: false,
				modeActive: 0,
				set_times: [],
				set_amounts: [],

				set_amount: '',
				rise_fall: 1,
				language:''
			};
		},
		onLoad(e) {

		},
		onShow() {
			if (this.loginInfo.hasLogin) {
				this.getUserInfo();
			} else {
				this.orderDate = []
				this.page = 1
				this.total = 0
				this.totalHandup = 0
				this.totalHold = 0
			}
			console.log(uni.getStorageSync('loginInfo'))
			if (uni.getStorageSync('product')) {
				let productInfo = uni.getStorageSync('product')

				var needType = ''
				if (this.productCode == productInfo.code) {
					this.haveProCode = true
					needType = ''
				} else {
					this.haveProCode = false
					if (!this.productCode) {
						needType = 1

					} else {
						needType = ''
					}
				}
				this.productCode = productInfo.code
				this.productName = productInfo.name
				this.getProductInfo(needType)
				this.getProductPrice()
			} else {
				this.getProductShow()
			}
			this.getMaketList();
			this.clear = setInterval(this.getMaketList, 8 * 1000)
			this.clearMarket = setInterval(this.getProductPrice, 3 * 1000)
			if(uni.getStorageSync('language')){
				console.log(this.language)
				if(this.language){
					if(uni.getStorageSync('language')!=this.language){
						this.getProductInfo(1)
					}
				}
				this.language=uni.getStorageSync('language')
			}

		},
		//隐藏的时候 停止定时器和清空hqchart的实例
		onHide() {
			console.log('离开页面')
			clearInterval(this.clear);
			clearInterval(this.clearMarket);
			// this.$refs.line.clearLine()
		},
		//退出的时候 停止定时器和清空hqchart的实例
		onUnload() {
			clearInterval(this.clear);
			clearInterval(this.clearMarket);
		},
		onReachBottom() {

		},
		computed: {
			...mapState('user', ['loginInfo']),
			selfFee() {
				let score = 0
				score = Number(Number(this.productData.fee) / 100 * Number(this.amountValue))
				return score.toFixed(2)
			},
			aboutNum() {
				let count = 0
				if (this.set_times && this.set_times.length > 0) {
					count = Number(1 + (Number(this.set_times[this.modeActive].odds) / 100)) * Number(this.amountValue)
				}

				return count.toFixed(2)
			}
		},
		methods: {
			...mapActions('user', ['userInfo']),
			...mapActions('trade', ['getProductList', 'productInfo', 'submitOrder', 'orderList', 'productPrice']),
			...mapActions('common', ['marketList']),
			changeModeTrade(type) {
				this.modeActive = type
			},
			handleGoRecord() {
				uni.switchTab({
					url: '/pages/wallet/wallet'
				})
			},
			handleChangePro() {
				this.productPopup = true
			},
			chooseProduct(item) {
				this.productCode = item.code
				this.productName = item.name
				this.multipleValue = '' // 倍数
				this.amountValue = '' // 数量
				this.firstAmount = ''
				this.modeActive = 0
				this.inputPrice = '' // 开仓价格
				this.amount = ''
				this.price = '' // 价格
				uni.setStorageSync('product', {
					code: item.code,
					name: item.name
				});
				this.getProductPrice()

				uni.showLoading({})
				// this.$refs.line.clearLine()
				this.haveProCode = false
				this.getProductInfo();
				this.productPopup = false
			},
			getMaketList(type) {
				this.marketList().then(res => {
					this.page = 1
					this.markets = res.data.data;
					if (!this.productCode) {
						this.productCode = this.markets[0].code
						this.productName = this.markets[0].name
						this.getProductInfo(1);
						this.getProductPrice()
					}
				});
			},
			getProductPrice() {
				this.productPrice({
					code: this.productCode
				}).then(res => {
					this.priceInfo = res.data
				});
			},
			getProductShow() {
				if (!this.productCode) {
					return
				}
				let params = {
					code: this.productCode
				};
				this.productInfo(params).then(res => {
					this.productData = res.data;
					this.line = res.data.line

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
					this.set_times = res.data.set_times
					this.set_amounts = res.data.set_amounts
					// this.price = this.productData.price
					if (!this.amountValue) {
						this.amountValue = this.productData.set_amounts[0]
					}
					this.line = res.data.line
					if (type == 1) {
						setTimeout(() => {
							// this.$refs.line.CreateMinuteChart_app()
							this.$refs.line.CreateKLineChart()
						}, 1000)
					}
					if (!this.haveProCode) {
						this.$refs.line.openRequest()
					}
				});
			},

			// 获取用户信息
			getUserInfo() {
				this.userInfo().then(res => {
					this.userData = res.data;
				});
			},
			handleInputPrice(event) {
				let value = event.detail.value
				if (value == '.') {
					this.amountValue = '0.'
				} else {
					let dealNum = this.clearNoNum(value)
					setTimeout(() => {
						this.amountValue = dealNum
					}, 0)
				}
			},
			clearNoNum(value) {
				value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
				value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); //只能输入两个小数
				if (value.indexOf(".") < 0 && value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
					value = parseFloat(value);
				}
				return value
			},
			// 开仓买入
			handleTransaction(type) {
				if (this.loginInfo.hasLogin) {
					this.rise_fall = type
					this.tradePopup = true
				} else {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}
			},
			handleSave() {
				this.saveTrade(this.rise_fall)
			},
			saveTrade(type) {
				if (!this.isSendHttp) {
					this.isSendHttp = true
					uni.showLoading({})
					let params = {
						code: this.productCode,
						amount: this.amountValue,
						period: this.set_times[this.modeActive].min,
						rise_fall: type
					}
					if (this.mode == 'qiquan') {
						params.period = this.period
					}
					this.submitOrder(params).then(res => {
						this.tradePopup = false
						setTimeout(() => {
							this.$u.toast(res.message)
						}, 1000)
						uni.setStorageSync('isBuy','sucess')
						uni.switchTab({
							url:'/pages/wallet/wallet'
						})
						this.isSendHttp = false
					}).catch(err => {
						this.isSendHttp = false
					})
				} else {
					return false
				}
			},
			// 选择买入的数量
			handelChooseAmount(index) {
				this.amountValue = index;
			},
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: #F6F6F6;
	}

	.head-box-wrapper {
		width: 100%;
		background-color: #fff;
		margin-bottom: 32rpx;
		box-sizing: border-box;
		padding-top: 47rpx;
		padding: 47rpx 26rpx 26rpx 26rpx;

		.head-box {
			box-sizing: border-box;
			display: flex;
			align-items: center;

			.head-name {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
			}

			.head-img {
				width: 31rpx;
				height: 27rpx;
				margin-left: 20rpx;
			}
		}

		.go-histoory {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
		}

		.price-item {
			width: 100%;
			color: #212121;

			.high-text {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
			}
			.price-big{
				font-size: 32rpx;
				font-weight: 500;
			}

			.price-text {
				font-size: 24rpx;
				// width: 150rpx;
				margin-left: 20rpx;
				text-align: left;
				white-space:nowrap;
			}

			.price-after {
				// width: 200rpx
				flex-shrink: 0;
			}
		}

		.mar-t-24 {
			margin-top: 40rpx;
		}

		.mar-t-20 {
			margin-top: 20rpx;
		}
	}

	.container {
		// #ifndef H5
		padding-top: 30upx;
		// #endif
	}

	.popup-coin-section {
		padding: 30upx 30upx 24upx;
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
		background-color: #fff;
		margin: auto;
		margin-top: 30rpx;
		color: #fff;
	}

	/deep/.u-drawer-top {
		background-color: #fff !important;
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
	}

	.lever-wrapper {
		box-sizing: border-box;
		padding: 27upx 0upx 0rpx 26rpx;
		display: flex;
		flex-wrap: wrap;

		.lever-btn {
			height: 72upx;
			background: #fff;
			border-radius: 6upx;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
			line-height: 72upx;
			text-align: center;
			margin-right: 12rpx;
			margin-bottom: 24rpx;
			position: relative;
			min-width: 100rpx;
			border: 1px solid #D2D2D2;
			box-sizing: border-box;

			.lever-text {
				// width: 100%;
				height: 70upx;
				line-height: 70upx;
				position: relative;
				text-align: center;
				z-index: 20;
				box-sizing: border-box;
				padding: 0 20rpx;
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
			height: 72upx;
			// background: #1a1a1a;
			border-radius: 6upx;
			border: 1px solid #D2D2D2;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
			line-height: 72upx;
			text-align: center;
			// margin-right: 12rpx;
			margin-bottom: 24rpx;
			position: relative;

			.lever-text {
				width: 299upx;
				height: 70upx;
				line-height: 70upx;
				position: absolute;
				text-align: center;
				z-index: 20;
				box-sizing: border-box;
				padding: 0 20rpx;
			}
		}

		.bg-btn {
			border: 1px solid #fff;
			color: #fff;
			background: #0072FF;
		}

		.custom-box {
			width: 140rpx;
			height: 72rpx;
			border-radius: 6rpx;
			overflow: hidden;
			box-sizing: border-box;
			position: relative;

			.custom-btn {
				width: 100%;
				height: 100%;
				background: #fff;
				line-height: 70rpx;
				box-sizing: border-box;
				border: 1px solid #D2D2D2;
				// border-image: linear-gradient(-180deg, #3fbbfe, #a541ff) 1 1;
				border-radius: 6rpx;
				text-align: center;
				color: #212121;
			}

		}
	}

	.handle-btn-wrapper {
		margin: 104upx 0;
		padding: 0 26upx;
		font-size: 32rpx;
		font-weight: 500;
		padding-bottom: 108rpx;

		.rise-btn {
			width: 320upx;
			height: 96upx;
			background: #00B809;
			border-radius: 48upx;
			text-align: center;
			line-height: 96upx;
			color: #FFFFFF;
		}

		.down-btn {
			width: 320upx;
			height: 96upx;
			background: #E91B00;
			border-radius: 48upx;
			text-align: center;
			line-height: 96upx;
			color: #FFFFFF;
		}
	}

	.trade-popup-box {
		width: 100%;
		background-color: #fff;
		padding: 40rpx 0 72rpx 0;

		.popup-confirm-btn {
			width: 433rpx;
			height: 76rpx;
			background-color: #0072FF;
			color: #fff;
			font-size: 28rpx;
			font-weight: 500;
			line-height: 76rpx;
			text-align: center;
			border-radius: 38rpx;
			margin: auto;
		}

		.popup-title {
			width: 100%;
			text-align: center;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
		}

		.content-box {
			width: 100%;
			padding: 40rpx 0 64rpx 0;

			.mode-show {
				border-bottom: 1px solid #E9E9E9;
				padding-bottom: 26rpx;

				.mode-item {
					width: 100%;
					box-sizing: border-box;
					padding: 0 30rpx 0 45rpx;
					height: 85rpx;
					font-size: 32rpx;

					.mode-choose-box {
						width: 23rpx;
						height: 100%;

						.mode-choose-icon {
							width: 23rpx;
							height: 18rpx;
						}
					}

					.mode-rate {
						font-family: PingFang SC;
						font-weight: 500;
						color: #212121;
					}

					.mode-minute {
						font-weight: 400;
						color: #666666;
						margin-left: 12rpx;
					}
				}
			}

			.mode-active {
				color: #0072FF;
				background: #DFEDFF;
			}

			.trade-form-item {
				width: 100%;
				box-sizing: border-box;
				padding: 0 24rpx;
				height: 88rpx;

				.label {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
				}

				.user-amount {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #0072FF;
				}

				.fee-desc {
					color: #021212;
					font-size: 28rpx;
				}

				.fee-color {
					color: #0072FF;
					font-size: 28rpx;
				}

				.right-text {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #212121;

					.mode-btn {
						width: 129rpx;
						height: 65rpx;
						background: #0072FF;
						border-radius: 6rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						text-align: center;
						line-height: 65rpx;
					}
				}
			}
		}
	}

	.red-text {
		color: #E91B00 !important;
	}

	.green-text {
		color: #00B809 !important;
	}
</style>
