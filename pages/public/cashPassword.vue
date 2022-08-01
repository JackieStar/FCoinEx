<template>
	<view class="container">
		<input
			class="input-item"
			password 
			type="number"
			placeholder-style="color: #4F5B87; font-size: 26upx"
			v-model="form.old_password"
			:placeholder="`${i18n.updatePwd.oldPwd}${i18n.register.six}`"
			maxlength="6"
		/>
		<input
			class="input-item"
			password
			type="number"
			placeholder-style="color: #4F5B87; font-size: 26upx"
			v-model="form.password"
			:placeholder="`${i18n.updatePwd.newPwd}${i18n.register.six}`"
			maxlength="6"
		/>
		<input
			class="input-item"
			type="number"
			password
			placeholder-style="color: #4F5B87; font-size: 26upx"
			v-model="form.password_confirm"
			:placeholder="`${i18n.updatePwd.newPwdAgain}${i18n.register.six}`"
			maxlength="6"
		/>
		<view @click="handleSubmit" class="confirm-btn">{{ i18n.updatePwd.btn }}</view>
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
				old_password: undefined,
				password: undefined,
				password_confirm: undefined
			}
		};
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.register.cashPassword
		});
	},
	methods: {
		...mapActions('user', ['updateCashPwd']),
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
			this.updateCashPwd(this.form)
				.then(res => {
					console.log('res', res)
					this.$api.msg('success', 1000, false, 'none', function() {
						this.loading = false;
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
