(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/trade/trade"],{

/***/ 100:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!I:/out-project/FCoinEx/pages/public/kline.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;














































































var _umychartWechat = __webpack_require__(/*! ../../static/js/umychart.wechat.3.0.js */ 101);


var _umychartStyleWechat = __webpack_require__(/*! ../../static/js/umychart.style.wechat.js */ 116);


var _vuex = __webpack_require__(/*! vuex */ 7);



var _pako = _interopRequireDefault(__webpack_require__(/*! ../../utils/pako.js */ 117));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function DefaultData() {}

DefaultData.GetKLineOption = function () {
  var data = {
    Type: '历史K线图',

    Windows: //窗口指标
    [{
      Index: "MA",
      Modify: false,
      Change: false },

    {
      Index: "VOL",
      Modify: false,
      Change: false }],


    IsShowRightMenu: false, //右键菜单
    IsShowCorssCursorInfo: false, //是否显示十字光标的刻度信息
    CorssCursorInfo: {
      Left: 1,
      Right: 1,
      Bottom: 1,
      IsShowCorss: true,
      PressTime: 300 },
    //十字光标刻度设置

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
      Top: 4,
      Bottom: 25 },


    KLine: {
      Right: 1, //复权 0 不复权 1 前复权 2 后复权
      Period: 0, //周期: 0 日线 1 周线 2 月线 3 年线 
      PageSize: 30, //一屏显示多少数据
      InfoPosition: 1, //显示位置
      KLineDoubleClick: false, //双击分钟走势图
      IsShowTooltip: true, //是否显示K线提示信息
      //FirstShowDate:20180401,             //首屏显示的起始日期   
      DrawType: 0 },


    Frame: //子框架设置 (Height 窗口高度比例值)
    [{
      SplitCount: 4, //最多输出5个分隔线
      //Height:4,
      IsShowLeftText: false, //不显示左边刻度文字
      IsShowRightText: true, //显示右边刻度文字                      
      Custom: [{
        Type: 0,
        Position: 'right' }] },


    {
      SplitCount: 2,
      //Height:2,
      IsShowLeftText: false,
      IsShowRightText: true },

    {
      SplitCount: 2,
      //Height:2,
      IsShowLeftText: false,
      IsShowRightText: true }],


    ExtendChart: [{
      Name: 'KLineTooltip' }] };




  return data;
};

//周期枚举
var PERIOD_ID = {
  KLINE_DAY_ID: 0,
  KLINE_WEEK_ID: 1,
  KLINE_MONTH_ID: 2,
  KLINE_YEAR_ID: 3,

  KLINE_MINUTE_ID: 4,
  KLINE_5MINUTE_ID: 5,
  KLINE_15MINUTE_ID: 6,
  KLINE_30MINUTE_ID: 7,
  KLINE_60MINUTE_ID: 8 };


var PERIOD_VALUE = {
  //1min  5min  15min  30min  1hour  1day  1week  1month
};


var g_KLine = {
  JSChart: null };var _default =


{
  name: 'HQChart',

  data: function data() {
    var data = {
      showSet: false,
      title: '',
      Symbol: 'ethusdt',
      KLine: {
        Option: DefaultData.GetKLineOption(),
        IsShow: true,
        Display: 'none',
        Width: 300,
        Height: 500 },

      KlineData: [],
      PERIOD_ID: PERIOD_ID,
      list: [{
        name: '1min' },

      {
        name: '1h' },

      {
        name: '1d' },

      {
        name: '1w' },

      {
        name: '1m' }],


      periodValue: {
        '1min': '1min',
        '5min': '5min',
        '15min': '15min',
        '30min': '30min',
        '1h': '60min',
        '1d': '1day',
        '1w': '1week',
        '1m': '1mon'
        //1min  5min  15min  30min  1hour  1day  1week  1month
      },
      chartPeriod: {
        '1min': 4,
        '5min': 5,
        '15min': 6,
        '30min': 7,
        '60min': 8,
        '1day': 0,
        '1week': 1,
        '1mon': 2 },

      defaultPeriod: '1day',
      current: 2,
      tick: {},
      klineIndex: {
        "0": {
          index: 0,
          name: 'MA' },

        "1": {
          index: 0,
          name: 'BOLL' },

        "2": {
          index: 1,
          name: 'MACD' },

        "3": {
          index: 1,
          name: 'RSI' },

        "4": {
          index: 1,
          name: 'VOL' },

        "5": {
          index: 2,
          name: 'WR' } },


      mainIndex: "0",
      subIndex: "4",
      intro: {} };


    return data;
  },
  computed: {},
  onLoad: function onLoad(options) {
    var that = this;

    if (options.symbol) {
      this.Symbol = options.symbol;
    }

    //this.Symbol = 'ethusdt'
    //this.syncSubRealtimeKline()
    uni.setNavigationBarTitle({
      title: this.Symbol.toUpperCase() });

  },

  //隐藏的时候 停止定时器和清空hqchart的实例
  onHide: function onHide() {
    if (g_KLine.JSChart) {
      g_KLine.JSChart.StopAutoUpdate();
      g_KLine.JSChart = null;
    }
  },
  //退出的时候 停止定时器和清空hqchart的实例
  onUnload: function onUnload() {
    if (g_KLine.JSChart) {
      g_KLine.JSChart.StopAutoUpdate();
      //如果是WS 需要关闭WS
      g_KLine.JSChart = null;
    }
    this.syncCancelRealtimeKline();
    this.syncCancelMarketTicker();
  },
  onReady: function onReady() {
    console.log("[KLineChart::onReady]");




  },
  onShow: function onShow() {
    var that = this;
    setTimeout(function () {
      that.syncSubMarketTicker();
    }, 1000);
    uni.getSystemInfo({
      success: function success(res) {
        that.KLine.Width = res.windowWidth;
        that.ChangeKLinePeriod(PERIOD_ID.KLINE_DAY_ID);
      } });

  },

  methods: _objectSpread(_objectSpread({},
  (0, _vuex.mapActions)('trade', ['getProductLine'])), {}, {
    getLine: function getLine() {
      this.getProductLine({
        code: 'btc',
        k: '1min' }).
      then(function (res) {
        console.log(res);
      });
    },
    capture: function capture() {
      var pages = getCurrentPages();
      var page = pages[pages.length - 1];
      var bitmap = null;
      var currentWebview = page.$getAppWebview();
      bitmap = new plus.nativeObj.Bitmap('amway_img');
      // 将webview内容绘制到Bitmap对象中  
      currentWebview.draw(bitmap, function () {
        bitmap.save("_doc/a.jpg", {}, function (i) {
          uni.saveImageToPhotosAlbum({
            filePath: i.target,
            success: function success() {
              bitmap.clear(); //销毁Bitmap图片  
              uni.showToast({
                title: '保存成功’',
                mask: false,
                duration: 1500 });

            } });

        }, function (e) {
          console.log('保存图片失败：' + JSON.stringify(e));
        });
      }, function (e) {
        console.log('截屏绘制图片失败：' + JSON.stringify(e));
      });
      //currentWebview.append(amway_bit);    
    },
    syncSubRealtimeKline: function syncSubRealtimeKline() {var _this = this;
      var that = this;
      var ch = "market.".concat(this.Symbol, ".kline.").concat(this.defaultPeriod);
      var params = {
        "id": new Date().getTime(),
        "sub": ch };

      this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params));
      // uni.$on("sub."+ch, (res) => {
      // 	if (this.chartPeriod[this.defaultPeriod] > 3) {
      // 		that.RecvMinuteRealtimeData(res.data, ch)
      // 	} else {
      // 		that.RecvRealtimeData(res.data, ch)
      // 	}
      // })
      this.getProductLine({
        code: 'btc',
        k: '1min' }).
      then(function (res) {
        console.log(res);
        if (_this.chartPeriod[_this.defaultPeriod] > 3) {
          that.RecvMinuteRealtimeData(res.data, ch);
        } else {
          that.RecvRealtimeData(res.data, ch);
        }
      });

    },
    syncCancelRealtimeKline: function syncCancelRealtimeKline() {
      var ch = "market.".concat(this.Symbol, ".kline.").concat(this.defaultPeriod);
      var params = {
        "id": new Date().getTime(),
        "unsub": ch };

      this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params));
    },
    syncSubMarketTicker: function syncSubMarketTicker() {
      var that = this;
      var ch = "market.overviewv2";
      var params = {
        "sub": ch };

      // this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params))

      // let tick = {
      // 	open: item.o,
      // 	close: item.c,
      // 	low: item.l,
      // 	high: item.h,
      // 	vol: item.v,
      // 	amount: item.a
      // }
      var tick = {
        open: 1,
        close: 2.9,
        low: 0.9,
        high: 3,
        vol: 3,
        amount: 8 };

      tick.change = parseFloat((tick.close - tick.open) / tick.open * 100).toFixed(2);
      tick.cny = parseFloat(tick.close * 6.4).toFixed(2);
      this.tick = tick;
      this.syncSubMarketDetail();

      // this.getProductLine({
      // 	code: 'btc',
      // 	k: '1min'
      // }).then(res => {
      // 	console.log(res.data)
      // 	if(!this.tick.close){
      // 		let map = res.data
      // 		console.log(this.Symbol)
      // 		if(map[this.Symbol]){
      // 			let item = map[this.Symbol]

      // 			let tick = {
      // 				open: item.o,
      // 				close: item.c,
      // 				low: item.l,
      // 				high: item.h,
      // 				vol: item.v,
      // 				amount: item.a
      // 			}
      // 			tick.change = parseFloat((tick.close - tick.open) / tick.open * 100).toFixed(2);
      // 			tick.cny = parseFloat(tick.close * 6.4).toFixed(2)
      // 			this.tick = tick
      // 			this.syncSubMarketDetail()
      // 		}
      // 	}
      // });
      // uni.$on("sub."+ch, (res) => {
      // 	if(!this.tick.close){
      // 		let map = res.data.data
      // 		if(map[this.Symbol]){
      // 			let item = map[this.Symbol]
      // 			let tick = {
      // 				open: item.o,
      // 				close: item.c,
      // 				low: item.l,
      // 				high: item.h,
      // 				vol: item.v,
      // 				amount: item.a
      // 			}
      // 			tick.change = parseFloat((tick.close - tick.open) / tick.open * 100).toFixed(2);
      // 			tick.cny = parseFloat(tick.close * 6.4).toFixed(2)
      // 			this.tick = tick
      // 			this.syncSubMarketDetail()
      // 		}
      // 	}
      // })
    },
    syncSubMarketDetail: function syncSubMarketDetail() {var _this2 = this;
      var that = this;
      var ch = "market.".concat(this.Symbol, ".detail");
      var params = {
        "id": new Date().getTime(),
        "sub": ch };

      this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params));
      uni.$on("sub." + ch, function (res) {
        var open = _this2.tick.open;
        var tick = res.data.tick;
        tick.open = open;
        tick.change = parseFloat((tick.close - tick.open) / tick.open * 100).toFixed(2);
        tick.cny = parseFloat(tick.close * 6.4).toFixed(2);
        _this2.tick = tick;
      });
    },
    syncCancelMarketTicker: function syncCancelMarketTicker() {
      this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify({
        "unsub": "market.overviewv2" }));

      var ch = "market.".concat(this.Symbol, ".detail");
      var params = {
        "id": new Date().getTime(),
        "unsub": ch };

      this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params));
    },
    OnSize: function OnSize() {



    },

    OnSize_h5: function OnSize_h5() {
      var chartHeight = this.KLine.Height;
      var chartWidth = this.KLine.Width;

      var kline = this.$refs.kline;
      kline.style.width = chartWidth + 'px';
      kline.style.height = chartHeight + 'px';
      if (g_KLine.JSChart) g_KLine.JSChart.OnSize();
    },
    CreateKLineChart_app: function CreateKLineChart_app() {
      if (this.KLine.JSChart) return;

      var element = new _umychartWechat.JSCommon.JSCanvasElement();
      element.IsUniApp = true; //canvas需要指定下 是uniapp的app
      element.ID = 'kline2';
      element.Height = this.KLine.Height; //高度宽度需要手动绑定!!
      element.Width = this.KLine.Width;

      g_KLine.JSChart = _umychartWechat.JSCommon.JSChart.Init(element);

      var blackStyle = _umychartStyleWechat.JSCommonHQStyle.GetStyleConfig(_umychartStyleWechat.JSCommonHQStyle.STYLE_TYPE_ID.BLACK_ID);
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
      _umychartWechat.JSCommon.JSChart.SetStyle(blackStyle);

      this.KLine.Option.NetworkFilter = this.NetworkFilter;
      this.KLine.Option.Symbol = this.Symbol;
      this.KLine.Option.IsCorssOnlyDrawKLine = true; //十字光标只能在K线上
      this.KLine.Option.CorssCursorTouchEnd = true; //手势结束十字光标自动隐藏
      this.KLine.Option.IsClickShowCorssCursor = true; //手势点击出现十字光标
      //this.KLine.Option.EnableScrollUpDown = true; //允许手势上下操作滚动页面
      this.KLine.Option.IsFullDraw = true;
      this.KLine.Option.IsApiPeriod = true; //一定要设置为true不然会有意想不到的惊喜
      this.KLine.Option.ExtendChart = [{
        Name: 'KLineTooltip' }];

      g_KLine.JSChart.SetOption(this.KLine.Option);

      g_KLine.JSChart.AddEventCallback({
        event: _umychartWechat.JSCommon.JSCHART_EVENT_ID.ON_TITLE_DRAW,
        callback: this.OnTitleDraw });

    },

    CreateKLineChart: function CreateKLineChart() {
      this.CreateKLineChart_app();
    },
    OnTitleDraw: function OnTitleDraw(event, data, obj) //K线信息
    {
      /* console.log('[OnTitleDraw]', event, data);
      if (!data.Draw) {
      	this.TestData = "隐藏";
      } else {
      	var item = data.Draw;
      	this.TestData = `日期:${item.Date} 收:${item.Close}`;
      } */
    },
    //K线周期切换
    ChangeKLinePeriod: function ChangeKLinePeriod(period) {
      if (!g_KLine.JSChart) //不存在创建
        {
          this.KLine.Option.Period = period;
          this.CreateKLineChart();
        } else {
        this.syncCancelRealtimeKline();
        this.defaultPeriod = period;
        g_KLine.JSChart.ChangePeriod(this.chartPeriod[this.defaultPeriod]);
      }
      this.showSet = false;
    },
    //切换指标 windowIndex=窗口索引 0开始, name=指标名字/ID
    ChangeKLineIndex: function ChangeKLineIndex(windowIndex, tt) {
      if (!g_KLine.JSChart) return;
      var item = this.klineIndex[windowIndex];
      g_KLine.JSChart.ChangeIndex(item.index, item.name);
      if (windowIndex > 1) {
        this.subIndex = windowIndex;
      } else {
        this.mainIndex = windowIndex;
      }
      this.showSet = false;
    },
    //切换股票
    ChangeSymbol: function ChangeSymbol(symbol) {
      if (!g_KLine.JSChart) return;

      g_KLine.JSChart.ChangeSymbol(symbol);
    },
    RecvRealtimeData: function RecvRealtimeData(recvData, ch) {
      // if (recvData.ch != ch) return;

      var internalChart = g_KLine.JSChart.JSChartContainer;
      var period = internalChart.Period;
      var symbol = internalChart.Symbol;

      var hqChartData = {
        code: 0,
        stock: [] };

      //TODO:把recvData => hqchart内部格式 格式看教程
      //HQChart使用教程30-K线图如何对接第3方数据14-轮询增量更新日K数据
      for (var i = 0; i < recvData.length; i++) {
        var stock = {
          symbol: internalChart.Symbol,
          name: internalChart.OriginalSymbol };

        var item = recvData.tick;
        var dateTime = new Date();
        dateTime.setTime(item.id * 1000);
        var date = dateTime.getFullYear() * 10000 + (dateTime.getMonth() + 1) * 100 + dateTime.getDate();
        var time = dateTime.getHours() * 100 + dateTime.getMinutes();

        stock.date = date;
        stock.yclose = null;
        stock.open = item.open;
        stock.high = item.high;
        stock.low = item.low;
        stock.price = item.close;
        stock.vol = item.vol;
        stock.amount = item.amount;

        hqChartData.stock.push(stock);

        internalChart.RecvRealtimeData({
          data: hqChartData });

      }

    },
    RecvMinuteRealtimeData: function RecvMinuteRealtimeData(recvData, ch) {
      console.log("=========RecvMinuteRealtimeData", ch, recvData);
      // if (recvData.ch!=ch) return;
      var internalChart = g_KLine.JSChart.JSChartContainer;
      var period = internalChart.Period;
      var symbol = internalChart.Symbol;

      var hqChartData = {
        code: 0,
        data: [],
        ver: 2.0 };
      //更新数据使用2.0版本格式
      hqChartData.symbol = this.Symbol;
      hqChartData.name = this.Symbol;
      //TODO:把recvData => hqchart内部格式 格式看教程
      //HQChart使用教程30-K线图如何对接第3方数据15-轮询增量更新1分钟K线数据

      // var item = recvData.tick;
      for (var i = 0; i < recvData.length; i++) {
        var item = recvData[i];
        var timestamp = item.id * 1000;
        var dateTime = new Date();
        dateTime.setTime(timestamp);
        var date = dateTime.getFullYear() * 10000 + (dateTime.getMonth() + 1) * 100 + dateTime.getDate();
        var time = dateTime.getHours() * 100 + dateTime.getMinutes();

        var newItem = [date, null, item.open, item.high, item.low, item.close, item.vol, item.amount,
        time];

        hqChartData.data.push(newItem);


      }
      //console.log("=========RecvMinuteRealtimeData", item)
      internalChart.RecvMinuteRealtimeData({
        data: hqChartData });

      //console.log("=========RecvMinuteRealtimeData", recvData)
    },
    periodTabChange: function periodTabChange(index) {
      console.log(index);
      this.current = index;
      this.syncCancelRealtimeKline();
      this.defaultPeriod = this.periodValue[this.list[index].name];
      g_KLine.JSChart.ChangePeriod(this.chartPeriod[this.defaultPeriod]);
      console.log(this.periodValue[this.list[index].name], this.chartPeriod[this.defaultPeriod]);
    },
    /* 0=日期 格式YYYYMMDD 如20190229=》 2019-02-29
       1=前收盘
       2=开盘价
       3=最高
       4= 最低
       5=收盘
       6=成交量
       7=成交金额
       8=时间格式 */
    NetworkFilter: function NetworkFilter(data, callback) {
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
          break;}

    },
    RequestHistoryData: function RequestHistoryData(data, callback, isMuite) {var _this3 = this;
      console.log(callback);

      data.PreventDefault = true;
      var that = this;
      var ch = "market.".concat(this.Symbol, ".kline.").concat(this.defaultPeriod);
      var params = {
        "id": new Date().getTime(),
        "req": ch };

      // setTimeout(() => {
      // 	this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params))
      // }, 1000)
      this.getProductLine({
        code: 'btc',
        k: '1min' }).
      then(function (res) {
        // console.log(res)
        var recvData = res.data;
        var internalChart = g_KLine.JSChart.JSChartContainer;
        var period = internalChart.Period;
        var symbol = internalChart.Symbol;

        var hqChartData = {
          code: 0,
          data: [],
          ver: 2.0 };
        //更新数据使用2.0版本格式
        hqChartData.symbol = _this3.Symbol;
        hqChartData.name = _this3.Symbol;
        //TODO:把recvData => hqchart内部格式 格式看教程
        //HQChart使用教程30-K线图如何对接第3方数据15-轮询增量更新1分钟K线数据

        // var item = recvData.tick;
        for (var i = 0; i < recvData.length; i++) {
          var item = recvData[i];
          var timestamp = i * 1000;
          var dateTime = new Date();
          // dateTime.setTime(timestamp);
          var date = dateTime.getFullYear() * 10000 + (dateTime.getMonth() + 1) * 100 + dateTime.
          getDate();
          var time = dateTime.getHours() * 100 + dateTime.getMinutes();

          var newItem = [date, null, Number(item.open), Number(item.hight), Number(item.low),
          Number(item.close), Number(item.volume), Number(item.price),
          time];

          hqChartData.data.push(newItem);
        }
        console.log(hqChartData);
        internalChart.RecvMinuteRealtimeData({
          data: hqChartData });

      });


      //console.log("=========RecvMinuteRealtimeData", item)
      // callback({data: d});
      // this.syncSubRealtimeKline()
      // uni.$on("req." + ch, (res) => {
      // 	let d = that.transferKlineData(res.data.data, isMuite)

      // 	callback({data: d});
      // 	this.syncSubRealtimeKline()
      // })
    },
    transferKlineData: function transferKlineData(data, isMin) {
      var hqChartData = {
        code: 0,
        data: [],
        version: "2.0" };

      hqChartData.symbol = this.Symbol;
      hqChartData.name = this.Symbol;
      var yClose = null;
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var timestamp = item.id * 1000;
        var dateTime = new Date();
        dateTime.setTime(timestamp);
        var date = dateTime.getFullYear() * 10000 + (dateTime.getMonth() + 1) * 100 + dateTime.getDate();
        var time = dateTime.getHours() * 100 + dateTime.getMinutes();
        var newItem = [date, yClose, item.open, item.high, item.low, item.close, item.vol, item.amount];
        if (isMin) {
          newItem[8] = time;
        }
        //console.log("============", date, time, isMin)
        yClose = item.close;
        hqChartData.data.push(newItem);
      }
      return hqChartData;
    },
    //KLine事件
    KLineTouchStart: function KLineTouchStart(event) {
      if (g_KLine.JSChart) g_KLine.JSChart.OnTouchStart(event);
    },

    KLineTouchMove: function KLineTouchMove(event) {
      if (g_KLine.JSChart) g_KLine.JSChart.OnTouchMove(event);
    },

    KLineTouchEnd: function KLineTouchEnd(event) {
      if (g_KLine.JSChart) g_KLine.JSChart.OnTouchEnd(event);
    } }) };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 118:
/*!***************************************************************************************!*\
  !*** I:/out-project/FCoinEx/pages/public/kline.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./kline.vue?vue&type=style&index=0&lang=scss& */ 119);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 119:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!I:/out-project/FCoinEx/pages/public/kline.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 120:
/*!**************************************************************************************************************!*\
  !*** I:/out-project/FCoinEx/pages/trade/trade.vue?vue&type=style&index=0&id=95c22ee0&lang=scss&scoped=true& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_style_index_0_id_95c22ee0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./trade.vue?vue&type=style&index=0&id=95c22ee0&lang=scss&scoped=true& */ 121);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_style_index_0_id_95c22ee0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_style_index_0_id_95c22ee0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_style_index_0_id_95c22ee0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_style_index_0_id_95c22ee0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HbuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HbuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HbuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_style_index_0_id_95c22ee0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 121:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!I:/out-project/FCoinEx/pages/trade/trade.vue?vue&type=style&index=0&id=95c22ee0&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 90:
/*!***********************************************************************!*\
  !*** I:/out-project/FCoinEx/main.js?{"page":"pages%2Ftrade%2Ftrade"} ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _trade = _interopRequireDefault(__webpack_require__(/*! ./pages/trade/trade.vue */ 91));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_trade.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 91:
/*!****************************************************!*\
  !*** I:/out-project/FCoinEx/pages/trade/trade.vue ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _trade_vue_vue_type_template_id_95c22ee0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trade.vue?vue&type=template&id=95c22ee0&scoped=true& */ 92);
/* harmony import */ var _trade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trade.vue?vue&type=script&lang=js& */ 94);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _trade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _trade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _trade_vue_vue_type_style_index_0_id_95c22ee0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./trade.vue?vue&type=style&index=0&id=95c22ee0&lang=scss&scoped=true& */ 120);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 47);

var renderjs





/* normalize component */

var component = Object(_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _trade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _trade_vue_vue_type_template_id_95c22ee0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _trade_vue_vue_type_template_id_95c22ee0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "95c22ee0",
  null,
  false,
  _trade_vue_vue_type_template_id_95c22ee0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/trade/trade.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 92:
/*!***********************************************************************************************!*\
  !*** I:/out-project/FCoinEx/pages/trade/trade.vue?vue&type=template&id=95c22ee0&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_template_id_95c22ee0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./trade.vue?vue&type=template&id=95c22ee0&scoped=true& */ 93);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_template_id_95c22ee0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_template_id_95c22ee0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_template_id_95c22ee0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_template_id_95c22ee0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 93:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!I:/out-project/FCoinEx/pages/trade/trade.vue?vue&type=template&id=95c22ee0&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uImage: function() {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-image/u-image */ "node-modules/uview-ui/components/u-image/u-image").then(__webpack_require__.bind(null, /*! uview-ui/components/u-image/u-image.vue */ 254))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 94:
/*!*****************************************************************************!*\
  !*** I:/out-project/FCoinEx/pages/trade/trade.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./trade.vue?vue&type=script&lang=js& */ 95);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_trade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 95:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!I:/out-project/FCoinEx/pages/trade/trade.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;









































































































































































































































































var _vuex = __webpack_require__(/*! vuex */ 7);



var _kline = _interopRequireDefault(__webpack_require__(/*! ../public/kline.vue */ 96));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  components: {
    kLine: _kline.default },

  data: function data() {
    return {
      multipleValue: 1,
      amountValue: 1,
      isOpen: false,
      activeType: 1,
      inputValue: '' };

  },
  onLoad: function onLoad() {
    this.getLine();
    this.getProduct();
  },
  methods: _objectSpread(_objectSpread({},
  (0, _vuex.mapActions)('trade', ['getProductLine', 'getProductList', 'getProductInfo'])), {}, {
    getLine: function getLine() {
      this.getProductLine({
        code: 'btc',
        k: '5min' }).
      then(function (res) {
        console.log(res);
      });
    },
    getProduct: function getProduct() {
      this.getProductList({
        limit: 15 }).
      then(function (res) {
        console.log(res);
      });
    },
    handelChooseMultiple: function handelChooseMultiple(index) {
      this.multipleValue = index;
    },
    handelChooseAmount: function handelChooseAmount(index) {
      this.amountValue = index;
    },
    handleChangeOpen: function handleChangeOpen() {
      this.isOpen = !this.isOpen;
    },
    handleChangeType: function handleChangeType(type) {
      this.activeType = type;
    } }) };exports.default = _default;

/***/ }),

/***/ 96:
/*!*****************************************************!*\
  !*** I:/out-project/FCoinEx/pages/public/kline.vue ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _kline_vue_vue_type_template_id_56054f9c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kline.vue?vue&type=template&id=56054f9c& */ 97);
/* harmony import */ var _kline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kline.vue?vue&type=script&lang=js& */ 99);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _kline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _kline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _kline_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./kline.vue?vue&type=style&index=0&lang=scss& */ 118);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 47);

var renderjs





/* normalize component */

var component = Object(_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _kline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _kline_vue_vue_type_template_id_56054f9c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _kline_vue_vue_type_template_id_56054f9c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _kline_vue_vue_type_template_id_56054f9c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/public/kline.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 97:
/*!************************************************************************************!*\
  !*** I:/out-project/FCoinEx/pages/public/kline.vue?vue&type=template&id=56054f9c& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_template_id_56054f9c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./kline.vue?vue&type=template&id=56054f9c& */ 98);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_template_id_56054f9c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_template_id_56054f9c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_template_id_56054f9c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_template_id_56054f9c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 98:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!I:/out-project/FCoinEx/pages/public/kline.vue?vue&type=template&id=56054f9c& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uTabs: function() {
      return Promise.all(/*! import() | node-modules/uview-ui/components/u-tabs/u-tabs */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/uview-ui/components/u-tabs/u-tabs")]).then(__webpack_require__.bind(null, /*! uview-ui/components/u-tabs/u-tabs.vue */ 282))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  if (!_vm._isMounted) {
    _vm.e0 = function($event) {
      _vm.showSet = !_vm.showSet
    }
  }
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 99:
/*!******************************************************************************!*\
  !*** I:/out-project/FCoinEx/pages/public/kline.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./kline.vue?vue&type=script&lang=js& */ 100);
/* harmony import */ var _E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HbuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HbuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

},[[90,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/trade/trade.js.map