<template>
	<view class="container">
		<input
			class="input-item"
			type="text"
			placeholder-style="color: #4F5B87; font-size: 26upx"
			v-model="form.email"
			:placeholder="i18n.updatePwd.email"
		/>
		<input
			class="input-item"
			type="password"
			placeholder-style="color: #4F5B87; font-size: 26upx"
			v-model="form.password"
			:placeholder="i18n.updatePwd.newPwd"
			maxlength="10"
		/>
		<input
			class="input-item"
			type="password"
			placeholder-style="color: #4F5B87; font-size: 26upx"
			v-model="form.password_confirm"
			:placeholder="i18n.updatePwd.newPwdAgain"
			maxlength="10"
		/>
		<view class="input-wrapper">
			<input
				class="input-item"
				placeholder-style="color: #4F5B87; font-size: 26upx"
				v-model="form.email_code"
				:placeholder="i18n.updatePwd.emailCode"
				maxlength="10"
				style="padding-right: 150upx;"
				type="text"
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
				<view @tap="getCode" class="code-btn">{{ tips }}</view>
			</view>
		</view>
		<view @click="handleSubmit" class="confirm-btn">{{ i18n.updatePwd.btn }}</view>
		<image src="../../static/images/public/update-pwd.png" class="bg"></image>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	mixins: [commonMixin],
	data() {
		return {
			loading: false,
			seconds: 60,
			tips: '',
			form: {
				email: undefined,
				password: undefined,
				password_confirm: undefined,
				email_code: undefined
			}
		};
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.updatePwd.title1
		});
	},
	methods: {
		...mapActions('common', ['sendSms']),
		...mapActions('user', ['resetPwd']),
		codeChange(text) {
			console.log('text', text);
			this.tips = text;
		},
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				uni.showLoading({
					title: this.i18n.toast.coding
				});
				let data = {
					usage: 'forgetPwd',
					email: this.form.email
				};
				this.sendSms(data)
					.then(res => {
						uni.hideLoading();
						this.$u.toast(this.i18n.toast.codeSend);
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					})
					.catch(error => {});
			}
		},
		handleSubmit() {
			// if (!this.form.old_password) {
			// 	this.$api.msg(this.i18n.toast.inputPwd);
			// 	return;
			// }
			// if (!this.form.againPwd) {
			// 	this.$api.msg(this.i18n.toast.inputPwd);
			// 	return;
			// }
			// if (this.form.againPwd !== this.form.newPwd) {
			// 	this.$api.msg(this.i18n.toast.againPwdError);
			// 	return;
			// }
			this.loading = true;
			console.log(this.form);
			this.resetPwd(this.form)
				.then(res => {
					this.$api.msg(this.i18n.toast.updatePwdSuccess, 1000, false, 'none', function() {
						setTimeout(function() {
							this.loading = false;
							uni.reLaunch({
								url: '/pages/public/login'
							});
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
	// background: url(../../static/images/public/login-btn.png);
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
	color: #4f5b87;
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 400;
	background: linear-gradient(0deg, #3fbbfe 0%, #a541ff 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
