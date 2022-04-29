<template>
	<view class='divchart'>
		
		<view class="self-tabs-box">
			<view class="tab-item-default" v-for="(item,index) in list" :key="index" @click="changeLine(index+4)">
				<view class="tab-text-name" :class="[index+4==activeId?'current-tab':'']">
					{{item.name}}
				</view>
			</view>
		</view>
		<view :style="{width: ChartWidth+'px', height: ChartHeight+'px'}" style="position: relative;">
			<view class="" style="position: absolute;top: 0;
			left: 0;" :style="{left:KLine.IsShow?'0px':'-10000rpx'}">
				<canvas style="position: absolute;" id="kline2" canvas-id='kline2' class='kline2'
					v-bind:style="{width: ChartWidth+'px', height: ChartHeight+'px'}" @touchstart="KLineTouchStart"
					@touchmove='KLineTouchMove' @touchend='KLineTouchEnd'></canvas>
			</view>
			<minute-line ref="minuteLine" v-show="activeId==4" :productData="productData" :productCode="productCode">
			</minute-line>
		</view>
	</view>
</template>

<script>
	import minuteLine from './minute.vue'
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

	DefaultData.GetKLineOption = function() {
		var data = {
			Type: '历史K线图',
			//窗口指标
			Windows: [{
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
			AutoUpdateFrequency: 41 * 1000,
			CorssCursorTouchEnd: true,
			IsShowRightMenu: false, //右键菜单
			IsShowCorssCursorInfo: false, //是否显示十字光标的刻度信息
			CorssCursorInfo: {
				Left: 1,
				Right: 40,
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
				Period: 8, //周期: 0 日线 1 周线 2 月线 3 年线
				PageSize: 30,
				InfoPosition: 1, //显示位置
				IsShowTooltip: true,
				DrawType: 0
			},
			ExtendChart: [{
					Name: 'KLineTooltip'
				} //开启手机端tooltip
			],
			//子框架设置 (Height 窗口高度比例值)
			Frame: [{
					SplitCount: 4, //最多输出5个分隔线
					//Height:4,
					IsShowLeftText: false, //不显示左边刻度文字
					IsShowRightText: true, //显示右边刻度文字
					Custom: [{
						Type: 0,
						Position: 'right'
					}]
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
			ExtendChart: [{
				Name: 'KLineTooltip'
			}]
		};

		return data;
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
		KLINE_60MINUTE_ID: 8,
		KLINE_240MINUTE_ID: 9,
		KLINE_300MINUTE_ID: 10
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
		components: {
			minuteLine
		},
		props: {
			productName: {
				type: String,
				default () {
					return ''
				}
			},
			price: {
				type: String,
				default () {
					return ''
				}
			},
			rate: {
				type: String,
				default () {
					return ''
				}
			},
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
				KLine: {
					Option: DefaultData.GetKLineOption(),
					IsShow: true,
				},


				MINUTE_PERIOD_ID: MINUTE_PERIOD_ID,
				KLINE_PERIOD_ID: KLINE_PERIOD_ID,
				activeId: 9,
				activeName: '1h',
				isSend: false


				// list: {
				// 	4: '1min',
				// 	5: '5min',
				// 	6: '15min',
				// 	7: '30min',
				// 	8: '1h',
				// 	9: '4h',
				// },
			}
		},
		watch: {
			productCode(val) {
				console.log('productCode', val)
				// this.changeLine(this.activeId)
			}
		},

		onLoad() {
			setTimeout(() => {
				// this.CreateKLineChart();
				// this.CreateMinuteChart();
				this.changeLine(9)
			}, 800)
		},
		onReady() {

		},

		methods: {
			...mapActions('trade', ['getProductLine']),
			handleChangeProduct() {
				this.$emit('changePro')
			},
			//不同的品种返回不同的小数位数


			CreateKLineChart_app() {
				if (this.KLine.JSChart) return;

				let element = new JSCommon.JSCanvasElement();
				// #ifdef APP-PLUS
				element.IsUniApp = true; //canvas需要指定下 是uniapp的app
				// #endif
				element.IsUniApp = true; //canvas需要指定下 是uniapp的app
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

				this.KLine.Option.NetworkFilter = this.NetworkLineFilter;
				this.KLine.Option.Symbol = this.Symbol;
				this.KLine.Option.SplashTitle = this.i18n.common.loading;
				this.KLine.Option.Language= uni.getStorageSync('language') == 'en_US' ? "EN" : 'CN';
				this.KLine.Option.IsCorssOnlyDrawKLine = true; //十字光标只能在K线上
				this.KLine.Option.CorssCursorTouchEnd = true; //手势结束十字光标自动隐藏
				this.KLine.Option.IsClickShowCorssCursor = true;
				this.KLine.Option.IsFullDraw = true;
				this.KLine.Option.IsApiPeriod = true; //一定要设置为true不然会有意想不到的惊喜
				this.KLine.Option.ExtendChart = [{
					Name: 'KLineTooltip'
				}];
				JSCommon.MARKET_SUFFIX_NAME.GetMarketStatus = function(symbol) {
					return 2;
				}

				g_KLine.JSChart.SetOption(this.KLine.Option);
			},

			CreateKLineChart() {
				this.CreateKLineChart_app();
			},

			//K线周期切换
			ChangeKLinePeriod(period) {
				if (this.isSend) {
					return false
				}
				// uni.showLoading({
				// 	title: this.i18n.common.loading,
				// })
				this.activeId = period
				if (this.list && this.list.length > 0) {
					this.activeName = this.list[this.activeId - 4].name
				}

				console.log(period, 'period')
				// this.Minute.IsShow = false;
				this.KLine.IsShow = true;
				let needPeriod = period - 1
				console.log(needPeriod, 'needPeriod')
				if (!g_KLine.JSChart) {
					//不存在创建
					this.KLine.Option.Period = needPeriod > 8 ? 12 : needPeriod;
					this.CreateKLineChart();
				} else {
					g_KLine.JSChart.ChangePeriod(needPeriod > 8 ? 12 : needPeriod);
				}
			},
			clearLine() {
				console.log(g_KLine.JSChart)
				console.log('oppen')
				if (g_KLine.JSChart) {
					g_KLine.JSChart.StopAutoUpdate();
					//如果是WS 需要关闭WS
					// g_KLine.JSChart = null;
					console.log(g_KLine)
				}
				if (g_Minute.JSChart) {
					g_Minute.JSChart.StopAutoUpdate();
					//如果是WS 需要关闭WS
					// g_Minute.JSChart = null;
				}
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
			changeLine(index) {
				if (index == 4) {
					this.KLine.IsShow = false;
					this.activeId = index
					setTimeout(() => {
						this.$refs.minuteLine.CreateMinuteChart_app()
					}, 500)
					this.activeName = this.list[this.activeId - 4].name
				} else {
					this.ChangeKLinePeriod(index)
				}
			},

			NetworkLineFilter(data, callback) {
				console.log('========================[HQChart:NetworkLineFilter] data', data);
				data.PreventDefault = true;
				// switch (data.Name) {
				// 	case 'KLineChartContainer::ReqeustHistoryMinuteData': //1分钟全量数据下载
				// 		this.RequestHistoryLineData(data, callback, true);
				// 		break;
				// 	case 'KLineChartContainer::RequestFlowCapitalData': //数字货币不会调用

				// 		//this.RequestFlowCapitalData(data, callback);
				// 		break;
				// 	case 'KLineChartContainer::RequestHistoryData': //日线全量数据下载
				// 		// this.RequestHistoryData(data, callback, false);

				// 		break;
				// 	case 'MinuteChartContainer::RequestMinuteData': //最新分时数据
				// 		this.RequestHistoryData(data, callback, true);
				// 		break;
				// 	case 'KLineChartContainer::RequestMinuteRealtimeData': // 当天1分钟K线数据
				// 		this.RequestHistoryLineData(data, callback, true);
				// 		break;
				// }
				setTimeout(() => {
					this.RequestHistoryLineData(data, callback, true);
				}, 200)
			},


			RequestHistoryLineData(data, callback, isMuite) {
				// console.log(this.activeId,this.list)
				data.PreventDefault = true;
				let that = this;
				if (this.activeId == 4) {
					return
				}
				console.log(this.productCode)
				this.isSend = true
				this.getProductLine({
					code: this.productCode,
					k: this.list[this.activeId - 4].k || '1h'
				}).then(res => {
					console.log(res)
					this.isSend = false
					uni.hideLoading()
					if (res.code == 200) {
						let recvData = res.data;
						let internalLineChart = g_KLine.JSChart.JSChartContainer;
						let period = internalLineChart.Period;
						let symbol = internalLineChart.Symbol;

						let hqChartData = {
							code: 0,
							data: [],
							ver: 2.0
						}; //更新数据使用2.0版本格式
						hqChartData.symbol = this.Symbol;
						hqChartData.name = this.Symbol;
						//TODO:把recvData => hqchart内部格式 格式看教程
						//HQChart使用教程30-K线图如何对接第3方数据15-轮询增量更新1分钟K线数据

						for (let i = 0; i < recvData.length; i++) {
							let item = recvData[i];
							let needTime = item.time
							let stringTime = needTime.replace(/-/g, "/")
							let dateTime = new Date(stringTime);
							let date = dateTime.getFullYear() * 10000 + (dateTime.getMonth() + 1) * 100 +
								dateTime
								.getDate();
							let time = dateTime.getHours() * 100 + dateTime.getMinutes();
							let yClose = Number((Number(item.price) - Number(item.diff)).toFixed(2))
							let amount = Number((Number(item.volume) / Number(item.price)).toFixed(2))
							let newItem = [
								date,
								yClose,
								Number(item.open),
								Number(item.high),
								Number(item.low),
								Number(item.close),
								amount,
								Number(item.volume),
								time
							];
							// console.log(yClose)
							hqChartData.data.push(newItem);
							let that = this
							var numLength = that.price.split('.')[1].length
							JSCommon.MARKET_SUFFIX_NAME.GetDefaultDecimal = function(symbol) {
								return numLength || 2;
							}
						}
						console.log(hqChartData, '702242999@qq.com');
						setTimeout(() => {
							callback({
								data: hqChartData
							});
						}, 500)
					}
				}).catch(() => {
					this.isSend = false
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
	}
</script>

<style lang="scss">
	.red-text {
		color: #ff0101 !important;
	}
	
	.green-text {
		color: #01ff37 !important;
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
