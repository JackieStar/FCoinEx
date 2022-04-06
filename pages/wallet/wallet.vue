<template>
	<view class="container">
		<view class="assets-box">
			<view class="title">资产</view>
			<view class="money">200.00</view>
			<view class="tips">余额(USDT)</view>
		</view>
		<!-- 充值提现 -->
		<view class="menu">
			<view class="fiat m-r" @click="navTo('/pages/wallet/recharge')">
				<view class="label">
					<text>{{ i18n.index.prediction.title1 }}</text>
				</view>
				<image class="menu-icon" src="../../static/images/makets/recharge.png" mode="widthFix" />
			</view>
			<view class="fiat m-l" @click="navTo('/pages/wallet/withdraw')">
				<view class="label">
					<text>{{ i18n.index.prediction.title2 }}</text>
				</view>
				<image class="menu-icon" src="../../static/images/makets/withdraw.png" mode="widthFix" />
			</view>
		</view>
		<!-- 交易流水 -->
		<view class="trade-title">交易流水</view>
		<view class="trade-list">
			<view class="trade-money">
				<text>充值</text>
				<text>-100.00</text>
			</view>
			<view class="trade-time">
				<text>03-03-2022 12:22:41</text>
				<text>USDT</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { uniIcons } from '@dcloudio/uni-ui';
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	components: { uniIcons },
	mixins: [commonMixin],
	data() {
		return {
			bgColor: '#070219',
			data: {
				list: [],
				totalUsdAmount: 0,
				totalCnyAmount: 0
			}
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.wallet.title
		});
		if (this.loginInfo.hasLogin) {
			this.loadData();
		}
	},
	onPullDownRefresh() {
		this.loadData();
	},
	methods: {
		...mapActions('account', ['accountList']),
		//请求数据
		async loadData() {
			// this.accountList()
			// 	.then(res => {
			// 		this.data = res.data;
			// 		uni.stopPullDownRefresh();
			// 	})
			// 	.catch(error => {});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background: #070219;
}
.container {
	padding: 40upx 26upx;
}
.assets-box {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 30upx;
	.title {
		font-size: 36upx;
		font-weight: 400;
		color: #ffffff;
		line-height: 30upx;
	}
	.money {
		font-size: 56upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #fefeff;
		margin-top: 80upx;
	}
	.tips {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #757d89;
		margin-top: 18upx;
	}
}
.menu {
	// padding: 20upx 24upx;
	margin-top: 47upx;
	display: flex;
	justify-content: space-between;
	font-size: $font-base;
	color: $border-color-light;
	font-weight: bold;
	.fiat {
		width: 330rpx;
		height: 110rpx;
		display: flex;
		flex: 1;
		align-items: center;
		background: #1a1b28;
		border-radius: 10rpx;
		padding: 0 45upx;
		justify-content: space-between;
		.label {
			display: flex;
			flex-direction: column;
			padding-left: 20upx;
		}
		.sub {
			font-size: $font-sm;
			font-weight: normal;
		}
		.menu-icon {
			width: 58rpx;
		}
		text {
			font-size: $font-md;
		}
	}
	.m-r {
		margin-right: 14upx;
	}
	.m-l {
		margin-left: 14upx;
	}
}
.trade-title {
	font-size: 24upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #8a959f;
	margin: 34upx 0 28upx 0;
}
.trade-list {
	padding: 20upx 40upx;
	background-color: #1a1a1a;
	border-bottom: 1upx solid #303030;
	.trade-money {
		width: 100%;
		display: flex;
		justify-content: space-between;
		text {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
		}
	}
	.trade-time {
		width: 100%;
		display: flex;
		margin-top: 4upx;
		justify-content: space-between;
		text {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #5c6672;
		}
	}
}
</style>
