<template>
	<view class="container">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="welcome">
				<!-- <image mode="widthFix" src="../../static/images/public/logo.png" class="logo"></image> -->
				<view class="txt">
					<text class="b">{{ i18n.login.registrTitle }}</text>
					<text class="tips">{{ i18n.login.registrTips }}</text>
				</view>
			</view>
			<view class="input-content">
				<view class="input-item">
					<u-image src="../../static/images/public/email.png" width="40upx" height="28upx" />
					<input placeholder-style="color: #435687" v-model="form.username" :placeholder="i18n.login.inputUserName" maxlength="11" @input="inputChange" />
				</view>
				<view class="input-item">
					<u-image src="../../static/images/public/code.png"  width="30upx" height="35upx" />
					<input
						placeholder-style="color: #435687"
						v-model="form.password"
						:placeholder="i18n.login.pwdRule"
						placeholder-class="input-empty"
						maxlength="20"
						password
						data-key="password"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<u-image src="../../static/images/public/password.png" width="32upx" height="35upx" />
					<input
						placeholder-style="color: #435687"
						type="mobile"
						v-model="form.password"
						:placeholder="i18n.login.pwdRule"
						placeholder-class="input-empty"
						maxlength="20"
						password
						data-key="password"
						@input="inputChange"
					>
					</input>
				</view>
				<view class="input-item">
					<u-image src="../../static/images/public/password.png" width="32upx" height="35upx" />
					<input
						placeholder-style="color: #435687"
						type="mobile"
						v-model="form.confirmPassword"
						:placeholder="i18n.login.pwdRule"
						placeholder-class="input-empty"
						maxlength="20"
						password
						data-key="password"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<u-image src="../../static/images/public/invite.png" width="36upx" height="36upx" />
					<input
						placeholder-style="color: #435687"
						type="text"
						v-model="form.invitCode"
						:placeholder="i18n.login.inputInvitCode"
						placeholder-class="input-empty"
						maxlength="20"
					/>
				</view>
			</view>
			<view  @click="toRegist" class="confirm-btn">{{ i18n.login.registration }}</view>
			<!-- <button class="confirm-btn" @click="toRegist" :disabled="logining">{{ i18n.login.registration }}</button> -->
		</view>
		<view class="register-section">
			{{ i18n.login.hasAccount }}
			<text @click="navToLogin">{{ i18n.login.logining }}</text>
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
				username: '',
				password: '',
				confirmPassword: '',
				invitCode: '',
				authCode: '1234:abc'
			},
			mobile: '',
			password: '',
			logining: false
		};
	},
	onLoad() {},
	methods: {
		...mapActions('user', ['register']),
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
		toRegist() {
			if (!isMobile(this.form.username)) {
				this.$api.msg(this.i18n.login.mobileError);
				return;
			}
			if (!isPassword(this.form.password)) {
				this.$api.msg(this.i18n.login.pwdError);
				return;
			}
			if (this.form.password != this.form.confirmPassword) {
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
</style>
