<template>
	<view class="container">
		<u-navbar :title="i18n.recharge.title">
			<view class="slot-wrap"><view class="nav-btn" @click="openPage('list')"></view></view>
		</u-navbar>
		<view class="coin-wrapper">
			<view class="coin-item" @click="handleChange(index, item)" :class="{ active: itemIndex == index }" v-for="(item, index) in rechargeInfo.coin_types" :key="index">
				<u-image :fade="false" :show-loading="false" class="coin-img" :src="item.icon" width="34rpx" height="34rpx" />
				<text>{{ item.coin_type }}</text>
			</view>
		</view>
		<view class="title-wrapper">
			<text>{{ i18n.withdraw.network }}</text>
			<u-image :fade="false" class="title-bg" :show-loading="false" src="/static/images/me/title_bg.png" width="74rpx" height="12rpx" />
		</view>
		<view class="network">{{ coinType.coin_type }}</view>
		<view class="code-wrapper">
			<img :src="coinType.qrcode" class="code-img" />
			<!-- #ifdef H5 -->
			<view class="save-code">{{ i18n.recharge.saveImg }}</view>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<view class="save-code" @click="saveImg(coinType.qrcode)">{{ i18n.recharge.saveCode }}</view>
			<!-- #endif -->
		</view>
		<view class="title-wrapper">
			<text>{{ i18n.recharge.rechargeAddr }}</text>
			<u-image :fade="false" class="title-bg" :show-loading="false" src="/static/images/me/title_bg.png" width="144rpx" height="12rpx" />
		</view>
		<view class="input-wrapper">
			<text class="address-input">{{ coinType.addr }}</text>
			<view class="copy-btn" @click="handleCopy">{{ i18n.recharge.copyBtn }}</view>
		</view>
		<view class="title-wrapper">
			<text>{{ i18n.recharge.amount }}</text>
			<u-image :fade="false" class="title-bg" :show-loading="false" src="/static/images/me/title_bg.png" width="144rpx" height="12rpx" />
		</view>
		<view class="money-wrapper">
			<input type="number" v-model="amount" class="money-input" placeholder-style="color: #B6B6B6;font-size: 26rpx;" :placeholder="i18n.recharge.placeholder" />
		</view>
		<view class="confirm-btn" @click="openPage('recharge')">{{ i18n.recharge.submitBtn }}</view>
		<view><c-tips v-for="(item, index) in rechargeInfo.tips" :text="item" :key="index" /></view>
		<view class="bottom-submit" @click="openPage('bottom')">
			<text>{{ i18n.recharge.bottomSubmit }}</text>
		</view>
		<view class="kf-icon"><u-image :fade="false" :show-loading="false" @click="openPage('kf')" src="/static/images/home/kf.png" width="127rpx" height="127rpx" /></view>
		<u-popup v-model="show" mode="center" border-radius="20" closeable>
			<view class="coupon-wrapper">
				<view class="coupon-title">{{ i18n.recharge.title }}</view>
				<view class="coupon-txt-wrapper">
					<view class="coupon-txt">
						{{ i18n.recharge.network }}：
						<text style="color:#666666">{{ coinType.coin_type }}</text>
					</view>
					<view class="coupon-txt">
						{{ i18n.recharge.amount }}：
						<text style="color:#666666">{{ amount }}{{ coinType.symbol }}</text>
					</view>
					<view class="coupon-txt">
						<text>{{ i18n.recharge.getAmount }}：</text>
						<text class="get-amount" style="color:#FF2929">
							{{ target_amount }}$
							<text v-if="appData.currency && appData.currency.currency !== 'USD'" style="font-size: 24rpx;">
								≈{{ appData.currency.currency }}-{{ appData.currency.symbol }}{{ (Number(target_amount) * Number(appData.currency.rate)).toFixed(2) }}
							</text>
						</text>
					</view>
				</view>

				<view class="coupon-btn" @click="handleSubmit">{{ i18n.submitRecharge.submitBtn }}</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';
import CTips from '@/components/c-tips/c-tips.vue';
export default {
	components: {
		CTips
	},
	mixins: [commonMixin],
	data() {
		return {
			rechargeInfo: {},
			coinType: {},
			itemIndex: 0,
			amount: null,
			show: false,
			appData: {},
			target_amount: null
		};
	},
	onShow() {
		this.loadData();
		this.getUserInfo();
		uni.setNavigationBarTitle({
			title: this.i18n.recharge.title
		});
	},
	methods: {
		...mapActions('wallet', ['getFinaceInfo', 'financeRecharge']),
		...mapActions('user', ['userInfo']),
		...mapActions('common', ['exchange']),
		//请求数据
		async loadData() {
			this.getFinaceInfo({
				config: 'recharge'
			}).then(res => {
				this.rechargeInfo = res.data;
				this.coinType = res.data.coin_types[0];
			});
		},
		getUserInfo() {
			this.userInfo().then(res => {
				this.appData = res.data;
			});
		},
		// 切换币种
		handleChange(e, item) {
			this.itemIndex = e;
			this.coinType = item;
		},
		getExchange(item) {
			let params = {
				coin_type: this.coinType.coin_type,
				amount: this.amount,
				target_coin_type: 'USD'
			};
			this.exchange(params).then(res => {
				console.log('res', res);
				this.target_amount = res.data.target_amount;
				this.show = true;
			});
		},

		handleCopy() {
			let $this = this;
			uni.setClipboardData({
				data: this.coinType.addr,
				success: function() {
					$this.$api.msg($this.i18n.toast.copySuccess);
				}
			});
		},
		openPage(type) {
			if (type === 'list') {
				uni.navigateTo({
					url: '/pages/wallet/record'
				});
			}
			if (type === 'kf') {
				uni.navigateTo({
					url: '/pages/me/kf'
				});
			}
			if (type === 'bottom') {
				window.open(this.rechargeInfo.usdt_recharge_url);
				// uni.navigateTo({
				// 	url: `/pages/public/webview?url=${this.rechargeInfo.usdt_recharge_url}`
				// });
			}
			if (type === 'recharge') {
				if (!this.amount) return this.$api.msg(this.i18n.recharge.placeholder);
				this.getExchange();
			}
		},
		// 确认充值
		handleSubmit() {
			this.show = false;
			let params = {
				coin_type: this.coinType.coin_type,
				amount: this.amount
			};
			this.financeRecharge(params).then(res => {
				this.$u.toast(this.i18n.submitRecharge.rechargeSuccess);
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/wallet/record'
					});
				}, 1500);
			});
			// uni.navigateTo({
			// 	url: `/pages/me/submitRecharge?amount=${this.amount}&coin_type=${this.coinType.coin_type}`
			// });
		},
		// 保存图片
		saveImg(url) {
			const that = this;
			uni.showLoading({
				title: that.i18n.recharge.saveLoading
			});

			uni.downloadFile({
				url: url,
				success: res => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.hideLoading();
								that.$api.msg(that.i18n.recharge.saveSuccess);
							},
							fail: function() {
								uni.hideLoading();
							}
						});
					} else {
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.slot-wrap {
	width: 100%;
	display: flex;
	flex-direction: row-reverse;
}

.nav-btn {
	width: 37rpx;
	height: 42rpx;
	margin-right: 44rpx;
	background: url(../../static/images/me/list.png);
	background-size: 100% 100%;
}

.container {
	padding: 0 0 100upx 0;

	.coin-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 27rpx;
		margin-bottom: 20rpx;

		.coin-item {
			width: 167rpx;
			height: 84rpx;
			background: #e9e9e9;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 10rpx;
			box-sizing: border-box;

			.coin-img {
				flex-shrink: 0;
			}

			text {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				margin-left: 10rpx;
			}
		}

		.active {
			background: #ffffff;
			color: #212121;
		}
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
			color: #212121;
			margin-top: 30upx;
		}
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

	.network {
		width: 229rpx;
		height: 56rpx;
		background: #eaeaea;
		margin-left: 80rpx;
		margin-top: 40rpx;
		color: #212121;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.input-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 29upx;
		margin: 40upx 0;

		.address-input {
			width: 420rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			text-decoration: underline;
			color: #212121;
			margin-left: 20rpx;
			word-break: break-all;
		}

		.copy-btn {
			height: 70rpx;
			padding: 0 20rpx;
			background: #0072ff;
			border-radius: 35rpx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rupx;
			line-height: 24rpx;
			text-align: center;
		}
	}

	.money-wrapper {
		width: 100%;
		padding: 0 29upx;
		margin: 40upx 0;

		.money-input {
			width: 693rpx;
			height: 81rpx;
			border: 2rpx solid #dbdbdb;
			border-radius: 6rpx;
			padding: 0 30rpx;
			color: #212121;
		}
	}

	.confirm-btn {
		width: 590rpx;
		height: 76rpx;
		background: #0079ff;
		border-radius: 38rpx;
		margin: 50rpx auto;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
	}

	.bottom-submit {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		text-decoration: underline;
		color: #666666;
		margin: 40rpx 0;
	}

	.kf-icon {
		position: fixed;
		bottom: 80upx;
		right: 30upx;
	}

	.coupon-wrapper {
		width: 629rpx;
		height: auto;
		background: #ffffff;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.coupon-title {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
			margin-top: 40rpx;
		}

		.coupon-txt-wrapper {
			width: 100%;
			padding: 0 46rpx;

			.coupon-txt {
				width: 100%;
				display: flex;
				color: #212121;
				font-size: 30rpx;
				margin-top: 40rpx;
			}

			.get-amount {
				// width: 300rpx;
				display: inline-block;
				// white-space:nowrap;
			}
		}

		.coupon-btn {
			width: 413rpx;
			height: 76rpx;
			background: #0079ff;
			border-radius: 38rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			margin-top: 80rpx;
			margin-bottom: 40rpx;
		}
	}
}
</style>
