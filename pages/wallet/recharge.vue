<template>
	<view class="container">
		<view class="market-header">
			<u-icon class="arrow-left" @click="openPage(0)" name="arrow-left" color="#ffffff" size="44" />
			<view class="market-text">{{ i18n.recharge.title }}</view>
			<image @click="openPage(1)" src="../../static/images/wallet/list.png" class="right-icon" />
		</view>
		<view class="user-info">
			<image :src="loginInfo.avatar" class="user-avatar" />
			<view class="info">
				<text>{{ rechargeInfo.coin }}</text>
				<view>{{ i18n.withdraw.network }}：{{ rechargeInfo.coin_type }}</view>
			</view>
		</view>
		<image class="user-bg" src="../../static/images/wallet/bg.png" />
		<view class="code-wrapper">
			<image :src="rechargeInfo.recharge_qr" class="code-img" />
			<view class="save-code" @click="saveImg(rechargeInfo.recharge_qr)">{{i18n.recharge.saveCode}}</view>
		</view>
		<view class="title">
			<text>{{ i18n.recharge.rechargeAddr }}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
		</view>
		<view class="input-wrapper">
			<text class="address-input">{{ rechargeInfo.recharge_addr }}</text>
			<view class="copy-btn" @click="handleCopy">{{ i18n.recharge.copyBtn }}</view>
		</view>
		<view class="title">
			<text>{{ i18n.recharge.amount }}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-bg.png" width="144upx" height="12upx" mode="" />
		</view>
		<view class="money-wrapper">
			<input type="number" v-model="amount" class="money-input" placeholder-style="color: #454D73;font-size: 26upx;" :placeholder="i18n.recharge.placeholder" />
		</view>
		<view><c-tips v-for="(item, index) in rechargeInfo.tips" :text="item" :key="index" /></view>
		<view class="confirm-btn" @click="openPage(3)">{{ i18n.recharge.submitBtn }}</view>
	</view>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
import { uniIcons } from '@dcloudio/uni-ui';
import { commonMixin } from '@/common/mixin/mixin.js';
import CTips from '@/components/c-tips/c-tips.vue';
export default {
	components: { tkiQrcode, uniIcons, CTips },
	mixins: [commonMixin],
	data() {
		return {
			rechargeInfo: {},
			amount: null
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.recharge.title
		});
		this.loadData();
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	methods: {
		...mapActions('wallet', ['getFinaceInfo']),
		//请求数据
		async loadData() {
			this.getFinaceInfo({ config: 'recharge' }).then(res => {
				this.rechargeInfo = res.data;
			});
		},
		save() {
			this.$refs.qrcode._saveCode();
		},
		handleCopy() {
			let $this = this;
			uni.setClipboardData({
				data: this.rechargeInfo.recharge_addr,
				success: function() {
					$this.$api.msg($this.toast.copySuccess);
				}
			});
		},
		openPage(type) {
			console.log('type', type);
			if (type === 0) uni.navigateBack();
			if (type === 1) {
				uni.navigateTo({
					url: '/pages/wallet/record'
				});
			}
			if (type === 3) {
				if (!this.amount) return this.$api.msg('请填写充值金额');
				uni.navigateTo({
					url: '/pages/wallet/submitRecharge?amount=' + this.amount
				});
			}
		},
		// 保存图片
		saveImg(url) {
			const lang = uni.getStorageSync('language');
			uni.downloadFile({
				url,
				header: {
					'Accept-Language': lang ? lang.replace("_", "-") : 'zh-CN',
					'Authorization': 'Bearer' + ' ' + uni.getStorageSync('token')
				},
				success: res => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: ()=> {
								this.$api.msg('保存成功');
							},
							fail: () => {
								this.$api.msg('保存失败，请稍后重试');
							}
						});
					} else {
						this.$api.msg('保存失败，请稍后重试');
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 20upx 0 100upx 0;
	.market-header {
		width: 100%;
		height: 88upx;
		text-align: center;
		left: 0;
		top: 0;
		right: 0;
		background-color: #070219;
		padding: 0 41upx;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 1000;
		.market-text {
			height: 80upx;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
			line-height: 88upx;
		}
		.right-icon {
			width: 35upx;
			height: 40upx;
		}
	}
	.user-info {
		width: 100%;
		display: flex;
		margin-top: 83upx;
		padding-left: 50upx;
		.user-avatar {
			width: 112upx;
			height: 112upx;
			margin-right: 38upx;
			border-radius: 50%;
		}
		.info {
			display: flex;
			flex-direction: column;
			text {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ffffff;
				margin-top: 14upx;
			}
			view {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #85a0b2;
				margin-top: 5upx;
			}
		}
	}
	.user-bg {
		width: 750upx;
		height: 171upx;
		margin-top: -50upx;
	}
	.code-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 20upx;
		.code-img {
			width: 280upx;
			height: 280upx;
			margin-top: 30upx;
		}
		.save-code {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #c2d6e4;
			margin-top: 30upx;
		}
	}
	.title {
		width: 100%;
		height: 28upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
		padding: 0 26upx;
		display: flex;
		flex-direction: column;
		text {
			margin-left: 6upx;
			z-index: 10;
		}
		.title-bg {
			margin-top: -30upx;
		}
	}
	.input-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 29upx;
		margin: 40upx 0;
		.address-input {
			width: 480upx;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 400;
			text-decoration: underline;
			color: #fff;
			margin-left: 20upx;
			word-break: break-all;
		}
		.copy-btn {
			width: 154upx;
			height: 70upx;
			line-height: 70upx;
			background: url(../../static/images/wallet/copy-btn.png);
			background-size: 100% 100%;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26upx;
		}
	}
	.money-wrapper {
		width: 100%;
		padding: 0 29upx;
		margin: 40upx 0;
		.money-input {
			width: 690upx;
			padding: 0 30upx;
			height: 76upx;
			border: 2upx solid #554472;
			border-radius: 4upx;
			color: #fff;
		}
	}
	.confirm-btn {
		width: 610upx;
		height: 76upx;
		line-height: 76upx;
		margin: 50upx auto;
		background: url(../../static/images/public/login-btn.png);
		background-size: 100% 100%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
	}
}
</style>
