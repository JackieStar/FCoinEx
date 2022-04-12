<template>
	<view class="container">
		<view class="market-header">
			<u-image v-if="loginInfo.hasLogin" class="avatar" @click="openPage(1)" :src="loginInfo.avatar" shape="circle" width="76rpx" height="76rpx" mode="widthFix" />
			<u-image v-else class="avatar" @click="openPage(1)" src="../../static/images/user/avatar.png" shape="circle" width="76rpx" height="76rpx" mode="widthFix" />
			<view class="market-text">{{i18n.index.title}}</view>
		</view>
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 背景色区域 -->
			<swiper class="carousel" circular autoplay="true">
				<swiper-item @click="open(item)" v-for="(item, index) in carousels" :key="index" class="carousel-item"><image :src="item" /></swiper-item>
			</swiper>
		</view>
		<view class="cate-section"><noticeSwiper :list="notices"></noticeSwiper></view>

		<view class="menu">
			<view class="fiat m-r" @click="openPage(3)">
				<view class="label">
					<text>{{ i18n.index.prediction.title1 }}</text>
				</view>
				<image class="menu-icon" src="../../static/images/makets/recharge.png" mode="widthFix" />
			</view>
			<view class="fiat m-l" @click="openPage(4)">
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
				<view class="col r">
					<text style="margin-left: 60upx;">{{ i18n.index.market.title3 }}</text>
				</view>
			</view>
			<view class="s-row little-line" @click="navTo(`/pages/market/index?code=${item.symbolCode}`)" v-for="(item, i) in markets" :key="item.symbol">
				<view class="col light">
					{{ item.name }}/USDT 
					<view class="subtitle">Vol {{ item.volume_format }}</view>
				</view>
				<view class="col r light">
					${{ item.price }}
					<!-- <view class="subtitle">{{ item.priceUsd }}</view> -->
				</view>
				<view class="col r">
					<uni-tag size="large" v-if="item.diff_rate >= 0" :text="`+${item.diff_rate}%`" type="success"></uni-tag>
					<uni-tag size="large" v-else :text="`${item.diff_rate}%`" type="error"></uni-tag>
				</view>
			</view>
		</view>

		<!-- <view class="lottery-icon" @click="navTo('/pages/lottery/index')">
			<image src="../../static/lottery_icon.png"></image>
			<image src="../../static/lottery_icon.png"></image>
		</view> -->
		<view class="kf-icon">
			<u-image @click="openPage(2)" src="../../static/images/user/kf.png" width="88upx" height="88upx" />
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { uniNoticeBar, uniTag, uniImage, uniSwiperDot } from '@dcloudio/uni-ui';
import noticeSwiper from '../../components/noticeSwiper.vue';
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	components: { uniNoticeBar, uniTag, noticeSwiper },
	mixins: [commonMixin],
	data() {
		return {
			markets: [],
			notices: [],
			carousels: [],
			appData: {}
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.index.title
		});
		this.getAppConfig();
		this.getMaketList();
		// setInterval(() => {
		// 	this.getMaketList();
		// }, 5000);
		this.carousels = [];
		this.notices = [];
		this.loadData();
		
	},
	onPullDownRefresh() {
		this.loadData();
		this.getMaketList();
	},
	onLoad() {
		
	},
	onUnload() {},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	methods: {
		...mapActions('common', ['marketList', 'adList', 'noticeList']),
		...mapActions('user', ['appConfig']),
		loadData() {
			this.adList().then(res => {
				let casrousels = res.data;
				this.carousels = casrousels;
				uni.stopPullDownRefresh();
			});
			this.noticeList({limit: 20}).then(res => {
				this.notices = res.data;
			});
		},
		getAppConfig() {
			this.appConfig().then(res => {
				this.appData = res.data;
			});
		},
		getMaketList() {
			this.marketList().then(res => {
				this.markets = res.data.data;
			});
		},
		navToKline(item) {
			uni.navigateTo({
				url: `/pages/public/kline?symbol=${item.symbol}`
			});
		},
		openPage(type) {
			if (type === 1) {
				uni.navigateTo({
					url: '/pages/user/user'
				});
			}
			if (type === 2) {
				// #ifdef H5
				window.location.href = this.appData.kf_url;
				// #endif
				// #ifdef  APP-PLUS
				uni.navigateTo({
					url: '/pages/user/webview?url=' + this.appData.kf_url
				});
				// #endif
				
			}
			if (type === 3) {
				if (this.loginInfo.hasLogin) {
					uni.navigateTo({
						url: '/pages/wallet/recharge'
					});
				} else {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}
				
			}
			if (type === 4) {
				if (this.loginInfo.hasLogin) {
					uni.navigateTo({
						url: '/pages/wallet/withdraw'
					});
				} else {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}
				
			}
		}
	},
};
</script>

<style lang="scss">
page {
	background: #070219;
	padding-top: 140upx;
}
.container {
	// #ifdef H5
	padding-bottom: 100upx;
	// #endif
}
.market-header {
	width: 100%;
	height: 158upx;
	text-align: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background: #070219;
	z-index: 10000;
	.avatar {
		float: left;
		margin-top: 50upx;
		margin-left: 24upx;
	}
	.market-text {
		height: 158upx;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #ffffff;
		margin-top: 10upx;
		line-height: 158upx;
		margin-right: 54rpx;
	}
}
.m-t {
	margin-top: 16upx;
}
.scroll-view-market {
	width: 100%;
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
			width: 44upx;
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
	.s-header {
		display: flex;
		align-items: center;
		height: 30upx;
		line-height: 30upx;
		padding-top: 30upx;
		padding-bottom: 30upx;
		.col {
			font-size: 24upx;;
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
			background-color: #23B57D;
			border-width: 0.5px;
			border-style: solid;
			border-color: #23B57D;
			width: 160upx;
			height: 58upx;
			display: flex;
			justify-content: center;
			align-items: center;
			float: right;
		}
		.uni-tag--error {
			color: #fff;
			background-color: #D83A53;
			border-width: 0.5px;
			border-style: solid;
			border-color: #D83A53;
			width: 160upx;
			height: 58upx;
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 58upx;
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
			// font-weight: bold;
			font-size: $font-lg;
			font-size: 30upx;
		}
		.r {
			text-align: center;
		}
	}
}
.kf-icon {
	position: fixed;
	bottom: 160upx;
	right: 30upx;
}
</style>
