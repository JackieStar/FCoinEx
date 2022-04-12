<template>
	<view class="container">
		<view class="head-bg-cn" v-if="lang == 'zh_CN'"></view>
		<view class="head-bg-en" v-if="lang == 'en_US'"></view>
		<view class="lottery-bg">
			<view class="count-bg">
				{{ i18n.lottery.tip1 }}
				<text class="count">{{ drawCount }}</text>
				{{ i18n.lottery.tip2 }}
			</view>
			<view class="lottery"><LotteryDraw @get_winingIndex="gridStart" :grid_info_arr="list" @luck_draw_finish="luckDrawFinish"></LotteryDraw></view>
		</view>
		<view class="lottery-btn" @click="openPage">{{ i18n.lottery.tip3 }}</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LotteryDraw from '../../components/SJ-LotteryDraw/SJ-LotteryDraw.vue';
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	components: {
		LotteryDraw
	},
	mixins: [commonMixin],
	data() {
		return {
			buyTip: '',
			list: [],
			drawCount: 0,
			drawTips: '',
			lottery_draw_param: {
				startIndex: 0, //开始抽奖位置，从0开始
				totalCount: 6, //一共要转的圈数
				winingIndex: 0, //中奖的位置，从0开始
				speed: 50 //抽奖动画的速度 [数字越大越慢,默认100]
			},
			lang: 'zh_CN'
		};
	},
	onShow() {
		this.getConfig();
		this.lang = uni.getStorageSync('language');
	},
	methods: {
		...mapActions('lottery', ['lotteryConfig', 'lotteryDraw']),
		getConfig() {
			this.lotteryConfig().then(res => {
				this.list = res.data.lotteries;
				this.drawCount = res.data.count;
			});
		},
		gridStart(callback) {
			if(this.drawCount === 0) {
				return this.$api.msg(this.i18n.lottery.noCount);
			}
				this.lotteryDraw().then(res => {
					this.lottery_draw_param.winingIndex = res.data.lottery.lotterIndex;
					//props修改在小程序和APP端不成功，所以在这里使用回调函数传参，
					callback(this.lottery_draw_param);
					setTimeout(() => {
						this.$api.msg(res.data.lottery.tips);
						this.drawTips = res.data.lottery.tips;
						this.drawCount = this.drawCount - 1;
					}, 3000);
				});
		},
		openPage() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style lang="less" scoped>
page {
	width: 100%;
	height: 100%;
}
.container {
	position: absolute;
	width: 100%;
	height: 100%;
	background-size: 100% 100%;
	background-color: blue;
	background-image: url(../../static/images/lottey/cj_bg.png);
	padding-top: 100upx;
}
.count-bg {
	line-height: 60upx;
	text-align: center;
	margin: 0 auto;
	margin-bottom: 50upx;
	font-size: 33upx;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: #ffffff;
	.count {
		color: #ff4a4c;
		font-size: 30upx;
		margin: 0 10upx;
	}
}
.head-bg-cn {
	// margin-top: 60upx;
	width: 583upx;
	height: 283upx;
	margin-left: 110upx;
	background-size: 100% 100%;
	background-image: url(../../static/images/lottey/cj_text_cn.png);
}
.head-bg-en {
	// margin-top: 60upx;
	width: 583upx;
	height: 283upx;
	margin-left: 110upx;
	background-size: 100% 100%;
	background-image: url(../../static/images/lottey/cj_text_en.png);
}
.lottery {
	width: 280px;
	height: 280px;
	margin: 0 auto;
}
.draw-tips {
}
.lottery-bg {
	width: 696upx;
	height: 819upx;
	margin: 0 auto;
	background-size: 100% 100%;
	background-image: url(../../static/images/lottey/lottery_bg.png);
	padding-top: 36upx;
}
.lottery-btn {
	width: 639upx;
	height: 93upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 33upx;
	background-image: url(../../static/images/lottey/lottery_bt.png);
	background-size: 100% 100%;
	margin: 20upx auto;
}
</style>
