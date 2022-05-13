<template>
	<view class="container">
		<view class="input-wrapper">
			<text class="address-input">充值金额  1USDT ≈ 5.13R$</text>
		</view>

		<view class="money-wrapper">
			<input type="number" v-model="amount" class="money-input" placeholder-style="color: #454D73;font-size: 26upx;" :placeholder="i18n.recharge.placeholder" />
			<view>≈</view>
			<view>{{inputMoney}}</view>
		</view>
		<view class="confirm-btn" @click="openPage(3)">{{ i18n.recharge.submitBtn }}</view>
	</view>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	mixins: [commonMixin],
	data() {
		return {
			rechargeInfo: {},
			inputMoney: null
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.recharge.title
		});
		this.loadData();
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	methods: {
		...mapActions('wallet', ['getFinaceInfo']),
		//请求数据
		async loadData() {
			this.getFinaceInfo({ config: 'recharge' }).then(res => {
				this.rechargeInfo = res.data;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 40upx 0 100upx 0;
	.input-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 29upx;
		margin: 40upx 0;
		.address-input {
			width: 480upx;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #fff;
			margin-left: 20upx;
			word-break: break-all;
		}
	}
	.money-wrapper {
		width: 100%;
		padding: 0 29upx;
		margin: 40upx 0;
		.money-input {
			width: 300upx;
			padding: 0 30upx;
			height: 76upx;
			border: 2upx solid #554472;
			border-radius: 4upx;
			color: #fff;
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
