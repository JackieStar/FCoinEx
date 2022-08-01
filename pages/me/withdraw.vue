<template>
	<view class="container">
		<u-navbar :title="i18n.withdraw.title">
			<view class="slot-wrap"><view class="nav-btn" @click="openPage('list')"></view></view>
		</u-navbar>
		<view class="coin-wrapper" v-if="accountInfo" @click="openPage('add')">
			<u-image style="flex-shrink: 0;" :src="accountInfo.icon" width="78rpx" height="78rpx" />
			<view class="account-info">
				<view class="account-txt">
					<view style="flex-shrink: 0;">{{i18n.withdraw.withdrawwAddr}}：</view>
					<text class="account-addr">{{ accountInfo.wallet_addr }}</text>
				</view>
				<view class="account-txt">
					{{i18n.withdraw.network}}：
					<text style="color:#666666">{{ accountInfo.coin_type }}</text>
				</view>
				<view class="account-txt">
					<view style="flex-shrink: 0;">{{i18n.common.desc}}：</view>
					<text class="remark">{{ accountInfo.remark || i18n.common.no }}</text>
				</view>
			</view>
			<u-icon name="arrow-right" color="#333" size="24" />
		</view>
		<view class="coin-wrapper" v-if="!accountInfo" @click="openPage('add')">
			<view class="no-account">
				{{i18n.withdraw.noAddAccount}},
				<text style="color:#0072FF">{{i18n.withdraw.toAdd}}</text>
			</view>
			<u-icon name="arrow-right" color="#333" size="24" />
		</view>

		<view class="money-wrapper">
			<view class="money-item">
				<view class="money-title">{{ i18n.withdraw.balance }}</view>
				<view style="color: #FF2929">${{ userData.balance }}</view>
			</view>
			<view class="money-item">
				<view class="money-title">{{i18n.withdraw.title}}{{i18n.withdraw.money}}</view>
				<view class="money-input-wrapper">
					<input type="number" @input="inputChange" v-model="amount" placeholder-style="color: #9F9F9F; font-size: 24rpx" :placeholder="i18n.withdraw.withDrawAmount" class="input-money" />
					<view style="color: #0072FF" @click="handleAll">{{i18n.withdraw.all}}</view>
				</view>
			</view>
			<view class="money-item">
				<view class="money-title">{{i18n.withdraw.minWithdrawMoney}}</view>
				<view style="color: #666666">${{ withdrawInfo.withdraw_min_amount }}</view>
			</view>
			<view class="money-item" style="border-bottom: none">
				<view class="money-title">{{ i18n.withdraw.fee }}</view>
				<view style="color: #666666">${{ withdraw_fee || '0'}}</view>
			</view>
		</view>
		<view class="btn-wrapper">
			<view class="confirm-btn" @click="openModal">{{ i18n.withdraw.btn }}</view>
			<view class="tips">{{i18n.withdraw.tips1}}</view>
		</view>
		<u-popup v-model="show" mode="center" :mask-close-able="false">
			<view class="coupon-1-wrapper">
				<view class="top-img"></view>
				<view class="rz-wrapper">
					<view class="coupon-title">{{i18n.withdraw.warning}}</view>
					<view class="coupon-tips">{{i18n.withdraw.tips2}}</view>
					<view class="btn-wrapper">
						<view class="cancel" @click="openPage('close')">{{i18n.common.cancel}}</view>
						<view class="confirm" @click="openPage('auth')">{{i18n.withdraw.toAuth}}</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="showSure" mode="center" border-radius="20" closeable>
			<view class="coupon-wrapper">
				<view class="coupon-title">{{i18n.withdraw.warning2}}</view>
				<view class="coupon-txt-wrapper">
					<view class="coupon-txt">
						{{i18n.withdraw.network}}：
						<text style="color:#666666">{{accountInfo.coin_type }}</text>
					</view>
					<view class="coupon-txt">
						{{i18n.withdraw.withdrawwAddr}}：
						<text style="color:#666666">{{accountInfo.wallet_addr }}</text>
					</view>
					<view class="coupon-txt">
						{{i18n.withdraw.money}}：
						<text style="color:#666666">{{ amount }}$</text>
					</view>
					<view class="coupon-txt">
						<view>{{i18n.recharge.getAmount}}：</view>
						<text class="get-amount" style="color:#FF2929">{{ target_amount }}{{accountInfo.symbol}}<text v-if="userData.currency && userData.currency.currency !=='USD'" style="font-size: 24rpx;">≈{{userData.currency.currency}}-{{userData.currency.symbol}}{{(Number(target_amount) * Number(userData.currency.rate)).toFixed(2)}}</text></text>
					</view>
				</view>
				
				<view class="coupon-btn" @click="handleConfirm">{{i18n.withdraw.submitBtn}}</view>
			</view>
		</u-popup>
		<u-popup v-model="showModal" mode="bottom" class="password-modal" closeable :border-radius="20" height="460rpx">
			<view class="modal-title">{{i18n.withdraw.safe}}</view>
			<!-- <view class="modal-line-title">{{ i18n.withdraw.emailCode }}</view> -->
			<!-- <view class="modal-input-wrapper">
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
			</view> -->
			<view class="modal-line-title">{{ i18n.register.cashPassword }}</view>
			<view class="modal-input-wrapper">
				<input
					class="input-item"
					placeholder-style="color: #818FA; font-size: 26upx"
					v-model="form.password"
					:placeholder="i18n.register.cashPasswordPhSix"
					type="password"
				/>
			</view>
			<view class="submit-btn" @click="handleSubmit">{{ i18n.updatePwd.btn }}</view>
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
			accountInfo: {},
			withdrawInfo: {},
			userData: {},
			coin_type: null, // 网络
			amount: null, // 提现金额
			withdraw_addr: null, // 提现地址
			showModal: false,
			show: false,
			showSure: false,
			seconds: 60,
			tips: '',
			form: {
				email_code: null,
				password: null
			},
			target_amount: null, // 转换后的金额
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
		...mapActions('common', ['sendSms', 'exchange']),
		...mapActions('wallet', ['getFinaceInfo', 'withdraw', 'withdrawFee']),
		...mapActions('user', ['userInfo']),
		//请求数据
		async loadData() {
			let userId = uni.getStorageSync('userInfo').id
			let accountInfo = uni.getStorageSync(`accountInfo-${userId}`);
			this.accountInfo = accountInfo;
			this.getFinaceInfo({ config: 'withdraw' }).then(res => {
				this.withdrawInfo = res.data;
			});
		},
		// 获取用户信息
		getUserInfo() {
			this.userInfo().then(res => {
				this.userData = res.data;
				if (this.userData.certification_status != 1) {
					this.show = true;
					return;
				}
			});
		},
		getExchange(item) {
			let params = {
				coin_type: 'USD',
				amount: this.amount,
				target_coin_type: this.accountInfo.coin_type
			}
			this.exchange(params).then(res => {
				console.log('res', res)
				this.target_amount = res.data.target_amount
				this.showSure = true;
			})
		},
		// 全部
		handleAll() {
			this.amount = this.userData.balance;
			const params = {
				coin_type: this.accountInfo.coin_type,
				amount: this.userData.balance
			}
			this.withdrawFee(params).then(res => {
				this.withdraw_fee = res.data.fee;
				console.log('e2222', this.withdraw_fee);
			});
		},
		// 交易密码弹窗
		openModal() {
			// if (!this.withdraw_addr) {
			// 	this.$api.msg(this.i18n.withdraw.noWithdrawAddr);
			// 	return;
			// }
			if (!this.accountInfo) {
				this.$api.msg(this.i18n.withdraw.noAddAccount);
				return
			}
			if (!this.amount) {
				this.$api.msg(this.i18n.withdraw.noAmount);
				return;
			}
			this.form = {
				email_code: null,
				password: null
			};
			if (Number(this.amount) < Number(this.withdrawInfo.withdraw_min_amount)) {
				// this.$api.msg(this.i18n.withdraw.noAmount);
				return;
			}
			if (Number(this.userData.balance) < Number(this.amount)) {
				this.$api.msg(this.i18n.withdraw.balance + ' ' + this.userData.balance + '$');
				return;
			}
			this.getExchange()
		},
		handleSubmit() {
			// if (!this.form.email_code) {
			// 	this.$api.msg(this.i18n.withdraw.noEmailCode);
			// 	return;
			// }
			if (!this.form.password) {
				this.$api.msg(this.i18n.withdraw.noPwd);
				return;
			}
			let params = {
				addr_id: this.accountInfo.id,
				amount: this.amount,
				...this.form
			};
			this.withdraw(params).then(res => {
				this.$api.msg(this.i18n.withdraw.withdrawSuccess);
				this.showModal = false;
				uni.redirectTo({
					url: '/pages/wallet/withdraw'
				})
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
			if (type === 'list') {
				uni.navigateTo({
					url: '/pages/wallet/withdraw'
				});
			}
			if (type === 'auth') {
				uni.navigateTo({
					url: '/pages/me/authentication'
				});
			}
			if (type === 'add') {
				uni.navigateTo({
					url: '/pages/me/account'
				});
			}
			if (type === 'close') {
				uni.switchTab({
					url: '/pages/me/me'
				})
			}
		},
		handleConfirm() {
			this.showSure = false
			this.showModal = true
		},
		inputChange(e) {
			console.log('e', e.detail.value);
			const params = {
				coin_type: this.accountInfo.coin_type,
				amount: e.detail.value
			}
			this.withdrawFee(params).then(res => {
				this.withdraw_fee = res.data.fee;
				console.log('e2222', this.withdraw_fee);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.slot-wrap {
	width: 100%;
	display: flex;
	flex-direction: row-reverse;
}
.nav-btn {
	width: 37rpx;
	height: 42rpx;
	margin-right: 44rpx;
	background: url(/static/images/me/list.png);
	background-size: 100% 100%;
}
/deep/ .u-mode-center-box {
	background: none !important;
}
.container {
	.coin-wrapper {
		width: 697rpx;
		height: 194rpx;
		background: #ffffff;
		border-radius: 10rpx;
		margin: 60rpx auto 20rpx auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 37rpx;
		.no-account {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #212121;
		}
	}
	.account-info {
		width: 480rpx;
		margin-left: 42rpx;
		display: flex;
		flex-direction: column;
		.account-txt {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
			display: flex;
			flex-shrink: 0;
			margin-top: 10rpx;
		}
		.account-addr {
			width: 400rpx;
			color: #666666;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.remark {
			width: 300rpx;
			color: #666666;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	.money-wrapper {
		width: 697rpx;
		height: 439rpx;
		background: #ffffff;
		border-radius: 10rpx;
		margin: 20rpx auto;
		.money-item {
			width: 100%;
			height: 110rpx;
			padding: 0 34rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #e3e3e3;
			.money-title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
			}
			.money-input-wrapper {
				display: flex;
				align-items: center;
			}
			.input-money {
				width: 236rpx;
				height: 62rpx;
				background: #f5f5f5;
				border: 1rpx solid #d8d8d8;
				border-radius: 6rpx;
				padding: 0 20rpx;
				margin-right: 20rpx;
			}
		}
	}
	.btn-wrapper {
		width: 100%;
		position: absolute;
		bottom: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.confirm-btn {
			width: 590rpx;
			height: 76rpx;
			background: #0079ff;
			border-radius: 38rpx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26upx;
		}
		.tips {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
			margin-top: 50rpx;
		}
	}
	.coupon-1-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		.top-img {
			width: 116rpx;
			height: 116rpx;
			background: url(/static/images/me/coupon_img.png);
			background-size: 100% 100%;
			z-index: 1000;
			margin-bottom: -58rpx;
		}
		.rz-wrapper {
			width: 629rpx;
			height: 420rpx;
			background: #ffffff;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.coupon-title {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
				margin-top: 80rpx;
			}
			.coupon-tips {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				margin: 20rpx 0;
				padding: 0 40rpx;
			}
			.btn-wrapper {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				padding: 0 40rpx;
				margin-top: 60rpx;
				.cancel {
					width: 260rpx;
					height: 76rpx;
					background: #ffffff;
					border: 2rpx solid #e9e9e9;
					border-radius: 38rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #666666;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					word-wrap: break-word;
				}
				.confirm {
					width: 260rpx;
					height: 76rpx;
					padding: 0 20rpx;
					background: #0079ff;
					border-radius: 38rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					line-height: 24rpx;
					text-align: center;
					color: #fff;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					word-wrap: break-word;
				}
			}
		}
	}
	.coupon-wrapper {
		width: 629rpx;
		height: 636rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.coupon-title {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
			margin-top: 40rpx;
		}
		.coupon-txt-wrapper {
			width: 100%;
			padding: 0 46rpx;
			.coupon-txt {
				width: 100%;
				display: flex;
				color: #212121;
				font-size: 30rpx;
				margin-top: 40rpx;
			}
		}
		.coupon-btn {
			width: 413rpx;
			height: 76rpx;
			background: #0079FF;
			border-radius: 38rpx;
			display: flex;
			align-items: center;	
			justify-content: center;
			color: #fff;
			margin-top: 80rpx;
		}
	}
	.password-modal {
		width: 694upx;
		margin: 0 auto;
		border-radius: 20upx;
		margin-bottom: 30upx;
		::v-deep .u-drawer-bottom {
			background-color: #fff;
		}
	}
	.modal-title {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #212121;
		margin: 60upx 0 20rpx 20rpx;
		padding-left: 10rpx;
		line-height: 30rpx;
		border-left: 8rpx solid #0072FF;
	}
	.modal-line-title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #212121;
		margin-left: 38rpx;
		margin-bottom: 20rpx;
		margin-top: 50rpx;
	}
	.modal-input-wrapper {
		width: 100%;
		height: 74upx;
		display: flex;
		align-items: center;
		padding-left: 24rpx;
		.input-item {
			width: 96%;
			height: 74rpx;
			background: #FFFFFF;
			border: 1rpx solid #E9E9E9;
			border-radius: 10rpx;
			padding: 0 20rpx;
		}
		.code-btn {
			color: #0072FF;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 400;
			margin-left: 20rpx;
		}
	}
	.submit-btn {
		width: 590rpx;
		height: 76rpx;
		background: #0079FF;
		border-radius: 38rpx;
		margin: 46upx auto;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
	}
	.get-amount {
		// width: 300rpx;
		display: inline-block;
		// white-space:nowrap;
	}
}
</style>
