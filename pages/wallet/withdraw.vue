<template>
	<view class="container">
		<view class="market-header">
			<u-icon class="arrow-left" @click="openPage(0)" name="arrow-left" color="#ffffff" size="44" />
			<view class="market-text">充值</view>
			<image  @click="openPage(1)" src="../../static/images/wallet/list.png" class="right-icon" />
		</view>
		<view class="user-info">
			<image src="../../static/images/public/header.png" class="user-avatar" />
			<view class="info">
				<text>USID</text>
				<view>网络：USTD_324</view>
			</view>
		</view>
		<image class="user-bg" src="../../static/images/wallet/bg.png" />
		<view class="code-wrapper">
			<image src="../../static/images/public/header.png" class="code-img" />
		</view>
		<view class="title">
			<text>充值地址</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
		</view>
		<view class="input-wrapper">
			<text class="address-input">adskjfhawkjhewealkjb</text>
			<view class="copy-btn">粘贴</view>
		</view>
		<view class="title">
			<text>充值金额</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-bg.png" width="144upx" height="12upx" mode="" />
		</view>
		<view class="money-wrapper">
			<input type="text" class="money-input" placeholder-style="color: #454D73;font-size: 26upx;" placeholder="请输入充值金额"  />
		</view>
		<view >
			<c-tips text="如果您发送了除USTD-324之外的任何其他加密，您我拿不回来了" />
			<c-tips text="这项存款需要1个区块链确认，至少再一次确认后才能到达" />
		</view>
		<view class="confirm-btn">我已转账</view>
	</view>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
import { uniIcons } from '@dcloudio/uni-ui';
import { commonMixin, authMixin } from '@/common/mixin/mixin.js';
import CTips from '@/components/c-tips/c-tips.vue'
export default {
	components: { tkiQrcode, uniIcons, CTips },
	mixins: [commonMixin, authMixin],
	data() {
		return {
			coin: {},
			chain: '',
			isChain: false,
			fee: 0,
			showPrecision: 0,
			chains: [],
			account: {},
			coins: [],
			tips: {},
			deposit: {},
			qrcode: {
				val: ''
			}
		};
	},
	onUnload() {
		uni.$off('selectCoin', this.selectCoin);
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.wallet.recharge
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
	onNavigationBarButtonTap(e) {
		this.navTo(`/pages/wallet/detail?coin=${this.coin.symbol}&filterIndex=1`);
	},
	methods: {
		...mapActions('common', ['coinList', 'coinTips']),
		...mapActions('user', ['depositAddress']),
		async loadData() {
			this.depositAddress({ coin: this.coin.symbol, chain: this.chain }).then(res => {
				this.deposit = res.data;
				this.isChain = this.deposit.chains && this.deposit.chains.length > 0;
				this.qrcode.val = res.data.address;
				this.$refs.qrcode & this.$refs.qrcode._makeCode();
			});
			this.coinTips(this.coin.symbol).then(res => {
				this.tips = res.data;
			});
		},
		selectChain(item) {
			this.chain = item.tokenBase;
			this.loadData();
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
		save() {
			this.$refs.qrcode._saveCode();
		},
		paste() {
			let $this = this;
			uni.setClipboardData({
				data: this.deposit.address,
				success: function() {
					$this.$api.msg($this.toast.copySuccess);
				}
			});
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
	padding: 20upx 0 100upx 0;
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
		z-index: 1000;
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
				color: #FFFFFF;
				margin-top: 14upx;
			}
			view {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #85A0B2;
				margin-top: 5upx;
			}
		}
	}
	.user-bg {
		width: 750upx;
		height: 171upx;
		margin-top: -50upx;
	}
	.code-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20upx;
		.code-img {
			width: 280upx;
			height: 280upx;
		}
	}
	.title {
		width: 100%;
		height: 28upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
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
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 400;
			text-decoration: underline;
			color: #fff;
			margin-left: 80upx;
		}
		.copy-btn {
			width: 154upx;
			height: 70upx;
			line-height: 70upx;
			background: url(../../static/images/wallet/copy-btn.png);
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
		margin: 40upx 0;
		.money-input {
			width: 690upx;
			padding: 0 30upx;
			height: 76upx;
			border: 2upx solid #554472;
			border-radius: 4upx;
		}
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
