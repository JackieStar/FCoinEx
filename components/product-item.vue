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
			<uni-tag size="large" type="success" v-if="item.diff_rate >= 0" :text="`+${item.diff_rate}%`"></uni-tag>
			<uni-tag size="large" type="error" v-else :text="`${item.diff_rate}%`"></uni-tag>
		</view>
	</view>
</template>

<script>
import { commonMixin } from '@/common/mixin/mixin.js';
import { uniTag } from '@dcloudio/uni-ui';
import { mapState, mapActions } from 'vuex';
export default {
	name: 'product-item',
	components: { uniTag },
	props: {
		item: {
			type: Object,
			default() {
				return {};
			}
		} // 数据
	},
	mixins: [commonMixin],
	data() {
		return {};
	},
	methods: {
		handleChoose() {
			this.$emit('handleChoose', this.item);
		}
	}
};
</script>

<style lang="scss" scoped>
.s-row {
	display: flex;
	align-items: center;
	height: 129upx;
	border-top: 1rpx solid #e9e9e9;

	.subtitle {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 36rpx;
		color: #666666;
		padding: 4upx 0 10upx 0;
	}

	.uni-tag--success {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
		background-color: #59c092;
		border-width: 0.5px;
		border-style: solid;
		border-color: #59c092;
		width: 180upx;
		height: 66upx;
		display: flex;
		justify-content: center;
		align-items: center;
		float: right;
	}

	.uni-tag--error {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
		background-color: #db4254;
		border-width: 0.5px;
		border-style: solid;
		border-color: #db4254;
		width: 180upx;
		height: 66upx;
		display: flex;
		justify-content: center;
		align-items: center;
		float: right;
	}

	.col {
		font-size: 26rpx;
		color: #212121;
		flex: 1;
	}

	.light {
		// font-weight: bold;
		font-size: #212121;
		font-size: 30upx;
	}

	.r {
		text-align: center;
	}
}
</style>
