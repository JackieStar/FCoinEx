<template>
	<view class="container">
		<view class="fast-cell-wrapper" v-for="(item, index) in kefuList" @click="openPage(item)" :key="item.id">
			<view class="cell-item">
				<view class="cell-item-left">
					<u-image :src="item.icon" shape="circle" width="100rpx" height="100rpx"  />
					<text class="cell-title">{{ item.name }}</text>
				</view>
				<view class="cell-item-right"><u-icon name="arrow-right" color="#999" size="17" /></view>
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
			kefuList: []
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.me.kf
		});
		this.getKefuList();
	},
	methods: {
		...mapActions('common', ['getKefu']),
		// 获取用户信息
		getKefuList() {
			this.getKefu().then(res => {
				this.kefuList = res.data;
			});
		},
		openPage(item) {
			uni.navigateTo({
				url: `/pages/public/webview?title=${item.name}&url=${item.link}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 26rpx;
	.fast-cell-wrapper {
		width: 698rpx;
		height: 160rpx;
		background: #ffffff;
		border-radius: 10rpx;
		margin: 32rpx auto;
		.cell-item {
			width: 698rpx;
			display: flex;
			height: 160rpx;
			align-items: center;
			justify-content: space-between;
			padding: 0 25rpx 0 37rpx;
			.cell-item-left {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.cell-title {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #212121;
					margin-left: 20rpx;
				}
			}
			
			.cell-item-right {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
}
</style>
