<template>
	<view class="container">
		<view class="no-data-wrapper">
			<u-image src="../../static/images/me/no_data.png" width="543rpx" height="481rpx" />
			<view class="no-data">还未添加地址，马上去添加吧</view>
		</view>
		<view class="add-btn-wrapper">
			<view class="add-btn" @click="handleAdd">添加</view>
		</view>
		<u-popup v-model="showModal" closeable mode="bottom" class="account-modal" :border-radius="20" height="770rpx">
			<view class="modal-title">添加收款账号</view>
			<view class="modal-line-title">{{ i18n.withdraw.emailCode }}</view>
			<view class="network-input">
				<u-field :border-bottom="false" @click="handleShowAction" v-model="form.network" :disabled="true" placeholder="请选择网络" right-icon="arrow-down-fill" />
				<u-action-sheet border-radius="20" @click="clickItem" :list="sexList" v-model="showAction"></u-action-sheet>
			</view>
			<view class="modal-line-title">收款地址</view>
			<view class="modal-input-wrapper">
				<input
					class="input-item"
					placeholder-style="color: #818FA; font-size: 26upx"
					v-model="form.email_code"
					:placeholder="i18n.withdraw.placeholder"
					maxlength="10"
					style="padding-right: 150upx;"
					type="text"
				/>
				<view class="copy-btn" @click="handleCopy">粘贴</view>
			</view>
			<view class="modal-line-title">备注</view>
			<view class="modal-input-wrapper">
				<input
					class="input-item"
					placeholder-style="color: #818FA; font-size: 26upx"
					v-model="form.password"
					:placeholder="i18n.withdraw.placeholder1"
				/>
			</view>
			<view class="submit-btn" @click="handleSubmit">{{ i18n.withdraw.submitBtn }}</view>
		</u-popup>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';

export default {
	mixins: [commonMixin],
	data() {
		return {
			userData: {},
			showModal: false,
			seconds: 60,
			tips: '',
			form: {
				network: null,
				password: null
			},
			showAction: false,
			sexList: [
				{
					text: '男',
				},
				{
					text: '女'
				},
				{
					text: '保密'
				}
			],
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.me.kf
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
		handleAdd() {
			this.showModal = true
		},
		handleShowAction() {
			this.showAction = true
		},
		openPage(type, item) {
			if (type === 'password') {
				uni.navigateTo({
					url: '/pages/public/password'
				});
			}
		},
		clickItem() {
			
		},
		handleCopy() {	}
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	.no-data-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 200rpx;
		.no-data {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			margin-top: 20rpx;
		}
	}
	.add-btn-wrapper {
		position: fixed;
		width: 100%;
		bottom: 62rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.add-btn {
			width: 328rpx;
			height: 76rpx;
			background: #0079FF;
			border-radius: 38rpx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.account-modal {
		width: 694rpx;
		margin: 0 auto;
		margin-bottom: 30upx;
		::v-deep .u-drawer-bottom {
			background-color: #fff;
		}
		.modal-title {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
			margin: 40upx 0 20rpx 20rpx;
			padding-left: 10rpx;
			line-height: 30rpx;
			border-left: 8rpx solid #0072FF;
		}
		.modal-line-title {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
			margin-left: 38rpx;
			margin-bottom: 20rpx;
			margin-top: 50rpx;
		}
		.network-input  {
			width: 619rpx;
			height: 74rpx;
			background: #FFFFFF;
			border: 1rpx solid #E9E9E9;
			border-radius: 10rpx;
			margin: 20rpx auto;
		}
		.modal-input-wrapper {
			width: 638upx;
			height: 74upx;
			background-size: 100% 100%;
			margin-left: 30upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		
			.input-item {
				width: 490rpx;
				height: 74rpx;
				background: #FFFFFF;
				border: 1rpx solid #E9E9E9;
				border-radius: 10rpx;
				padding: 0 20rpx;
			}
			.copy-btn {
				width: 100rpx;
				height: 74rpx;
				line-height: 74rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #0079FF;
			}
		}
		.submit-btn {
			width: 590rpx;
			height: 76rpx;
			background: #0079FF;
			border-radius: 38rpx;
			margin: 46upx auto;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
		}
	}
	
	
}
</style>
