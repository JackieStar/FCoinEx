<template>
	<view class="container">
		<view class="market-header">
			<u-icon class="arrow-left" @click="openPage(0)" name="arrow-left" color="#ffffff" size="44" />
			<view class="market-text">充值</view>
			<image @click="openPage(1)" src="../../static/images/wallet/list.png" class="right-icon" />
		</view>
		<view class="user-info">
			<image src="../../static/images/public/header.png" class="user-avatar" />
			<view class="info">
				<text>USID</text>
				<view>网络：USTD_324</view>
			</view>
		</view>
		<image class="user-bg" src="../../static/images/wallet/bg.png" />
		<view class="title">
			<text>地址</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-bg.png" width="74upx" height="12upx" mode="" />
		</view>
		<view class="input-wrapper">
			<input type="text" class="address-input" />
			<view class="copy-btn">粘贴</view>
		</view>
		<view class="title">
			<text>金额</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-bg.png" width="74upx" height="12upx" mode="" />
		</view>
		<view class="money-wrapper">
			<input type="text" class="money-input" />
			<view class="all-btn">all</view>
			<text>USTD</text>
		</view>
		<view class="tips-wrapper">
			<text>当前可用余额：100.00</text>
			<text style="color:#fff">手续费：2USTD</text>
		</view>
		<view>
			<c-tips text="金额：最低金额2USTD" />
			<c-tips text="费用：2美元" />
			<c-tips text="谨防诈骗，不要参与非法活动，比如代理购买、洗钱、非法交易筹款" />
		</view>
		<view class="confirm-btn">确定</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import uniValidPopup from '@/components/uni-valid-popup.vue';
import { uniIcons } from '@dcloudio/uni-ui';
import { commonMixin, authMixin } from '@/common/mixin/mixin.js';
export default {
	components: { uniIcons, uniValidPopup },
	mixins: [commonMixin, authMixin],
	data() {
		return {
			coin: {},
			account: {},
			coins: [],
			tips: {},
			config: {},
			chain: {},
			isChain: false,
			form: {
				symbol: undefined,
				amount: undefined,
				address: undefined,
				authCode: ''
			}
		};
	},
	onNavigationBarButtonTap(e) {
		this.navTo(`/pages/wallet/detail?coin=${this.coin.symbol}&filterIndex=0`);
	},
	onUnload() {
		uni.$off('selectCoin', this.selectCoin);
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.wallet.withdraw
		});
	},
	onLoad() {
		uni.$on('selectCoin', this.selectCoin);
		this.coinList().then(res => {
			this.coins = res.data;
			this.coin = res.data[0];

			this.loadData();
		});
	},
	methods: {
		...mapActions('common', ['coinList', 'coinTips']),
		...mapActions('account', ['getAccount']),
		...mapActions('user', ['withdraw', 'withdrawConfig']),
		//请求数据
		async loadData() {
			this.coinTips(this.coin.symbol).then(res => {
				this.tips = res.data;
			});
			this.withdrawConfig(this.coin.symbol).then(res => {
				this.config = res.data;
				this.isChain = this.config.chains && this.config.chains.length > 0;
				if (this.isChain) {
					this.chain = this.config.chains[0];
				}

				this.getAccount(this.coin.symbol).then(res => {
					this.account = res.data;
				});
			});
		},
		selectChain(item) {
			this.chain = item;
			this.config.fee = item.withdrawFee;
			this.config.minWithdraw = item.minWithdraw;
			this.form.address = undefined;
			this.form.amount = undefined;
		},
		selectCoin(data) {
			for (let i = 0; i < this.coins.length; i++) {
				let item = this.coins[i];
				if (item.symbol === data.coin.item.name) {
					this.coin = item;
					break;
				}
			}
			this.loadData();
		},
		handleSubmit() {
			this.form.symbol = this.coin.symbol;
			if (!this.form.symbol) {
				this.$api.msg(this.i18n.withdraw.selectCoin);
				return;
			}
			if (!this.form.address) {
				this.$api.msg(this.i18n.withdraw.inputAddr);
				return;
			}
			if (!this.form.amount) {
				this.$api.msg(this.i18n.withdraw.inputAmount);
				return;
			}
			this.$refs.validPopup.open('capitalPasswd');
		},
		ok(data) {
			if (!data.code) {
				this.$api.msg(this.i18n.toast.inputCapthError);
				return;
			}

			this.form.capitalPasswd = data.code;
			uni.showLoading();
			this.form.chain = this.chain.tokenBase ? this.chain.tokenBase : '';
			this.withdraw(this.form)
				.then(res => {
					uni.hideLoading();
					this.$refs.validPopup.close();
					this.$api.msg(this.i18n.toast.withdrawSuccess, 1000, false, 'none', function() {});
				})
				.catch(error => {
					uni.hideLoading();
					this.$refs.validPopup.enable();
				});
		},
		all() {
			this.form.amount = this.account.normalBalance;
		},
		openPage(type) {
			if (type === 0) uni.navigateBack();
			if (type === 1)
				uni.navigateTo({
					url: '/pages/wallet/record'
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 100upx;
	.market-header {
		width: 100%;
		height: 88upx;
		text-align: center;
		left: 0;
		top: 0;
		right: 0;
		background-color: #070219;
		padding: 0 41upx;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.market-text {
			height: 80upx;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
			line-height: 88upx;
		}
		.right-icon {
			width: 35upx;
			height: 40upx;
		}
	}
	.user-info {
		width: 100%;
		display: flex;
		margin-top: 83upx;
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
		padding: 0 29upx;
		margin-top: 40upx;
		.money-input {
			width: 690upx;
			height: 76upx;
			border: 2upx solid #554472;
			border-radius: 4upx;
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
		background: url(../../static/images/public/login-btn.png);
		background-size: 100% 100%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
	}
}
</style>
