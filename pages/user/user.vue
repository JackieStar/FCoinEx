<template>
	<view class="container">
		<view class="user-section">
			<image mode="widthFix" class="bg" src="../../static/images/user/user_bg.png"></image>
			<view class="market-header">
				<u-icon class="arrow-left" @click="openPage(0)" name="arrow-left" color="#ffffff" size="44" />
				<view class="market-text">{{ i18n.user.title }}</view>
			</view>
			<view class="user-info-box">
				<view class="portrait-box">
					<image v-if="loginInfo.hasLogin" class="portrait" :src="loginInfo.avatar"></image>
					<image v-else class="portrait" src="../../static/images/user/avatar.png" mode="widthFix" />
				</view>
				
				<view class="info-box" @click="toLogin">
					<view class="username" @click="openPage(1)">
						{{ loginInfo.name || i18n.user.login }}
						<u-image v-if="loginInfo.hasLogin" class="edit" src="../../static/images/user/edit.png" width="26upx" height="29upx" />
					</view>
					<view class="tip">{{ loginInfo.email }}</view>
					<view class="tip" @click="handleCopy(loginInfo.id)" v-if="loginInfo.hasLogin">
						UID: {{ loginInfo.id }}
						<u-image class="copy" src="../../static/images/user/copy.png" width="28upx" height="29upx" />
					</view>
				</view>
			</view>
		</view>

		<view class="cover-container">
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<list-cell image="/static/images/user/password.png" @eventClick="openPage(6)" :title="i18n.user.password"></list-cell>
				<list-cell image="/static/images/user/referral.png" @eventClick="openPage(7)" :title="i18n.user.invit"></list-cell>
				<list-cell image="/static/images/user/language.png" @eventClick="changeLang" :title="i18n.user.language"></list-cell>
				<list-cell image="/static/images/user/community.png" @eventClick="openPage(2)" :title="i18n.user.community"></list-cell>
				<list-cell image="/static/images/user/help-center.png" @eventClick="openPage(3)" :title="i18n.user.help"></list-cell>
				<list-cell image="/static/images/user/about-as.png" @eventClick="openPage(4)" :title="i18n.user.about"></list-cell>
				<list-cell image="/static/images/user/download.png" border="" :title="i18n.user.download" @eventClick="openPage(5)"></list-cell>
			</view>	
			<view class="history-section icon" v-if="loginInfo.hasLogin"><list-cell image="/static/images/user/logout.png" border="" :title="i18n.user.logout" @eventClick="toLogout"></list-cell></view>
		</view>

		<u-action-sheet :cancel-text="i18n.common.cancel" :border-radius="20" :list="langList" @click="clickLang" v-model="showLang"></u-action-sheet>
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
			appData: {}
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.tabBar.me
		});
		this.getAppConfig();
		this.langList = [
			{
				text: this.i18n.common.lang.en,
				lang: 'en_US'
			},
			{
				text: this.i18n.common.lang.zh,
				lang: 'zh_CN'
			},
			{
				text: this.i18n.common.lang.hk,
				lang: 'zh_HK'
			}
		];
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	methods: {
		...mapActions('user', ['appConfig', 'logout']),
		toLogin() {
			if (!this.loginInfo.hasLogin) {
				uni.navigateTo({
					url: '/pages/public/login'
				});
			}
		},
		getAppConfig() {
			this.appConfig().then(res => {
				this.appData= res.data;
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
				uni.navigateTo({
					url: '/pages/user/webview?type=2&url=' + this.appData.add_group
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
	// height: 180upx;
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
		// margin-left: 40upx;
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
