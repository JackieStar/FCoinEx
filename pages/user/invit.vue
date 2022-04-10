<template>
	<view class="container">
		<c-navbar title="邀请好友" :isRightIcon="false" />
		<view class="invite-bg">
			<view flex="main:justify cross:center" style="padding: 0 90upx;">
				<view flex="dir:top main:center cross:center">
					<text>{{ invitData.friends_count }}</text>
					<view class="invite-text">{{ i18n.invit.friends }}</view>
				</view>
				<view flex="dir:top main:center cross:center">
					<text>{{ invitData.total_reward }}</text>
					<view class="invite-text">{{ i18n.invit.totalReward }}</view>
				</view>
			</view>
			<view class="input-item" flex="main:justify cross:center">
				<text class="input-item-title">{{ i18n.invit.tCode }}</text>
				<view flex>
					<text class="invite-code">{{ invitData.tcode }}</text>
					<u-image @click="handleCopy(invitData.tcode)" src="../../static/images/my/copy.png" width="33upx" height="33upx" />
				</view>
			</view>
			<view class="input-item" flex="main:justify cross:center">
				<text class="input-item-title">{{ i18n.invit.tLink }}</text>
				<view flex>
					<text class="invite-link">{{ invitData.tlink }}</text>
					<u-image @click="handleCopy(invitData.tlink)" src="../../static/images/my/copy.png" width="33upx" height="33upx" />
				</view>
			</view>
			<view class="invit-tips-wrapper">
				<view class="invit-tips" v-for="(item, index) in invitData.tips" :key="index">{{ item }}</view>
			</view>
		</view>
		
		<view class="list-bg">
			<view class="tabs-wrapper">
				<view class="tabs-item" @click="handleChange(1)">
					<u-image v-if="tabIndex === 1" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
					<text :style="{ opacity: tabIndex === 1 ? '1' : '0.6', 'margin-top': tabIndex === 1 ? '' : '-10upx' }">{{ i18n.invit.myInvit }}</text>
				</view>
				<view class="tabs-item" @click="handleChange(2)">
					<u-image v-if="tabIndex === 2" class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
					<text :style="{ opacity: tabIndex === 2 ? '1' : '0.6', 'margin-top': tabIndex === 2 ? '' : '-10upx' }">{{ i18n.invit.tReward }}</text>
				</view>
			</view>
			<view class="list-header" flex="main:justify cross:center">
				<text class="header-1">{{ i18n.invit.inviter }}</text>
				<text class="header-2">{{ i18n.invit.uid }}</text>
				<text class="header-3">{{ i18n.invit.totalReward }}</text>
			</view>
			<view class="invit-list-wrapper" v-if="tabIndex === 1">
				<view class="list-content" flex="main:justify cross:center" v-for="item in userList" :key="item.id">
					<view class="invite-name header-1" flex="dir:top">
						<text>{{item.s_user_name}}</text>
						<view>{{item.cdate}}</view>
					</view>
					<view class="invite-uid header-2">{{item.s_user_id}}</view>
					<view class="invite-prize header-3">{{item.reward}}</view>
				</view>
			</view>
			<view class="invit-list-wrapper" v-if="tabIndex === 2">
				<view class="list-content" flex="main:justify cross:center" v-for="item in rewardList" :key="item.id">
					<view class="invite-name header-1" flex="dir:top">
						<text>{{item.s_user_name}}</text>
						<view>{{item.cdate}}</view>
					</view>
					<view class="invite-uid header-2">{{item.s_user_id}}</view>
					<view class="invite-prize header-3">{{item.amount}}</view>
				</view>
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
			invitData: {},
			userList: [],
			rewardList: []
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
.container {
	padding-bottom: 80upx;
}
.invit-tips-wrapper {
	margin-top: 30upx;
	.invit-tips {
		font-size: 24upx;
		color: #fff;
	}
	
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
.invit-list-wrapper {
	width: 100%;
	height: 450upx;
	overflow-y:scroll
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
		width: 300upx;
	}
	.header-2 {
		width: 220upx;
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
