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
			<text>{{i18n.withdraw.withdrawAccount}}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="142upx" height="12upx" mode="" />
		</view>
		<view class="input-wrapper">
			<view style="color:#fff">{{i18n.withdraw.userName}}：</view>
			<input type="text" placeholder-style="color: #818FA; font-size: 26upx" :placeholder="i18n.withdraw.userName" v-model="formPix.pix_name" class="address-input" />
		</view>
		<view class="input-wrapper">
			<view style="color:#fff">{{i18n.withdraw.pixType}}：</view>
			<view v-if="!formPix.pix_type" @click="showLang = true" class="address-input" style="color: #999" >{{i18n.withdraw.pixType}}</view>
			<view v-else class="address-input" @click="showLang = true">{{formPix.pix_type}}</view>
		</view>
		<view class="input-wrapper">
			<view style="color:#fff">{{i18n.withdraw.account}}：</view>
			<input type="text" placeholder-style="color: #818FA; font-size: 26upx" :placeholder="i18n.withdraw.account" v-model="formPix.pix_account" class="address-input" />
		</view>
		<view class="title">
			<text>{{i18n.withdraw.withDrawAmount}}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="142upx" height="12upx" mode="" />
		</view>
		<text class="r-usdt">1USDT ≈ {{ withdrawInfo.usdt_pix_rate }}R$</text>
		<view class="all-btn" @click="handleAll">{{ i18n.withdraw.all }}</view>
		<view class="money-wrapper flex_between_box">
			<view class="flex_center_box">
				<input type="number" @input="inputChange" v-model="amount" class="money-input" placeholder-style="color: #454D73;font-size: 26upx;" :placeholder="i18n.withdraw.withDrawAmount" />
				<text style="color: #fff; margin-left: 10upx;">USDT</text>
			</view>
			<view class="input-money">≈</view>
			<view class="flex_center_box">
				<view class="input-money">{{ inputMoney }}</view>
				<text style="color: #fff; margin-left: 10upx;">R$</text>
			</view>
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
		<u-action-sheet :cancel-text="i18n.common.cancel" :border-radius="20" :list="langList" @click="clickLang" v-model="showLang"></u-action-sheet>
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
			formPix: {
				pix_name: null,
				pix_type: null,
				pix_account: null
			},
			withdraw_fee: null, // 提现手续费，计算
			inputMoney: 0,
			langList: [],
			showLang: false,
			pixType: ''
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
			this.getFinaceInfo({ config: 'withdraw', type: 'PIX' }).then(res => {
				this.withdrawInfo = res.data;
				this.langList = res.data.pix_account_types.map((v, i)=> {
					return {
						text: v,
						lang: i
					}
				})
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
			this.inputMoney = (Number(this.userData.balance) * Number(this.withdrawInfo.usdt_pix_rate)).toFixed(2)
		},
		// 交易密码弹窗
		openModal() {
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
				type: this.withdrawInfo.coin_type,
				type: 'PIX',
				amount: this.amount,
				...this.form,
				...this.formPix
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
		openPage(type) {
			if (type === 0) uni.navigateBack();
			if (type === 1)
				uni.navigateTo({
					url: '/pages/wallet/record'
				});
		},
		inputChange(e) {
			console.log('e', e.detail.value);
			this.inputMoney = (Number(e.detail.value) * Number(this.withdrawInfo.usdt_pix_rate)).toFixed(2)
			this.withdrawFee({ amount: e.detail.value }).then(res => {
				this.withdraw_fee = res.data.fee;
				console.log('e2222', this.withdraw_fee);
			});
		},
		clickLang(e) {
			console.log('e', e)
			this.formPix.pix_type = this.langList[e].text
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.r-usdt {
		position: absolute;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #fff;
		margin-left: 29upx;
		margin-top: 30upx;
	}
	.user-info {
		width: 100%;
		display: flex;
		margin-top: 20upx;
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
		width: 70%;
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
			line-height: 76upx;
			font-size: 26upx
		}
		.copy-btn {
			width: 153upx;
			height: 76upx;
			line-height: 76upx;
			background: url(../../static/images/public/short-btn.png);
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
		padding: 0 50upx;
		margin: 90upx 0;
		.money-input {
			width: 280upx;
			padding: 0 30upx;
			height: 90upx;
			border: 2upx solid #554472;
			border-radius: 4upx;
			color: #fff;
			font-size: 50upx;
			font-weight: 600;
		}

		.input-money {
			font-size: 50upx;
			font-weight: 600;
			color: #fff;
		}
	}

	.all-btn {
		width: 160upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		margin-right: 5upx;
		float: right;
		font-size: 32upx;
		font-family: PingFang SC;
		margin-top: -30upx;
		font-weight: 400;
		color: #ffffff;
		background: linear-gradient(0deg, #3fbbfe 0%, #a541ff 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		z-index: 1000;
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
		background: url(../../static/images/public/login-btn.png);
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
		background: url(../../static/images/public/login-btn.png);
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
