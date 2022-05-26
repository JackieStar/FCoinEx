<template>
	<view class="container">
		<view class="record-head flex_left_box">
			<view class="record-type-box flex_between_box" @click="show=true">
				<text>{{typeName}}</text>
				<image class="select-icon" src="../../static/images/trade/xiala@2x.png" mode=""></image>
			</view>
		</view>
		<view class="record-content">
			<view class="record-item" v-for="(item,index) in withdrawData" :key="index">
				<view class="record-info">
					<view class="amount-label">
						{{i18n.withdraw.money}}：{{item.amount}} USDT
					</view>
					<view class="flex_left_box record-label-item">
						<view class="left-label">
							{{i18n.record.transfer_amount}}：
						</view>
						<view class="desc red-text">
							{{item.transfer_amount}} $
						</view>
					</view>
					<view class="flex_left_box record-label-item">
						<view class="left-label">
							{{i18n.record.coin_type}}：
						</view>
						<view class="desc">
							{{item.coin_type}}
						</view>
					</view>
					<view class="flex_left_box record-label-item">
						<view class="left-label">
							{{i18n.record.receiver}}：
						</view>
						<view class="desc">
							{{item.receiver}}
						</view>
					</view>
					<view class="flex_left_box record-label-item">
						<view class="left-label">
							{{i18n.record.create}}：
						</view>
						<view class="desc">
							{{item.created_at}}
						</view>
					</view>
					<view class="flex_left_box record-label-item">
						<view class="left-label">
							{{i18n.common.desc}}：
						</view>
						<view class="desc">
							{{item.remark}}
						</view>
					</view>
				</view>
				<view v-if="item.status=='done'" class="record-type done-color">
					{{i18n.record.done}}
				</view>
				<view v-if="item.status=='init'" class="record-type init-color">
					{{i18n.record.init}}
				</view>
				<view v-if="item.status=='fail'" class="record-type fail-color">
					{{i18n.record.fail}}
				</view>
			</view>
			<empty v-if="withdrawData.length==0"></empty>
		</view>
		<u-select v-model="show" mode="single-column" :list="selectList" @confirm="confirm"
			:confirm-text="i18n.common.ok" :cancel-text="i18n.common.cancel"></u-select>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	import {
		commonMixin
	} from '@/common/mixin/mixin.js';
	import empty from '@/components/empty.vue'
	export default {
		mixins: [commonMixin],
		components: {
			empty
		},
		data() {
			return {
				withdrawData: [],
				pageWi: 1,
				show: false,
				isHavePageWi: true,
				isSendLoadingWi: false,
				selectList: [],
				selectIndex: 0,
				typeName: '',
				typeValue: ''
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.record.withdrawList
			});
			this.typeName = this.i18n.common.type
			this.selectList = [{
					value: '',
					label: this.i18n.wallet.all
				},
				{
					value: 'done',
					label: this.i18n.record.done
				},
				{
					value: 'init',
					label: this.i18n.record.init
				},
				{
					value: 'fail',
					label: this.i18n.record.fail
				},
			]

			this.getWithDrawList();
		},
		onReachBottom() {
			if (!this.isSendLoadingRe) {
				this.pageWi++;
				this.getWithDrawList();
			}
		},
		methods: {
			...mapActions('wallet', ['withdrawList']),
			confirm(val) {
				this.typeValue = val[0].value
				this.typeName = val[0].label
				this.pageWi = 1
				this.isHavePageWi = true
				this.getWithDrawList()
			},
			getWithDrawList() {
				this.isSendLoadingWi = true;
				let parmas = {
					page: this.pageWi,
					limit: 10,
					status: this.typeValue
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
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: #F6F6F6;
	}

	.record-head {
		width: 100%;
		padding: 36rpx 26rpx;

		.record-type-box {
			padding: 12rpx 12rpx;
			background: #FFFFFF;
			border: 1px solid #C1C1C1;
			box-shadow: 0px 0px 15rpx 1px rgba(180, 180, 180, 0.21);
			border-radius: 10rpx;
			font-size: 24rpx;
			color: #333;

			.select-icon {
				width: 22rpx;
				height: 13rpx;
				margin-left: 14rpx;
			}
		}
	}

	.record-content {
		padding: 12rpx 26rpx 64rpx 26rpx;

		.record-item {
			width: 100%;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin-bottom: 30rpx;
			box-sizing: border-box;
			padding: 17rpx 27rpx 20rpx 27rpx;
			position: relative;

			.record-info {
				.amount-label {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #212121;
					padding: 20rpx 0;
				}
				.record-label-item{
					width: 100%;
					padding: 20rpx 0;
					.left-label{
						font-size: 28rpx;
						color: #212121;
					}
					.desc {
						font-size: 28rpx;
						color: #666666;
					}
					.red-text{
						color: #FF2929;
					}
				}
			}

			.record-desc-box {
				width: 100%;
				font-size: 24rpx;
				color: #666666;
				padding: 30rpx 0;
				display: flex;
				justify-content: flex-start;
				border-top: 1px solid #EDEDED;

				.record-desc-label {
					flex-shrink: 0;
				}
			}

			.record-type {
				height: 47rpx;
				border-radius: 0px 10rpx 0px 10rpx;
				padding: 0 13rpx;
				line-height: 47rpx;
				color: #FFFFFF;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				position: absolute;
				top: 0;
				right: 0;
				min-width: 203rpx;
				text-align: center;
			}
			.done-color{
				background: #00BD47;
			}
			.init-color{
				background-color: #F47300;
			}
			.fail-color{
				background-color: #F43400;
			}
		}
	}
</style>
