<template>
	<view class="container">
		<view class="tab-box">
			<u-tabs ref="tabs" :list="headlist" :height="108" :barWidth="62" :is-scroll="false" :current="headcurrent"
				@change="changeHead" active-color="#0072FF" line-color="#0072FF"
				:barStyle="{'background-color':'#0072FF'}" inactive-color="#666666" />
		</view>
		<view v-show="headcurrent==0" class="trade-record-page">
			<trade-item mode="hold" v-for="(item,index) in holdList" :key="index" :infoItem="item" @handleGet="handleGet"></trade-item>
			<empty v-if="holdList.length==0"></empty>
			<view  v-if="holdList.length==0" class="trade-btn" @click="goTrade">
				{{i18n.lottery.tip3}}
			</view>
		</view>
		<view v-show="headcurrent==1" class="trade-record-page">
			<trade-item mode="history" v-for="(item,index) in historyList" :key="index" :infoItem="item"></trade-item>
			<empty v-if="historyList.length==0"></empty>
			<view  v-if="historyList.length==0" class="trade-btn" @click="goTrade">
				{{i18n.lottery.tip3}}
			</view>
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
				headcurrent: 0,
				headlist: [],
				holdList: [],
				historyList: [],
				page: 1,
				orderDate: [],
				isHavePage: true,
				isSendLoading: false
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.tabBar.record
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
			this.page= 1
			this.getOrderList()
		},
		onLoad() {
			
		},
		
		computed: {
			...mapState('user', ['loginInfo'])
		},
		methods: {
			...mapActions('user', ['userInfo']),
			...mapActions('trade', ['orderList']),
			changeHead(val) {
				this.page=1
				this.headcurrent = val
				this.getOrderList()
			},
			handleGet(){
				this.page = 1
				setTimeout(()=>{
					this.getOrderList()
				},500)
				
			},
			goTrade(){
				uni.switchTab({
					url:'/pages/trade/trade'
				})
			},
			getOrderList() {
				this.isSendLoading = true
				let params = {
					type: this.headcurrent == 0 ? 'hold' : 'history',
					code: '',
					page: this.page,
				}

				this.orderList(params).then(res => {
					console.log(res.data)
					uni.hideLoading()
					this.isSendLoading = false
					if (this.headcurrent == 0) {
						this.holdList = res.data;
						// this.totalHold = res.data.length
					} else {
						
						let records = res.data.data
						this.total = res.data.total
						if (this.page == 1) {
							this.historyList = records
							this.isHavePage = true
						} else {
							this.historyList = this.historyList.concat(records)
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
				if (this.total > this.historyList.length && !this.isSendLoading) {
					this.page++
					this.getOrderList()
				}
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
			padding: 54rpx 26rpx 64rpx 26rpx;
			.trade-btn{
				width: 328rpx;
				height: 76rpx;
				background: #0079FF;
				border-radius: 38rpx;
				line-height: 76rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				text-align: center;
				color: #FFFFFF;
				text-align: center;
				margin: auto;
				margin-top: 100rpx;
			}

		}
	}
</style>
