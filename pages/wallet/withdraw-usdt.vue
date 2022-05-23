<template>
	<view class="container">
		<view class="user-info">
			<image :src="withdrawInfo.coin_icon" class="user-avatar" />
			<view class="info">
				<text>{{ withdrawInfo.coin }}</text>
				<view>{{ i18n.withdraw.network }}：{{ withdrawInfo.coin_type }}</view>
			</view>
		</view>
		<image class="user-bg" src="../../static/images/wallet/bg.png" />
		<view class="title">
			<text>{{ i18n.withdraw.withdrawwAddr }}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-bg.png" width="74upx" height="12upx" mode="" />
		</view>
		<view class="input-wrapper">
			<input type="text" placeholder-style="color: #818FA; font-size: 26upx" :placeholder="i18n.withdraw.inputAddr" v-model="withdraw_addr" class="address-input" />
			<view class="copy-btn" @click="handlePaste">{{ i18n.withdraw.copyBtn }}</view>
		</view>
		<view class="title">
			<text>{{ i18n.withdraw.money }}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-bg.png" width="74upx" height="12upx" mode="" />
		</view>
		<view class="money-wrapper">
			<input type="number" v-model="amount" @input="inputChange" placeholder-style="color: #818FAB; font-size: 26upx" class="money-input" placeholder="0.00" />
			<view class="all-btn" @click="handleAll">{{ i18n.withdraw.all }}</view>
			<text>USTD</text>
		</view>
		<view class="tips-wrapper">
			<text>{{ i18n.withdraw.balance }}：{{ userData.balance }}</text>
			<text style="color:#fff">{{ i18n.withdraw.fee }}：{{ withdraw_fee || withdrawInfo.withdraw_min_fee }}</text>
		</view>
		<view><c-tips v-for="(item, index) in withdrawInfo.tips" :text="item" :key="index" /></view>
		<view class="confirm-btn" @click="openModal">{{ i18n.withdraw.btn }}</view>
		<u-popup v-model="showModal" mode="bottom" class="password-modal" :border-radius="20" height="565upx">
			<view class="title" style="margin-top: 40upx;">
				<text>{{ i18n.withdraw.safe }}</text>
				<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" />
			</view>
			<view class="modal-line-title">{{ i18n.withdraw.emailCode }}</view>
			<view class="modal-input-wrapper">
				<input
					class="input-item"
					placeholder-style="color: #818FA; font-size: 26upx"
					v-model="form.email_code"
					:placeholder="i18n.withdraw.placeholder"
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
			<view class="modal-line-title">{{ i18n.withdraw.loginPwd }}</view>
			<view class="modal-input-wrapper">
				<input
					class="input-item"
					placeholder-style="color: #818FA; font-size: 26upx"
					v-model="form.password"
					:placeholder="i18n.withdraw.placeholder1"
					maxlength="10"
					type="password"
				/>
			</view>
			<view class="submit-btn" @click="handleSubmit">{{ i18n.withdraw.submitBtn }}</view>
		</u-popup>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { uniIcons } from '@dcloudio/uni-ui';
import { commonMixin } from '@/common/mixin/mixin.js';
// 函数防抖 (只执行最后一次点击)
const debounce = (fn, t) => {
	let delay = t || 500;
	let timer;
	return function() {
		let args = arguments;
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			timer = null;
			fn.apply(this, args);
		}, delay);
	};
};
export default {
	components: { uniIcons },
	mixins: [commonMixin],
	data() {
		this.inputChange = debounce(this.inputChange, 800);
		return {
			withdrawInfo: {},
			userData: {},
			coin_type: null, // 网络
			amount: null, // 提现金额
			withdraw_addr: null, // 提现地址
			showModal: false,
			seconds: 60,
			tips: '',
			form: {
				email_code: null,
				password: null
			},
			withdraw_fee: null // 提现手续费，计算
		};
	},

	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.withdraw.title
		});
		this.loadData();
		this.getUserInfo();
	},
	methods: {
		...mapActions('common', ['sendSms']),
		...mapActions('wallet', ['getFinaceInfo', 'withdraw', 'withdrawFee']),
		...mapActions('user', ['userInfo']),
		//请求数据
		async loadData() {
			this.getFinaceInfo({ config: 'withdraw' }).then(res => {
				this.withdrawInfo = res.data;
			});
		},
		// 获取用户信息
		getUserInfo() {
			this.userInfo().then(res => {
				this.userData = res.data;
			});
		},
		// 全部
		handleAll() {
			this.amount = this.userData.balance;
		},
		// 交易密码弹窗
		openModal() {
			if (!this.withdraw_addr) {
				this.$api.msg(this.i18n.withdraw.noWithdrawAddr);
				return;
			}
			if (!this.amount) {
				this.$api.msg(this.i18n.withdraw.noAmount);
				return;
			}
			this.form = {
				email_code: null,
				password: null
			};
			this.showModal = true;
		},
		handleSubmit() {
			if (!this.form.email_code) {
				this.$api.msg(this.i18n.withdraw.noEmailCode);
				return;
			}
			if (!this.form.password) {
				this.$api.msg(this.i18n.withdraw.noPwd);
				return;
			}
			let params = {
				coin_type: this.withdrawInfo.coin_type,
				withdraw_addr: this.withdraw_addr,
				amount: this.amount,
				...this.form
			};
			this.withdraw(params).then(res => {
				this.$api.msg(this.i18n.withdraw.withdrawSuccess);
				this.showModal = false;
			});
		},
		codeChange(text) {
			this.tips = text;
		},
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				uni.showLoading({
					title: this.i18n.toast.coding
				});
				let data = {
					usage: 'withdraw',
					email: this.loginInfo.email
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
		// 粘贴
		handlePaste() {
			uni.getClipboardData({
				success: res => {
					this.withdraw_addr = res.data;
					console.log(res.data);
				}
			});
		},
		openPage(type) {
			if (type === 0) uni.navigateBack();
			if (type === 1)
				uni.navigateTo({
					url: '/pages/wallet/record'
				});
		},
		inputChange(e) {
			console.log('e', e.detail.value);

			this.withdrawFee({ amount: e.detail.value }).then(res => {
				this.withdraw_fee = res.data.fee;
				console.log('e2222', this.withdraw_fee);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.user-info {
		width: 100%;
		display: flex;
		margin-top: 60upx;
		padding-left: 50upx;
		.user-avatar {
			width: 112upx;
			height: 112upx;
			margin-right: 38upx;
		}
		.info {
			display: flex;
			flex-direction: column;
			text {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ffffff;
				margin-top: 14upx;
			}
			view {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #85a0b2;
				margin-top: 5upx;
			}
		}
	}
	.user-bg {
		width: 750upx;
		height: 171upx;
		margin-top: -50upx;
	}
	.title {
		width: 100%;
		height: 28upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
		padding: 0 26upx;
		display: flex;
		flex-direction: column;
		text {
			margin-left: 6upx;
			z-index: 10;
		}
		.title-bg {
			margin-top: -30upx;
		}
	}
	.input-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 29upx;
		margin: 40upx 0;
		.address-input {
			width: 511upx;
			height: 76upx;
			border: 2upx solid #554472;
			border-radius: 4upx;
			color: #fff;
			padding-left: 24upx;
		}
		.copy-btn {
			width: 153upx;
			height: 76upx;
			line-height: 76upx;
			// background: url(../../static/images/public/short-btn.png);
			background-size: 100% 100%;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26upx;
		}
	}
	.money-wrapper {
		width: 100%;
		padding: 0 29upx;
		margin-top: 40upx;
		.money-input {
			width: 690upx;
			height: 76upx;
			border: 2upx solid #554472;
			border-radius: 4upx;
			padding: 0 20upx;
			padding-right: 300upx;
			color: #fff;
		}
		text {
			margin-right: 190upx;
			float: right;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #63798f;
			opacity: 0.6;
			margin-top: -58upx;
		}
		.all-btn {
			width: 160upx;
			height: 60upx;
			line-height: 60upx;
			border-left: 2upx solid #554472;
			text-align: center;
			margin-right: 5upx;
			float: right;
			font-size: 32upx;
			font-family: PingFang SC;
			margin-top: -68upx;
			font-weight: 400;
			color: #ffffff;
			background: linear-gradient(0deg, #3fbbfe 0%, #a541ff 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}
	.tips-wrapper {
		width: 100%;
		padding: 0 32upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #818fab;
		margin-top: 31upx;
		margin-bottom: 120upx;
	}
	.confirm-btn {
		width: 610upx;
		height: 76upx;
		line-height: 76upx;
		margin: 50upx auto;
		// background: url(../../static/images/public/login-btn.png);
		background-size: 100% 100%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
	}
	.password-modal {
		width: 694upx;
		margin: 0 auto;
		border-radius: 20upx;
		margin-bottom: 60upx;
		::v-deep .u-drawer-bottom {
			background-color: #262c4a;
		}
	}
	.modal-line-title {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #ffffff;
		padding-left: 30upx;
		margin-top: 40upx;
		margin-bottom: 20upx;
	}
	.modal-input-wrapper {
		width: 638upx;
		height: 74upx;
		// background: url(../../static/images/public/login-btn.png);
		background-size: 100% 100%;
		margin-left: 30upx;

		.input-item {
			width: 440upx;
			height: 76upx;
			padding: 0 32upx;
			color: #fff;
		}
		.code-btn {
			float: right;
			margin-top: -56upx;
			margin-right: 50upx;
			border-left: 1upx solid #dadada;
			padding-left: 20upx;
			color: #4f5b87;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 400;
			background: linear-gradient(0deg, #3fbbfe 0%, #a541ff 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}
	.submit-btn {
		width: 638upx;
		height: 80upx;
		line-height: 80upx;
		margin: 46upx auto;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		background: linear-gradient(90deg, #3fbbfe, #a541ff);
		border-radius: 4upx;
	}
}
</style>
