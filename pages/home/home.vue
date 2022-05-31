<template>
	<view class="container">
		<u-navbar :isBack="false" :title="i18n.home.title" :background="background">
			<view class="slot-wrap">
				<view class="notice" @click="openPage('notice')">{{ i18n.home.notice }}</view>
			</view>
		</u-navbar>
		<!-- 头部轮播 -->
		<view class="carousel-wrapper">
			<swiper class="carousel" autoplay="true">
				<swiper-item @click="openBanner(item.link)" v-for="(item, index) in carousels" :key="index"
					class="carousel-item">
					<image :src="item.banner" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告 -->
		<view class="notice-wrapper">
			<u-notice-bar mode="horizontal" font-size="26rpx" padding="30rpx" :list="notices"></u-notice-bar>
		</view>
		<!-- 币种列表 -->
		<view class="coin-wrapper">
			<view class="coin-item" @click="navToTrade(item)" v-for="(item, i) in markets" :key="item.id">
				<view class="coin-name">{{ item.name }}/USDT</view>
				<view class="coin-price" v-if="item.diff_rate < 0" style="color: #E91B00">{{ item.price }}</view>
				<view class="coin-price" v-else style="color: #00B809">+{{ item.price }}</view>
				<view class="coin-price" v-if="item.diff_rate < 0" style="color: #E91B00">{{ item.diff_rate }}%</view>
				<view class="coin-price" v-else style="color: #00B809">+{{ item.diff_rate }}%</view>
			</view>
		</view>
		<!-- 跳转模块 -->
		<view class="open-wrapper">
			<view class="right-item" @click="openPage('recharge')">
				<view class="right-item-title">{{ i18n.home.fastRecharge }}</view>
				<view class="right-item-tip">{{ i18n.home.fastTips }}</view>
				<view class="icon-wrapper">
					<image class="icon-3" src="../../static/images/home/icon_3.png" />
					<image class="icon-2" src="../../static/images/home/icon_2.png" />
					<image class="icon-1" src="../../static/images/home/icon_1.png" />
				</view>
			</view>
			<view class="left-wrapper">
				<view class="top-item" @click="openPage('download')">
					<image class="download" src="../../static/images/home/download.png" />
					<text>{{ i18n.home.download }}</text>
				</view>
				<view class="bottom-item" @click="openPage('help')">
					<image class="question" src="../../static/images/home/question.png" />
					<text>{{ i18n.home.help }}</text>
				</view>
			</view>
		</view>
		<!-- 快速入口 -->
		<view class="fast-wraper">
			<view class="fast-item" @click="openPage('lottery')">
				<image src="../../static/images/home/lottery.png" />
				<view class="fast-item-name">{{ i18n.home.lottery }}</view>
			</view>
			<view class="fast-item" @click="openPage('sign')">
				<image src="../../static/images/home/sign_in.png" />
				<view class="fast-item-name">{{ i18n.home.sign }}</view>
			</view>
			<view class="fast-item" @click="openPage('red')">
				<image src="../../static/images/home/red.png" />
				<view class="fast-item-name">{{ i18n.home.redPacket }}</view>
			</view>
			<view class="fast-item" @click="openPage('activity')">
				<image src="../../static/images/home/gift.png" />
				<view class="fast-item-name">{{ i18n.home.newActivity }}</view>
			</view>
		</view>
		<!-- 分享页 -->
		<view class="share-wrapper" @click="openPage('invit')">
			<image :src="appData.invite_banner" />
		</view>
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
					<uni-tag size="large" v-if="item.diff_rate >= 0" :text="`+${item.diff_rate}%`" type="success">
					</uni-tag>
					<uni-tag size="large" v-else :text="`${item.diff_rate}%`" type="error"></uni-tag>
				</view>
			</view>
		</view>
		<!-- 平仓播报 -->
		<view class="bobao-wrapper" v-if="bobaoList.length > 0">
			<noticeSwiper :swiperWidth="swiperWidth" :list="bobaoList" />
			<!-- <view class="bobao-bg">
				<u-notice-bar :style="{'width': swiperWidth}" :no-list-hidden="false" mode="vertical" color='#fff' :volume-icon="false" type="none" class="notice-bar" :list="bobaoList" />
			</view> -->
		</view>
		<!-- 客服 -->
		<view class="kf-icon">
			<u-image style="flex-shrink: 0;" :show-loading="false" :fade="false" @click="openPage('kf')"
				src="/static/images/home/kf.png" width="127rpx" height="127rpx" />
		</view>
		<!-- 签到 -->
		<u-popup v-model="show" mode="center">
			<view class="coupon-wrapper">
				<view class="top-img"></view>
				<image class="jiantou-bg" src="../../static/images/home/to.png" mode=""></image>
				<view class="coupon-bg">
					<view class="coupon-title">{{ i18n.home.daySign }}</view>
					<view class="money-wrapper">
						<block v-for="(item, index) in beforeData" v-if="index <= 2" :key="index">
							<view v-if="index <= 2" class="money" :class="{ active: item.signed == 1 }">
								<text>{{ item.label }}</text>
								<view class="sign-reward">+{{ item.reward }}</view>
							</view>
						</block>
					</view>
					<view class="money-wrapper mar-t-money">
						<block v-for="(item, index) in reverseData" :key="index">
							<view v-if="index <= 3" class="money" :class="{ active: item.signed == 1 }">
								<text>{{ item.label }}</text>
								<view class="sign-reward">+{{ item.reward }}</view>
							</view>
						</block>
					</view>
					<!-- <view class="money-tips">参与签到可以获得更多惊喜奖励</view> -->
					<view class="coupon-btn" @click="handlePostSign">
						{{ signData.today_signed == 1 ? i18n.home.signSuccess : i18n.home.fastSign }}
					</view>
					<view class="coupon-tips">
						<view class="bottom-text">
							{{ i18n.home.signTips }}
						</view>
					</view>
				</view>
				<view class="coupon-close" @click="show = false"></view>
			</view>
		</u-popup>
		<!-- 公告 -->
		<u-modal v-model="showNotice" :confirm-text="i18n.home.noticeBtn" :title="i18n.home.notice"
			@cancel="showNotice = false" @confirm="showNotice = false">
			<view class="u-update-content">
				<rich-text :nodes="appData.notice"></rich-text>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	import {
		uniTag
	} from '@dcloudio/uni-ui';
	import noticeSwiper from '../../components/noticeSwiper.vue';
	import {
		commonMixin
	} from '@/common/mixin/mixin.js';
	export default {
		components: {
			uniTag,
			noticeSwiper
		},
		mixins: [commonMixin],
		data() {
			return {
				background: {
					backgroundColor: '#fff'
				},
				show: false,
				isActive: true,
				markets: [],
				notices: [],
				bobaoList: [],
				carousels: [],
				appData: {},
				clear: '', // 定时器
				signData: {
					consecutive_sign_days: 0,
					reward_total: 0,
					today_signed: 0,
					sign_schedule: []
				},
				showNotice: false,
				swiperWidth: null,
				reverseData: [],
				beforeData: []
			};
		},
		onShow() {
			this.loadData();
			this.getMaketList();
			this.getAppConfig();
			this.clear = setInterval(this.getMaketList, 3000);
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
			...mapActions('common', ['marketList', 'adList', 'noticeList', 'clickSign', 'signInfo']),
			...mapActions('user', ['appConfig']),
			loadData() {
				this.noticeList({
					limit: 20
				}).then(res => {
					this.bobaoList = res.data;
					let lang = uni.getStorageSync('language');
					if (lang == 'zh-CN' || lang == 'zh-HK') {
						this.swiperWidth = '460rpx';
					}
					if (lang == 'ja-JP') {
						this.swiperWidth = '560rpx';
					}
					if (lang == 'th-TH') {
						this.swiperWidth = '620rpx';
					}
					if (lang == 'en-US') {
						this.swiperWidth = '540rpx';
					}
					if (lang == 'ru-RU') {
						this.swiperWidth = '660rpx';
					}
				});
			},
			getAppConfig() {
				this.appConfig().then(res => {
					this.appData = res.data;
					this.notices = [res.data.notice];
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
			handleGetSign() {
				this.signInfo().then(res => {
					this.show = true;
					this.signData = res.data;
					this.beforeData = res.data.sign_schedule
					this.reverseData = JSON.parse(JSON.stringify(res.data.sign_schedule)).reverse()
				});
			},
			handlePostSign() {
				if (this.signData.today_signed == 0) {
					this.clickSign().then(res => {
						this.$u.toast(res.message);
						this.handleGetSign();
					});
				}
			},
			navToTrade(item) {
				uni.setStorageSync('product', {
					code: item.code,
					name: item.name
				});
				uni.switchTab({
					url: '/pages/trade/trade'
				});
			},
			openBanner(link) {
				if (type === 'download') {
					uni.navigateTo({
						url: `/pages/public/webview?url=${link}`
					});
				}
			},
			openPage(type) {
				if (type === 'sign') {
					if (this.loginInfo.hasLogin) {
						this.handleGetSign();
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
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
				if (type === 'invit') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: `/pages/public/invit`
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}
				if (type === 'lottery') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/public/lottery'
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}
				if (type === 'download') {
					uni.navigateTo({
						url: `/pages/public/webview?url=${this.appData.app_download}`
					});
				}
				if (type === 'help') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/home/help'
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}
				if (type === 'activity') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/home/activity'
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}
				if (type === 'kf') {
					uni.navigateTo({
						url: '/pages/me/kf'
					});
				}
				if (type === 'recharge') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/me/recharge'
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}
				if (type === 'notice') {
					this.showNotice = true;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		.slot-wrap {
			width: 100%;
			display: flex;
			flex-direction: row-reverse;
		}

		.notice {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #0072ff;
			margin-right: 36rpx;
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
				position: relative;

				.right-item-title {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #212121;
					margin: 20rpx 0 10rpx 21rpx;
				}

				.right-item-tip {
					position: absolute;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-left: 21rpx;
				}

				.icon-wrapper {
					width: 100%;
					position: absolute;
					bottom: 10rpx;
					display: flex;
					flex-direction: row-reverse;
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
						margin-right: 20rpx;
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

			.fast-item-name {
				width: 90%;
				height: 70rpx;
				padding: 0 10rpx;
				text-align: center;
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
			bottom: 190upx;
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

			.jiantou-bg {
				width: 427rpx;
				height: 152rpx;
				position: absolute;
				top: 325rpx;
				left: 82rpx;
				z-index: 10;
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
					color: #fcbd4d;
					line-height: 48rpx;
					margin-top: 80rpx;
					margin-bottom: 20rpx;
				}

				.money-tips {
					width: 100%;
					text-align: center;
					font-size: 18rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #999999;
					position: absolute;
					left: 0;
					top: 380rpx;
					z-index: 14;
				}

				.mar-t-money {
					margin-top: 23rpx;
				}

				.money-wrapper {
					display: flex;
					align-items: center;
					justify-content: space-between;
					position: relative;
					z-index: 10;
					background-color: #fff;

					.money {
						width: 105rpx;
						height: 125rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #212121;
						background: url(../../static/images/home/money.png);
						background-size: 100% 100%;
						position: relative;
						z-index: 10;

						.sign-reward {
							padding: 0 4rpx;
							height: 23rpx;
							line-height: 23rpx;
							background: #ff2121;
							border-radius: 12rpx 12rpx 12rpx 0px;
							font-size: 18rpx;
							scale: 0.9;
							font-family: PingFang SC;
							font-weight: 400;
							color: #ffffff;
							position: absolute;
							top: 12rpx;
							left: 82rpx;
							z-index: 12;
						}

						text {
							margin-top: 26rpx;
						}
					}

					.active {
						background: url(../../static/images/home/money_active.png);
						background-size: 100% 100%;
						color: #ffffff;
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
					color: #fcc042;
					bottom: 228rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.coupon-tips {
					position: absolute;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
					// line-height: 48px;
					height: 128rpx;
					bottom: 100rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.bottom-text {
						width: 100%;
						box-sizing: border-box;
						padding: 0 30rpx;
						text-align: center;
					}
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

		.u-update-content {
			font-size: 30rpx;
			color: #333;
			line-height: 1.7;
			padding: 30rpx;
		}

		.bobao-wrapper {
			position: fixed;
			width: 100%;
			height: 70rpx;
			bottom: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.bobao-bg {
				height: 70rpx;
				background: #333;
				opacity: 0.6;
				border-radius: 14rpx;
			}

			.notice-bar {
				text-align: center;
				height: 80rpx;
			}
		}

		/deep/ .u-mode-center-box {
			background: none !important;
		}

		/deep/ .u-news-item {
			overflow: auto;
		}
	}
</style>
