<template>
	<view class="container">
		<view class="tabs-wrapper">
			<view class="tabs-item" @click="handleChange(1)">
				<u-image v-if="tabIndex === 1" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
				<text :style="{ color: tabIndex === 1 ? '#fff' : '#646F7B', 'margin-top': tabIndex === 1 ? '' : '-10upx' }">{{i18n.record.rechargeList}}</text>
			</view>
			<view class="tabs-item" @click="handleChange(2)">
				<u-image v-if="tabIndex === 2" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
				<text :style="{ color: tabIndex === 2 ? '#fff' : '#646F7B', 'margin-top': tabIndex === 2 ? '' : '-10upx' }">{{i18n.record.withdrawList}}</text>
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
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	mixins: [commonMixin],
	data() {
		return {
			tabIndex: 1,
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
			title: this.i18n.record.title
		});
		this.getWithDrawList();
		this.getRechargeList();
	},
	methods: {
		...mapActions('wallet', ['withdrawList', 'rechargeList']),
		handleChange(type) {
			this.tabIndex = type;
		},
		getWithDrawList() {
			this.isSendLoadingWi = true;
			let parmas = {
				page: this.pageWi,
				limit: 10
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
				limit: 10
			};
			if (!this.isHavePageRe) return this.$api.msg(this.i18n.toast.noMore);
			this.rechargeList(parmas).then(res => {
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
		}
	}
};
</script>

<style lang="scss" scoped>
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
		// justify-content: center;
		text {
			margin-left: 2upx;
			z-index: 10;
		}
		.title-bg {
			margin-bottom: -22upx;
		}
	}
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
.trade-list-wrapper {
	width: 100%;
	height: 90vh;
	overflow-y: scroll;
}
</style>
