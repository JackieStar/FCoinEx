<template>
	<view class="container">
		<u-navbar :title="i18n.login.title" :background="background">
			<view class="slot-wrap"><view class="nav-btn" @click="changeLang">language</view></view>
		</u-navbar>
		<view class="wrapper">
			<view class="welcome"><image mode="widthFix" src="../../static/images/public/logo.png" class="logo"></image></view>
			<view class="input-content">
				<view class="input-item">
					<u-image src="../../static/images/public/user.png" width="36rpx" height="38rpx" />
					<input placeholder-style="color: #ACACAC" v-model="form.account" :placeholder="i18n.login.account" />
				</view>
				<view class="input-item">
					<u-image style="flex-shrink:0" src="../../static/images/public/password.png" width="36upx" height="42upx" />
					<input
						placeholder-style="color: #ACACAC"
						v-if="!isOpenEyes"
						type="password"
						v-model="form.password"
						:placeholder="i18n.login.password"
						maxlength="20"
						data-key="password"
						@confirm="handleLogin"
					/>
					<input
						placeholder-style="color: #435687"
						v-else
						type="text"
						v-model="form.password"
						:placeholder="i18n.login.password"
						maxlength="20"
						data-key="password"
						@confirm="handleLogin"
					/>
					<view>
						<u-image v-if="isOpenEyes" src="../../static/images/public/open_eyes.png" @click="handleChange(false)" width="33upx" height="21upx" />
						<u-image v-else src="../../static/images/public/close_eyes.png" width="36rpx" @click="handleChange(true)" height="32rpx" />
					</view>
				</view>
			</view>
			<view v-if="form.account && form.password" @click="handleLogin" class="confirm-btn active">{{ i18n.login.login }}</view>
			<view v-else class="confirm-btn">{{ i18n.login.login }}</view>
			<view class="sign-wrapper">
				<view class="sign-up" @click="toRegist">{{ i18n.login.sign }}</view>
				<view class="forget" @click="toForgetPassword">{{ i18n.login.forget }}</view>
			</view>
			<view class="online">
				Online
				<text style="color: #E20804;margin-left: 20rpx;">{{ online_numbers }}</text>
			</view>
		</view>
		<view class="bottom-text">
			<text @click="toRegist">{{ i18n.login.bottomTxt }}</text>
		</view>
		<view class="kf-icon"><u-image @click="openPage('kf')" src="../../static/images/home/kf.png" width="127rpx" height="127rpx" /></view>
		<u-action-sheet :cancel-text="i18n.common.cancel" :border-radius="20" :list="langList" @click="clickLang" v-model="showLang"></u-action-sheet>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	mixins: [commonMixin],
	data() {
		return {
			background: {
				backgroundColor: '#F6F6F6'
			},
			form: {
				account: '', // 123456@qq.com
				password: '' // 123123
			},
			isOpenEyes: false,
			showLang: false,
			langList: [],
			online_numbers: 0
		};
	},
	onShow() {
		this.getAppConfig();
	},
	methods: {
		...mapActions('user', ['appConfig', 'login']),
		getAppConfig() {
			this.appConfig().then(res => {
				this.online_numbers = res.data.online_numbers;
				this.langList = res.data.languages.map(v => {
					return {
						text: v.name,
						lang: v.lang
					};
				});
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
		},
		toRegist() {
			uni.navigateTo({
				url: '/pages/public/register'
			});
		},
		toForgetPassword() {
			uni.navigateTo({
				url: '/pages/public/forget'
			});
		},
		openPage(type) {
			if (type === 'kf') {
				uni.navigateTo({
					url: '/pages/me/kf'
				});
			}
		},
		handleChange(type) {
			this.isOpenEyes = type;
		},

		handleLogin() {
			console.log('2232323');
			let $this = this;
			this.login(this.form).then(res => {
				this.$api.msg(this.i18n.login.loginSuccess, 1000, false, 'none', function() {
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/home/home'
						});
					}, 1000);
				});
			});
		}
	}
};
</script>

<style lang="scss">
.slot-wrap {
	width: 100%;
	display: flex;
	flex-direction: row-reverse;
}
.nav-btn {
	width: 160rpx;
	height: 51rpx;
	background: #0072ff;
	border-radius: 26rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	margin-right: 20rpx;
}
.container {
	padding-top: 60px;
	position: relative;
	overflow: hidden;
	background: #fff;
	width: 100%;
	height: 100%;
}
.welcome {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 60upx;
	.logo {
		width: 312rpx;
		height: 270rpx;
	}
}
.input-content {
	padding: 0 100rpx;
}
.input-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 0 10upx;
	height: 80upx;
	margin-bottom: 50upx;
	border-bottom: 1px solid #0b2771;
	&:last-child {
		margin-bottom: 0;
	}
	input {
		height: 60upx;
		font-size: $font-base + 2upx;
		color: #333;
		width: 100%;
		padding-left: 20upx;
	}
}
.confirm-btn {
	width: 650upx;
	height: 80upx;
	margin-top: 60upx;
	margin: 40upx auto;
	border-radius: 40rpx;
	background: #666;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}
.active {
	background: #2b73f6;
}
.sign-wrapper {
	width: 100%;
	padding: 0 60rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.sign-up {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #0072ff;
	}
	.forget {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #212121;
	}
}

.bottom-text {
	position: absolute;
	width: 100%;
	bottom: 70rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #212121;
	display: flex;
	align-items: center;
	justify-content: center;
}
.online {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #212121;
	text-align: center;
	margin-top: 60rpx;
}
.kf-icon {
	position: fixed;
	bottom: 160upx;
	right: 30upx;
}
</style>
