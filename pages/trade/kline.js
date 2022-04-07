// #ifdef H5	
import HQChart from '../../static/js/umychart.uniapp.h5.js'
// #endif

// #ifndef H5
import {
	JSCommon
} from '../../static/js/umychart.wechat.3.0.js'
// #endif

import {
	JSCommonHQStyle
} from '../../static/js/umychart.style.wechat.js'
import {
	mapState,
	mapActions
} from 'vuex';

function DefaultData() {}

DefaultData.GetKLineOption = function() {
	var data = {
		Type: '历史K线图',

		Windows: //窗口指标
			[{
					Index: "MA",
					Modify: false,
					Change: false
				},
				{
					Index: "VOL",
					Modify: false,
					Change: false
				}
			],

		IsCorssOnlyDrawKLine: true,
		CorssCursorTouchEnd: true,
		IsShowRightMenu: false, //右键菜单
		KLineTitle: //标题设置
		{
			IsShow: false,
			IsShowName: false, //不显示股票名称
			IsShowSettingInfo: false //不显示周期/复权
		},
		Border: //边框
		{
			Left: 1,
			Right: 1, //右边间距
			Top: 0,
			Bottom: 25,
		},

		KLine: {
			Right: 1, //复权 0 不复权 1 前复权 2 后复权
			Period: 0, //周期: 0 日线 1 周线 2 月线 3 年线 
			PageSize: 30,
			IsShowTooltip: false,
			DrawType: 0
		},

		ExtendChart: [{
				Name: 'KLineTooltip'
			}, //开启手机端tooltip
		],

		Frame: //子框架设置
			[{
					SplitCount: 3
				},
				{
					SplitCount: 2
				},
				{
					SplitCount: 3
				},
			],

	};

	return data;
}

DefaultData.GetMinuteOption = function() {
	var option = {
		Type: '分钟走势图', //创建图形类型

		Windows: //窗口指标
			[

			],
		IsAutoUpdate: true, //是自动更新数据
		AutoUpdateFrequency: 3000,
		DayCount: 1, //1 最新交易日数据 >1 多日走势图
		IsShowRightMenu: false, //是否显示右键菜单
		CorssCursorTouchEnd: true,

		MinuteLine: {
			//IsDrawAreaPrice:false,      //是否画价格面积图
		},

		Border: //边框
		{
			Left: 1, //左边间距
			Right: 1, //右边间距
			Top: 20,
			Bottom: 20
		},

		Frame: //子框架设置
			[{
					SplitCount: 3
				},
				{
					SplitCount: 2
				},
				{
					SplitCount: 3
				},
			],

		ExtendChart: //扩展图形
			[{
					Name: 'MinuteTooltip'
				} //手机端tooltip
			],
	};

	return option;
}


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
}

//周期枚举
var MINUTE_PERIOD_ID = {
	MINUTE_ID: 1,
	MINUTE_2DAY_ID: 2,
	MINUTE_3DAY_ID: 3,
	MINUTE_4DAY_ID: 4,
	MINUTE_5DAY_ID: 5,
}

var g_KLine = {
	JSChart: null
};
var g_Minute = {
	JSChart: null
};
export default {
	data() {
		return {
			Symbol: '600000.sh',
			ChartWidth: uni.upx2px(750),
			ChartHeight: uni.upx2px(789),
			KLine: {
				Option: DefaultData.GetKLineOption(),
				IsShow: true,
			},
			Minute: {
				Option: DefaultData.GetMinuteOption(),
				IsShow: false,
			},

			MINUTE_PERIOD_ID: MINUTE_PERIOD_ID,
			KLINE_PERIOD_ID: KLINE_PERIOD_ID,
		};
	},

	onLoad() {

	},

	onReady() {
		this.OnSize();
		this.CreateKLineChart();
	},

	methods: {
		...mapActions('trade', ['getProductLine']),
		OnSize() {
			// #ifdef H5
			this.OnSize_h5();
			// #endif
		},

		OnSize_h5() {
			var chartHeight = this.ChartHeight;
			var chartWidth = this.ChartWidth;

			var kline = this.$refs.kline;
			kline.style.width = chartWidth + 'px';
			kline.style.height = chartHeight + 'px';
			if (g_KLine.JSChart) g_KLine.JSChart.OnSize();

			var minute = this.$refs.minute;
			minute.style.width = chartWidth + 'px';
			minute.style.height = chartHeight + 'px';
			if (g_Minute.JSChart) g_Minute.JSChart.OnSize();
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
			this.KLine.Option.ExtendChart = [{
				Name: 'KLineTooltip'
			}];
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
			blackStyle.UpBarColor = 'rgb(37,175,142)'; //K线上涨柱子颜色
			blackStyle.UpTextColor = blackStyle.UpBarColor; //上涨价格颜色
			blackStyle.DownBarColor = 'rgb(210,73,99)'; //K线下跌柱子颜色
			blackStyle.DownTextColor = blackStyle.DownBarColor; //下跌价格颜色

			//指标线段颜色
			blackStyle.Index.LineColor[0] = 'rgb(88,106,126)';
			blackStyle.Index.LineColor[1] = 'rgb(222,217,167)';
			blackStyle.Index.LineColor[2] = 'rgb(113,161,164)';

			//最新价格刻度颜色
			blackStyle.FrameLatestPrice.UpBarColor = 'rgb(37,175,142)';
			blackStyle.FrameLatestPrice.DownBarColor = 'rgb(210,73,99)';

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
			this.KLine.Option.ExtendChart = [{
				Name: 'KLineTooltip'
			}];
			g_KLine.JSChart.SetOption(this.KLine.Option);
		},

		CreateKLineChart() {
			// #ifdef H5
			this.CreateKLineChart_h5();
			// #endif

			// #ifndef H5
			this.CreateKLineChart_app();
			// #endif
		},

		//K线周期切换
		ChangeKLinePeriod(period) {
			this.Minute.IsShow = false;
			this.KLine.IsShow = true;
			if (!g_KLine.JSChart) //不存在创建
			{
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
			// #ifdef H5
			this.CreateMinuteChart_h5();
			// #endif

			// #ifndef H5
			this.CreateMinuteChart_app();
			// #endif
		},

		//走势图多日切换
		ChangeMinutePeriod: function(period) {
			this.Minute.IsShow = true;
			this.KLine.IsShow = false;
			if (!g_Minute.JSChart) //不存在创建
			{
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
			console.log(callback)

			data.PreventDefault = true;
			let that = this;

			this.getProductLine({
				code: 'btc',
				k: '1min'
			}).then(res => {
				// console.log(res)
				let recvData = res.data
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
					var date = dateTime.getFullYear() * 10000 + (dateTime.getMonth() + 1) * 100 + dateTime
						.getDate();
					var time = dateTime.getHours() * 100 + dateTime.getMinutes();

					var newItem = [date, time, Number(item.open), Number(item.hight), Number(item.low),
						Number(item.close), Number(item.volume), Number(item.price)
					];
					hqChartData.data.push(newItem);
				}
				console.log(hqChartData)
				callback(hqChartData);

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
		},
	}
}
