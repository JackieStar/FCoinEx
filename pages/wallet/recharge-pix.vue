<template>
	<view class="container">
		<view class="input-wrapper">
			<text class="address-input">充值金额  1R$ ≈ {{rechargeInfo.usdt_pix_rate}}USDT</text>
		</view>

		<view class="money-wrapper flex_between_box">
			<view class="flex_center_box">
				<input type="number" @input="handleChange" v-model="amount" class="money-input" placeholder-style="color: #454D73;font-size: 26upx;" placeholder="请输入金额" />
				<text style="color: #fff; margin-left: 10upx;">R$</text>
			</view>
			<view class="input-money">≈</view>
			<view class="flex_center_box">
				<view class="input-money" >{{inputMoney}} </view>
				<text style="color: #fff; margin-left: 10upx;">USDT</text>
			</view>
		</view>
		<view class="confirm-btn" @click="handleSubmit">立即充值</view>
		
		<view><c-tips v-for="(item, index) in rechargeInfo.tips" :text="item" :key="index" /></view>
		
	</view>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';
import CTips from '@/components/c-tips/c-tips.vue';
export default {
	components: {CTips},
	mixins: [commonMixin],
	data() {
		return {
			rechargeInfo: {},
			inputMoney: 0,
			amount: null
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
		...mapActions('wallet', ['getFinaceInfo', 'financeRecharge']),
		//请求数据
		async loadData() {
			this.getFinaceInfo({ config: 'recharge', type: 'PIX' }).then(res => {
				this.rechargeInfo = res.data;
			});
		},
		handleChange(e) {
			console.log('e', e)
			this.inputMoney = (Number(e.detail.value) * Number(this.rechargeInfo.usdt_pix_rate)).toFixed(2)
		},
		// 确认提交
		handleSubmit() {
			let params = {
				type: 'PIX',
				amount: this.amount
			}
			this.financeRecharge(params).then(res => {
				this.$u.toast(this.i18n.submitRecharge.rechargeSuccess)
				setTimeout(()=> {
					uni.switchTab({
						url: '/pages/wallet/wallet'
					})
				}, 1500);
			})
		},
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
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #fff;
			margin-left: 20upx;
			word-break: break-all;
		}
	}
	.money-wrapper {
		width: 100%;
		padding: 0 50upx;
		margin: 60upx 0;
		.money-input {
			width: 240upx;
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
