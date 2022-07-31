<template>
	<view class="uni-swiper-msg">
		<swiper :style="{'width': swiperWidth}" vertical="true" autoplay="true" circular="true" interval="3000">
			<swiper-item v-for="(item, index) in list_" :key="index">
				<view class="uni-swiper-txt" v-html="item"></view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props:{
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			swiperWidth: {
				type: String
			}
		},
		computed: {
			list_(){
				return this.list;
			}
		},
		watch: {
			swiperWidth(newVal) {
				console.log('newVal', newVal)
				this.swiperWidth = newVal
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.uni-swiper-msg{
		flex-wrap:nowrap; 
		display:flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		font-weight: 500;
		color: #fff;
		background: #333;
		background-color:rgba(0,0,0,0.5);
		border-radius: 14rpx;
	}
	.uni-swiper-msg swiper{
		height:70rpx; 
		line-height:70rpx;
	}
	.uni-swiper-msg swiper-item{
		line-height:70rpx;
	}
	.uni-swiper-txt {
		text-align: center;
		height: 70rpx;
	}
</style>
