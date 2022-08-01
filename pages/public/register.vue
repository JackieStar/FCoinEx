<template>
	<view class="container">
		<view class="wrapper">
			<view class="welcome">
				<view class="txt">
					<text class="title">{{ i18n.register.registrTitle }}</text>
					<u-image :fade="false" :show-loading="false" src="/static/images/public/title_bg.png" width="194rpx" height="18rpx" />
					<text class="tips">{{ i18n.register.registrTips }}</text>
				</view>
			</view>
			<view class="input-content">
				<view class="input-item">
					<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" src="/static/images/public/phone.png" width="30rpx" height="40rpx" />
					<input placeholder-style="color: #ACACAC" v-model="form.mobile" :placeholder="i18n.register.account" />
				</view>
				<!-- <view class="input-item">
					<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" src="/static/images/public/email.png" width="38upx" height="28upx" />
					<input placeholder-style="color: #ACACAC" v-model="form.email" :placeholder="i18n.register.email" @input="inputChange" />
				</view>
				<view class="input-item">
					<input
						placeholder-style="color: #ACACAC"
						v-model="form.email_code"
						:placeholder="i18n.register.emailCode"
						maxlength="20"
						style="padding-right: 20rpx;"
						type="text"
						@input="inputChange"
					/>
					<view>
						<u-verification-code
							:start-text="i18n.common.getCode"
							:change-text="i18n.common.seconds"
							:end-text="i18n.common.again"
							:seconds="seconds"
							ref="uCode"
							@change="codeChange"
						></u-verification-code>
						<view @tap="getCode" v-if="lang == 'zh-CN'" style="width: 180rpx" class="code-btn">{{ tips }}</view>
						<view @tap="getCode" v-else style="width: 60rpx" class="code-btn">{{ tips }}</view>
					</view>
				</view> -->
				<view class="input-item">
					<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" src="/static/images/public/password.png" width="30upx" height="34upx" />
					<input
						placeholder-style="color: #ACACAC"
						type="password"
						v-if="!isOpen"
						v-model="form.password"
						:placeholder="i18n.register.password"
						maxlength="20"
					/>
					<input
						placeholder-style="color: #ACACAC"
						v-else
						type="text"
						v-model="form.password"
						:placeholder="i18n.register.password"
						maxlength="20"
					/>
					<view>
						<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" v-if="isOpen" src="/static/images/public/open_eyes.png" @click="handleChange(false)" width="36upx" height="32upx" />
						<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" v-else src="/static/images/public/close_eyes.png" @click="handleChange(true)" width="36upx" height="32upx" />
					</view>
				</view>
				<view class="input-item">
					<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" src="/static/images/public/password.png" width="30upx" height="34upx" />
					<input
						placeholder-style="color: #ACACAC"
						v-if="!isOpenEyes"
						type="password"
						v-model="form.password_confirm"
						:placeholder="i18n.register.passwordAgain"
						maxlength="20"
					/>
					<input
						placeholder-style="color: #ACACAC"
						v-else
						type="text"
						v-model="form.password_confirm"
						:placeholder="i18n.register.passwordAgain"
						maxlength="20"
					/>
					<view>
						<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" v-if="isOpenEyes" src="/static/images/public/open_eyes.png" @click="handleChangeEyes(false)" width="36upx" height="32upx" />
						<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" v-else src="/static/images/public/close_eyes.png" @click="handleChangeEyes(true)" width="36upx" height="32upx" />
					</view>
				</view>
				<view class="input-item">
					<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" src="/static/images/public/password.png" width="30upx" height="34upx" />
					<input
						placeholder-style="color: #ACACAC"
						v-if="!isOpenCash"
						password
						type="number"
						v-model="form.cash_password"
						:placeholder="i18n.register.cashPasswordPhSix"
						maxlength="6"
					/>
					<input
						placeholder-style="color: #ACACAC"
						v-else
						type="number"
						v-model="form.cash_password"
						:placeholder="i18n.register.cashPasswordPhSix"
						maxlength="6"
					/>
					<view>
						<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" v-if="isOpenCash" src="/static/images/public/open_eyes.png" @click="handleChangeCash(false)" width="36upx" height="32upx" />
						<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" v-else src="/static/images/public/close_eyes.png" @click="handleChangeCash(true)" width="36upx" height="32upx" />
					</view>
				</view>
				<view class="input-item">
					<u-image style="flex-shrink: 0;" :fade="false" :show-loading="false" src="/static/images/public/invit.png" width="34upx" height="32upx" />
					<input
						placeholder-style="color: #ACACAC"
						type="text"
						v-model="form.tcode"
						:placeholder="i18n.register.invitCode"
						maxlength="20"
					/>
				</view>
			</view>
			<u-checkbox v-model="isChecked" style="margin-left: 60rpx;">
				<view class="check-wrapper" @click="openPage('xieyi')">{{i18n.register.tips1}}<text style="color: #2b73f6">{{i18n.register.tips2}}</text></view>
			</u-checkbox>
			<view @click="toRegist" class="confirm-btn">{{ i18n.register.title }}</view>
			
		</view>
		<view class="register-section">
			{{ i18n.register.hasAccount }}
			<text @click="navToLogin">{{ i18n.register.logining }}</text>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isMobile, isPassword } from '../../utils/validate';
import { commonMixin } from '@/common/mixin/mixin.js';

export default {
	mixins: [commonMixin],
	data() {
		return {
			form: {
				mobile: null,
				password: '',
				password_confirm: '',
				cash_password: '',
				tcode: '',
			},
			isOpen: false,
			isOpenEyes: false,
			isOpenCash: false,
			mobile: '',
			password: '',
			logining: false,
			loading: false,
			seconds: 60,
			tips: '',
			authCode: {
				captchaCode: undefined,
				token: undefined
			},
			isChecked: false,
			lang: null
		};
	},
	onLoad(e) {
		// console.log('e', e)
		if (e.t) {
			this.form.tcode = e.t
		}
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.register.title
		});
		this.lang = uni.getStorageSync('language');
		this.getAppConfig()
	},
	methods: {
		...mapActions('user', ['register', 'login', 'appConfig']),
		...mapActions('common', ['sendSms']),
		getAppConfig() {
			this.appConfig().then(res => {
				this.appData = res.data;
			});
		},
		openPage(type) {
			if (type === 'xieyi') {
				uni.navigateTo({
					url: `/pages/public/webview?title=${this.i18n.register.tips2}&url=${this.appData.privacy}`
				});
			}
		},
		navToLogin() {
			uni.navigateTo({
				url: '/pages/public/login'
			});
		},
		codeChange(text) {
			this.tips = text;
		},
		getCode() {
			if (!this.form.email) {
				return this.$api.msg(this.i18n.register.email);
			}
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: this.i18n.toast.coding
				});
				let data = {
					usage: 'register',
					email: this.form.email
				};
				this.sendSms(data)
					.then(res => {
						this.authCode.token = res.data;
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast(this.i18n.toast.codeSend);
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					})
					.catch(error => {});
			} else {
			}
		},
		handleChange(type) {
			this.isOpen = type;
		},
		handleChangeEyes(type) {
			this.isOpenEyes = type;
		},
		handleChangeCash(type) {
			this.isOpenCash = type;
		},
		toRegist() {
			if (this.form.password != this.form.password_confirm) {
				this.$api.msg(this.i18n.toast.againPwdError);
				return;
			}
			if (!this.isChecked) {
				this.$api.msg(this.i18n.register.tips3);
				return;
			}

			this.logining = true;
			this.register(this.form)
				.then(res => {
					this.$api.msg(this.i18n.login.registSuccess, 1000, false, 'none');
					setTimeout(() => {
						this.logining = false;
						let params = {
							account: this.form.mobile,
							password: this.form.password
						};
						this.login(params).then(res => {
							uni.switchTab({	
								url: '/pages/home/home'
							});
						});
					}, 2000);
				})
				.catch(error => {
					this.logining = false;
				});
		}
	}
};
</script>

<style lang="scss">
.container {
	padding-top: 40rpx;
	width: 100%;
	height: 100%;
	background-color: #fff;
}

.wrapper {
	position: relative;
	z-index: 90;
	padding-bottom: 40upx;
}

.welcome {
	position: relative;
	padding-left: 40upx;
	.txt {
		display: flex;
		flex-direction: column;
		color: #ffffff;
		padding-left: 20upx;
		padding-bottom: 40upx;
		font-size: 26upx;
		.title {
			margin-bottom: -30rpx;
			margin-left: 4rpx;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			z-index: 10;
		}
		.tips {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			margin-top: 20rpx;
		}
	}
}

.input-content {
	padding: 0 60upx;
}
.input-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 0 10upx;
	height: 80upx;
	margin-bottom: 50upx;
	border-bottom: 1px solid #DEDEDE;
	&:last-child {
		margin-bottom: 0;
	}
	input {
		height: 60upx;
		font-size: 28rpx;
		color: #333;
		width: 100%;
		padding-left: 20upx;
	}
}
.link {
	display: flex;
	padding: 30rpx 60rpx;
	color: #ffffff;
}
.confirm-btn {
	width: 650rpx;
	height: 80rpx;
	margin: 40rpx auto;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 500;
	border-radius: 40rpx;
	color: #FFFFFF;
	background-color: #2b73f6;
	display: flex;
	align-items: center;
	justify-content: center;
}
.check-wrapper {
	width: 100%;
	padding: 20rpx 24rpx;
	font-size: 26rpx;
	font-weight: 500;
	
}

.forget-section {
	font-size: $font-sm + 2upx;
	color: $font-color-spec;
	text-align: center;
	margin-top: 40upx;
}

.register-section {
	position: absolute;
	left: 0;
	bottom: 50rpx;
	width: 100%;
	font-size: 28rpx;
	color: #212121;
	text-align: center;
	text {
		color: #0072FF;
		margin-left: 10upx;
	}
}
.code-btn {
	text-align: right;
	color: #0072FF;
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 400;
}
</style>
