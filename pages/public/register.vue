<template>
	<view class="container">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="welcome">
				<view class="txt">
					<text class="b">{{ i18n.register.registrTitle }}</text>
					<text class="tips">{{ i18n.register.registrTips }}</text>
				</view>
			</view>
			<view class="input-content">
				<view class="input-item">
					<u-image src="../../static/images/public/email.png" width="40upx" height="28upx" />
					<input placeholder-style="color: #435687" v-model="form.email" :placeholder="i18n.register.email" maxlength="11" @input="inputChange" />
				</view>
				<view class="input-item">
					<u-image src="../../static/images/public/code.png"  width="30upx" height="35upx" />
					<input
						placeholder-style="color: #435687"
						v-model="form.email_code"
						:placeholder="i18n.register.emailCode"
						placeholder-class="input-empty"
						maxlength="20"
						style="padding-right: 100upx;"
						type="text"
						@input="inputChange"
					/>
					<view>
						<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
						<view @tap="getCode" class="code-btn">{{tips}}</view>
					</view>
				</view>
				<view class="input-item">
					<u-image src="../../static/images/public/password.png" width="32upx" height="35upx" />
					<input
						placeholder-style="color: #435687"
						type="password"
						v-if="!isOpen"
						v-model="form.password"
						:placeholder="i18n.register.password"
						placeholder-class="input-empty"
						maxlength="20"
					/>
					<input
						placeholder-style="color: #435687"
						v-else
						type="text"
						v-model="form.password"
						:placeholder="i18n.register.password"
						placeholder-class="input-empty"
						maxlength="20"
					/>
					<view>
						<u-image v-if="isOpen" src="../../static/images/public/open_eyes.png" @click="handleChange(false)" width="33upx" height="21upx" />
						<u-image v-else src="../../static/images/public/close_eyes.png" width="33upx" @click="handleChange(true)" height="21upx" />
					</view>
				</view>
				<view class="input-item">
					<u-image src="../../static/images/public/password.png" width="32upx" height="35upx" />
					<input
						placeholder-style="color: #435687"
						v-if="!isOpenEyes"
						type="password"
						v-model="form.password_confirm"
						:placeholder="i18n.register.passwordAgain"
						placeholder-class="input-empty"
						maxlength="20"
						@input="inputChange"
					/>
					<input
						placeholder-style="color: #435687"
						v-else
						type="text"
						v-model="form.password_confirm"
						:placeholder="i18n.register.passwordAgain"
						placeholder-class="input-empty"
						maxlength="20"
						@input="inputChange"
					/>
					<view>
						<u-image v-if="isOpenEyes" src="../../static/images/public/open_eyes.png" @click="handleChangeEyes(false)" width="33upx" height="21upx" />
						<u-image v-else src="../../static/images/public/close_eyes.png" width="33upx" @click="handleChangeEyes(true)" height="21upx" />
					</view>
				</view>
				<view class="input-item">
					<u-image src="../../static/images/public/invite.png" width="36upx" height="36upx" />
					<input
						placeholder-style="color: #435687"
						type="text"
						v-model="form.tcode"
						:placeholder="i18n.register.invitCode"
						placeholder-class="input-empty"
						maxlength="20"
					/>
				</view>
			</view>
			<view  @click="toRegist" class="confirm-btn">{{ i18n.register.registration }}</view>
			<!-- <button class="confirm-btn" @click="toRegist" :disabled="logining">{{ i18n.login.registration }}</button> -->
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
				email: 'a18859209253@163.com',
				password: '',
				password_confirm: '',
				tcode: '',
				email_code: ''
			},
			isOpen: false,
			isOpenEyes: false,
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
		};
	},
	onLoad() {},
	methods: {
		...mapActions('user', ['register']),
		...mapActions('common', ['sendSms']),
		inputChange(e) {
			const key = e.currentTarget.dataset.key;
			this[key] = e.detail.value;
		},
		navBack() {
			uni.navigateBack();
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
			this.isOpen = type
		},
		handleChangeEyes(type) {
			this.isOpenEyes = type
		},
		toRegist() {
			// if (!isMobile(this.form.username)) {
			// 	this.$api.msg(this.i18n.login.mobileError);
			// 	return;
			// }
			// if (!isPassword(this.form.password)) {
			// 	this.$api.msg(this.i18n.login.pwdError);
			// 	return;
			// }
			if (this.form.password != this.form.password_confirm) {
				this.$api.msg(this.i18n.login.pwdNotMatch);
				return;
			}

			this.logining = true;
			this.register(this.form)
				.then(res => {
					this.$api.msg(this.i18n.login.registSuccess, 1000, false, 'none', function() {
						setTimeout(function() {
							this.logining = false;
							uni.navigateTo({
								url: '/pages/public/login?redirect=register'
							});
						}, 1000);
					});
				})
				.catch(error => {
					this.logining = false;
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
	width: 100%;
	height: 100%;
}
.container {
	padding-top: 100px;
	position: relative;
	overflow: hidden;
	background: url(../../static/images/public/bg.png);
	background-size: 100% 100%;
	width: 100%;
	height: 100%;
}

.wrapper {
	position: relative;
	z-index: 90;
	padding-bottom: 40upx;
}

.back-btn {
	position: absolute;
	left: 40upx;
	z-index: 9999;
	padding-top: var(--status-bar-height);
	top: 40upx;
	font-size: 40upx;
	color: #ffffff;
}

.left-top-sign {
	font-size: 120upx;
	color: $page-color-base;
	position: relative;
	left: -16upx;
}

.right-top-sign {
	position: absolute;
	top: 80upx;
	right: -30upx;
	z-index: 95;

	&:before,
	&:after {
		display: block;
		content: '';
		width: 400upx;
		height: 80upx;
		background: #b4f3e2;
	}

	&:before {
		transform: rotate(50deg);
		border-radius: 0 50px 0 0;
	}

	&:after {
		position: absolute;
		right: -198upx;
		top: 0;
		transform: rotate(-50deg);
		border-radius: 50px 0 0 0;
		/* background: pink; */
	}
}

.left-bottom-sign {
	position: absolute;
	left: -270upx;
	bottom: -320upx;
	border: 100upx solid #d0d1fd;
	border-radius: 50%;
	padding: 180upx;
}

.welcome {
	position: relative;
	padding-left: 40upx;
	padding-bottom: 50upx;
	.logo {
		width: 150upx;
	}
	.txt {
		display: flex;
		flex-direction: column;
		color: #ffffff;
		padding-left: 20upx;
		padding-bottom: 40upx;
		font-size: 26upx;
		.b {
			font-size: 48upx;
			font-weight: bold;
		}
		.tips {
			font-size: 24upx;
			font-weight: 300;
			color: #ffffff;
			opacity: 0.5;
			margin-top: 23upx;
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
	border-bottom: 1px solid #0B2771;
	color: #ffffff;
	&:last-child {
		margin-bottom: 0;
	}
	.icon {
		width: 13px;
		height: 17px;
	}
	.tit {
		height: 50upx;
		line-height: 56upx;
		font-size: $font-sm + 2upx;
		color: $font-color-base;
	}
	input {
		height: 60upx;
		font-size: $font-base + 2upx;
		color: #ffffff;
		width: 100%;
		padding-left: 20upx;
	}
}
.link {
	display: flex;
	padding: 30upx 60upx;
	color: #ffffff;
}
.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		margin-top: 40upx;
		margin: 40upx auto;
		background: url(../../static/images/public/login-btn.png);
		background-size: 100% 100%;
		color: #fff;
		font-size: $font-lg;
		display: flex;
		align-items: center;
		justify-content: center;
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
	bottom: 50upx;
	width: 100%;
	font-size: $font-sm + 2upx;
	color: #4e46d2;
	text-align: center;
	text {
		color: #ffffff;
		margin-left: 10upx;
	}
}
.code-btn {
	float: right;
	width: 200upx;
	text-align: right;
	color: #4F5B87;
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 400;
	background: linear-gradient(0deg, #3FBBFE 0%, #A541FF 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
