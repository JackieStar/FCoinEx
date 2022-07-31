<template>
	<view class="container">
		<view class="top-bg-box">
			<image class="bg-logo" src="../../static/images/invit/logo.png" mode=""></image>
			<image class="bg-image" src="../../static/images/invit/invit-bg.png" mode=""></image>
			<!-- <image class="invite-type" src="../../static/images/invit/type-icon.png" mode=""></image> -->
			<view class="invite-desc">{{ i18n.invit.topTitle }}</view>
			<view class="reward-rate">{{ invitData.reward_rate }}%</view>
			<view class="invite-type">{{ i18n.invit.rateType }}</view>
		</view>
		<view class="invite-bg">
			<view class="invite-item-box">
				<!-- <view class="flex_between_box" style="margin-top: -60upx;" v-if="lang == 'pt-BR'">
					<view class="invite-item">
						<text>{{ invitData.friends_count }}</text>
						<view class="invite-text">{{ i18n.invit.friends }}</view>
					</view>
					<view class="item-line">
						
					</view>
					<view class="invite-item">
						<text>{{ invitData.total_reward }}</text>
						<view class="invite-text">{{ i18n.invit.totalReward }}</view>
					</view>
				</view> -->
				<view class="flex_between_box invite-count-box">
					<view class="invite-item">
						<text>{{ invitData.friends_count || 0 }}</text>
						<view class="invite-text">{{ i18n.invit.friends }}</view>
					</view>
					<view class="item-line"></view>
					<view class="invite-item">
						<text>{{ invitData.total_reward || 0 }}</text>
						<view class="invite-text">{{ i18n.invit.totalReward }}</view>
					</view>
				</view>
			</view>
			<view class="input-item">
				<text class="input-item-title">{{ i18n.invit.tCode }}</text>
				<view class="flex_left_box">
					<text class="invite-code">{{ invitData.tcode }}</text>
					<u-image :fade="false" :show-loading="false" @click="handleCopy(invitData.tcode)" src="/static/images/invit/copy.png" width="33upx" height="33upx" />
				</view>
			</view>
			<view class="input-item">
				<text class="input-item-title">{{ i18n.invit.tLink }}</text>
				<view class="flex_left_box">
					<text class="invite-link">{{ invitData.tlink }}</text>
					<u-image :fade="false" :show-loading="false" @click="handleCopy(invitData.tlink)" src="/static/images/invit/copy.png" width="33upx" height="33upx" />
				</view>
			</view>
		</view>
		<view class="invite-btn flex_center_box" @click="handleShare">
			<image class="btn-icon" src="../../static/images/invit/whatsapp@2x.png" mode=""></image>
			<!-- <view class="text"> -->
			<a class="text" href=" " data-action="share/whatsapp/share">{{ i18n.invit.title || '' }}</a>
			<!-- </view> -->
		</view>
		<view class="invit-tips-wrapper">
			<view class="invit-tips" v-for="(item, index) in invitData.tips" :key="index">{{ item }}</view>
		</view>
		<view class="list-bg">
			<view class="tabs-wrapper">
				<view class="tabs-item" @click="handleChange(1)">
					<u-image
						:show-loading="false"
						:fade="false"
						v-if="tabIndex === 1"
						class="title-bg"
						src="/static/images/invit/tab-line.png"
						width="144upx"
						height="12upx"
						mode=""
					/>
					<text :style="{ opacity: tabIndex === 1 ? '1' : '0.6', 'margin-top': tabIndex === 1 ? '' : '-10upx' }">{{ i18n.invit.myInvit }}</text>
				</view>
				<view class="tabs-item" @click="handleChange(2)">
					<u-image
						v-if="tabIndex === 2"
						:fade="false"
						:show-loading="false"
						class="title-bg"
						src="/static/images/invit/tab-line.png"
						width="144upx"
						height="12upx"
						mode=""
					/>
					<text :style="{ opacity: tabIndex === 2 ? '1' : '0.6', 'margin-top': tabIndex === 2 ? '' : '-10upx' }">{{ i18n.invit.tReward }}</text>
				</view>
			</view>
			<view class="list-header">
				<text class="header-1">{{ i18n.invit.inviter }}</text>
				<text class="header-2">{{ i18n.invit.uid }}</text>
				<text class="header-3 text-center">{{ i18n.invit.totalReward }}</text>
			</view>
			<view class="invit-list-wrapper" v-if="tabIndex === 1">
				<view class="list-content" v-for="item in userList" :key="item.id">
					<view class="invite-name header-1">
						<text>{{ item.s_user_name }}</text>
						<view>{{ item.cdate }}</view>
					</view>
					<view class="invite-uid header-2">{{ item.s_user_id }}</view>
					<view class="invite-prize header-3">{{ item.reward }}</view>
				</view>
			</view>
			<view class="invit-list-wrapper" v-if="tabIndex === 2">
				<view class="list-content" v-for="item in rewardList" :key="item.id">
					<view class="invite-name header-1">
						<text>{{ item.s_user_name }}</text>
						<view>{{ item.cdate }}</view>
					</view>
					<view class="invite-uid header-2">{{ item.s_user_id }}</view>
					<view class="invite-prize header-3">{{ item.amount }}</view>
				</view>
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
			tabIndex: 1,
			invitData: {},
			userList: [],
			rewardList: [],
			lang: 'zh_CN'
		};
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.i18n.invit.title
		});
	},
	onShow() {
		// this.qrcode.val = this.loginInfo.registerUrl;
		this.lang = uni.getStorageSync('language');
		this.getInvitInfo();
		this.getInviteUserList();

		// this.getInvitRewardList()
	},
	methods: {
		...mapActions('user', ['invitInfo', 'invitUserList', 'invitRewardList']),
		getInvitInfo() {
			this.invitInfo().then(res => {
				this.invitData = res.data;
			});
		},
		// 邀请用户列表
		getInviteUserList() {
			this.invitUserList().then(res => {
				this.userList = res.data.data;
			});
		},
		// 点击立即邀请
		handleShare() {
			// whatsApp(contentId){
			let share_url = this.invitData.tlink;
			let share_title = this.i18n.invit.shareTitle;
			console.log('share_title', share_title);
			location = 'whatsapp://send?text=' + encodeURIComponent(share_title) + encodeURIComponent(share_url) + '&via=lopscoop';
			// #ifndef H5
			plus.runtime.openURL(location);
			// #endif
			// }

			// if (navigator.share) {
			//     navigator.share({
			//       title: this.i18n.invit.invitBtn,
			//       url: this.invitData.tlink
			//     }).then(() => {
			//       console.log('Thanks for sharing!');
			//     })
			//     .catch(console.error);
			//   } else {
			// 	  this.$api.msg(this.i18n.record.fail);
			//     // shareDialog.classList.add('is-open');
			//   }
		},
		// 邀请奖励列表
		getInvitRewardList() {
			this.invitRewardList().then(res => {
				this.rewardList = res.data.data;
			});
		},
		handleChange(type) {
			this.tabIndex = type;
			if (type === 1) {
				this.getInviteUserList();
			} else {
				this.getInvitRewardList();
			}
		},
		handleCopy(e) {
			uni.setClipboardData({
				data: e.toString(),
				success: () => {
					this.$api.msg(this.i18n.toast.copySuccess);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #fff;
}

.top-bg-box {
	width: 100%;
	height: 747rpx;
	position: relative;

	.bg-image {
		width: 100%;
		height: 747rpx;
		position: absolute;
		top: 0;
		z-index: 10;
	}

	.bg-logo {
		width: 248rpx;
		height: 73rpx;
		position: absolute;
		left: 239rpx;
		top: 55rpx;
		z-index: 12;
	}

	.invite-type {
		width: 100%;
		height: 98rpx;
		line-height: 80rpx;
		color: #fff;
		text-align: center;
		font-size: 40rpx;
		font-weight: 500;
		position: absolute;
		top: 466rpx;
		left: 0;
		z-index: 11;
	}

	.invite-desc {
		position: absolute;
		top: 162rpx;
		left: 50rpx;
		z-index: 12;
		font-size: 49rpx;
		width: 650rpx;
		font-family: PingFang SC;
		font-weight: bold;
		font-style: italic;
		text-align: center;
		color: #fb580e;
		line-height: 26px;
		text-shadow: 0px 4px 0px rgba(132, 199, 255, 0.49);
		background: linear-gradient(180deg, #6717cd 0%, #2871fa 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.reward-rate {
		width: 100%;
		height: 80rpx;
		font-size: 86rpx;
		text-align: center;
		line-height: 80rpx;
		font-weight: bold;
		color: #db301e;
		text-shadow: 0px 11rpx 32rpx rgba(219, 48, 30, 0.22);
		position: absolute;
		left: 0;
		top: 330rpx;
		z-index: 30;
	}
}

.container {
	padding-bottom: 80upx;
}
.invite-btn {
	width: 650rpx;
	margin: auto;
	margin-top: 30rpx;
	height: 81rpx;
	background: #0072ff;
	border-radius: 41rpx;
	text-align: center;
	line-height: 81rpx;
	color: #fff;
	.btn-icon {
		width: 48rpx;
		height: 48rpx;
	}
	.text {
		margin-left: 10rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
		text-decoration: none;
	}
}

.invit-tips-wrapper {
	width: 660rpx;
	margin: auto;
	margin-top: 35upx;

	.invit-tips {
		font-size: 24upx;
		color: #4d4d4d;
	}
}

.invite-item-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.invite-bg {
	width: 650rpx;
	background: #fffeff;
	box-shadow: 0px 1px 10rpx 0px rgba(179, 179, 179, 0.24);
	border-radius: 20rpx;
	margin: 0upx auto 20upx auto;
	background-size: 100% 100%;
	background-color: #fff;
	margin-top: -132rpx;
	position: relative;
	z-index: 13;
	// background-image: url(../../static/images/invit/invite_bg.png);
	padding: 50upx 20upx 35upx 20upx;

	.invite-item-box {
		width: 583rpx;
		height: 165rpx;
		margin: auto;
		background: #fffeff;
		box-shadow: 0px 4rpx 16rpx 0px rgba(86, 107, 202, 0.49);
		border-radius: 10rpx;

		.invite-count-box {
			height: 100%;
		}
	}

	.invite-item {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.item-line {
		width: 1px;
		height: 105rpx;
		// border: 1rpx solid #9C4002;
		background-color: #9c4002;
		opacity: 0.43;
	}

	.invite-title-cn {
		margin-bottom: 120upx;
		text-align: center;
		font-size: 50upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #78653a;
		text-shadow: 0px 2px 0px rgba(255, 255, 255, 0.2);
		background: linear-gradient(129.1836deg, #78653a 0%, #71571c 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.invite-title-en {
		margin-bottom: 120upx;
		text-align: center;
		font-size: 34upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #78653a;
		text-shadow: 0px 2px 0px rgba(255, 255, 255, 0.2);
		background: linear-gradient(129.1836deg, #78653a 0%, #71571c 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	text {
		font-size: 60upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #4d63c6;
	}

	.invite-text {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #4d63c6;
		// margin-top: 25upx;
		margin-bottom: 10upx;
		// opacity: 0.4;
	}

	.input-item {
		width: 610upx;
		height: 100upx;
		background: #fbf2e5;
		border-radius: 20upx;
		margin-top: 22upx;
		padding: 0 10upx 0 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.input-item-title {
			font-size: 28upx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #262626;
			// opacity: 0.4;
		}

		.invite-code {
			font-size: 28upx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #666666;
			margin-right: 20upx;
		}

		.invite-link {
			width: 350upx;
			font-size: 24upx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #666666;
			margin-right: 20upx;
			word-break: break-all;
		}
	}
}

.invit-list-wrapper {
	width: 100%;
	height: 450upx;
	overflow-y: scroll;
}

.list-bg {
	width: 650rpx;
	background: #fffeff;
	box-shadow: 0px 1px 10rpx 0px rgba(179, 179, 179, 0.44);
	border-radius: 20rpx;
	// background-image: url(../../static/images/invit/list_bg.png);

	margin: auto;
	margin-top: 49rpx;

	.tabs-wrapper {
		width: 100%;
		height: 140upx;
		display: flex;
		align-items: center;

		.tabs-item {
			width: 50%;
			height: 140upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 100upx;

			text {
				margin-left: 2upx;
				z-index: 10;
				color: #212121;
			}

			.title-bg {
				margin-bottom: -22upx;
			}
		}
	}

	.list-header {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #9292a3;
		margin-bottom: 20upx;
		padding: 0 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header-1 {
		width: 280upx;
	}

	.header-2 {
		width: 220upx;
	}

	.header-3 {
		width: 160upx;
	}
	.text-center {
		text-align: center;
	}

	.list-content {
		width: 100%;
		padding: 0 20upx;
		height: 120upx;
		border-bottom: 1upx solid #e3e3e3;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.invite-name {
			text {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #212121;
			}

			view {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 300;
				color: #212121;
				margin-top: 10upx;
			}
		}

		.invite-uid {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #212121;
		}

		.invite-prize {
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #212121;
			text-align: center;
		}
	}
}
</style>
