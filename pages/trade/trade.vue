<template>
	<view class="container">
		<view>
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

		<view class="card-item-wrapper" flex="main:justify cross:center">
			<view class="card-item">
				<text>100.2</text>
				<view>{{ i18n.trade.totalEquity }}(USDT)</view>
			</view>
			<view class="card-item">
				<text>{{ userData.balance }}</text>
				<view>{{ i18n.trade.balance }}(USDT)</view>
			</view>
		</view>
		<view class="title">
			<text>{{ i18n.trade.lever }}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
		</view>
		<view class="lever-wrapper">
			<view v-for="item in 6" :key="item" class="lever-btn" @click="handelChooseMultiple(item)">
				<view class="lever-text">x{{ item + 1 }}</view>
				<image v-if="item == multipleValue" class="btn-bg-image" src="../../static/images/trade/btn-radio.png" mode=""></image>
			</view>
		</view>
		<view class="title">
			<text>{{ i18n.trade.openPrice }}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
		</view>
		<view class="lever-wrapper">
			<view class="open-btn">35345435</view>
			<view class="open-btn">Market</view>
		</view>
		<view class="title">
			<text>{{ i18n.trade.openAmount }}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
		</view>
		<view class="lever-wrapper">
			<view v-for="item in 8" :key="item" class="lever-btn" @click="handelChooseAmount(item)">
				<view class="lever-text">{{ item }}0</view>
				<image v-if="item == amountValue" class="btn-bg-image" src="../../static/images/trade/btn-radio.png" mode=""></image>
			</view>
			<view class="custom-box">
				<view class="custom-btn">
					<input
						type="number"
						v-model="amount"
						placeholder="自定义"
						placeholder-style="background: linear-gradient(-51deg, #3FBBFE 0%, #A541FF 100%);-webkit-background-clip: text;
-webkit-text-fill-color: transparent;font-size: 30upx" 
					/>
				</view>
			</view>
		</view>
		<view class="handle-btn-wrapper" flex="main:justify cross:center">
			<view class="rise-btn">{{ i18n.trade.rise }}</view>
			<view class="down-btn">{{ i18n.trade.down }}</view>
		</view>
		<!-- 当前、历史 -->
		<view class="tabs-switch-wrapper flex_between_box">
			<view class="tabs-left-box">
				<view class="tab-item" @click="handleChangeType(1)">
					<view class="item-color" :class="[activeType == 1 ? 'active-color' : '']">{{ i18n.trade.now }}</view>
					<view v-if="activeType == 1" class="text-line-box"><image class="text-line" src="../../static/images/trade/text-line.png" mode=""></image></view>
				</view>
				<view class="tab-item mar-left-67" @click="handleChangeType(2)">
					<view class="item-color" :class="[activeType == 2 ? 'active-color' : '']">{{ i18n.trade.histroy }}</view>
					<view v-if="activeType == 2" class="text-line-box"><image class="text-line" src="../../static/images/trade/text-line.png" mode=""></image></view>
				</view>
			</view>
			<view class="right-text-box flex_right_box">
				<view class="right-text">{{ i18n.trade.showAll }}</view>
				<image @click="handleChangeOpen" v-if="!isOpen" class="right-open" src="../../static/images/trade/close.png" mode=""></image>
				<image @click="handleChangeOpen" v-if="isOpen" class="right-open" src="../../static/images/trade/open.png" mode=""></image>
			</view>
		</view>
		<view class="" v-if="activeType == 1">
			<view class="history-card-box">
				<view class="triangle-box"></view>
				<view class="history-head flex_between_box">
					<view class="title">BTC_USDT 1.0x</view>
					<view class="">
						<view class="num green-text">+1000.22</view>
						<view class="rate green-text">+180%</view>
					</view>
				</view>
				<view class="history-content-box">
					<view class="content-item flex_between_box">
						<view class="content-text-box">
							<view class="label">{{ i18n.trade.openNumer }}</view>
							<view class="amount">100</view>
						</view>
						<view class="content-text-box">
							<view class="label">{{ i18n.trade.openPrice }}</view>
							<view class="amount">100.33</view>
						</view>
						<view class="content-text-box">
							<view class="label">{{ i18n.trade.riseDown }}</view>
							<view class="amount red-text">Long</view>
						</view>
					</view>
				</view>
				<view class="card-info">
					<view class="info-item flex_between_box">
						<view class="left-text">{{ i18n.trade.fee }}</view>
						<view class="right-text">5 USDT</view>
					</view>
					<view class="info-item flex_between_box">
						<view class="left-text">{{ i18n.trade.openTime }}</view>
						<view class="right-text">03-04-2022 12:00</view>
					</view>
				</view>
				<view class="card-handle-wrapper">
					<view class="form-item-box flex_left_box">
						<input v-model="inputValue" class="login-input" placeholder-class="dart-input" type="text" value="" placeholder="请输入" />
					</view>
					<view class="form-item-box flex_between_box mar-t-22">
						<view class="dart-input left-width">AMT</view>
						<image class="arrow-image" src="../../static/images/trade/xiala@2x.png" mode=""></image>
					</view>
					<view class="handle-flex flex_center_box">
						<view class="handle-green">{{ i18n.trade.btn1 }}</view>
						<view class="handle-red">{{ i18n.trade.btn2 }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="activeType == 2">
			<view class="item-card-box">
				<view class="triangle-box"></view>
				<view class="card-head">BTC_USDT 1.0x</view>
				<view class="card-content-box">
					<view class="content-item flex_between_box">
						<view class="content-text-box">
							<view class="label">开仓数量</view>
							<view class="amount">100</view>
						</view>
						<view class="content-text-box">
							<view class="label">开仓价格</view>
							<view class="amount">100.33</view>
						</view>
						<view class="content-text-box">
							<view class="label">涨跌</view>
							<view class="amount red-text">Long</view>
						</view>
					</view>
					<view class="content-item flex_between_box">
						<view class="content-text-box">
							<view class="label">平仓价格</view>
							<view class="amount">100</view>
						</view>
						<view class="content-text-box">
							<view class="label">收益</view>
							<view class="amount">100</view>
						</view>
						<view class="content-text-box">
							<view class="label">收益率</view>
							<view class="amount green-text">100</view>
						</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="footer-item flex_between_box">
						<view class="left-text">{{ i18n.trade.fee }}</view>
						<view class="right-text">5 USDT</view>
					</view>
					<view class="footer-item flex_between_box">
						<view class="left-text">{{ i18n.trade.openTime }}</view>
						<view class="right-text">03-04-2022 12:00</view>
					</view>
					<view class="footer-item flex_between_box">
						<view class="left-text">{{ i18n.trade.openTime }}</view>
						<view class="right-text">03-04-2022 12:00</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import { klineMixins } from './kline.js';
import HQChart from '../../static/js/umychart.uniapp.h5.js';
import { JSCommon } from '../../static/js/umychart.wechat.3.0.js';

import { JSCommonHQStyle } from '../../static/js/umychart.style.wechat.js';
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';

function DefaultData() {}

DefaultData.GetKLineOption = function() {
	var data = {
		Type: '历史K线图',

		//窗口指标
		Windows: [
			{
				Index: 'MA',
				Modify: false,
				Change: false
			},
			{
				Index: 'VOL',
				Modify: false,
				Change: false
			}
		],

		IsCorssOnlyDrawKLine: true,
		IsAutoUpdate: true, //是自动更新数据
		AutoUpdateFrequency: 3000,
		CorssCursorTouchEnd: true,
		IsShowRightMenu: false, //右键菜单
		IsShowCorssCursorInfo: false, //是否显示十字光标的刻度信息
		CorssCursorInfo: {
			Left: 1,
			Right: 1,
			Bottom: 1,
			IsShowCorss: true,
			PressTime: 300
		}, //十字光标刻度设置

		//标题设置
		KLineTitle: {
			IsShow: false,
			IsShowName: false, //不显示股票名称
			IsShowSettingInfo: false //不显示周期/复权
		},
		//边框
		Border: {
			Left: 1,
			Right: 1, //右边间距
			Top: 0,
			Bottom: 25
		},

		KLine: {
			Right: 1, //复权 0 不复权 1 前复权 2 后复权
			Period: 0, //周期: 0 日线 1 周线 2 月线 3 年线
			PageSize: 30,
			InfoPosition: 1, //显示位置
			IsShowTooltip: true,
			DrawType: 0
		},

		ExtendChart: [
			{
				Name: 'KLineTooltip'
			} //开启手机端tooltip
		],

		//子框架设置 (Height 窗口高度比例值)
		Frame: [
			{
				SplitCount: 4, //最多输出5个分隔线
				//Height:4,
				IsShowLeftText: false, //不显示左边刻度文字
				IsShowRightText: true, //显示右边刻度文字
				Custom: [
					{
						Type: 0,
						Position: 'right'
					}
				]
			},
			{
				SplitCount: 2,
				//Height:2,
				IsShowLeftText: false,
				IsShowRightText: true
			},
			{
				SplitCount: 2,
				//Height:2,
				IsShowLeftText: false,
				IsShowRightText: true
			}
		],
		ExtendChart: [
			{
				Name: 'KLineTooltip'
			}
		]
	};

	return data;
};

DefaultData.GetMinuteOption = function() {
	var option = {
		Type: '分钟走势图', //创建图形类型

		//窗口指标
		Windows: [],
		IsAutoUpdate: true, //是自动更新数据
		AutoUpdateFrequency: 3000,
		DayCount: 1, //1 最新交易日数据 >1 多日走势图
		IsShowRightMenu: false, //是否显示右键菜单
		CorssCursorTouchEnd: true,

		MinuteLine: {
			//IsDrawAreaPrice:false,      //是否画价格面积图
		},

		//边框
		Border: {
			Left: 1, //左边间距
			Right: 1, //右边间距
			Top: 20,
			Bottom: 20
		},

		//子框架设置
		Frame: [
			{
				SplitCount: 3
			},
			{
				SplitCount: 2
			},
			{
				SplitCount: 3
			}
		],

		//扩展图形
		ExtendChart: [
			{
				Name: 'MinuteTooltip'
			} //手机端tooltip
		]
	};

	return option;
};

//周期枚举
var KLINE_PERIOD_ID = {
	KLINE_DAY_ID: 0,
	KLINE_WEEK_ID: 1,
	KLINE_MONTH_ID: 2,
	KLINE_YEAR_ID: 3,

	KLINE_MINUTE_ID: 4,
	KLINE_5MINUTE_ID: 5,
	KLINE_15MINUTE_ID: 6,
	KLINE_30MINUTE_ID: 7,
	KLINE_60MINUTE_ID: 8
};

//周期枚举
var MINUTE_PERIOD_ID = {
	MINUTE_ID: 1,
	MINUTE_2DAY_ID: 2,
	MINUTE_3DAY_ID: 3,
	MINUTE_4DAY_ID: 4,
	MINUTE_5DAY_ID: 5
};

var g_KLine = {
	JSChart: null
};
var g_Minute = {
	JSChart: null
};
export default {
	mixins: [commonMixin],
	data() {
		return {
			userData: {}, // 用户信息
			productData: {}, // 产品详情
			amount: null, // 自定义价格
			multipleValue: 1,
			amountValue: 1,
			isOpen: false,
			activeType: 1,
			inputValue: '',
			Symbol: '600000.sh',
			ChartWidth: uni.upx2px(750),
			ChartHeight: uni.upx2px(780),
			KLine: {
				Option: DefaultData.GetKLineOption(),
				IsShow: true
			},
			Minute: {
				Option: DefaultData.GetMinuteOption(),
				IsShow: false
			},

			MINUTE_PERIOD_ID: MINUTE_PERIOD_ID,
			KLINE_PERIOD_ID: KLINE_PERIOD_ID
		};
	},
	onLoad(e) {
		// this.getLine()

		this.getProduct();
		this.getUserInfo();
		this.getProductInfo();
	},
	onReady() {
		this.OnSize();
		this.CreateKLineChart();
	},
	methods: {
		...mapActions('user', ['userInfo']),
		...mapActions('trade', ['getProductLine', 'getProductList', 'productInfo']),
		// getLine() {
		// 	this.getProductLine({
		// 		code: 'btc',
		// 		k: '5min'
		// 	}).then(res => {
		// 		console.log(res)
		// 	});
		// },
		getProductInfo() {
			let params = {
				code: 'btc'
			};
			this.productInfo(params).then(res => {
				this.productData = res.data;
			});
		},
		getProduct() {
			this.getProductList({
				limit: 15
			}).then(res => {
				console.log(res);
			});
		},
		// 获取用户信息
		getUserInfo() {
			this.userInfo().then(res => {
				this.userData = res.data;
			});
		},
		handelChooseMultiple(index) {
			this.multipleValue = index;
		},
		handelChooseAmount(index) {
			this.amountValue = index;
		},
		handleChangeOpen() {
			this.isOpen = !this.isOpen;
		},
		handleChangeType(type) {
			this.activeType = type;
		},

		OnSize() {
			// #ifdef H5
			this.OnSize_h5();
			// #endif
		},

		OnSize_h5() {
			var chartHeight = this.ChartHeight;
			var chartWidth = this.ChartWidth;
			setTimeout(() => {
				var kline = this.$refs.kline;
				console.log(kline.style);
				kline.style.width = uni.upx2px(750) + 'px';
				kline.style.height = uni.upx2px(780) + 'px';
				if (g_KLine.JSChart) g_KLine.JSChart.OnSize();

				var minute = this.$refs.minute;
				minute.style.width = chartWidth + 'px';
				minute.style.height = chartHeight + 'px';
				if (g_Minute.JSChart) g_Minute.JSChart.OnSize();
			}, 500);
		},
		//创建K线图
		CreateKLineChart_h5() {
			if (g_KLine.JSChart) return;
			this.KLine.Option.Symbol = this.Symbol;
			let chart = HQChart.JSChart.Init(this.$refs.kline);
			this.KLine.Option.NetworkFilter = this.NetworkFilter;

			this.KLine.Option.IsCorssOnlyDrawKLine = true; //十字光标只能在K线上
			this.KLine.Option.CorssCursorTouchEnd = true; //手势结束十字光标自动隐藏
			this.KLine.Option.IsClickShowCorssCursor = true;
			this.KLine.Option.IsFullDraw = true;
			this.KLine.Option.IsApiPeriod = true; //一定要设置为true不然会有意想不到的惊喜
			this.KLine.Option.ExtendChart = [
				{
					Name: 'KLineTooltip'
				}
			];
			chart.SetOption(this.KLine.Option);
			g_KLine.JSChart = chart;
		},

		CreateKLineChart_app() {
			if (this.KLine.JSChart) return;

			let element = new JSCommon.JSCanvasElement();
			// #ifdef APP-PLUS
			element.IsUniApp = true; //canvas需要指定下 是uniapp的app
			// #endif
			element.ID = 'kline2';
			element.Height = this.ChartHeight; //高度宽度需要手动绑定!!
			element.Width = this.ChartWidth;

			g_KLine.JSChart = JSCommon.JSChart.Init(element);

			var blackStyle = JSCommonHQStyle.GetStyleConfig(JSCommonHQStyle.STYLE_TYPE_ID.BLACK_ID);
			blackStyle.BGColor = 'rgb(12,23,37)'; //背景
			blackStyle.FrameTitleBGColor = 'rgb(16,28,45)'; //指标标题背景
			blackStyle.FrameSplitTextColor = 'rgb(101,117,138)'; //刻度颜色

			//K线颜色
			blackStyle.UpBarColor = 'rgb(0, 176, 124)'; //K线上涨柱子颜色
			blackStyle.UpTextColor = blackStyle.UpBarColor; //上涨价格颜色
			blackStyle.DownBarColor = 'rgb(216, 78, 86)'; //K线下跌柱子颜色
			blackStyle.DownTextColor = blackStyle.DownBarColor; //下跌价格颜色

			//指标线段颜色
			blackStyle.Index.LineColor[0] = 'rgb(88,106,126)';
			blackStyle.Index.LineColor[1] = 'rgb(222,217,167)';
			blackStyle.Index.LineColor[2] = 'rgb(113,161,164)';

			//最新价格刻度颜色
			blackStyle.FrameLatestPrice.UpBarColor = 'rgb(0, 176, 124)';
			blackStyle.FrameLatestPrice.DownBarColor = 'rgb(216, 78, 86)';

			//面积图颜色
			blackStyle.CloseLineColor = 'rgb(113,121,133)'; //收盘价线颜色
			blackStyle.CloseLineAreaColor = ['rgba(36,41,57,0.8)', 'rgba(22,34,53,0.3)']; //收盘价面积图颜色

			//最高最低价颜色
			blackStyle.KLine.MaxMin.Color = 'rgb(255,250,240)';
			JSCommon.JSChart.SetStyle(blackStyle);

			this.KLine.Option.NetworkFilter = this.NetworkFilter;
			this.KLine.Option.Symbol = this.Symbol;
			this.KLine.Option.IsCorssOnlyDrawKLine = true; //十字光标只能在K线上
			this.KLine.Option.CorssCursorTouchEnd = true; //手势结束十字光标自动隐藏
			this.KLine.Option.IsClickShowCorssCursor = true;
			this.KLine.Option.IsFullDraw = true;
			this.KLine.Option.IsApiPeriod = true; //一定要设置为true不然会有意想不到的惊喜
			this.KLine.Option.ExtendChart = [
				{
					Name: 'KLineTooltip'
				}
			];
			g_KLine.JSChart.SetOption(this.KLine.Option);
		},

		CreateKLineChart() {
			this.CreateKLineChart_app();
		},

		//K线周期切换
		ChangeKLinePeriod(period) {
			this.Minute.IsShow = false;
			this.KLine.IsShow = true;
			if (!g_KLine.JSChart) {
				//不存在创建
				this.KLine.Option.Period = period;
				this.CreateKLineChart_h5();
			} else {
				g_KLine.JSChart.ChangePeriod(period);
			}
		},
		//创建日线图
		CreateMinuteChart_h5() {
			if (g_Minute.JSChart) return;
			this.Minute.Option.Symbol = this.Symbol;
			let chart = HQChart.JSChart.Init(this.$refs.minute);
			this.Minute.Option.NetworkFilter = this.NetworkFilter;
			chart.SetOption(this.Minute.Option);
			g_Minute.JSChart = chart;
		},

		CreateMinuteChart_app() {
			if (g_Minute.JSChart) return;

			var element = new JSCommon.JSCanvasElement();
			// #ifdef APP-PLUS
			element.IsUniApp = true; //canvas需要指定下 是uniapp的app
			// #endif
			element.ID = 'minute2';
			element.Height = this.ChartHeight; //高度宽度需要手动绑定!!
			element.Width = this.ChartWidth;

			g_Minute.JSChart = JSCommon.JSChart.Init(element);
			this.Minute.Option.NetworkFilter = this.NetworkFilter;
			this.Minute.Option.Symbol = this.Symbol;
			g_Minute.JSChart.SetOption(this.Minute.Option);
		},

		CreateMinuteChart() {
			this.CreateMinuteChart_app();
		},

		//走势图多日切换
		ChangeMinutePeriod: function(period) {
			this.Minute.IsShow = true;
			this.KLine.IsShow = false;
			if (!g_Minute.JSChart) {
				//不存在创建
				this.Minute.Option.DayCount = period;
				this.CreateMinuteChart();
			} else {
				g_Minute.JSChart.ChangeDayCount(period);
			}
		},

		NetworkFilter: function(data, callback) {
			console.log('========================[HQChart:NetworkFilter] data', data);
			data.PreventDefault = true;
			switch (data.Name) {
				case 'KLineChartContainer::ReqeustHistoryMinuteData': //分钟全量数据下载
					this.RequestHistoryData(data, callback, true);
					break;
				case 'KLineChartContainer::RequestFlowCapitalData': //数字货币不会调用
					this.RequestHistoryData(data, callback, true);
					//this.RequestFlowCapitalData(data, callback);
					break;
				case 'KLineChartContainer::RequestHistoryData': //日线全量数据下载
					// this.RequestHistoryData(data, callback, false);
					this.RequestHistoryData(data, callback, true);
					break;
			}
		},
		RequestHistoryData: function(data, callback, isMuite) {
			data.PreventDefault = true;
			let that = this;

			this.getProductLine({
				code: 'btc',
				k: '1min'
			}).then(res => {
				// console.log(res)
				let recvData = res.data;
				var internalChart = g_KLine.JSChart.JSChartContainer;
				var period = internalChart.Period;
				var symbol = internalChart.Symbol;

				var hqChartData = {
					code: 0,
					data: [],
					ver: 2.0
				}; //更新数据使用2.0版本格式
				hqChartData.symbol = this.Symbol;
				hqChartData.name = this.Symbol;
				//TODO:把recvData => hqchart内部格式 格式看教程
				//HQChart使用教程30-K线图如何对接第3方数据15-轮询增量更新1分钟K线数据

				// var item = recvData.tick;
				for (var i = 0; i < recvData.length; i++) {
					var item = recvData[i];
					var timestamp = i * 1000;
					var dateTime = new Date(item.time);
					// dateTime.setTime(timestamp);
					var date = dateTime.getFullYear() * 10000 + (dateTime.getMonth() + 1) * 100 + dateTime.getDate();
					var time = dateTime.getHours() * 100 + dateTime.getMinutes();

					var newItem = [
						date,
						time,
						Number(item.open),
						Number(item.hight),
						Number(item.low),
						Number(item.close),
						Number(item.volume) / Number(item.price),
						Number(item.volume),
						Number(item.price)
					];
					hqChartData.data.push(newItem);
				}
				console.log(hqChartData);
				// #ifdef H5
				callback({
					data: hqChartData
				});
				// #endif
				// #ifndef H5
				callback(hqChartData);
				// #endif
			});
		},

		///
		//手势事件 app/小程序才有
		//KLine事件
		KLineTouchStart: function(event) {
			if (g_KLine.JSChart) g_KLine.JSChart.OnTouchStart(event);
		},

		KLineTouchMove: function(event) {
			if (g_KLine.JSChart) g_KLine.JSChart.OnTouchMove(event);
		},

		KLineTouchEnd: function(event) {
			if (g_KLine.JSChart) g_KLine.JSChart.OnTouchEnd(event);
		},

		//走势图事件
		MinuteTouchStart: function(event) {
			if (g_Minute.JSChart) g_Minute.JSChart.OnTouchStart(event);
		},

		MinuteTouchMove: function(event) {
			if (g_Minute.JSChart) g_Minute.JSChart.OnTouchMove(event);
		},

		MinuteTouchEnd: function(event) {
			if (g_Minute.JSChart) g_Minute.JSChart.OnTouchEnd(event);
		}
	}
};
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

.red-text {
	color: #ff0101;
}

.green-text {
	color: #01ff37;
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
		width: 100upx;
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
	}

	.custom-box {
		width: 140rpx;
		height: 61rpx;
		border-radius: 8rpx;
		border: 1px solid;
		overflow: hidden;
		box-sizing: border-box;

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
</style>
