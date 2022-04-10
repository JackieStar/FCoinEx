<template>
	<view class="s-row little-line" @click="handleChoose">
		<view class="col light">
			{{ item.name }}/USDT 
			<view class="subtitle">Vol {{ item.volume_format }}</view>
		</view>
		<view class="col r light">
			${{ item.price }}
			<!-- <view class="subtitle">{{ item.priceUsd }}</view> -->
		</view>
		<view class="col r">
			<uni-tag size="large" v-if="item.diff_rate >= 0" :text="`+${item.diff_rate}%`" type="success"></uni-tag>
			<uni-tag size="large" v-else :text="`${item.diff_rate}%`" type="error"></uni-tag>
		</view>
	</view>
</template>

<script>
	import {
		commonMixin
	} from '@/common/mixin/mixin.js';
	import { uniTag } from '@dcloudio/uni-ui';
	import {
		mapState,
		mapActions
	} from 'vuex';
	export default {
		name: 'product-item',
		components:{uniTag},
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			} // 数据
		},
		mixins: [commonMixin],
		data() {
			return {
			
			}
		},
		methods: {
			handleChoose(){
				this.$emit('handleChoose',this.item)
			}
		
		}
	}
</script>

<style lang="scss" scoped>
	.s-row {
		display: flex;
		align-items: center;
		height: 120upx;
		.subtitle {
			font-size: $font-sm;
			font-weight: normal;
			color: $font-color-dark;
			padding: 4upx 0 10upx 0;
		}
		.uni-tag--success {
			color: #fff;
			background-color: #23B57D;
			border-width: 0.5px;
			border-style: solid;
			border-color: #23B57D;
			width: 160upx;
			height: 58upx;
			display: flex;
			justify-content: center;
			align-items: center;
			float: right;
		}
		.uni-tag--error {
			color: #fff;
			background-color: #D83A53;
			border-width: 0.5px;
			border-style: solid;
			border-color: #D83A53;
			width: 160upx;
			height: 58upx;
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 58upx;
			float: right;
		}
		.col {
			font-size: $font-base;
			color: $font-color-light;
			flex: 1;
		}
		.coinLogo {
			width: 36upx;
			height: 36upx;
			margin-right: 8px;
			display: inline-block;
			vertical-align: middle;
			float: left;
		}
		.light {
			// font-weight: bold;
			font-size: $font-lg;
			font-size: 30upx;
		}
		.r {
			text-align: center;
		}
	}
</style>
