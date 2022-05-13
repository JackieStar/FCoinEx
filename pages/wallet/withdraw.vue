<template>
	<view class="container">
		<!-- 充值提现 -->
		<view class="menu">
			<view class="fiat m-r" @click="navTo('/pages/wallet/withdraw-pix')">
				<image class="menu-icon" src="../../static/images/makets/recharge.png" mode="widthFix" />
				<view class="label">
					<!-- <text>{{ i18n.wallet.recharge }}</text> -->
					<text>PIX提现</text>
				</view>
			</view>
			<view class="fiat m-l" @click="navTo('/pages/wallet/withdraw-usdt')">
				<image class="menu-icon" src="../../static/images/makets/withdraw.png" mode="widthFix" />
				<view class="label">
					<!-- <text>{{ i18n.wallet.withdraw }}</text> -->
					<text>USDT提现</text>
				</view>
			</view>
		</view>
		<!-- 交易流水 -->
		<view class="trade-title">提现记录</view>
		<view class="tabs-wrapper">
			<view class="tabs-item" @click="handleChange(1)">
				<u-image v-if="tabIndex === 1" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
				<text :style="{ color: tabIndex === 1 ? '#fff' : '#646F7B', 'margin-top': tabIndex === 1 ? '' : '-10upx' }">{{ i18n.record.rechargeList }}</text>
			</view>
			<view class="tabs-item" @click="handleChange(2)">
				<u-image v-if="tabIndex === 2" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
				<text :style="{ color: tabIndex === 2 ? '#fff' : '#646F7B', 'margin-top': tabIndex === 2 ? '' : '-10upx' }">{{ i18n.record.withdrawList }}</text>
			</view>
		</view>
		<view class="trade-list-wrapper">
			<view class="trade-list" v-for="(item, index) in tradeList" :key="index">
				<view class="trade-money">
					<text>{{ item.description }}</text>
					<text v-if="item.atype == 'out'">- {{ item.amount }}</text>
					<text v-else>{{ item.amount }}</text>
				</view>
				<view class="trade-time">
					<text>{{ item.cdate }}</text>
					<text>USDT</text>
				</view>
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
			tabIndex: 1,
			bgColor: '#070219',
			userData: {},
			tradeList: [],
			page: 1,
			isHavePage: true,
			isSendLoading: false
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.wallet.title
		});
		if (this.loginInfo.hasLogin) {
			this.getUserInfo();
			this.loadData();
		} else {
			uni.navigateTo({
				url: '/pages/public/login'
			});
		}
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	methods: {
		...mapActions('user', ['userInfo']),
		...mapActions('wallet', ['getAccountLogs']),
		//请求数据
		loadData() {
			this.isSendLoading = true;
			let parmas = {
				page: this.page,
				limit: 10
			};
			if (!this.isHavePage) return this.$api.msg(this.i18n.toast.noMore);
			this.getAccountLogs(parmas)
				.then(res => {
					this.isSendLoading = false;
					if (this.page == 1) {
						this.tradeList = res.data.data;
					} else {
						if (res.data.data.length >= 10) {
							this.isHavePage = true;
						} else {
							this.isHavePage = false;
						}
						this.tradeList = this.tradeList.concat(res.data.data);
					}
				})
				.catch(error => {});
		},
		handleChange(type) {
			this.tabIndex = type;
		},
		// 获取用户信息
		getUserInfo() {
			this.userInfo().then(res => {
				this.userData = res.data;
			});
		},
		onReachBottom() {
			console.log('3333', this.isSendLoading);
			if (!this.isSendLoading) {
				this.page++;
				this.loadData();
			}
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
.title-wrapper {
	width: 100%;
	// height: 28upx;
	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #ffffff;
	padding: 30upx 0;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	text {
		margin-left: 6upx;
		z-index: 10;
	}
	.title-bg {
		margin-top: -30upx;
	}
}
.tabs-wrapper {
	width: 100%;
	height: 140upx;
	display: flex;
	align-items: center;
	.tabs-item {
		width: 50%;
		height: 140upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100upx;
		text {
			margin-left: 2upx;
			z-index: 10;
		}
		.title-bg {
			margin-bottom: -22upx;
		}
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
			width: 44rpx;
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
