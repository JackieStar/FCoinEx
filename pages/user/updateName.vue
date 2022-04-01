<template>
	<view class="container">
		<view class="input-wrapper">
			<input class="input-item" placeholder-style="color: #4F5B87; font-size: 26upx" v-model="username" :placeholder="i18n.updateName.placeholder" maxlength="10" type="text" />
			<text class="num">{{username.length}}/10</text>
		</view>
		<view class="tips">{{ i18n.updateName.tips }}</view>
		<view @click="handleSubmit" class="confirm-btn">{{ i18n.updateName.btn }}</view>
		<image src="../../static/images/public/update-name.png" class="bg"></image>
	</view>
</template>

<script>
import { commonMixin } from '@/common/mixin/mixin.js';
export default {
	mixins: [commonMixin],
	data() {
		return {
			username: ''
		};
	},
	methods: {
		handleSubmit() {}
	}
};
</script>

<style lang="scss" scoped>
	.input-wrapper {
		.num {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #4F5B87;
			float: right;
			margin-top: -94upx;
			margin-right: 46upx;
		}
	}
.input-item {
	border: 2upx solid #232e55;
	border-radius: 4upx;
	margin: 70upx auto 34upx auto;
	width: 690upx;
	height: 88upx;
	padding: 0 32upx;
	color: #fff;
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
	width: 630upx;
	height: 76upx;
	line-height: 76upx;
	margin-top: 40upx;
	margin: 40upx auto;
	background: url(../../static/images/public/login-btn.png);
	background-size: 100% 100%;
	color: #fff;
	font-size: $font-lg;
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
