<template>
	<view class="container">
		<view class="upload-wrapper">
			<view class="flex_center_box">
				<view class="recharge-img">{{ i18n.submitRecharge.rechargeImg }}</view>
				<uni-file-picker disable-preview :del-icon="false" return-type="object" @select="select" :image-styles="imageStyles">
					<u-image style="flex-shrink: 0;" :fade="false" src="/static/images/me/upload_img.png" width="129rpx" height="129rpx" />
				</uni-file-picker>
			</view>
			<view class="ex-img-wrapper" @click="handlePreview">
				<text style="width: 120rpx; color: #212121; margin-right: 20upx;">{{ i18n.submitRecharge.exImg }}</text>
				<u-image :src="rechargeInfo.recharge_res_demo" width="112upx" height="224upx">
					<u-loading slot="loading"></u-loading>
				</u-image>
			</view>
		</view>
		<view class="title-wrapper">
			<text>{{ i18n.submitRecharge.address }}</text>
			<u-image :show-loading="false" :fade="false" class="title-bg" src="/static/images/me/title_bg.png" width="144rpx" height="12rpx" mode="" />
		</view>
		<view class="input-wrapper">
			<input type="text" v-model="transfer_addr" placeholder-style="color: #B6B6B6;font-size: 26rpx;" :placeholder="i18n.submitRecharge.address" class="address-input" />
			<view class="copy-btn" @click="handlePaste">{{ i18n.submitRecharge.copyBtn }}</view>
		</view>
		<view class="btn-wrapper" style="padding: 0 30upx;">
			<view class="submit-btn" @click="handleSubmit">{{ i18n.submitRecharge.submitBtn }}</view>
			<view class="close-btn" @click="openPage('close')">{{ i18n.submitRecharge.closeBtn }}</view>
		</view>
		<view>
			<view class="note">{{ i18n.submitRecharge.note }}</view>
			<c-tips v-for="(item, index) in rechargeInfo.note" :text="item" :key="index" />
		</view>
		<u-popup v-model="show" mode="top" length="100%" closeable>
			<image class="recharge-res-demo" @click="show = false" :src="rechargeInfo.recharge_res_demo" mode="widthFix"></image>
		</u-popup>
		<view class="kf-icon"><u-image :fade="false" :show-loading="false" @click="openPage('kf')" src="/static/images/home/kf.png" width="127rpx" height="127rpx" /></view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';
// import UploadImages from '@/components/upload-images';
import UniFilePicker from '@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker';
export default {
	mixins: [commonMixin],
	components: {
		UniFilePicker
	},
	data() {
		return {
			tabIndex: 1,
			rechargeInfo: {},
			amount: null,
			coin_type: null,
			transfer_img: '',
			transfer_addr: null,
			imageStyles: {
				width: 64,
				height: 64
			},
			show: false
		};
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	onLoad(e) {
		this.amount = e.amount;
		this.coin_type = e.coin_type;
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.submitRecharge.title
		});
		this.loadData();
	},
	methods: {
		...mapActions('wallet', ['getFinaceInfo', 'financeRecharge']),
		...mapActions('common', ['uploadImg']),
		//请求数据
		async loadData() {
			this.getFinaceInfo({
				config: 'recharge'
			}).then(res => {
				this.rechargeInfo = res.data;
			});
		},
		select(e) {
			console.log('e', e);
			let file = e.tempFiles[0].file;
			let tempFilePaths = e.tempFilePaths;

			// 调用上传文件接口
			this.sendUpload(tempFilePaths[0]);
		},
		sendUpload(tempFilePaths) {
			// 拦截请求
			const lang = uni.getStorageSync('language');
			uni.showLoading();
			uni.uploadFile({
				url: this.$g.REQUEST_URL + '/api/upload',
				filePath: tempFilePaths,
				name: 'img',
				header: {
					'Accept-Language': lang ? lang.replace('_', '-') : 'zh-CN',
					Authorization: 'Bearer' + ' ' + uni.getStorageSync('token')
				},
				success: res => {
					console.log(res, 'res');
					uni.hideLoading();
					if (res.statusCode == 200) {
						if (JSON.parse(res.data).code == 200) {
							let data = JSON.parse(res.data).data;
							this.transfer_img = data.full_url;
							this.$u.toast(this.i18n.submitRecharge.uploadSuccess);
							console.log(data);
						} else {
							this.$u.toast(this.i18n.submitRecharge.uploadFail);
						}
					} else {
						this.$u.toast(this.i18n.submitRecharge.uploadFail);
					}
				},
				fail: err => {
					uni.hideLoading();
					console.log(err);
				}
			});
		},
		handleSubmit() {
			let params = {
				coin_type: this.coin_type,
				amount: this.amount,
				transfer_img: this.transfer_img,
				transfer_addr: this.transfer_addr
			};
			this.financeRecharge(params).then(res => {
				this.$u.toast(this.i18n.submitRecharge.rechargeSuccess);
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/wallet/record'
					});
				}, 1500);
			});
		},
		// 粘贴
		handlePaste() {
			uni.getClipboardData({
				success: res => {
					this.transfer_addr = res.data;
					console.log(res.data);
				}
			});
		},
		openPage(type) {
			if (type === 'kf') {
				uni.navigateTo({
					url: '/pages/me/kf'
				});
			}
			if (type === 'close') {
				uni.switchTab({
					url: '/pages/home/home'
				});
			}
		},
		handlePreview() {
			console.log('2222');
			this.show = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.upload-wrapper {
	padding: 100upx 100upx 50upx 60rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.ex-img-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	.ex-img {
		width: 112upx;
		height: 224upx;
	}
}
.btn-wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.title-wrapper {
	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #212121;
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
	margin: 60upx 0;
	.address-input {
		width: 511rpx;
		height: 76rpx;
		border: 2rpx solid #e9e9e9;
		border-radius: 4rpx;
		color: #212121;
		padding: 0 22upx;
	}
	.copy-btn {
		width: 153rpx;
		height: 76rpx;
		border: 2rpx solid #0072ff;
		border-radius: 38rpx;
		color: #0072ff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
	}
}

.submit-btn {
	width: 328rpx;
	height: 76rpx;
	background: #0072ff;
	border-radius: 38rpx;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	line-height: 24rpx;
	padding: 0 20rpx;
	text-align: center;
}

.close-btn {
	width: 328rpx;
	height: 76rpx;
	border: 2rpx solid #acacac;
	border-radius: 38rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	color: #acacac;
}

.note {
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #212121;
	margin: 30upx;
	margin-top: 60upx;
}

.recharge-img {
	width: 130rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #212121;
	margin-right: 30upx;
}
.recharge-res-demo {
	width: 100%;
	// height: auto;
	// height: 100%;
}
.kf-icon {
	position: fixed;
	bottom: 80upx;
	right: 30upx;
}
</style>
