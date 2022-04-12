<template>
	<view class="container">
		<view class="upload-wrapper" flex="main:justify cross:center">
			<view>
				<uni-file-picker disable-preview :del-icon="false" return-type="object" @select="select"
					:image-styles="imageStyles">
					<u-image src="../../static/images/wallet/upload_plus.png" width="126upx" height="126upx" />
				</uni-file-picker>
				<view class="recharge-img">{{i18n.submitRecharge.rechargeImg}}</view>
			</view>
			<view flex="main:center cross:center" @click="handlePreview">
				<text style="color: #fff; margin-right: 20upx;">{{i18n.submitRecharge.exImg}}</text>
				<u-image :src="rechargeInfo.recharge_res_demo" width="112upx" height="224upx" />
			</view>
		</view>
		<view class="title">
			<text>{{i18n.submitRecharge.address}}</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx"
				mode="" />
		</view>
		<view class="input-wrapper">
			<input type="text" v-model="transfer_addr" class="address-input" />
			<view class="copy-btn" @click="handlePaste">{{i18n.submitRecharge.copyBtn}}</view>
		</view>
		<view flex="main:justify cross:center" style="padding: 0 30upx;">
			<view class="submit-btn" @click="handleSubmit">{{i18n.submitRecharge.submitBtn}}</view>
			<view class="close-btn" @click="openPage">{{i18n.submitRecharge.closeBtn}}</view>
		</view>
		<view>
			<view class="note">{{i18n.submitRecharge.note}}</view>
			<c-tips v-for="(item,index) in rechargeInfo.note" :text="item" :key="index" />
		</view>
		<u-popup v-model="show" mode="top" length="100%" closeable>
			<image class="recharge-res-demo" @click="show = false" :src="rechargeInfo.recharge_res_demo" mode=""></image>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	import {
		commonMixin
	} from '@/common/mixin/mixin.js';
	// import UploadImages from '@/components/upload-images';
	import UniFilePicker from '@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker'
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
				transfer_img: '',
				transfer_addr: null,
				imageStyles: {
					width: 64,
					height: 64
				},
				show: false,
			};
		},
		computed: {
			...mapState('user', ['loginInfo'])
		},
		onLoad(e) {
			this.amount = e.amount
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.submitRecharge.title
			});
			this.loadData()
		},
		methods: {
			...mapActions('wallet', ['getFinaceInfo', 'financeRecharge']),
			...mapActions('common', ['uploadImg']),
			//请求数据
			async loadData() {
				this.getFinaceInfo({
					config: 'recharge'
				}).then(res => {
					this.rechargeInfo = res.data
				})
			},
			select(e) {
				console.log('e', e)
				let file = e.tempFiles[0].file
				let tempFilePaths = e.tempFilePaths

				// 调用上传文件接口
				this.sendUpload(tempFilePaths[0])
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
						'Accept-Language': lang ? lang.replace("_", "-") : 'zh-CN',
						'Authorization': 'Bearer' + ' ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res, 'res')
						uni.hideLoading();
						if (res.statusCode == 200) {
							if (JSON.parse(res.data).code == 200) {
								let data = JSON.parse(res.data).data
								this.transfer_img = data.full_url
								this.$u.toast(this.i18n.submitRecharge.uploadSuccess)
								console.log(data)
							} else {
								this.$u.toast(this.i18n.submitRecharge.uploadFail)
							}

						} else {
							this.$u.toast(this.i18n.submitRecharge.uploadFail)
						}
					},
					fail: (err) => {
						uni.hideLoading();
						console.log(err)
					}
				});
			},
			handleSubmit() {
				let params = {
					coin_type: 'USDT-TRC20',
					amount: this.amount,
					transfer_img: this.transfer_img,
					transfer_addr: this.transfer_addr
				}
				this.financeRecharge(params).then(res => {
					this.$u.toast(this.i18n.submitRecharge.rechargeSuccess)
					setTimeout(()=> {
						uni.switchTab({
							url: '/pages/wallet/wallet'
						})
					}, 1500);
				})
			},
			// 粘贴
			handlePaste() {
				uni.getClipboardData({
					success: (res) => {
						this.transfer_addr = res.data
						console.log(res.data);
					}
				})
			},
			openPage() {
				uni.navigateBack()
			},
			handlePreview() {
				console.log('2222')
				this.show = true
			}
		},

	};
</script>

<style lang="scss" scoped>
	.upload-wrapper {
		padding: 100upx 130upx 50upx 153upx;
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
			width: 511upx;
			height: 76upx;
			border: 2upx solid #554472;
			border-radius: 4upx;
			color: #fff;
			padding: 0 22upx;
		}

		.copy-btn {
			width: 153upx;
			height: 76upx;
			line-height: 76upx;
			background: url(../../static/images/public/login-btn.png);
			background-size: 100% 100%;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26upx;
		}
	}

	.submit-btn {
		width: 328upx;
		height: 76upx;
		line-height: 76upx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		background: linear-gradient(90deg, #3fbbfe, #a541ff);
		border-radius: 4px;
	}

	.close-btn {
		width: 328upx;
		height: 76upx;
		line-height: 76upx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		background: url(../../static/images/public/login-btn.png);
		background-size: 100% 100%;
		color: #fff;
		font-size: 26upx;
	}

	.note {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin: 30upx;
		margin-top: 130upx;
	}

	.recharge-img {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin-top: 16upx;
		margin-left: -10upx;
	}
	.recharge-res-demo {
		width: 100%;
		height: 100%;
	}
</style>
