<template>
	<view class="container">
		<view class="market-header">
			<u-image class="avatar" @click="openPage" src="../../static/images/makets/avatar.png" width="56rpx" height="56rpx" mode="widthFix" />
			<view class="market-text">市场</view>
		</view>
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 背景色区域 -->
			<swiper class="carousel" circular @change="swiperChange" autoplay="true">
				<swiper-item @click="open(item)" v-for="(item, index) in carousels" :key="index" class="carousel-item"><image :src="item.url" /></swiper-item>
			</swiper>
		</view>
		<view class="cate-section"><noticeSwiper :list="notices"></noticeSwiper></view>

		<view class="menu">
			<view class="fiat m-r" @click="navTo('/pages/prediction/prediction')">
				<view class="label">
					<text>{{ i18n.index.prediction.title1 }}</text>
				</view>
				<image class="menu-icon" src="../../static/images/makets/recharge.png" mode="widthFix" />
			</view>
			<view class="fiat m-l" @click="navTo('/pages/prediction/prediction')">
				<view class="label">
					<text>{{ i18n.index.prediction.title2 }}</text>
				</view>
				<image class="menu-icon" src="../../static/images/makets/withdraw.png" mode="widthFix" />
			</view>
		</view>
		<!-- 市值排行 -->
		<view class="coin-section m-t">
			<view class="s-header">
				<view class="col">{{ i18n.index.market.title1 }}</view>
				<view class="col r">{{ i18n.index.market.title2 }}</view>
				<view class="col r">{{ i18n.index.market.title3 }}</view>
			</view>
			<view class="s-row little-line" @click="navTo(`/pages/market/index?code=${item.symbolCode}`)" v-for="(item, i) in markets" :key="item.symbol">
				<view class="col light">
					{{ item.symbol }}
					<view class="subtitle">Vol {{ item.marketcap | formatMarketcap }}</view>
				</view>
				<view class="col r light">
					${{ item.priceCny }}
					<view class="subtitle">{{ item.priceUsd }}</view>
				</view>
				<view class="col r"><uni-tag :text="item.changePercent | formatChange" :type="item.changePercent >= 0 ? 'success' : 'error'"></uni-tag></view>
			</view>
		</view>

		<!-- <view class="lottery-icon" @click="navTo('/pages/lottery/index')">
			<image src="../../static/lottery_icon.png"></image>
		</view> -->
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { formatUnit } from '../../utils/number';
import { uniNoticeBar, uniTag, uniImage, uniSwiperDot } from '@dcloudio/uni-ui';
import noticeSwiper from '../../components/noticeSwiper.vue';
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	components: { uniNoticeBar, uniTag, noticeSwiper, uniSwiperDot },
	mixins: [commonMixin],
	data() {
		return {
			markets: [],
			notices: [],
			titleNViewBackground: '',
			swiperCurrent: 0,
			swiperLength: 0,
			carousels: [],
			ads: [],
			current: 0,
			mode: 'round',
			topSymbols: [{ symbol: 'btcusdt', title: 'BTC/USDT' }, { symbol: 'ethusdt', title: 'ETH/USDT' }, { symbol: 'dotusdt', title: 'DOT/USDT' }],
			topMakretMap: {
				btcusdt: {},
				ethusdt: {},
				dotusdt: {}
			}
		};
	},
	filters: {
		formatChange(v) {
			return (v > 0 ? '+' : '') + parseFloat(v).toFixed(2) + '%';
		},
		formatChangeCls(v) {
			if (v == 0) {
				return '';
			} else if (v > 0) {
				return 'upper-text';
			} else {
				return 'lower-text';
			}
		},
		formatMarketcap(v) {
			return formatUnit(v);
		}
	},
	onShow() {
		this.getMaketList();
		setInterval(() => {
			this.getMaketList();
		}, 3000);
		setTimeout(() => {
			this.loadTopMarket();
		}, 500);
		this.swiperCurrent = 0;
		this.swiperLength = 0;
		this.carousels = [];
		this.ads = [];
		this.notices = [];
		this.loadData();
	},
	onPullDownRefresh() {
		this.loadData();
		this.getMaketList();
	},
	onLoad() {},
	onHide() {
		let ch = `market.overviewv2`;
		let data = {
			unsub: ch,
			id: Date.now() + ''
		};
		this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(data));
		uni.$off(ch, res => {});
	},
	onUnload() {},
	methods: {
		...mapActions('common', ['marketList', 'adList', 'noticeList']),
		loadTopMarket() {
			let $this = this;
			let ch = `market.overviewv2`;
			let params = {
				sub: ch
			};
			this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params));
			uni.$on('sub.' + ch, res => {
				let map = res.data.data;
				for (let i = 0; i < 3; i++) {
					let symbol = this.topSymbols[i].symbol;
					if (map[symbol]) {
						let item = map[symbol];
						let tick = {
							open: item.o,
							close: item.c,
							low: item.l,
							high: item.h,
							vol: item.v,
							amount: item.a
						};
						tick.change = parseFloat(((tick.close - tick.open) / tick.open) * 100).toFixed(2);
						tick.cny = parseFloat(tick.close * 6.4).toFixed(2);
						$this.topMakretMap[symbol] = tick;
					}
				}
			});
		},
		async loadData() {
			this.adList().then(res => {
				let casrousels = res.data.casrousels;
				this.swiperLength = casrousels.length;
				this.carousels = casrousels;
				this.ads = res.data.ads;

				uni.stopPullDownRefresh();
			});
			this.noticeList().then(res => {
				this.notices = res.rows;
			});
		},
		getMaketList() {
			this.marketList().then(res => {
				this.markets = res.data;
			});
		},
		//轮播图切换修改背景色
		swiperChange(e) {
			const index = e.detail.current;
			this.swiperCurrent = index;
		},

		navToKline(item) {
			uni.navigateTo({
				url: `/pages/public/kline?symbol=${item.symbol}`
			});
		},
		open(item) {
			if (item.link) {
				if (item.link.indexOf('http://') < 0 && item.link.indexOf('https://') < 0) {
					uni.navigateTo({
						url: item.link
					});
				} else {
					uni.navigateTo({
						url: `/pages/public/web?url=${item.link}`
					});
				}
			}
		},
		openPage() {
			uni.navigateTo({
				url: '/pages/user/user'
			});
		}
	},
	// #ifndef MP
	// 标题栏input搜索框点击
	onNavigationBarSearchInputClicked: async function(e) {
		this.$api.msg('点击了搜索框');
	},
	//点击导航栏 buttons 时触发
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.$api.msg('点击了扫描');
		} else if (index === 1) {
			// #ifdef APP-PLUS
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({
				index
			});
			// #endif
			uni.navigateTo({
				url: '/pages/notice/notice'
			});
		}
	}
	// #endif
};
</script>

<style lang="scss">
page {
	background: #070219;
	padding-top: 50upx;
}
.container {
	// #ifdef H5
	padding-bottom: 100upx;
	// #endif
}
.market-header {
	width: 100%;
	text-align: center;
	padding: 0 24rpx 24rpx 24rpx;
	box-sizing: border-box;
	.avatar {
		float: left;
	}
	.market-text {
		height: 80rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #ffffff;
		line-height: 80rpx;
		margin-right: 40rpx;
	}
}
.m-t {
	margin-top: 16upx;
}
.scroll-view-market {
	width: 100%;
}
.market-item {
	display: inline-block;
	width: 33%;
	.item {
		padding: 30upx 0 30upx 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		.t {
			font-weight: bold;
			font-size: $font-sm;
		}
		.c {
			padding: 10upx 0 10upx 0;
			font-size: $font-xl;
			font-weight: bold;
		}
		.b {
			font-size: $font-sm;
			color: $font-color-disabled;
		}
	}
}

.menu {
	padding: 20upx 24upx;
	display: flex;
	// flex-direction: row;
	justify-content: space-between;
	font-size: $font-base;
	color: $border-color-light;
	font-weight: bold;
	.fiat {
		width: 340rpx;
		height: 120rpx;
		display: flex;
		flex: 1;
		align-items: center;
		background: #1a1b28;
		border-radius: 10rpx;
		padding: 0 45upx;
		justify-content: space-between;
		.label {
			display: flex;
			flex-direction: column;
			padding-left: 20upx;
		}
		.sub {
			font-size: $font-sm;
			font-weight: normal;
		}
		.menu-icon {
			width: 58rpx;
		}
		text {
			font-size: $font-md;
		}
	}
	.m-r {
		margin-right: 14upx;
	}
	.m-l {
		margin-left: 14upx;
	}
	.ex {
		display: flex;
		flex-direction: column;
		flex: 1;
		.item {
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			background: #ffffff;
			align-items: center;
			text-align: center;
			vertical-align: middle;
		}
		.shop {
			margin-top: 10upx;
		}
		image {
			vertical-align: middle;
			width: 50upx;
			height: 55upx;
			margin-right: 20upx;
		}
		.miner {
			width: 45upx;
			height: 45upx;
		}
	}
}
/* 头部 轮播图 */
.carousel-section {
	position: relative;
	padding-top: 10px;
	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 44px;
		box-sizing: content-box;
	}

	.titleNview-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 426upx;
		transition: 0.4s;
	}
}
.carousel {
	width: 100%;
	height: 218upx;

	.carousel-item {
		width: 100%;
		height: 100%;
		padding: 0 28upx;
		overflow: hidden;
	}

	image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}
}

/* 公告 */
.cate-section {
	padding: 20upx 22upx 20upx 22upx;
	// background: #fff;
}
/* 市值排行 */
.coin-section {
	padding: 4upx 30upx 24upx;
	background: #1a1b28;
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
	.s-row {
		display: flex;
		align-items: center;
		height: 120upx;
		.subtitle {
			font-size: $font-sm;
			font-weight: normal;
			color: $font-color-dark;
			padding: 4upx 0 10upx 0;
		}
		.uni-tag--success {
			color: #fff;
			background-color: $uni-color-upper;
			border-width: 0.5px;
			border-style: solid;
			border-color: $uni-color-upper;
			width: 160upx;
			float: right;
		}
		.uni-tag--error {
			color: #fff;
			background-color: $uni-color-lower;
			border-width: 0.5px;
			border-style: solid;
			border-color: $uni-color-lower;
			width: 160upx;
			float: right;
		}
		.col {
			font-size: $font-base;
			color: $font-color-light;
			flex: 1;
		}
		.coinLogo {
			width: 36upx;
			height: 36upx;
			margin-right: 8px;
			display: inline-block;
			vertical-align: middle;
			float: left;
		}
		.light {
			font-weight: bold;
			font-size: $font-lg;
			color: $font-color-light;
		}
		.r {
			text-align: center;
		}
	}
}

.f-header {
	display: flex;
	align-items: center;
	height: 140upx;
	padding: 6upx 30upx 8upx;
	background: #fff;
	image {
		flex-shrink: 0;
		width: 80upx;
		height: 80upx;
		margin-right: 20upx;
	}
	.tit-box {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.tit {
		font-size: $font-lg + 2upx;
		color: #font-color-dark;
		line-height: 1.3;
	}
	.tit2 {
		font-size: $font-sm;
		color: $font-color-light;
	}
	.icon-you {
		font-size: $font-lg + 2upx;
		color: $font-color-light;
	}
}
/* 猜你喜欢 */
.guess-section {
	display: flex;
	flex-wrap: wrap;
	padding: 0 30upx;
	background: #fff;
	.guess-item {
		display: flex;
		flex-direction: column;
		width: 48%;
		padding-bottom: 40upx;
		&:nth-child(2n + 1) {
			margin-right: 4%;
		}
	}
	.image-wrapper {
		width: 100%;
		height: 330upx;
		border-radius: 3px;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
	}
	.title {
		font-size: $font-lg;
		color: $font-color-dark;
		line-height: 80upx;
	}
	.price {
		font-size: $font-lg;
		color: $uni-color-primary;
		line-height: 1;
	}
}

.lottery-icon {
	position: fixed;
	bottom: 300upx;
	right: 20upx;
	z-index: 99999999;
	width: 100upx;
	height: 100upx;
	image {
		width: 100upx;
		height: 100upx;
	}
}
</style>
