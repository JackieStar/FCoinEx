<template>
	<view class="container">
		<view class="user-section">
			<image mode="widthFix" class="bg" src="../../static/images/user/user_bg.png"></image>
			<view class="market-header">
				<u-icon class="arrow-left" @click="openPage(0)" name="arrow-left" color="#ffffff" size="44" />
				<view class="market-text">{{i18n.user.title}}</view>
			</view>
			<view class="user-info-box">
				<view class="portrait-box"><image class="portrait" :src="loginInfo.avatar"></image></view>
				<view class="info-box" @click="toLogin">
					<view class="username" @click="openPage(1)">
						{{ loginInfo.name || i18n.user.login }}
						<u-image class="edit" src="../../static/images/my/edit.png" width="26upx" height="29upx" />
					</view>
					<view class="tip">{{ loginInfo.email }}</view>
					<view class="tip" @click="handleCopy(loginInfo.id)">
						UID: {{ loginInfo.id }}
						<u-image class="copy" src="../../static/images/my/copy.png" width="28upx" height="29upx" />
					</view>
				</view>
			</view>
		</view>

		<view class="cover-container">
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<list-cell image="/static/images/my/password.png" @eventClick="navTo('/pages/user/updateLoginPwd', true)" :title="i18n.user.password"></list-cell>
				<list-cell image="/static/images/my/referral.png" @eventClick="navTo('/pages/user/invit', true)" :title="i18n.user.invit"></list-cell>
				<list-cell image="/static/images/my/language.png" @eventClick="changeLang" :title="i18n.user.language"></list-cell>
				<list-cell image="/static/images/my/community.png" @eventClick="openPage(2)" :title="i18n.user.community"></list-cell>
				<list-cell image="/static/images/my/help-center.png" @eventClick="openPage(3)" :title="i18n.user.help"></list-cell>
				<list-cell image="/static/images/my/about-as.png" @eventClick="openPage(4)" :title="i18n.user.about"></list-cell>
				<list-cell image="/static/images/my/download.png" border="" :title="i18n.user.download" @eventClick="openPage(5)"></list-cell>
			</view>
			<view class="history-section icon"><list-cell image="/static/images/my/logout.png" border="" :title="i18n.user.logout" @eventClick="toLogout"></list-cell></view>
		</view>

		<u-action-sheet :cancel-text="i18n.common.cancel" :border-radius="20" :list="langList" @click="clickLang" v-model="showLang"></u-action-sheet>
	</view>
</template>
<script>
import listCell from '@/components/mix-list-cell';
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';
let startY = 0,
	moveY = 0,
	pageAtTop = true;
export default {
	components: {
		listCell
	},
	mixins: [commonMixin],
	data() {
		return {
			userInfo: {},
			showLang: false,
			langList: []
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.tabBar.me
		});
		this.getAppConfig()
		if (this.loginInfo.hasLogin) {
			// this.isMerchant().then(res => {
			// 	this.isMer = res.data;
			// });
			// this.loadAuthInfo();
		}
		this.langList = [
			{
				text: this.i18n.common.lang.en,
				lang: 'en_US'
			},
			{
				text: this.i18n.common.lang.zh,
				lang: 'zh_CN'
			}
		];
	},

	computed: {
		...mapState('user', ['loginInfo'])
	},
	methods: {
		...mapActions('user', [ 'appConfig', 'logout']),
		toLogin() {
			if (!this.loginInfo.hasLogin) {
				uni.navigateTo({
					url: '/pages/public/login'
				});
			}
		},
		getAppConfig() {
			this.appConfig().then((res)=> {
				this.appConfig = res.data
			})
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
			})
		},
		openPage(type) {
			if (type === 0) {
				uni.navigateBack();
			}
			if (type === 1) {
				uni.navigateTo({
					url: '/pages/user/updateName'
				});
			}
			if (type === 2) {
				window.location.href = this.appConfig.add_group
				// uni.navigateTo({
				// 	url: '/pages/user/webview?url=' + ''
				// });
			}
			if (type === 3) {
				window.location.href = this.appConfig.help_center
				// uni.navigateTo({
				// 	url: '/pages/user/webview?url=' + ''
				// });
			}
			if (type === 4) {
				window.location.href = this.appConfig.abount_me
				// uni.navigateTo({
				// 	url: '/pages/user/webview?url=' + ''
				// });
			}
			if (type === 5) {
				window.location.href = this.appConfig.kf_url
				// uni.navigateTo({
				// 	url: '/pages/user/webview?url=' + ''
				// });
			}
			
		},
		// 复制
		handleCopy(id) {
			console.log('id', id)
			uni.setClipboardData({
				data: id.toString(),
				success: () => {
					this.$api.msg('UID已复制');
				}
			});
		},
		//退出登录
		toLogout() {
			uni.showModal({
				content: '确定要退出登录?',
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
%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
%section {
	display: flex;
	justify-content: space-around;
	align-content: center;
	background: #fff;
	border-radius: 10upx;
}
page {
	// #ifdef H5
	padding-bottom: 200upx;
	// #endif
}
.container {
	width: 100%;
	height: 100%;
	background-color: $page-color-base;
}
.market-header {
	width: 100%;
	height: 130upx;
	text-align: center;
	box-sizing: border-box;
	.arrow-left {
		top: 44upx;
		left: 41upx;
		position: fixed;
	}
	.market-text {
		height: 80upx;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #ffffff;
		line-height: 130upx;
	}
}
.user-section {
	height: 510upx;
	padding: 0 30upx 0;
	position: relative;
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
}
.user-info-box {
	height: 180upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	z-index: 1;
	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
	}
	.info-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.username {
		display: flex;
		font-size: 36upx;
		color: #ffffff;
		margin-left: 40upx;
		margin-top: 30upx;
		.edit {
			margin-left: 28upx;
		}
	}
	.tip {
		display: flex;
		font-size: $font-sm;
		color: #a6a5a7;
		margin-left: 20upx;
		margin-top: 5upx;
		margin-bottom: 5upx;
		.copy {
			margin-left: 33upx;
		}
	}
}

.cover-container {
	background: $page-color-base;
	margin-top: -30upx;
	padding: 28upx;
	position: relative;
	padding-bottom: 20upx;
	.arc {
		position: absolute;
		left: 0;
		top: -34upx;
		width: 100%;
		height: 36upx;
	}
}
.history-section {
	margin-bottom: 20upx;
	background: #1a1b28;
	border-radius: 20upx;
	.sec-header {
		display: flex;
		align-items: center;
		font-size: $font-base;
		color: $font-color-dark;
		line-height: 40upx;
		margin-left: 30upx;
		.yticon {
			font-size: 44upx;
			color: #5eba8f;
			margin-right: 16upx;
			line-height: 40upx;
		}
	}
	.h-list {
		white-space: nowrap;
		padding: 30upx 30upx 0;
		image {
			display: inline-block;
			width: 30upx;
			height: 30upx;
			margin-right: 20upx;
			border-radius: 10upx;
		}
	}
}
</style>
