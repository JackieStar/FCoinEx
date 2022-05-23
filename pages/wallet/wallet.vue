<template>
	<view class="container">
		<view class="tab-box">
			<u-tabs ref="tabs" :list="headlist" :height="108" :barWidth="62" :is-scroll="false" :current="headcurrent"
				@change="changeHead" active-color="#0072FF" line-color="#0072FF"
				:barStyle="{'background-color':'#0072FF'}" inactive-color="#666666" />
		</view>
		<view v-show="headcurrent==0" class="trade-record-page">
			<trade-item mode="hold" v-for="(item,index) in holdList" :key="index" :infoItem="item"></trade-item>
		</view>
		<view v-show="headcurrent==1" class="trade-record-page">
			<trade-item mode="history" v-for="(item,index) in historyList" :key="index" :infoItem="item"></trade-item>
		</view>
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
	export default {
		components: {
			uniIcons,
			TradeItem
		},
		mixins: [commonMixin],
		data() {
			return {
				headcurrent: 0,
				headlist: [],
				holdList: [{}],
				historyList: [{
					type: 'success'
				}, {
					type: 'fail'
				}],
				page: 1,
				orderDate: [],
				isHavePage: true,
				isSendLoading: false
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.wallet.title
			});
			this.headlist = [{
				name: this.i18n.trade.nowhold,
				type: 'hold'
			}, {
				name: this.i18n.trade.historyList,
				type: 'history'
			}]
			// if (this.loginInfo.hasLogin) {
			// 	this.getUserInfo();
			// 	this.loadData();
			// } else {
			// 	uni.navigateTo({
			// 		url: '/pages/public/login'
			// 	})
			// }
		},
		computed: {
			...mapState('user', ['loginInfo'])
		},
		methods: {
			...mapActions('user', ['userInfo']),
			...mapActions('wallet', ['getAccountLogs']),
			changeHead(val) {
				this.headcurrent = val
			},
			getOrderList() {
				this.isSendLoading = true
				let params = {
					type: this.activeType == 'hold' ? this.activeType : 'handup',
					code: '',
					status: this.activeType == 'hold' ? "" : this.activeType == 'history' ? 2 : 1,
					page: this.page,
					mode: 'heyue',
					limit: 10
				}

				this.orderList(params).then(res => {
					console.log(res.data)
					uni.hideLoading()
					this.isSendLoading = false
					if (this.activeType == 'hold') {
						this.orderDate = res.data;
						this.totalHold = res.data.length
					} else {
						if (this.activeType == 'handup') {
							this.totalHandup = res.data.total
						}
						let records = res.data.data
						this.total = res.data.total
						if (this.page == 1) {
							this.orderDate = records
							this.isHavePage = true
						} else {
							this.orderDate = this.orderDate.concat(records)
						}
					}
				});
			},
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
			onReachBottom() {
				console.log('3333', this.isSendLoading);
				// if (!this.isSendLoading) {
				// 	this.page++;
				// 	this.loadData();
				// }
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: #F6F6F6;
	}

	.container {
		.tab-box {
			width: 100%;
			// position: fixed;
			// top: 0;
		}

		.trade-record-page {
			// padding-top: 162rpx;
			padding: 54rpx 26rpx 0 26rpx;

		}
	}
</style>
