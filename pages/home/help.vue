<template>
	<view class="container">
		<view class="fast-cell-wrapper">
			<view class="cell-item" @click="openPage('password')">
				<text class="cell-title">{{i18n.userInfo.password}}</text>
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
			userData: {}
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.home.help
		});
		this.getUserInfo();
	},
	methods: {
		...mapActions('user', ['userInfo']),
		// 获取用户信息
		getUserInfo() {
			this.userInfo().then(res => {
				this.userData = res.data;
			});
		},
		openPage(type, item) {
			if (type === 'password') {
				uni.navigateTo({
					url: '/pages/public/password'
				});
			}
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
