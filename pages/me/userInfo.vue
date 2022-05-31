<template>
	<view class="container">
		<view class="user-info-title">{{i18n.userInfo.title1}}</view>
		<view class="fast-cell-wrapper">
			<view class="cell-item">
				<text class="cell-title">{{i18n.userInfo.avatar}}</text>
				<view class="cell-item-right" @click="selectImg">
					<u-image :fade="false" :show-loading="false" width="95rpx" height="95rpx" border-radius="6rpx" :src="userData.avatar" />
				</view>
			</view>
			<view class="cell-item" @click="openPage('username')">
				<text class="cell-title">{{i18n.userInfo.username}}</text>
				<view class="cell-item-right">
					<text class="cell-tips">{{userData.name}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
			<view class="cell-item" style="border-bottom: none">
				<text class="cell-title">{{i18n.userInfo.phone}}</text>
				<view class="cell-item-right">
					<text class="cell-tips">{{userData.mobile}}</text>
					<!-- <u-icon name="arrow-right" color="#999" size="17" /> -->
				</view>
			</view>
		</view>
		<view class="user-info-title" style="margin-top: 90rpx;">{{i18n.userInfo.title2}}</view>
		<view class="fast-cell-wrapper" style="height: 220rpx;">
			<view class="cell-item" @click="openPage('email')">
				<text class="cell-title">{{i18n.userInfo.email}}</text>
				<view class="cell-item-right">
					<text class="cell-tips">{{userData.email}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
			<view class="cell-item" style="border-bottom: none" @click="openPage('password')">
				<text class="cell-title">{{i18n.userInfo.password}}</text>
				<view class="cell-item-right"><u-icon name="arrow-right" color="#999" size="17" /></view>
			</view>
		</view>
		
		<view class="fast-cell-wrapper" style="height: 110rpx;">
			<view class="cell-item" style="border-bottom: none" @click="changeLang">
				<text class="cell-title">{{i18n.userInfo.coin}}</text>
				<view class="cell-item-right">
					<text class="cell-tips" v-if="userData.currency">{{userData.currency.currency}}-{{userData.currency.symbol}}</text>
					<u-icon name="arrow-right" color="#999" size="17" />
				</view>
			</view>
		</view>
		<u-action-sheet :cancel-text="i18n.common.cancel" :border-radius="20" :list="currencysList" @click="clickLang"
			v-model="showLang"></u-action-sheet>
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
			currencysList: [],
			showLang: false
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.userInfo.title
		});
		this.getUserInfo();
		this.getAppConfig()
	},
	methods: {
		...mapActions('user', ['userInfo', 'appConfig', 'updateCurrency','updateAvatar']),
		// 获取用户信息
		getUserInfo() {
			this.userInfo().then(res => {
				this.userData = res.data;
			});
		},
		selectImg() {
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
							this.updateAvatar({avatar:data.full_url}).then(res=>{
								this.$u.toast(this.i18n.toast.updateAvatarSuccess);
								this.userData.avatar = data.full_url;
							})
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
		getAppConfig() {
			this.appConfig().then(res => {
				this.currencysList = res.data.currencys.map(v=> {
					return {
						text: v.currency
					}
				})
			});
		},
		changeLang() {
			this.showLang = true;
		},
		clickLang(index) {
			let currency = this.currencysList[index].text;
			this.updateCurrency({ currency }).then(res => {
				this.getUserInfo()
			})
		},
		openPage(type, item) {
			if (type === 'username') {
				uni.navigateTo({
					url: '/pages/public/username'
				});
			}
			if (type === 'email') {
				uni.navigateTo({
					url: '/pages/public/updateEmail'
				});
			}
			if (type === 'moblie') {
				uni.navigateTo({
					url: '/pages/public/updateMoblie'
				});
			}
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
	.user-info-title {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #212121;
	}
	.user-avatar {
		width: 95rpx;
		height: 95rpx;
		border-radius: 6rpx;
	}

	.fast-cell-wrapper {
		width: 698rpx;
		height: 330rpx;
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
			border-bottom: 1rpx solid #ececec;
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
				.cell-tips {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
					margin-right: 20rpx;
				}
			}
		}
	}
}
</style>
