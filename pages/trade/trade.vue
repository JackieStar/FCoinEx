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
			<view class="flex_between_box price-item mar-t-24">
				<view class="high-text" :class=" { 'green-text' : Number(priceInfo.diff_rate)>=0,
						'red-text': Number(priceInfo.diff_rate)<0 }">
					{{priceInfo.price}}
				</view>
				<view class="flex_right_box">
					<view class="price-text">
						{{ i18n.trade.high }}：{{priceInfo.high}}
					</view>
					<view class="price-text price-after">
						{{ i18n.trade.low }}：{{priceInfo.low}}
					</view>
				</view>
			</view>
			<view class="flex_between_box price-item mar-t-20">
				<view class="high-text flex_left_box">
					<text
						:class=" { 'green-text' : Number(priceInfo.diff_rate)>=0,
						'red-text': Number(priceInfo.diff_rate)<0 }">{{Number(priceInfo.diff_rate)>0?'+':''}}{{priceInfo.diff_rate}}%</text>
				</view>
				<view class="flex_right_box">
					<view class="price-text">
						{{ i18n.trade.open }}：{{priceInfo.open}}
					</view>
					<view class="price-text price-after">
						{{ i18n.trade.messageTime }}：44444
					</view>
				</view>
			</view>

		</view>
		<view class="">

		</view>
		<Kline ref="line" :productName="productName" :list="line" :productData="productData" :price="priceInfo.price"
			:rate="priceInfo.diff_rate" :productCode="productCode"></Kline>
		<!-- <view class="card-item-wrapper flex_between_box">
			<view class="card-item">
				<text>{{priceInfo.total_assets}}</text>
				<view>{{ i18n.trade.totalEquity }}(USDT)</view>
			</view>
			<view class="card-item">
				<text>{{ userData.balance || 0 }}</text>
				<view>{{ i18n.trade.balance }}(USDT)</view>
			</view>
		</view> -->
		<!-- <block v-if="mode=='heyue'">
			<view class="title">
				<text>{{ i18n.trade.lever }}</text>
				<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx"
					height="12upx" mode="" />
			</view>
			<view class="lever-wrapper">
				<view v-for="item in productData.lever" :key="item" class="lever-btn"
					@click="handelChooseMultiple(item)">
					<view class="lever-text">{{ item }}x</view>
					<image v-if="item == multipleValue" class="btn-bg-image"
						src="../../static/images/trade/btn-radio.png" mode=""></image>
				</view>
			</view>
			<view class="title">
				<text>{{ i18n.trade.openPrice }}</text>
				<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx"
					height="12upx" mode="" />
			</view>
			<view class="lever-wrapper">
				<view class="open-btn">
					<view @click="handleChoosePrice('inputPrice')" class="lever-text flex_center_box">
						<input type="number" @input="handleInputPrice" v-model="inputPrice"
							:placeholder="i18n.trade.placeholder" placeholder-style="background: linear-gradient(-51deg, #3FBBFE 0%, #A541FF 100%);-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;font-size: 30upx" />
					</view>
				</view>
				<view class="open-btn" @click="handleChoosePrice('Market')" :class="[price == 'Market'?'bg-btn':'']">
					<view class="lever-text">{{i18n.trade.market}}</view>
				</view>
			</view>
			<view class="title">
				<text>{{ i18n.trade.openAmount }}</text>
				<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx"
					height="12upx" mode="" />
			</view>
			<view class="lever-wrapper">
				<view v-for="item in productData.set_amount" :key="item" class="lever-btn"
					@click="handelChooseAmount(item)">
					<view class="lever-text">{{ item }}</view>
					<image v-if="item == amountValue" class="btn-bg-image" src="../../static/images/trade/btn-radio.png"
						mode=""></image>
				</view>
				<view class="custom-box" :class="[amountValue == amount?'bg-btn':'']"
					@click="handelChooseAmount(amount)">
					<view class="custom-btn flex_left_box">
						<input type="number" v-model="amount" :placeholder="i18n.trade.custom" placeholder-style="background: linear-gradient(-51deg, #3FBBFE 0%, #A541FF 100%);-webkit-background-clip: text;
-webkit-text-fill-color: transparent;font-size: 30upx" />
					</view>

				</view>
			</view>
		</block> -->
		<!-- <block v-if="mode=='qiquan'">
			<view class="title">
				<text>{{ i18n.trade.cycle }}</text>
				<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx"
					height="12upx" mode="" />
			</view>
			<view class="lever-wrapper">
				<view v-for="item in productData.set_qi_time" :key="item.second" class="lever-btn"
					@click="handelChoosePeriod(item.second)">
					<view class="lever-text">{{ item.name }}</view>
					<image v-if="item.second == period" class="btn-bg-image"
						src="../../static/images/trade/btn-radio.png" mode=""></image>
				</view>
			</view>
			<view class="title">
				<text>{{ i18n.trade.openAmount }}</text>
				<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx"
					height="12upx" mode="" />
			</view>
			<view class="lever-wrapper">
				<view v-for="item in productData.set_qi_amount" :key="item" class="lever-btn"
					@click="handelChooseQiAmount(item)">
					<view class="lever-text">{{ item }}</view>
					<image v-if="item == set_qi_amount" class="btn-bg-image"
						src="../../static/images/trade/btn-radio.png" mode=""></image>
				</view>
				<view class="custom-box" :class="[set_qi_amount == qiamount?'bg-btn':'']"
					@click="handelChooseQiAmount(qiamount)">
					<view class="custom-btn flex_left_box">
						<input type="number" v-model="qiamount" :placeholder="i18n.trade.custom" placeholder-style="background: linear-gradient(-51deg, #3FBBFE 0%, #A541FF 100%);-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;font-size: 30upx" @blur="inputBlurChange" />
					</view>

				</view>
			</view>
		</block> -->

		<view class="handle-btn-wrapper flex_between_box">
			<view class="rise-btn" @click="handleTransaction(1)">
				{{ i18n.trade.rise }}
			</view>
			<view class="down-btn" @click="handleTransaction(2)">
				{{ i18n.trade.down }}
			</view>
		</view>

		<!-- 当前、历史 -->
		<!-- 	<view class="tabs-switch-wrapper flex_between_box">
			<view class="tabs-left-box">
				<view v-if="mode=='heyue'" class="tab-item mar-right-57" @click="handleChangeType('handup')">
					<view class="item-color" :class="[activeType == 'handup' ? 'active-color' : '']">
						{{ i18n.trade.now }}<text>({{totalHandup}})</text>
					</view>
					<view v-if="activeType == 'handup'" class="text-line-box">
						<image class="text-line" src="../../static/images/trade/text-line.png" mode=""></image>
					</view>
				</view>
				<view class="tab-item mar-right-57" @click="handleChangeType('hold')">
					<view class="item-color" :class="[activeType == 'hold' ? 'active-color' : '']">
						{{ i18n.trade.hold }}<text>({{totalHold}})</text>
					</view>
					<view v-if="activeType == 'hold'" class="text-line-box">
						<image class="text-line" src="../../static/images/trade/text-line.png" mode=""></image>
					</view>
				</view>
				<view class="tab-item" @click="handleChangeType('history')">
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
				<view class="card-head">{{item.product_name}}_USDT <text style="padding-left: 16rpx;" v-if="mode=='heyue'">{{item.lever}}x</text>
				</view>
				<view class="card-content-box">
					<view class="content-item flex_between_box">
						<view class="content-text-box">
							<view class="label">{{ i18n.trade.openAmount }}</view>
							<view class="amount">{{item.hand_number}}</view>
						</view>
						<view class="content-text-box">
							<view class="label">{{ i18n.trade.openPrice }}</view>
							<view class="amount">{{item.price}}</view>
						</view>
						<view class="content-text-box">
							<view class="label">{{ i18n.trade.riseDown }}</view>
							<view class="amount" v-html="item.rise_fall_label"></view>
						</view>
					</view>
					<view class="content-item flex_between_box">
						<view class="content-text-box">
							<view class="label">{{i18n.trade.sellPrice}}</view>
							<view class="amount">{{item.sell_price}}</view>
						</view>
						<view v-if="mode=='heyue'" class="content-text-box">
							<view class="label">{{i18n.trade.profit}}</view>
							<view class="amount">{{item.profit}}(USDT)</view>
						</view>
						<view v-if="mode=='qiquan'" class="content-text-box">
							<view class="label">{{i18n.trade.profit}}</view>
							<view class="amount"  :class="[item.profit>0?'green-text':'red-text']"><text>{{item.profit>0?'+':''}}{{item.profit}}</text>(USDT)</view>
						</view>
						<view class="content-text-box" v-if="mode=='heyue'">
							<view class="label">{{i18n.trade.profitRate}}</view>
							<view class="amount" :class="[item.profit_rate>0?'green-text':'red-text']">
								{{item.profit_rate>0?'+':''}}{{item.profit_rate}}%
							</view>
						</view>
						<view class="content-text-box" v-if="mode=='qiquan'">
							<view class="label">{{i18n.trade.tradeCycle}}</view>
							<view class="amount ">
								{{item.period}}
							</view>
						</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="footer-item flex_between_box">
						<view v-if="mode=='heyue'" class="left-text">{{ i18n.trade.fee }}</view>
						<view v-if="mode=='qiquan'" class="left-text">{{ i18n.withdraw.fee }}</view>
						<view class="right-text">{{item.fee}} USDT</view>
					</view>
					<view class="footer-item flex_between_box">
						<view class="left-text">{{ i18n.trade.openTime }}</view>
						<view class="right-text">{{item.created_at}}</view>
					</view>
					<view v-if="item.pingcang_at" class="footer-item flex_between_box">
						<view class="left-text">{{ i18n.trade.pingcan }}</view>
						<view class="right-text">{{item.pingcang_at}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<handleup-item v-for="item in orderDate" @refreshOrder="getNewOrderList" :key="item.id" :infoItem="item"
				:type="activeType" :mode="mode" @handleGet="handleGet"></handleup-item>
		</view> -->

		<u-popup v-model="productPopup" mode="top">
			<view class="top-popup-box">
				<view class="popup-coin-section">
					<view class="s-header">
						<view class="col">{{ i18n.index.market.title1 }}</view>
						<view class="col r">{{ i18n.index.market.title2 }}</view>
						<view class="col r">{{ i18n.index.market.title3 }}</view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 80vh;">
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
								21324.32
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
							<view class="mode-item  flex_between_box" v-for="(item,index) in set_times"
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
									{{item.odds}}
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
									<input type="number" v-model="amount" :placeholder="i18n.trade.custom" />
								</view>

							</view>
						</view>
						<view class="trade-form-item flex_between_box">
							<view class="label user-amount">
								{{i18n.wallet.balance}}$214141324.12
							</view>
							<view class="right-text">
								<text class="fee-desc">手续费：</text>
								<text class="fee-color">$122.00</text>
							</view>
						</view>
						<view class="trade-form-item flex_between_box">
							<view class="label">
								{{i18n.trade.EstimatedIncome}}
							</view>
							<view class="right-text">
								<text class="red-text">$122.00</text>
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
				rise_fall: 1
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
			this.clearMarket = setInterval(this.getProductPrice, 15 * 1000)

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
			if (this.total > this.orderDate.length && !this.isSendLoading) {
				this.page++
				this.getOrderList()
			}
		},
		computed: {
			...mapState('user', ['loginInfo'])
		},
		methods: {
			...mapActions('user', ['userInfo']),
			...mapActions('trade', ['getProductList', 'productInfo', 'submitOrder', 'orderList', 'productPrice']),
			...mapActions('common', ['marketList']),
			changeMode(value) {
				if (value == 'qiquan') {
					if (this.activeType == 'handup') {
						this.activeType = 'hold'
					}
				}
				this.mode = value
				if (this.loginInfo.hasLogin) {
					this.getNewOrderList()
				}
			},
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
				if (!this.isOpen) {
					this.page = 1
				}
				if (this.loginInfo.hasLogin) {
					this.getNewOrderList()
				}
				this.productPopup = false
			},
			handleGet() {
				if (this.mode == 'qiquan') {
					this.getNewOrderList()
				}
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
					console.log(this.priceInfo)
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
					if (this.loginInfo.hasLogin) {
						this.getNewOrderList()
					}
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
					// if (!this.multipleValue) {
					// 	this.multipleValue = this.productData.lever[0]
					// }
					// this.set_qi_amount = this.productData.set_qi_amount[0]
					// this.period = this.productData.set_qi_time[0].second
					this.line = res.data.line
					if (this.loginInfo.hasLogin) {
						this.getNewOrderList()
					}
					if (type == 1) {
						setTimeout(() => {
							// this.$refs.line.CreateMinuteChart_app()
							this.$refs.line.CreateKLineChart()
						}, 1000)
					} else {
						// if(this.$refs.line.KLine.Option.Language=='EN'&&uni.getStorageSync('language') !== 'en-US'){
						// 	this.$refs.line.CreateKLineChart()
						// }
						// if(this.$refs.line.KLine.Option.Language=='CN'&&uni.getStorageSync('language') == 'en-US'){
						// 	this.$refs.line.CreateKLineChart()
						// }
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
			getNewOrderList() {
				this.page = 1
				this.getNavTotal()

				this.getOrderList()
			},
			getNavTotal() {
				let paramsHold = {
					type: 'hold',
					code: this.isOpen ? '' : this.productCode,
					status: '',
					page: this.page,
					mode: this.mode,
					limit: 10
				}
				this.orderList(paramsHold).then(res => {
					this.totalHold = res.data.length
				});
				let paramsHandup = {
					type: 'handup',
					code: this.isOpen ? '' : this.productCode,
					status: 1,
					page: this.page,
					mode: this.mode,
					limit: 10
				}
				this.orderList(paramsHandup).then(res => {
					this.totalHandup = res.data.total
				});
			},
			getOrderList() {
				this.isSendLoading = true
				let params = {
					type: this.activeType == 'hold' ? this.activeType : 'handup',
					code: this.isOpen ? '' : this.productCode,
					status: this.activeType == 'hold' ? "" : this.activeType == 'history' ? 2 : 1,
					page: this.page,
					mode: this.mode,
					limit: 10
				}

				this.orderList(params).then(res => {
					console.log(res.data)
					uni.hideLoading()
					this.isSendLoading = false
					if (this.activeType == 'hold') {
						this.orderDate = res.data;
						this.totalHold = res.data.length
					} else {
						if (this.activeType == 'handup') {
							this.totalHandup = res.data.total
						}
						let records = res.data.data
						this.total = res.data.total
						if (this.page == 1) {
							this.orderDate = records
							this.isHavePage = true
						} else {
							this.orderDate = this.orderDate.concat(records)
						}
					}
				});
			},
			handleInputPrice(event) {
				let value = event.detail.value
				if (value == '.') {
					this.inputPrice = '0.'
				} else {
					let dealNum = this.clearNoNum(value)
					setTimeout(() => {
						this.inputPrice = dealNum
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
				this.rise_fall = type
				this.tradePopup = true
			},
			handleSave() {
				this.saveTrade(this.rise_fall)
			},
			saveTrade(type) {
				if (!this.isSendHttp) {
					this.isSendHttp = true
					uni.showLoading({

					})

					let params = {
						code: this.productCode,
						amount: this.mode == 'heyue' ? this.amountValue : this.set_qi_amount,
						price: this.price == 'Market' ? this.price : this.inputPrice,
						lever: this.multipleValue,
						rise_fall: type,
						mode: this.mode
					}
					if (this.mode == 'qiquan') {
						params.period = this.period
					}
					this.submitOrder(params).then(res => {
						// this.getOrderList()
						// this.getNavTotal()
						this.tradePopup = false
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
			// 选择周期
			handelChoosePeriod(index) {
				this.period = index;
			},
			// 选择买入的数量
			handelChooseQiAmount(index) {
				this.set_qi_amount = index;
			},
			inputBlurChange(val) {
				console.log(val)
				this.handelChooseQiAmount(val.detail.value)
			},
			// 切换是否查看全部
			handleChangeOpen() {
				this.isOpen = !this.isOpen;
				this.page = 1
				this.getNavTotal()
				this.getOrderList()
			},
			// 切换订单类型
			handleChangeType(type) {
				this.activeType = type;
				this.page = 1
				uni.showLoading({

				})
				this.getOrderList()
			},
			handleChoosePrice(price) {
				if (this.price == 'Market') {
					this.price = 'inputPrice'
				} else {
					this.price = price
				}

			}
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

			.price-text {
				font-size: 24rpx;
				width: 150rpx;
				text-align: left;
			}

			.price-after {
				width: 190rpx
			}
		}

		.mar-t-24 {
			margin-top: 24rpx;
		}

		.mar-t-20 {
			margin-top: 20rpx;
		}

		.mar-r-45 {
			margin-right: 45rpx;
		}
	}

	.container {
		// #ifndef H5
		padding-top: 30upx;
		// #endif
	}

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
		background-color: #fff;
		margin: auto;
		margin-top: 30rpx;
		color: #fff;
	}

	/deep/.u-drawer-top {
		background-color: #fff !important;
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

		.rise-btn {
			width: 320upx;
			height: 96upx;
			background: #00B809;
			border-radius: 14upx;
			text-align: center;
			line-height: 96upx;
			color: #FFFFFF;

		}

		.down-btn {
			width: 320upx;
			height: 96upx;
			background: #E91B00;
			border-radius: 14upx;
			text-align: center;
			line-height: 96upx;
			color: #FFFFFF;
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
				width: 104upx;
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

			.mar-right-57 {
				margin-right: 57rpx;
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
