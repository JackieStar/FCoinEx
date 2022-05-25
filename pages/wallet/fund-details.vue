<template>
	<view class="container">
		<view class="fund-head flex_left_box">
			<view class="fund-type-box flex_between_box" @click="show=true">
				<text>{{typeName}}</text>
				<image class="select-icon" src="../../static/images/trade/xiala@2x.png" mode=""></image>
			</view>
		</view>
		<view class="fund-content">
			<view class="fund-item" v-for="(item,index) in historyList" :key="index">
				<view class="fund-info">
					<view class="amount-label">
						{{i18n.withdraw.money}}
					</view>
					<view class="amount">
						{{item.atype=='out'?'-':''}}${{item.amount}}
					</view>
					<view class="time">
						{{item.cdate}}
					</view>
				</view>
				<view class="fund-desc-box flex_left_box">
					<view class="fund-desc-label">
						{{i18n.common.desc}}：
					</view>
					<view class="fund-desc-content">
						{{item.description}}
					</view>
				</view>
				<view class="fund-type">
					{{item.type_label}}
				</view>
			</view>
			<empty v-if="historyList.length==0"></empty>
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
		uniIcons
	} from '@dcloudio/uni-ui';
	import {
		commonMixin
	} from '@/common/mixin/mixin.js';
	import TradeItem from './trade-item.vue'
	import empty from '@/components/empty.vue'
	export default {
		components: {
			uniIcons,
			TradeItem,
			empty
		},
		mixins: [commonMixin],
		data() {
			return {
				historyList: [],
				page: 1,
				show: false,
				isHavePage: true,
				isSendLoading: false,
				selectList: [],
				selectIndex: 0,
				typeName: '',
				typeValue: ''
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.me.fund
			});
		},
		onLoad() {
			this.typeName = this.i18n.common.type
			this.selectList = [{
					value: '',
					label: this.i18n.wallet.all
				},
				{
					value: 'trade',
					label: this.i18n.wallet.trade
				},
				{
					value: 'recharge',
					label: this.i18n.wallet.recharge
				},
				{
					value: 'withdraw',
					label: this.i18n.wallet.withdraw
				},
				{
					value: 'sign',
					label: this.i18n.wallet.sign
				},
				{
					value: 'invite_reward',
					label: this.i18n.wallet.invite_reward
				},
				{
					value: 'lucky_pannel',
					label: this.i18n.wallet.lucky_pannel
				},
				{
					value: 'lucky_hongbao',
					label: this.i18n.wallet.lucky_hongbao
				},
			]
			this.getFundList()
		},
		computed: {
			...mapState('user', ['loginInfo'])
		},
		onReachBottom() {
			if (this.total > this.historyList.length && !this.isSendLoading) {
				this.page++
				this.getFundList()
			}
		},
		methods: {
			...mapActions('user', ['userInfo']),
			...mapActions('wallet', ['getAccountLogs']),
			confirm(val) {
				this.typeValue = val[0].value
				this.typeName = val[0].label
				this.page=1
				this.getFundList()
			},
			getFundList() {
				this.isSendLoading = true
				let params = {
					type: this.typeValue,
					page: this.page,
				}
				uni.showLoading({})
				this.getAccountLogs(params).then(res => {
					uni.hideLoading()
					this.isSendLoading = false
					let records = res.data.data
					this.total = res.data.total
					if (this.page == 1) {
						this.historyList = records
						this.isHavePage = true
					} else {
						this.historyList = this.historyList.concat(records)
					}
				}).catch(()=>{
					uni.hideLoading()
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: #F6F6F6;
	}

	.fund-head {
		width: 100%;
		padding: 36rpx 26rpx;

		.fund-type-box {
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

	.fund-content {
		padding: 12rpx 26rpx 64rpx 26rpx;

		.fund-item {
			width: 100%;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin-bottom: 30rpx;
			box-sizing: border-box;
			padding: 36rpx 31rpx 0 31rpx;
			position: relative;

			.fund-info {
				padding-bottom: 32rpx;

				.amount-label {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 300;
					color: #CECECE;
				}

				.amount {
					margin-top: 18rpx;
					font-size: 38rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #212121;
				}

				.time {
					margin-top: 30rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 300;
					color: #666666;
				}
			}

			.fund-desc-box {
				width: 100%;
				font-size: 24rpx;
				color: #666666;
				padding: 30rpx 0;
				display: flex;
				justify-content: flex-start;
				border-top: 1px solid #EDEDED;

				.fund-desc-label {
					flex-shrink: 0;
				}
			}

			.fund-type {
				height: 62rpx;
				background: #0072FF;
				border-radius: 0px 10rpx 0px 10rpx;
				padding: 0 13rpx;
				line-height: 62rpx;
				color: #FFFFFF;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}
</style>
