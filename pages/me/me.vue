<template>
	<view class="container">
		<view class="header">
			<view class="title">{{i18n.me.title}}</view>
			<view class="user-wrapper">
				<u-image style="flex-shrink: 0;" @click="openPage('user')" shape="circle" v-if="userData.avatar" :src="userData.avatar" width="102rpx"
					height="102rpx" />
				<u-image style="flex-shrink: 0;"  @click="openPage('user')" shape="circle" v-else src="../../static/images/user/avatar.png" width="102rpx"
					height="102rpx" />
				<view class="user-flex">
					<view class="user-info">
						<view class="user-name" @click="openPage('userInfo')">{{ userData.name || i18n.me.login }}</view>
						<view class="user-invit" v-if="userData.tcode">
							<text style="margin-right: 20rpx">{{i18n.me.tcode}}： {{userData.tcode}}</text>
							<u-image @click="handleCopy(userData.tcode)" src="../../static/images/me/copy.png" width="21rpx"
								height="21rpx" />
						</view>
					</view>
					<view class="user-rz" @click="openPage('authentication')">
						<!-- <image class="" src="../../static/iamges/me/auth-bg.png" mode=""></image> -->
						<image class="user-rz-icon" src="../../static/images/me/auth-icon.png" mode=""></image>
						<view class="user-rz-text flex_left_box">
							{{i18n.auth.pageTitle}} <image class="rz-right" src="../../static/images/me/to-right.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 资产 -->
			<view class="user-money-wrapper">
				<view class="money-title">{{i18n.me.assets}}</view>
				<view class="money">
					${{userData.balance  || '0.00'}}
					<text class="money-tips" v-if="userData.currency && userData.currency.currency !=='USD'">≈{{userData.currency.currency}}-{{userData.currency.symbol}}{{(userData.balance * Number(userData.currency.rate)).toFixed(2)}}</text>
				</view>
			</view>
			<!-- 快速入口 -->
			<view class="fast-wrapper">
				<view class="fast-item" @click="openPage('recharge')">
					<view class="fast-item-title">{{i18n.me.recharge}}</view>
					<u-image class="fast-item-img" src="../../static/images/me/recharge.png" width="50rpx"
						height="48rpx" />
				</view>
				<view class="fast-item" @click="openPage('withdraw')">
					<view class="fast-item-title">{{i18n.me.withdraw}}</view>
					<u-image class="fast-item-img" src="../../static/images/me/withdraw.png" width="45rpx"
						height="47rpx" />
				</view>
				<view class="fast-item" @click="openPage('setting')">
					<view class="fast-item-title">{{i18n.me.setting}}</view>
					<u-image class="fast-item-img" src="../../static/images/me/setting.png" width="48rpx"
						height="45rpx" />
				</view>
			</view>
		</view>

		<view class="fast-cell-wrapper">
			<view class="cell-item" @click="openPage('userInfo')">
				<u-image src="../../static/images/me/user_info.png" width="34rpx" height="30rpx" />
				<view class="cell-item-right">
					<text class="cell-title">{{i18n.me.userInfo}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
			<view class="cell-item" @click="openPage('wallet')">
				<u-image src="../../static/images/me/j_l.png" width="29rpx" height="34rpx" />
				<view class="cell-item-right">
					<text class="cell-title">{{i18n.me.record}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
			<view class="cell-item" @click="openPage('fund')">
				<u-image src="../../static/images/me/z_j.png" width="26rpx" height="31rpx" />
				<view class="cell-item-right">
					<text class="cell-title">{{i18n.me.fund}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
			<view class="cell-item" @click="openPage('kf')">
				<u-image src="../../static/images/me/kf.png" width="27rpx" height="26rpx" />
				<view class="cell-item-right">
					<text class="cell-title">{{i18n.me.kf}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
		</view>
		<view class="fast-cell-wrapper" style="height: 315rpx;">
			<view class="cell-item" @click="openPage('share')">
				<u-image src="../../static/images/me/share.png" width="29rpx" height="33rpx" />
				<view class="cell-item-right">
					<text class="cell-title">{{i18n.me.share}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
			<view class="cell-item" @click="openPage('lottery')">
				<u-image src="../../static/images/me/lottery.png" width="34rpx" height="34rpx" />
				<view class="cell-item-right">
					<text class="cell-title">{{i18n.me.lottery}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
			<view class="cell-item" @click="openPage('red')">
				<u-image src="../../static/images/me/h_b.png" width="28rpx" height="31rpx" />
				<view class="cell-item-right">
					<text class="cell-title">{{i18n.me.redPacket}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
		</view>
		<view class="fast-cell-wrapper" style="height: 210rpx;">
			<view class="cell-item" @click="openPage('about')">
				<u-image src="../../static/images/me/about_us.png" width="33rpx" height="33rpx" />
				<view class="cell-item-right">
					<text class="cell-title">{{i18n.me.about}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
			<view class="cell-item" @click="showLang = true">
				<u-image src="../../static/images/me/lang.png" width="34rpx" height="34rpx" />
				<view class="cell-item-right">
					<text class="cell-title">{{i18n.me.lang}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
			<u-action-sheet :cancel-text="i18n.common.cancel" :border-radius="20" :list="langList" @click="clickLang"
				v-model="showLang"></u-action-sheet>
		</view>
		<view class="logout" v-if="loginInfo.hasLogin" @click="toLogout">{{i18n.user.logout}}</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	import {
		commonMixin
	} from '@/common/mixin/mixin.js';

	export default {
		mixins: [commonMixin],
		data() {
			return {
				userData: {},
				showLang: false,
				langList: [],
				appData: {},
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.tabBar.me
			});
			this.getAppConfig();
			if (this.loginInfo.hasLogin) {
				this.getUserInfo()
			} else {
				this.userData = {}
			}
		},
		computed: {
			...mapState('user', ['loginInfo'])
		},
		methods: {
			...mapActions('user', ['appConfig', 'logout', 'userInfo']),
			getAppConfig() {
				this.appConfig().then(res => {
					this.appData = res.data;
					this.langList = res.data.languages.map(v => {
						return {
							text: v.name,
							lang: v.lang
						};
					});
				});
			},
			// 获取用户信息
			getUserInfo() {
				this.userInfo().then(res => {
					this.userData = res.data;
				});
			},
			changeLang() {
				this.showLang = true;
			},
			clickLang(index) {
				let lang = this.langList[index].lang;
				uni.setStorageSync('language', lang);
				this._i18n.locale = lang;
				uni.setTabBarItem({
					index: 0,
					text: this.$t('message').tabBar.home
				});
				uni.setTabBarItem({
					index: 1,
					text: this.$t('message').tabBar.trade
				});
				uni.setTabBarItem({
					index: 2,
					text: this.$t('message').tabBar.record
				});
				uni.setTabBarItem({
					index: 3,
					text: this.$t('message').tabBar.me
				});
				this.getAppConfig();
			},
			openPage(type, item) {
				if (type === 'share') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/public/invit'
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}
				if (type === 'userInfo') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/me/userInfo'
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
				if (type === 'setting') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/me/account'
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}
				if (type === 'wallet') {
					if (this.loginInfo.hasLogin) {
						uni.switchTab({
							url: '/pages/wallet/wallet'
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}
				if (type === 'red') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/public/redPacket'
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}
				if (type === 'user') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/me/userInfo'
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

				if (type === 'withdraw') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/me/withdraw'
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}
				if (type === "about") {
					uni.navigateTo({
						url: `/pages/public/webview?title=${this.i18n.me.about}&url=${this.appData.abount_me}`
					});
				}
				if (type === 'authentication') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/me/authentication'
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}
				if (type === 'fund') {
					if (this.loginInfo.hasLogin) {
						uni.navigateTo({
							url: '/pages/wallet/fund-details'
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					}
				}

			},
			// 复制
			handleCopy(id) {
				console.log('id', id);
				uni.setClipboardData({
					data: id.toString(),
					success: () => {
						this.$api.msg(this.i18n.toast.copySuccess);
					}
				});
			},
			//退出登录
			toLogout() {
				uni.showModal({
					content: this.i18n.user.isLogout,
					success: e => {
						if (e.confirm) {
							this.logout();
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/public/login'
								});
							}, 200);
						}
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 220rpx;
	
	.header {
			width: 100%;
			height: 705rpx;
			background: url(../../static/images/me/header_bg.png);
			background-size: 100% 100%;

			.title {
				text-align: center;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #212121;
				padding-top: 120rpx;
			}

			.user-invit {
				display: flex;
				margin-top: 10rpx;
			}

			.user-wrapper {
				width: 100%;
				padding: 20rpx;
				display: flex;
				.user-flex{
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex: 1;
				}

				.user-info {
					width: 400rpx;
					display: flex;
					flex-direction: column;
					margin: 10rpx 0 0 20rpx;
				}

				.user-rz {
					// width: 151rpx;
					position: absolute;
					margin-bottom: 20rpx;
					right: 20rpx;
					height: 34rpx;
					background: url(../../static/images/me/auth-bg.png);
					background-size: 100% 100%;
					display: flex;
					align-items: center;
					.user-rz-icon{
						width: 34rpx;
						height: 34rpx;
					}
					.user-rz-text{
						margin-left: 4rpx;
						font-size: 22rpx;
						line-height: 34rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						padding-right: 10rpx;
						.rz-right{
							width: 10rpx;
							height: 16rpx;
							margin-left: 6rpx;
						}
					}
				}
			}

			.user-money-wrapper {
				width: 698rpx;
				height: 171rpx;
				background: url(../../static/images/me/blue_bg.png);
				background-size: 100% 100%;
				margin: 20rpx auto;

				.money-title {
					padding: 20rpx 0 14rpx 24rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #ffffff;
					opacity: 0.72;
				}

				.money {
					font-size: 48rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #ffffff;
					padding-left: 24rpx;
				}

				.money-tips {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #ffffff;
					margin-left: 10rpx;
				}
			}

			.fast-wrapper {
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding: 20rpx 25rpx;

				.fast-item {
					width: 200rpx;
					height: 125rpx;
					background: #ffffff;
					border-radius: 10rpx;
					padding: 18rpx;
					box-sizing: border-box;
					position: relative;
					.fast-item-title {
						font-size: 28rpx;
						line-height: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #212121;
					}

					.fast-item-img {
						position: absolute;
						// float: right;
						right: 14rpx;
						bottom: 14rpx;
					}
				}
			}
		}

		.fast-cell-wrapper {
			width: 698rpx;
			height: 420rpx;
			background: #ffffff;
			border-radius: 10rpx;
			margin: 20rpx auto;

			.cell-item {
				width: 698rpx;
				display: flex;
				height: 105rpx;
				align-items: center;
				padding: 0 25rpx 0 24rpx;

				.cell-item-right {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.cell-title {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #212121;
					margin-left: 16rpx;
				}
			}
		}

		.logout {
			width: 698rpx;
			height: 105rpx;
			border-radius: 10rpx;
			margin: 20rpx auto;
			font-family: PingFang SC;
			font-weight: 500;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #333;
			background-color: #fff;
		}
	}
</style>
