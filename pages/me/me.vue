<template>
	<view class="container">
		<view class="header">
			<view class="title">我的账户</view>
			<view class="user-wrapper">
				<u-image src="../../static/images/user/avatar.png" width="102rpx" height="102rpx" />
				<view class="user-info">
					<view class="user-name">{{userInfo.name || i18n.user.login}}</view>
					<view class="user-invit">
						<!-- <text>邀请码： {{userInfo.}}</text> -->
						<u-image src="../../static/images/me/copy.png" width="21rpx" height="21rpx" />
					</view>
				</view>
				<view class="user-rz"></view>
			</view>
		</view>
	</view>
</template>

<script>
import listCell from '@/components/mix-list-cell';
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';

export default {
	components: {
		listCell
	},
	mixins: [commonMixin],
	data() {
		return {
			userInfo: {},
			showLang: false,
			langList: [],
			appData: {},
			webLink: []
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.tabBar.me
		});
		this.getAppConfig();
		
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	methods: {
		...mapActions('user', ['appConfig', 'logout']),
		getAppConfig() {
			this.appConfig().then(res => {
				this.appData= res.data;
				this.webLink = res.data.web_link
				this.langList = res.data.languages.map(v=> {
					return {
						text: v.name,
						lang: v.lang
					}
				})
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
				text: this.$t('message').tabBar.market
			});
			uni.setTabBarItem({
				index: 1,
				text: this.$t('message').tabBar.trade
			});
			uni.setTabBarItem({
				index: 2,
				text: this.$t('message').tabBar.assets
			});
			this.getAppConfig()
		},
		openPage(type, item) {
			if (type === 0) {
				uni.navigateBack();
			}
			if (type === 1) {
				if (this.loginInfo.hasLogin) {
					uni.navigateTo({
						url: '/pages/user/updateName'
					});
				} else {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}
				
			}
			if (type === 2) {
				uni.navigateTo({
					url: `/pages/user/webview?title=${item.name}&url=${item.link}`
				});
			}
			if (type == 3) {
				uni.navigateTo({
					url: '/pages/user/webview?type=3&url=' + this.appData.help_center
				});
			}
			if (type == 4) {
				uni.navigateTo({
					url: '/pages/user/webview?type=4&url=' + this.appData.abount_me
				});
			}
			if (type === 5) {
				uni.navigateTo({
					url: '/pages/user/webview?type=5&url=' + this.appData.app_download
				});
			}
			if (type === 6) {
				if (this.loginInfo.hasLogin) {
					uni.navigateTo({
						url: '/pages/user/updateLoginPwd'
					});
				} else {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}
			}
			if (type === 7) {
				if (this.loginInfo.hasLogin) {
					uni.navigateTo({
						url: '/pages/user/invit'
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
			.user-wrapper {
				width: 100%;
				padding: 20rpx;
				display: flex;
				.user-info {
					width: 400rpx;
					display: flex;
					flex-direction: column;
					margin: 10rpx 0 0 20rpx;
				}
			}
			.user-rz {
				width: 151rpx;
				height: 34rpx;
				background: url(../../static/images/me/rz_bg.png);
				background-size: 100% 100%;
			}
		}
	}
</style>
