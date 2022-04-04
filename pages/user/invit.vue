<template>
	<view class="container">
		<c-navbar title="邀请好友" />
		<view class="invite-bg">
			<view flex="main:justify cross:center" style="padding: 0 90upx;">
				<view flex="dir:top main:center cross:center">
					<text>{{invitData.friends_count}}</text>
					<view class="invite-text">我的好友数</view>
				</view>
				<view flex="dir:top main:center cross:center">
					<text>{{invitData.total_reward}}</text>
					<view class="invite-text">累计奖励</view>
				</view>
			</view>
			<view class="input-item" flex="main:justify cross:center">
				<text class="input-item-title">推荐码</text>
				<view flex>
					<text class="invite-code">{{invitData.tcode}}</text>
					<u-image src="../../static/images/my/copy.png" width="33upx" height="33upx" />
				</view>
			</view>
			<view class="input-item" flex="main:justify cross:center">
				<text class="input-item-title">推荐连接</text>
				<view flex>
					<text class="invite-link">{{invitData.tlink}}</text>
					<u-image src="../../static/images/my/copy.png" width="33upx" height="33upx" />
				</view>
			</view>
		</view>
		<view class="list-bg">
			<view class="tabs-wrapper">
				<view class="tabs-item" @click="handleChange(1)">
					<u-image v-if="tabIndex === 1" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
					<text :style="{ opacity: tabIndex === 1 ? '1' : '0.6', 'margin-top': tabIndex === 1 ? '' : '-10upx' }">我的邀请</text>
				</view>
				<view class="tabs-item" @click="handleChange(2)">
					<u-image v-if="tabIndex === 2" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
					<text :style="{ opacity: tabIndex === 2 ? '1' : '0.6', 'margin-top': tabIndex === 2 ? '' : '-10upx' }">邀请奖励</text>
				</view>
			</view>
			<view class="list-header" flex="main:justify cross:center">
				<text class="header-1">邀请人</text>
				<text class="header-2">邀请UID</text>
				<text class="header-3">累计奖励</text>
			</view>
			<view class="list-content" flex="main:justify cross:center">
				<view class="invite-name header-1" flex="dir:top">
					<text>1231***@1.com</text>
					<view>2022-01-02 11:22</view>
				</view>
				<view class="invite-uid header-2">1231***@243.com</view>
				<view class="invite-prize header-3">33</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';
import CNavBar from '@/components/c-navbar/c-navbar';
export default {
	mixins: [commonMixin],
	components: { CNavBar },
	data() {
		return {
			tabIndex: 1,
			invitData: {}
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
		this.getInvitInfo();
		this.getInviteUserList()
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
				this.userList = res.data;
			});
		},
		// 邀请奖励列表
		getInvitRewardList() {
			this.invitRewardList().then(res => {
				this.rewardList = res.data;
			});
		},
		handleChange(type) {
			this.tabIndex = type;
			if (type === 1) {
				this.getInviteUserList()
			} else {
				this.getInvitRewardList()
			}
		},
		toSave() {
			// #ifdef APP-PLUS
			uni.showLoading({
				title: this.i18n.common.request
			});
			// #endif
			const painter = this.$refs.painter;
			painter.canvasToTempFilePath().then(res => {
				this.path = res.tempFilePath;
				// #ifdef H5
				return;
				// #endif
				uni.previewImage({
					current: this.path,
					urls: [this.path]
				});
				uni.hideLoading();
			});
		},
		copy() {
			let _this = this;
			uni.setClipboardData({
				data: _this.loginInfo.invitCode,
				success: function() {
					_this.$api.msg(_this.i18n.toast.copySuccess);
				}
			});
		},
		shareImageShare() {
			const painter = this.$refs.painter;
			painter.render(this.posterObj);
			this.showImgShare = !this.showImgShare;
		},
		shareFace() {
			this.showFace = !this.showFace;
			setTimeout(() => {
				this.$refs.qrcode._makeCode();
			}, 100);
		},
		shareLink() {
			let _this = this;
			uni.setClipboardData({
				data: _this.loginInfo.registerUrl,
				success: function() {
					_this.$api.msg(_this.i18n.toast.copySuccess);
				}
			});
		},
		shareWord() {
			let _this = this;
			uni.setClipboardData({
				data: `[${_this.loginInfo.registerUrl}] ${_this.i18n.invit.tip5}【${_this.loginInfo.invitCode}】【FEXCOIN APP】`,
				success: function() {
					_this.$api.msg(_this.i18n.toast.copySuccess);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-bottom: 80upx;
}
.invite-bg {
	width: 688upx;
	height: 979upx;
	margin: 80upx auto 20upx auto;
	background-size: 100% 100%;
	background-image: url(../../static/images/invit/invite_bg.png);
	padding: 255upx 50upx 50upx 50upx;
	text {
		font-size: 60upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
	}
	.invite-text {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
		margin-top: 25upx;
		margin-bottom: 10upx;
		opacity: 0.4;
	}
	.input-item {
		width: 592upx;
		height: 114upx;
		background: #210a45;
		border-radius: 6upx;
		margin-top: 25upx;
		padding: 0 30upx;
		.input-item-title {
			font-size: 28upx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #ffffff;
			opacity: 0.4;
		}
		.invite-code {
			font-size: 28upx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #ffffff;
			margin-right: 20upx;
		}
		.invite-link {
			width: 330upx;
			font-size: 24upx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #ffffff;
			margin-right: 20upx;
			word-break: break-all;
		}
	}
}
.list-bg {
	width: 688upx;
	height: 680upx;
	margin: 30upx auto 40upx auto;
	background-size: 100% 100%;
	background-image: url(../../static/images/invit/list_bg.png);
	padding: 0 20upx;
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
				color: #ffffff;
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
	}
	.header-1 {
		width: 230upx;
	}
	.header-2 {
		width: 260upx;
	}
	.header-3 {
		width: 120upx;
	}
	.list-content {
		width: 100%;
		height: 120upx;
		border-bottom: 1upx solid #2d2d4f;
		.invite-name {
			text {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #ffffff;
			}
			view {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 300;
				color: #7085a8;
				margin-top: 10upx;
			}
		}
		.invite-uid {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
		}
		.invite-prize {
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
			text-align: center;
		}
	}
}
</style>
