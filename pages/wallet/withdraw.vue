<template>
	<view class="container">
		<!-- 充值提现 -->
		<view class="menu">
			<view class="fiat m-r" v-for="item in withdrawTypes" :key="item.type" @click="openPage(item.type)">
				<image class="menu-icon" :src="item.icon" mode="widthFix" />
				<view class="label">
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- 交易流水 -->
		<view class="trade-title">提现记录</view>
		<view class="tabs-wrapper">
			<view class="tabs-item" @click="handleChange(1)">
				<u-image v-if="tabIndex === 1" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
				<text :style="{ color: tabIndex === 1 ? '#fff' : '#646F7B', 'margin-top': tabIndex === 1 ? '' : '-10upx' }">PIX</text>
			</view>
			<view class="tabs-item" @click="handleChange(2)">
				<u-image v-if="tabIndex === 2" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
				<text :style="{ color: tabIndex === 2 ? '#fff' : '#646F7B', 'margin-top': tabIndex === 2 ? '' : '-10upx' }">USDT</text>
			</view>
		</view>
		<view class="trade-list-wrapper" v-show="tabIndex === 1">
			<view class="trade-list" v-for="item in rechargeData" :key="item.id">
				<view class="trade-money">
					<text>{{ item.status_text }}</text>
					<text>{{ item.amount }}</text>
				</view>
				<view class="trade-time">
					<text>{{ item.created_at }}</text>
					<text>{{ item.coin_type }}</text>
				</view>
			</view>
		</view>
		<view class="trade-list-wrapper" v-show="tabIndex === 2">
			<view class="trade-list" v-for="item in withdrawData" :key="item.id">
				<view class="trade-money">
					<text>{{ item.status_text }}</text>
					<text>{{ item.amount }}</text>
				</view>
				<view class="trade-time">
					<text>{{ item.created_at }}</text>
					<text>{{ item.coin_type }}</text>
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
			withdrawTypes: [],
			bgColor: '#070219',
			userData: {},
			rechargeData: [],
			withdrawData: [],
			pageRe: 1,
			pageWi: 1,
			isHavePageRe: true,
			isHavePageWi: true,
			isSendLoadingRe: false,
			isSendLoadingWi: false
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.wallet.title
		});
		this.getAppConfig()
		if (this.loginInfo.hasLogin) {
			this.getWithDrawList();
			this.getRechargeList();
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
		...mapActions('user', ['appConfig']),
		...mapActions('wallet', ['withdrawList']),
		 getAppConfig() {
		 	this.appConfig().then(res => {
		 		this.withdrawTypes= res.data.withdraw_types;
		 	});
		 },
		getWithDrawList() {
			this.isSendLoadingWi = true;
			let parmas = {
				page: this.pageWi,
				limit: 10,
				type: 'USDT'
			};
			if (!this.isHavePageWi) return this.$api.msg(this.i18n.toast.noMore);
			this.withdrawList(parmas).then(res => {
				
				this.isSendLoadingWi = false;
				if (this.pageWi == 1) {
					this.withdrawData = res.data.data;
				} else {
					if (res.data.data.length >= 10) {
						this.isHavePageWi = true;
					} else {
						this.isHavePageWi = false;
					}
					this.withdrawData = this.withdrawData.concat(res.data.data);
				}
			});
		},
		getRechargeList() {
			this.isSendLoadingRe = true;
			let parmas = {
				page: this.pageRe,
				limit: 10,
				type: 'PIX'
			};
			if (!this.isHavePageRe) return this.$api.msg(this.i18n.toast.noMore);
			this.withdrawList(parmas).then(res => {
				this.isSendLoadingRe = false;
				if (this.pageRe == 1) {
					this.rechargeData = res.data.data;
				} else {
					if (res.data.data.length >= 10) {
						this.isHavePageRe = true;
					} else {
						this.isHavePageRe = false;
					}
					this.rechargeData = this.rechargeData.concat(res.data.data);
				}
			});
		},
		onReachBottom() {
			if (!this.isSendLoadingRe) {
				this.pageRe++;
				this.getRechargeList();
			}
			if (!this.isSendLoadingWi) {
				this.pageWi++;
				this.getWithDrawList();
			}
		},
		handleChange(type) {
			this.tabIndex = type;
		},
		openPage(type) {
			if (type == 'PIX') {
				uni.navigateTo({
					url:'/pages/wallet/withdraw-pix'
				})
			} else {
				uni.navigateTo({
					url:'/pages/wallet/withdraw-usdt'
				})
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
		padding: 0 50upx;
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
