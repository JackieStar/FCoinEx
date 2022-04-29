<template>
	<view class='divchart'>
		<view :style="{width: ChartWidth+'px', height: ChartHeight+'px'}" style="position: relative;">
			<view class="">
				<canvas id="minute2" canvas-id='minute2' class='minute'
					:style="{width: ChartWidth+'px', height: ChartHeight+'px'}" @touchstart="MinuteTouchStart"
					@touchmove='MinuteTouchMove' @touchend='MinuteTouchEnd'></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		JSCommon
	} from '../../static/js/umychart.wechat.3.0.js'
	import {
		JSCommonHQStyle
	} from '../../static/js/umychart.style.wechat.js'
	import {
		JSCommonCoordinateData
	} from '../../static/js/umychart.coordinatedata.wechat.js'

	import pako from './pako.js'
	import {
		mapState,
		mapActions
	} from 'vuex';
	import {
		commonMixin
	} from '@/common/mixin/mixin.js';

	function DefaultData() {}
	DefaultData.GetMinuteOption = function() {
		var option = {
			Type: '分钟走势图', //创建图形类型

			Windows: [],
			Language: uni.getStorageSync('language') == 'en_US' ? "EN" : 'CN',

			Symbol: '000001.sz',
			SplashTitle:'',
			IsAutoUpdate: true, //是自动更新数据
			AutoUpdateFrequency: 61 * 1000,
			DayCount: 1, //1 最新交易日数据 >1 多日走势图
			IsShowCorssCursorInfo: true, //是否显示十字光标的刻度信息
			IsShowRightMenu: false, //是否显示右键菜单
			YCoordinateType:0,

			MinuteLine: {
				// IsDrawAreaPrice:false,      //是否画价格面积图
				IsShowAveragePrice: false,
			},

			Border: //边框
			{
				Left: 1, //左边间距
				Right: 4, //右边间距
				Bottom: 25, //底部间距
				Top: 0 //顶部间距
			},

			Frame: //子框架设置
				[{
						SplitCount: 7,
						IsShowLeftText: true,
						IsShowRightText: true,
						YCoordinateType:0,
						IsYReverse:true,
						// RightTextFormat: 1,
					},
					{
						SplitCount: 0,
						Height: 0
					}
				],

			Overlay: //叠加股票 目前只支持1只股票
				[
					//{Symbol:'000001.sh'}
				]
		};

		return option;
	};


	var g_Minute = {
		JSChart: null
	};
	export default {
		mixins: [commonMixin],
		props: {

			productCode: {
				type: String,
				default () {
					return ''
				}
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
			productData: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				// 000001.sz
				Symbol: '600000.sh',
				ChartWidth: uni.upx2px(750),
				ChartHeight: uni.upx2px(789),

				Minute: {
					Option: DefaultData.GetMinuteOption(),
					IsShow: false,
				},
				activeId: 9,

				isSend: false
			}
		},
		watch: {
			productCode(val) {
				console.log('productCode--minute', val)
				// this.CreateMinuteChart_app()
				if (g_Minute.JSChart) {
					g_Minute.JSChart.ChangeSymbol(this.Symbol); //重新请求当前得股票
				}
				// this.changeLine(this.activeId)
			}
		},

		onLoad() {
			console.log('-00-')
			this.CreateMinuteChart_app()
		},
		onReady() {},
		methods: {
			...mapActions('trade', ['getProductLine']),
			handleChangeProduct() {
				this.$emit('changePro')
			},
			CreateMinuteChart_app() {
				console.log(';;', 'g_Minute.JSChart', g_Minute.JSChart)
				if (g_Minute.JSChart) return;

				var element = new JSCommon.JSCanvasElement();
				// #ifdef APP-PLUS
				element.IsUniApp = true; //canvas需要指定下 是uniapp的app
				// #endif
				element.IsUniApp = true; //canvas需要指定下 是uniapp的app
				element.ID = 'minute2';
				element.Height = this.ChartHeight; //高度宽度需要手动绑定!!
				element.Width = this.ChartWidth;

				g_Minute.JSChart = JSCommon.JSChart.Init(element);
				let minuteCoordinateData = JSCommonCoordinateData.MinuteCoordinateData
				let minuteStringData = JSCommonCoordinateData.MinuteTimeStringData
				minuteStringData.CreateSHSZData = () => {
					return this.CreateSHSZData();
				} //替换交易时间段
				minuteCoordinateData.GetSHSZData = (upperSymbol, width) => {
					return this.GetSHSZData(upperSymbol, width)
				}

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

				this.Minute.Option.NetworkFilter = this.NetworkFilter;
				this.Minute.Option.Symbol = this.Symbol;
				this.Minute.Option.SplashTitle = this.i18n.common.loading;
				
				this.Minute.Option.IsCorssOnlyDrawKLine = true; //十字光标只能在K线上
				this.Minute.Option.CorssCursorTouchEnd = true; //手势结束十字光标自动隐藏
				this.Minute.Option.IsClickShowCorssCursor = true;
				this.Minute.Option.IsFullDraw = true;

				this.Minute.Option.IsApiPeriod = true; //一定要设置为true不然会有意想不到的惊喜
				// this.KLine.Option.ExtendChart = [{
				// 	Name: 'KLineTooltip'
				// }];

				JSCommon.MARKET_SUFFIX_NAME.GetMarketStatus = function(symbol) {
					return 2;
				}
				g_Minute.JSChart.SetOption(this.Minute.Option);
			},

			CreateSHSZData() {
				const TIME_SPLIT = [{
						Start: 0,
						End: 1200
					},
					{
						Start: 1200,
						End: 2400
					}
				]
				var minuteStringData = JSCommonCoordinateData.MinuteTimeStringData()
				return minuteStringData.CreateTimeData(TIME_SPLIT)
			},

			GetSHSZData(upperSymbol, width) {
				const SHZE_MINUTE_X_COORDINATE = {
					Full: //完整模式
						[
							[0, 0, "rgb(200,200,200)", "00:00"],
							[181, 0, "RGB(200,200,200)", "03:00"],
							[361, 0, "RGB(200,200,200)", "06:00"],
							[541, 0, "RGB(200,200,200)", "09:00"],
							[722, 1, "RGB(200,200,200)", "12:00"],
							[902, 0, "RGB(200,200,200)", "15:00"],
							[1082, 0, "RGB(200,200,200)", "18:00"],
							[1260, 0, "RGB(200,200,200)", "21:00"],
							[1442, 1, "RGB(200,200,200)", "24:00"], // 15:00
						],
					Simple: //简洁模式
						[
							[0, 0, "rgb(200,200,200)", "00:00"],
							[241, 0, "RGB(200,200,200)", "04:00"],
							[481, 0, "RGB(200,200,200)", "08:00"],
							[722, 1, "RGB(200,200,200)", "12:00"],
							[962, 0, "RGB(200,200,200)", "16:00"],
							[1202, 0, "RGB(200,200,200)", "20:00"],
							[1442, 1, "RGB(200,200,200)", "24:00"]
						],
					Min: //最小模式     
						[
							[0, 0, "rgb(200,200,200)", "00:00"],
							[722, 1, "RGB(200,200,200)", "12:00"],
							[1442, 1, "RGB(200,200,200)", "24:00"]
						],

					Count: 1442, //!! 一共的分钟数据个数，不要填错了
					MiddleCount: 721, // Count/2 就可以。

					GetData: function(width) {
						if (width < 200) return this.Min;
						else if (width < 400) return this.Simple;

						return this.Full;
					}
				};

				return SHZE_MINUTE_X_COORDINATE;
			},

			CreateMinuteChart() {
				this.CreateMinuteChart_app();
			},

			openRequest() {
				if (g_Minute.JSChart) {
					g_Minute.JSChart.JSChartContainer.IsAutoUpdate = true; //设置自动更新
					g_Minute.JSChart.ChangeSymbol(this.Symbol); //重新请求当前得股票
				}
				if (g_KLine.JSChart) {
					g_KLine.JSChart.JSChartContainer.IsAutoUpdate = true; //设置自动更新
					g_KLine.JSChart.ChangeSymbol(this.Symbol); //重新请求当前得股票
				}

			},


			//走势图多日切换
			ChangeMinutePeriod(period) {
				this.activeId = period
				this.activeName = this.list[this.activeId - 4].name
				console.log(this.activeId, 'period')
				this.Minute.IsShow = true;
				this.KLine.IsShow = false;
				if (!g_Minute.JSChart) {
					//不存在创建
					this.Minute.Option.DayCount = 1;
					this.CreateMinuteChart();
				} else {
					g_Minute.JSChart.ChangeDayCount(1);
				}
			},

			NetworkFilter(data, callback) {
				console.log('========================[HQChart:NetworkFilter] data', data);
				data.PreventDefault = true;
				setTimeout(() => {
					this.RequestHistoryData(data, callback, true);
				}, 200)
			},

			RequestHistoryData(data, callback, isMuite) {
				// console.log(this.activeId,this.list)
				data.PreventDefault = true;
				let that = this;
				console.log(this.productCode)
				this.isSend = true
				this.getProductLine({
					code: this.productCode,
					k: 'today'
				}).then(res => {
					// console.log(res)
					this.isSend = false
					uni.hideLoading()
					let recvData = res.data;
					let internalChart = g_Minute.JSChart.JSChartContainer;
					let period = internalChart.Period;
					let symbol = internalChart.Symbol;

					let hqChartData = {
						code: 0,
						data: [],
						ver: 2.0
					}; //更新数据使用2.0版本格式
					hqChartData.symbol = this.Symbol;
					hqChartData.name = this.Symbol;
					//TODO:把recvData => hqchart内部格式 格式看教程
					//HQChart使用教程30-K线图如何对接第3方数据15-轮询增量更新1分钟K线数据

					let arr = []
					for (let i = 0; i < recvData.length; i++) {
						let item = recvData[i];
						// console.log(new Date(item.time))
						let needTime = item.time
						let stringTime = needTime.replace(/-/g, "/")
						let dateTime = new Date(stringTime);
						var date = dateTime.getFullYear() * 10000 + (dateTime.getMonth() + 1) * 100 +
							dateTime
							.getDate();
						let time = dateTime.getHours() * 100 + dateTime.getMinutes();

						// "avprice": 16.75,
						// "increase": 0.35949670461354105,
						// "risefall": 0.06
						let newItem = {
							"price": Number(item.price),
							"close": Number(item.close),
							"open": Number(item.open),
							"high": Number(item.high),
							"low": Number(item.low),
							"vol": Number(item.volume),
							"risefall": Number(item.diff_rate),
							"amount": Number(item.volume) / Number(item.price),
							"time": time,
						};
						arr.push(newItem);
					}
					// console.log(arr)
					let newDate = new Date();
					let dateValue = newDate.getFullYear() * 10000 + (newDate.getMonth() + 1) * 100 +
						newDate
						.getDate();
					let newTime = newDate.getHours() * 100 + newDate.getMinutes();

					let stockItem = {
						name: this.Symbol,
						symbol: '000001.sz',
						// time: newTime,
						date: dateValue,
						price: Number(this.productData.price),
						open: Number(this.productData.open),
						yclose: Number(this.productData.price) - Number(this.productData.diff),
						high: Number(this.productData.high),
						low: Number(this.productData.low),
						minute: arr
					};
					// console.log(Number(this.productData.price)-Number(this.productData.diff))

					let hqMinuteChartData = {
						code: 0,
						ver: 3.0,
						stock: [stockItem]
					};
					callback({
						data: hqMinuteChartData
					});
				}).catch(() => {
					this.isSend = false
				});
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
	}
</script>

<style lang="scss">
	.head-box {
		width: 100%;
		box-sizing: border-box;
		padding: 21rpx 28rpx;
		display: flex;
		align-items: center;

		.head-name {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}

		.head-img {
			width: 31rpx;
			height: 27rpx;
			margin-left: 20rpx;
		}
	}

	.high-text {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FF1111;
		line-height: 30rpx;
		padding-left: 28rpx;
	}

	.self-tabs-box {
		width: 100%;
		display: flex;
		// height: 80rpx;
		margin-bottom: 20rpx;
		flex-wrap: wrap;

		.tab-item-default {
			padding: 0 16rpx;
			height: 80rpx;
			box-sizing: border-box;
			line-height: 80rpx;

			.tab-text-name {
				color: #A2A2A2;
				font-size: 28rpx;
			}

			.current-tab {
				color: #3F82FF;
				border-bottom: 3rpx solid #3F82FF;
			}
		}
	}
</style>
