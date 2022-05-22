<template>
	<view class="container">
		<view class="header">
			<text>{{i18n.home.title}}</text>
			<text class="notice">{{i18n.home.notice}}</text>
		</view>
		<!-- 头部轮播 -->
		<view class="carousel-wrapper">
			<swiper class="carousel" autoplay="true">
				<swiper-item @click="open(item)" v-for="(item, index) in carousels" :key="index" class="carousel-item"><image :src="item" /></swiper-item>
			</swiper>
		</view>
		<!-- 公告 -->
		<view class="notice-wrapper"><u-notice-bar mode="vertical" font-size="26rpx" padding="30rpx" :list="notices"></u-notice-bar></view>
		<!-- 币种列表 -->
		<view class="coin-wrapper">
			<view class="coin-item" v-for="(item, i) in markets" :key="item.id">
				<view class="coin-name">{{ item.name }}/USDT</view>
				<view class="coin-price" v-if="item.diff_rate < 0" style="color: #E91B00">{{ item.price }}</view>
				<view class="coin-price" v-else style="color: #00B809">+{{ item.price }}</view>
				<view class="coin-price" v-if="item.diff_rate < 0" style="color: #E91B00">{{ item.diff_rate }}</view>
				<view class="coin-price" v-else style="color: #00B809">+{{ item.diff_rate }}</view>
			</view>
		</view>
		<!-- 跳转模块 -->
		<view class="open-wrapper">
			<view class="right-item" @click="navTo('/pages/wallte/recharge')">
				<view class="right-item-title">{{i18n.home.fastRecharge}}</view>
				<view class="right-item-tip">{{i18n.home.fastTips}}</view>
				<view class="icon-wrapper">
					<image class="icon-3" src="../../static/images/home/icon_3.png" />
					<image class="icon-2" src="../../static/images/home/icon_2.png" />
					<image class="icon-1" src="../../static/images/home/icon_1.png" />
				</view>
			</view>
			<view class="left-wrapper">
				<view class="top-item" @click="openPage('download')">
					<image class="download" src="../../static/images/home/download.png" />
					<text>{{i18n.home.download}}</text>
				</view>
				<view class="bottom-item" @click="openPage('help')">
					<image class="question" src="../../static/images/home/question.png" />
					<text>{{i18n.home.help}}</text>
				</view>
			</view>
		</view>
		<!-- 快速入口 -->
		<view class="fast-wraper">
			<view class="fast-item" @click="navTo('/pages/public/lottery')">
				<image src="../../static/images/home/lottery.png" />
				<text>{{i18n.home.lottery}}</text>
			</view>
			<view class="fast-item" @click="openPage('sign')">
				<image src="../../static/images/home/sign_in.png" />
				<text>{{i18n.home.sign}}</text>
			</view>
			<view class="fast-item" @click="openPage('red')">
				<image src="../../static/images/home/red.png" />
				<text>{{i18n.home.redPacket}}</text>
			</view>
			<view class="fast-item" @click="navTo('/pages/user/activity')">
				<image src="../../static/images/home/gift.png" />
				<text>{{i18n.home.newActivity}}</text>
			</view>
		</view>
		<!-- 分享页 -->
		<view class="share-wrapper" @click="navTo('/pages/user/invit')"><image src="http://43.130.115.212:82/statics/images/banner.png" /></view>
		<!-- 市值排行 -->
		<view class="coin-section m-t">
			<view class="s-header">
				<view class="col">{{ i18n.home.market.title1 }}</view>
				<view class="col r">{{ i18n.home.market.title2 }}</view>
				<view class="col r">
					<text style="margin-left: 60upx;">{{ i18n.home.market.title3 }}</text>
				</view>
			</view>
			<view class="s-row little-line" @click="navToTrade(item)" v-for="(item, i) in markets" :key="item.symbol">
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
		<!-- 客服 -->
		<view class="kf-icon"><u-image @click="openPage('kf')" src="../../static/images/home/kf.png" width="127rpx" height="127rpx" /></view>
		<u-popup v-model="show" mode="center">
			<view class="coupon-wrapper">
				<view class="top-img"></view>
				<view class="coupon-bg">
					<view class="coupon-title">{{i18n.home.daySign}}</view>
					<view class="money-wrapper">
						<view class="money" :class="{'active': isActive}">
							<text>day1</text>
						</view>
						<view class="money">
							<text>day2</text>
						</view>
						<view class="money">
							<text>day3</text>
						</view>
					</view>
					<view class="money-wrapper">
						<view class="money" :class="{'active': isActive}">
							<text>day4</text>
						</view>
						<view class="money">
							<text>day5</text>
						</view>
						<view class="money">
							<text>day6</text>
						</view>
						<view class="money">
							<text>day7</text>
						</view>
					</view>
					<!-- <view class="money-tips">参与签到可以获得更多惊喜奖励</view> -->
					<view class="coupon-btn">{{i18n.home.fastSign}}</view>
					<view class="coupon-tips">{{i18n.home.signTips}}</view>
				</view>
				<view class="coupon-close" @click="show = false"></view>
			</view>
			
		</u-popup>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { uniTag } from '@dcloudio/uni-ui';
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	components: { uniTag },
	mixins: [commonMixin],
	data() {
		return {
			show: false,
			isActive: true,
			markets: [],
			notices: [],
			carousels: [],
			appData: {},
			clear: '' // 定时器
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.index.title
		});
		this.loadData();
		this.getMaketList();
		this.clear = setInterval(this.getMaketList, 3000);
	},
	onLoad() {
		this.getAppConfig();
	},
	onHide() {
		console.log('离开页面');
		clearInterval(this.clear);
	},
	//退出的时候 停止定时器和清空hqchart的实例
	onUnload() {
		clearInterval(this.clear);
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	methods: {
		...mapActions('common', ['marketList', 'adList', 'noticeList']),
		...mapActions('user', ['appConfig']),
		loadData() {
			this.noticeList({ limit: 20 }).then(res => {
				this.notices = res.data;
			});
		},
		getAppConfig() {
			this.appConfig().then(res => {
				this.appData = res.data;
			});
			this.adList().then(res => {
				let casrousels = res.data;
				this.carousels = casrousels;
			});
		},
		getMaketList() {
			this.marketList().then(res => {
				this.markets = res.data.data;
			});
		},
		navToTrade(item) {
			uni.setStorageSync('product', { code: item.code, name: item.name });
			uni.switchTab({
				url: '/pages/trade/trade'
			});
		},
		openPage(type) {
			if (type === 'sign') {
				this.show = true
			}
			if (type === 'red') {
				if (this.loginInfo.hasLogin) {
					uni.navigateTo({
						url: `/pages/public/redPacket`
					});
				} else {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}
			}
			if (type === 'download') {
				uni.navigateTo({
					url: `/pages/user/webview?title='x'&url=${this.appData.app_download}`
				});
			}
			if (type === 'help') {
				uni.navigateTo({
					url: `/pages/user/webview?title=xx&url=${this.appData.help_center}`
				});
			}
			if (type === 'kf') {
				uni.navigateTo({
					url: '/pages/user/webview?url=' + this.appData.kf_url
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.header {
		width: 100%;
		height: 186rpx;
		background-color: #fff;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #212121;
		text-align: center;
		padding-top: 100rpx;
		.notice {
			position: absolute;
			right: 30rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #0072ff;
			margin-top: 10rpx;
		}
	}
	.carousel {
		width: 100%;
		height: 218upx;
		margin-top: 32rpx;
		.carousel-item {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		image {
			width: 100%;
			height: 100%;
		}
	}
	.notice-wrapper {
		width: 100%;
		height: 91rpx;
		background: #f8f4e5;
	}
	.coin-wrapper {
		width: 100%;
		height: 171rpx;
		background-color: #fff;
		display: flex;
		overflow-x: scroll;
		.coin-item {
			height: 170rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			padding: 20rpx 30rpx;
			.coin-name {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
				line-height: 36rpx;
			}
			.coin-price {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #e91b00;
				line-height: 36rpx;
			}
		}
	}
	.open-wrapper {
		width: 100%;
		padding: 23rpx 26rpx;
		display: flex;
		.right-item {
			width: 338rpx;
			height: 200rpx;
			background: #ffffff;
			border-radius: 10rpx;
			margin-right: 22rpx;
			.right-item-title {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
				margin: 24rpx 0 10rpx 21rpx;
			}
			.right-item-tip {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-left: 21rpx;
			}
			.icon-wrapper {
				width: flex;
				display: flex;
				flex-direction: row-reverse;
				margin-top: 24rpx;
				margin-right: 14rpx;
				.icon-1 {
					width: 52rpx;
					height: 52rpx;
					margin-right: -10rpx;
				}
				.icon-2 {
					width: 52rpx;
					height: 52rpx;
					margin-right: -10rpx;
				}
				.icon-3 {
					width: 52rpx;
					height: 52rpx;
				}
			}
		}
		.left-wrapper {
			height: 200rpx;
			display: flex;
			flex-direction: column;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
			.top-item {
				width: 338rpx;
				height: 90rpx;
				background: #ffffff;
				border-radius: 10rpx;
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				.download {
					width: 38rpx;
					height: 33rpx;
					margin: auto 22rpx auto 32rpx;
				}
			}
			.bottom-item {
				width: 338rpx;
				height: 90rpx;
				background: #ffffff;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				.question {
					width: 44rpx;
					height: 44rpx;
					margin: auto 20rpx auto 32rpx;
				}
			}
		}
	}
	.fast-wraper {
		width: 100%;
		display: flex;
		.fast-item {
			width: 25%;
			height: 220rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
		}
		image {
			width: 108rpx;
			height: 108rpx;
			margin-bottom: 24rpx;
		}
	}
	.share-wrapper {
		width: 100%;
		image {
			width: 697rpx;
			height: 200rpx;
			border-radius: 10rpx;
			margin: 36rpx 27rpx;
		}
	}
	.coin-section {
		background: #fff;
		padding: 4rpx 30upx 100rpx 30rpx;
		.s-header {
			display: flex;
			align-items: center;
			height: 30upx;
			line-height: 30upx;
			padding-top: 30upx;
			padding-bottom: 30upx;
			.col {
				font-size: 24upx;
				color: #212121;
				flex: 1;
			}
			.r {
				text-align: center;
			}
		}
		.s-row {
			display: flex;
			align-items: center;
			height: 129upx;
			border-top: 1rpx solid #e9e9e9;
			.subtitle {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				padding: 4upx 0 10upx 0;
			}
			.uni-tag--success {
				color: #fff;
				background-color: #00b809;
				border-width: 0.5px;
				border-style: solid;
				border-color: #00b809;
				width: 160upx;
				height: 58upx;
				display: flex;
				justify-content: center;
				align-items: center;
				float: right;
			}
			.uni-tag--error {
				color: #fff;
				background-color: #e91b00;
				border-width: 0.5px;
				border-style: solid;
				border-color: #e91b00;
				width: 160upx;
				height: 58upx;
				display: flex;
				justify-content: center;
				align-items: center;
				line-height: 58upx;
				float: right;
			}
			.col {
				font-size: 26rpx;
				color: #212121;
				flex: 1;
			}
			.light {
				// font-weight: bold;
				font-size: #212121;
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
	.coupon-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		.top-img {
			width: 377rpx;
			height: 184rpx;
			background: url(../../static/images/home/top_img.png);
			background-size: 100% 100%;
			z-index: 1000;
		}
		.coupon-bg {
			width: 590rpx;
			height: 686rpx;
			background: url(../../static/images/home/coupon_img.png);
			background-size: 100% 100%;
			margin-top: -64rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.coupon-title {
				font-size: 43rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FCBD4D;
				line-height: 48rpx;
				margin-top: 90rpx;
				margin-bottom: 20rpx;
			}
			.money-tips {
				font-size: 18rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #999999;
			}
			.money-wrapper {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.money {
					width: 105rpx;
					height: 125rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					background: url(../../static/images/home/money.png);
					background-size: 100% 100%;
					text {
						margin-top: 30rpx;
					}
				}
				.active {
					background: url(../../static/images/home/money_active.png);
					background-size: 100% 100%;
				}
			}
			.coupon-btn {
				position: absolute;
				width: 462rpx;
				height: 76rpx;
				border-radius: 40rpx;
				background: #fff;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FCC042;
				bottom: 200rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.coupon-tips {
				position: absolute;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 48px;
				bottom: 100rpx;
			}
		}
		
		.coupon-close {
			width: 65rpx;
			height: 65rpx;
			background: url(../../static/images/home/close.png);
			background-size: 100% 100%;
			margin-top: 40rpx;
		}
	}
	
	/deep/ .u-mode-center-box {
		background: none !important;
	}
}
</style>
