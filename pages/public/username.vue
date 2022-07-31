<template>
	<view class="container">
		<view class="input-wrapper">
			<input class="input-item" placeholder-style="color: #4F5B87; font-size: 26upx" v-model="name" :placeholder="i18n.updateName.placeholder" maxlength="10" type="text" />
			<text class="num">{{ name.length }}/10</text>
		</view>
		<view class="tips">{{ i18n.updateName.tips }}</view>
		<view @click="handleSubmit" class="confirm-btn">{{ i18n.updateName.btn }}</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	mixins: [commonMixin],
	data() {
		return {
			name: ''
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.updateName.title
		});
	},
	methods: {
		...mapActions('user', ['updateUserName']),
		handleSubmit() {
			this.updateUserName({ name: this.name }).then(res => {
				this.$u.toast(this.i18n.toast.updateNameSuccess);
				uni.redirectTo({
					url: '/pages/me/userInfo'
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.input-wrapper {
	.input-item {
		width: 690rpx;
		height: 90rpx;
		background: #ffffff;
		border: 1rpx solid #e9e9e9;
		border-radius: 10rpx;
		padding: 0 30rpx;
		margin: 40rpx auto;
	}
	.num {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #4f5b87;
		float: right;
		margin-top: -100upx;
		margin-right: 46upx;
	}
}

.tips {
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #4f5b87;
	margin-left: 60upx;
	margin-bottom: 115upx;
}
.confirm-btn {
	width: 630rpx;
	height: 74rpx;
	margin-top: 40upx;
	margin: 40upx auto;
	border-radius: 40rpx;
	background: #0079ff;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26upx;
}
.bg {
	position: absolute;
	bottom: 40upx;
	right: 0;
	width: 350upx;
	height: 412upx;
}
</style>
