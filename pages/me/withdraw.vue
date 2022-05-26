<template>
	<view class="container">
		<u-navbar :title="i18n.withdraw.title">
			<view class="slot-wrap"><view class="nav-btn" @click="openPage('list')"></view></view>
		</u-navbar>
		<view class="coin-wrapper" v-if="accountInfo" @click="openPage('add')">
			<u-image style="flex-shrink: 0;" :src="accountInfo.icon" width="76rpx" height="76rpx" />
			<view class="account-info">
				<view class="account-txt">
					<view style="flex-shrink: 0;">地址：</view>
					<text class="account-addr">{{accountInfo.wallet_addr}}</text></view>
				<view class="account-txt">网络：<text style="color:#666666">{{accountInfo.coin_type}}</text></view>
				<view class="account-txt">
					<view style="flex-shrink: 0;">备注：</view>
					<text class="remark">{{accountInfo.remark || '无'}}</text></view>
			</view>
			<u-icon name="arrow-right" color="#333" size="24" />
		</view>
		<view class="coin-wrapper" v-if="!accountInfo" @click="openPage('add')">
			<view class="no-account">您还未添加收款账号, <text style="color:#0072FF">去添加</text></view>
			<u-icon name="arrow-right" color="#333" size="24" />
		</view>
		
		<view class="money-wrapper">
			<view class="money-item">
				<view class="money-title">{{ i18n.withdraw.balance }}</view>
				<view style="color: #FF2929">${{userData.balance}}</view>
			</view>
			<view class="money-item">
				<view class="money-title">提现金额</view>
				<view class="money-input-wrapper">
					<input type="number" @input="inputChange" v-model="amount" placeholder-style="color: #9F9F9F; font-size: 24rpx" placeholder="请输入" class="input-money">
					<view style="color: #0072FF" @click="handleAll">全部</view>
				</view>
			</view>
			<view class="money-item">
				<view class="money-title">最小提现金额</view>
				<view style="color: #666666">${{withdrawInfo.withdraw_min_amount}}</view>
			</view>
			<view class="money-item">
				<view class="money-title">{{ i18n.withdraw.fee }}</view>
				<view style="color: #666666">${{withdraw_fee || withdrawInfo.withdraw_min_fee}}</view>
			</view>
			
		</view>
		<view class="btn-wrapper">
			<view class="confirm-btn" @click="openModal">{{ i18n.withdraw.btn }}</view>
			<view class="tips">提现手续费由用户自行承担</view>
		</view>
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
			accountInfo: {},
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
			let accountInfo = uni.getStorageSync('accountInfo')
			this.accountInfo = accountInfo
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
			if (type === 'list') {
				uni.navigateTo({
					url: '/pages/wallet/withdraw'
				});
			}
			
			if (type === 'add')
				uni.navigateTo({
					url: '/pages/me/account'
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
.slot-wrap {
	width: 100%;
	display: flex;
	flex-direction: row-reverse;
}
.nav-btn {
	width: 37rpx;
	height: 42rpx;
	margin-right: 44rpx;
	background: url(../../static/images/me/list.png);
	background-size: 100% 100%;
}
.container {
	.coin-wrapper {
		width: 697rpx;
		height: 194rpx;
		background: #FFFFFF;
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
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
		}
		.remark {
			width: 300rpx;
			color: #666666;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
		}
	}
	.money-wrapper {
		width: 697rpx;
		height: 439rpx;
		background: #FFFFFF;
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
			border-bottom: 1rpx solid #E3E3E3;
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
				background: #F5F5F5;
				border: 1rpx solid #D8D8D8;
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
			background: #0079FF;
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
