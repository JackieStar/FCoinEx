<template>
	<view class="container">
		<input
			class="input-item"
			type="text"
			placeholder-style="color: #4F5B87; font-size: 26upx"
			v-model="form.email"
			:placeholder="i18n.updatePwd.email"
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
				email_code: undefined
			}
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.updatePwd.title1
		});
	},
	methods: {
		...mapActions('common', ['sendSms']),
		...mapActions('user', ['updateEmail']),
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
					usage: 'changeEmail',
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
			this.loading = true;
			this.updateEmail(this.form)
				.then(res => {
					this.$api.msg(this.i18n.toast.updatePwdSuccess, 1000, false, 'none', function() {
						setTimeout(function() {
							this.loading = false;
							uni.reLaunch({
								url: '/pages/me/userInfo'
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
	width: 100%;
	height: 100%;
	background-color: #fff;
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
	background: #FFFFFF;
	border: 1rpx solid #E9E9E9;
	border-radius: 10rpx;
	margin: 31upx auto 0 auto;
	width: 690upx;
	height: 88upx;
	padding: 0 32upx;
	color: #333;
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
	margin: 120upx auto;
	background: #0072FF;
	color: #fff;
	border-radius: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26upx;
}
.code-btn {
	float: right;
	margin-top: -60upx;
	margin-right: 50upx;
	color: #0072FF;
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 400;
}
</style>
