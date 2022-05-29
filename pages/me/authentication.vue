<template>
	<view class="index-page">
		<view class="head-tab" :style="{ height: (height + statusBarHeight) + 'px'}">
			<view class="u-status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
			<view :style="{ height: height + 'px','line-height':height+'px',top:statusBarHeight+'px'}"
				class="head-title">
				<image @click="goBack" style="width: 48rpx; height: 48rpx;margin-left: 32rpx;"
					src="../../static/images/auth/to-back.png" mode=""></image>
				<view class="head-flex-text">
					{{i18n.auth.pageTitle}}
				</view>
				<view class="" style="width: 80rpx;height: 30rpx;">

				</view>
			</view>
			<image class="bg-color-box" src="../../static/images/auth/top-bg.png" mode=""></image>
		</view>

		<view class="home-page-bg">
			<view class="fixed-head">
				<view :style="{ width: '100%', height: Number(height) + statusBarHeight + 'px' }"></view>
				<image class="bg-color-box" src="../../static/images/auth/top-bg.png" mode=""></image>
				<view class="main-box">
					<view class="auth-tips-head flex_center_box">
						<image class="tips-icon" src="../../static/images/auth/icon.png" mode=""></image>
						<view class="tips">
							{{i18n.auth.tipsTop}}
							<!-- Protect your privacy -->
						</view>
						<image class="tips-icon" src="../../static/images/auth/icon.png" mode=""></image>
					</view>
					<view class="auth-form-content">
						<view class="auth-form-label">
							{{i18n.auth.realname}}
						</view>
						<view class="input-wrapper">
							<input type="text" :disabled="status==1||status==0" v-model="real_name"
								placeholder-style="color: #CECECE;font-size: 24rpx;" :placeholder="i18n.auth.nameInput"
								class="input-box" />
						</view>
						<view class="auth-form-label">
							{{i18n.auth.idNum}}
						</view>
						<view class="input-wrapper">
							<input type="text" :disabled="status==1||status==0" v-model="cardId"
								placeholder-style="color: #CECECE;font-size: 24rpx;" :placeholder="i18n.auth.idInput"
								class="input-box" />
						</view>
						<view class="auth-form-label">
							{{i18n.auth.cardImg}}
						</view>
						<view class="auth-image-box" @click="selectImg">
							<image v-if="!auth_img" class="auth-image" src="../../static/images/auth/upload-cer.png"
								mode=""></image>
							<u-image v-if="auth_img" width="282rpx" height="163rpx" border-radius="4rpx"
								:src="auth_img" />
						</view>
						<view v-if="status>=0" class="auth-status flex_left_box">
							<view class="status-label">
								{{i18n.auth.status}}：
							</view>
								<view v-if="status==0" class="status-result">
								{{i18n.auth.statusText1}}
							</view>
							<view v-if="status==1" class="status-result">
								{{i18n.auth.statusText2}}
							</view>
							<view v-if="status==2" class="status-fail">
								{{i18n.auth.statusText3}}{{fail_reason?'; ':''}}{{fail_reason}}
							</view>
						</view>
					</view>
					<view v-if="status && (status==-1||status==2)" class="auth-submit" @click="handleSubmit">
						{{i18n.auth.submit}}
					</view>
					<view class="footer-tips-box">
						<view class="footer-tips-title">
							{{i18n.auth.tipsTitle}}:
						</view>
						<view class="footer-tips-text">
							{{i18n.auth.tips1}}
						</view>
						<view class="footer-tips-text">
							{{i18n.auth.tips2}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		commonMixin
	} from '@/common/mixin/mixin.js';
	import {
		mapActions
	} from 'vuex';
	export default {
		mixins: [commonMixin],
		data() {
			return {
				height: 44,
				statusBarHeight: 10,
				real_name: '',
				cardId: '',
				auth_img: '',
				status: -1,
				fail_reason: ''
			};
		},
		onShow() {

		},
		onLoad() {
			let systemInfo = uni.getSystemInfoSync();
			this.statusBarHeight = systemInfo.statusBarHeight
			let height = systemInfo.platform == 'ios' ? 44 : 48;
			this.height ? this.height : height;
			this.getAuthInfo()
		},
		methods: {
			...mapActions('user', ['authInfo', 'authSave']),
			goBack() {
				// 点击头部返回
				if (getCurrentPages().length === 1) {
					uni.reLaunch({
						url: '/pages/home/home'
					})
				} else {
					uni.navigateBack({})
				}
			},
			selectImg() {
				if (this.status != -1 || this.status == 2) {
					return
				}
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['camera', 'album'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// 调用上传文件接口
						_this.sendUpload(tempFilePaths[0]);

					},
					fail: (err) => {
						console.log(err)
					}
				});
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
								this.auth_img = data.full_url;
								this.$u.toast(this.i18n.auth.uploadSuccess);
								console.log(data);
							} else {
								this.$u.toast(this.i18n.auth.uploadFail);
							}
						} else {
							this.$u.toast(this.i18n.auth.uploadFail);
						}
					},
					fail: err => {
						uni.hideLoading();
						console.log(err);
					}
				});
			},
			getAuthInfo() {
				this.authInfo().then(res => {
					if (res && res.code == 200) {
						this.real_name = res.data.realname
						this.auth_img = res.data.id_photo
						this.cardId = res.data.id_number
						this.status = res.data.status
						this.fail_reason = res.data.fail_reason
					}
				})
			},
			handleSubmit() {
				if (!this.real_name) {
					this.$u.toast(this.i18n.auth.nameInput)
					return
				}
				if (!this.cardId) {
					this.$u.toast(this.i18n.auth.idInput)
					return
				}
				if (!this.auth_img) {
					this.$u.toast(this.i18n.auth.cardImgTips)
					return
				}
				let params = {
					realname: this.real_name,
					id_number: this.cardId,
					id_photo: this.auth_img
				};
				this.authSave(params).then(res => {
					console.log(res)
					this.$u.toast(res.message)
					this.getAuthInfo()
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #F6F6F6;
	}

	.index-page {
		font-size: 0;
	}

	.home-page-bg {
		overflow: scroll;
		// position: relative;
		// z-index: 20;
	}

	.bg-color-box {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 400rpx;
		z-index: 10;
	}

	.head-tab {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 30;
		// overflow: hidden;
	}

	.head-title {
		width: 100%;
		position: absolute;
		left: 0;
		z-index: 20;
		font-size: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.head-flex-text {
			flex: 1;
			text-align: center;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}

	.fixed-head {
		width: 100%;
		// z-index: 30;
	}

	.main-box {
		padding-top: 80rpx;
		position: relative;
		z-index: 30;

		.auth-tips-head {
			.tips-icon {
				width: 26rpx;
				height: 18rpx;
			}

			.tips {
				padding: 0 6rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}

		.auth-form-content {
			width: 698rpx;
			background: #FFFFFF;
			margin: auto;
			margin-top: 34rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 36rpx;

			.auth-form-label {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
			}

			.input-wrapper {
				margin-top: 8rpx;

				.input-box {
					width: 100%;
					height: 76rpx;
					border-bottom: 1rpx solid #EDEDED;
					margin-bottom: 48rpx;
					color: #212121;
					padding: 16rpx 0;
				}
			}

			.auth-image-box {
				margin-top: 25rpx;

				.auth-image {
					width: 282rpx;
					height: 163rpx;
				}
			}

			.auth-status {
				margin-top: 32rpx;

				.status-label {
					flex-shrink: 0;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					height: 68rpx;
					line-height: 68rpx;
					color: #212121;
				}

				.status-result {
					// width: 157rpx;
					padding: 0 12rpx;
					height: 68rpx;
					font-size: 30rpx;
					background: #0072FF;
					border-radius: 10rpx;
					color: #FFFFFF;
					text-align: center;
					line-height: 68rpx;
				}

				.status-fail {
					padding: 14rpx 12rpx;
					// height: 68rpx;
					font-size: 30rpx;
					background: #FF1E00;
					border-radius: 10rpx;
					color: #FFFFFF;
					// text-align: center;
					// line-height: 68rpx;
				}
			}
		}

		.auth-submit {
			width: 583rpx;
			height: 84rpx;
			margin: auto;
			margin-top: 48rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			text-align: center;
			line-height: 84rpx;
			border-radius: 42rpx;
			color: #FFFFFF;
			background-color: #0072FF;
		}

		.footer-tips-box {
			margin-top: 48rpx;
			margin-bottom: 48rpx;
			width: 100%;
			padding: 0 27rpx;
			box-sizing: border-box;

			.footer-tips-title {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 48rpx;
			}

			.footer-tips-text {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 48rpx;
			}
		}
	}
</style>
