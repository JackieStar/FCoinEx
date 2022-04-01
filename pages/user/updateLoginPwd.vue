<template>
	<view class="container">
		<input class="input-item" type="password"  placeholder-style="color: #4F5B87; font-size: 26upx" v-model="form.oldPwd" :placeholder="i18n.updateName.placeholder" maxlength="10" />
		<input class="input-item" type="password"  placeholder-style="color: #4F5B87; font-size: 26upx" v-model="form.newPwd" :placeholder="i18n.updateName.placeholder" maxlength="10" />
		<input class="input-item" type="password"  placeholder-style="color: #4F5B87; font-size: 26upx" v-model="form.vlidNewPwd" :placeholder="i18n.updateName.placeholder" maxlength="10" />
		<view class="input-wrapper">
			<input
				class="input-item"
				placeholder-style="color: #4F5B87; font-size: 26upx"
				v-model="form.code"
				:placeholder="i18n.updateName.placeholder"
				maxlength="10"
				style="padding-right: 150upx;"
				type="text"
			/>
			<view>
				<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
				<view @tap="getCode" class="code-btn">{{tips}}</view>
			</view>
		</view>
		<view @click="handleSubmit" class="confirm-btn">{{ i18n.updateName.btn }}</view>
		<image src="../../static/images/public/update-pwd.png" class="bg"></image>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isPassword } from '../../utils/validate';
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	mixins: [commonMixin],
	data() {
		return {
			loading: false,
			seconds: 60,
			tips: '',
			authCode: {
				captchaCode: undefined,
				token: undefined
			},
			form: {
				oldPwd: undefined,
				newPwd: undefined,
				vlidNewPwd: undefined,
				code: undefined
			}
		};
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.common.update
		});
	},
	methods: {
		...mapActions('common', ['sendSms']),
		...mapActions('user', ['updatePwd']),
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
					type: this.$g.CAPTCHA_TYPE.COMMON,
					number: this.loginInfo.mobile,
					countryCode: this.loginInfo.countryCode
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
		end() {},
		start() {},
		submit() {
			if (!this.authCode.captchaCode) {
				this.$api.msg(this.i18n.toast.inputCode);
				return;
			}
			if (!this.form.newPwd) {
				this.$api.msg(this.i18n.toast.inputPwd);
				return;
			}
			if (!isPassword(this.form.newPwd)) {
				this.$api.msg(this.i18n.toast.pwdError);
				return;
			}
			if (!this.form.againPwd) {
				this.$api.msg(this.i18n.toast.inputPwd);
				return;
			}
			if (this.form.againPwd !== this.form.newPwd) {
				this.$api.msg(this.i18n.toast.againPwdError);
				return;
			}
			this.loading = true;
			this.form.authCode = this.authCode.token + ':' + this.authCode.captchaCode;
			console.log(this.form);
			this.updatePwd(this.form)
				.then(res => {
					this.$api.msg(this.i18n.toast.updatePwdSuccess, 1000, false, 'none', function() {
						setTimeout(function() {
							this.logining = false;
							uni.navigateBack({});
						}, 1000);
					});
				})
				.catch(error => {
					this.loading = false;
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 70upx;
	.bg {
		position: absolute;
		bottom: 40upx;
		right: 0;
		width: 350upx;
		height: 412upx;
	}
}
.input-item {
	border: 2upx solid #232e55;
	border-radius: 4upx;
	margin: 31upx auto 0 auto;
	width: 690upx;
	height: 88upx;
	padding: 0 32upx;
	color: #fff;
}
.input-wrapper {
	.num {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #4f5b87;
		float: right;
		margin-top: -94upx;
		margin-right: 46upx;
	}
}
.confirm-btn {
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
	font-size: 26upx;
}
.code-btn {
	float: right;
	margin-top: -60upx;
	margin-right: 50upx;
	color: #4F5B87;
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 400;
	background: linear-gradient(0deg, #3FBBFE 0%, #A541FF 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
