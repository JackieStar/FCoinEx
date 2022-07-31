<template>
	<view class="container">
		<view class="head-bg-cn" v-if="lang == 'zh-CN'"></view>
		<view class="head-bg-en" v-if="lang == 'en-US'"></view>
		<view class="head-bg-hk" v-if="lang == 'zh-HK'"></view>
		<view class="head-bg-th" v-if="lang == 'th-TH'"></view>
		<view class="head-bg-ru" v-if="lang == 'ru-RU'"></view>
		<view class="head-bg-jp" v-if="lang == 'ja-JP'"></view>
		<view class="lottery-bg">
			<view class="count-bg">
				{{ i18n.lottery.tip1 }}
				<text class="count">{{ drawCount }}</text>
				{{ i18n.lottery.tip2 }}
			</view>
			<view class="lottery"><LotteryDraw @get_winingIndex="gridStart" :grid_info_arr="list" @luck_draw_finish="luckDrawFinish"></LotteryDraw></view>
		</view>
		<view class="lottery-btn" @click="openPage">{{ i18n.lottery.tip3 }}</view>
		<view class="bottom-tips">{{ i18n.redPacket.bottomTips }}</view>
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
		uni.setNavigationBarTitle({
			title: 'BitAntOx'
		});
	},
	methods: {
		...mapActions('lottery', ['lotteryConfig', 'lotteryDraw']),
		getConfig() {
			this.lotteryConfig({ type: 'lucky_pannel' }).then(res => {
				this.list = res.data.config.lucky_pannel;
				this.drawCount = res.data.chance;
			});
		},
		gridStart(callback) {
			if (this.drawCount === 0) {
				return this.$api.msg(this.i18n.lottery.noCount);
			}
			this.lotteryDraw({ type: 'lucky_pannel' }).then(res => {
				this.lottery_draw_param.winingIndex = res.data.lotterIndex;
				//props修改在小程序和APP端不成功，所以在这里使用回调函数传参，
				callback(this.lottery_draw_param);
				setTimeout(() => {
					this.$api.msg(res.data.tips);
					this.drawTips = res.data.tips;
					this.drawCount = res.data.chance;
				}, 3000);
			});
		},
		openPage() {
			uni.switchTab({
				url: '/pages/trade/trade'
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
	min-height: 100%;
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
.head-bg-th {
	// margin-top: 60upx;
	width: 583upx;
	height: 283upx;
	margin-left: 110upx;
	background-size: 100% 100%;
	background-image: url(../../static/images/lottey/cj_text_th.png);
}
.head-bg-hk {
	// margin-top: 60upx;
	width: 583upx;
	height: 283upx;
	margin-left: 110upx;
	background-size: 100% 100%;
	background-image: url(../../static/images/lottey/cj_text_hk.png);
}
.head-bg-ru {
	// margin-top: 60upx;
	width: 583upx;
	height: 283upx;
	margin-left: 110upx;
	background-size: 100% 100%;
	background-image: url(../../static/images/lottey/cj_text_ru.png);
}
.head-bg-jp {
	// margin-top: 60upx;
	width: 583upx;
	height: 283upx;
	margin-left: 110upx;
	background-size: 100% 100%;
	background-image: url(../../static/images/lottey/cj_text_jp.png);
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
.bottom-tips {
	text-align: center;
	margin: 40rpx 0;
	font-size: 24rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #ffffff;
	line-height: 30rpx;
}
</style>
