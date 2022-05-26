<template>
	<view class="container">
		<view class="fast-cell-wrapper" v-for="(item, index) in helpList" @click="openPage(item)" :key="item.id">
			<view class="cell-item">
				<text class="cell-title">{{ item.title }}</text>
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
			helpList: []
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.home.newActivity
		});
		this.getArticleList();
	},
	methods: {
		...mapActions('common', ['getArticle']),
		// 获取用户信息
		getArticleList() {
			this.getArticle({ type: 'activity' }).then(res => {
				this.helpList = res.data.data;
			});
		},
		openPage(item) {
			uni.navigateTo({
				url: `/pages/public/webview?title=${item.title}&url=${item.url}`
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
		height: 110rpx;
		background: #ffffff;
		border-radius: 10rpx;
		margin: 32rpx auto;
		.cell-item {
			width: 698rpx;
			display: flex;
			height: 110rpx;
			align-items: center;
			justify-content: space-between;
			padding: 0 25rpx 0 37rpx;
			.cell-title {
				width: 500rpx;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
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
