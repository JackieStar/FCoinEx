<template>
	<view class="container">
		<view class="account-list-wrapper" v-if="accountList.length > 0">
			<view class="account-list" @click="handleSelect(item)" v-for="item in accountList" :key="item.id">
				<u-image style="flex-shrink: 0;" :src="item.icon" width="76rpx" height="76rpx" />
				<view class="account-info">
					<view class="account-txt">
						<view style="flex-shrink: 0;">{{i18n.withdraw.withdrawwAddr}}：</view>
						<text class="account-addr">{{item.wallet_addr}}</text></view>
					<view class="account-txt">{{i18n.withdraw.network}}：<text style="color:#666666">{{item.coin_type}}</text></view>
					<view class="account-txt">
						<view style="flex-shrink: 0;">{{i18n.common.desc}}：</view>
						<text class="remark">{{item.remark || i18n.common.no }}</text></view>
				</view>
				<view class="delete-wrapper" @click.stop="handleDelete(item)">
					<u-icon name="trash" color="#ABABAB" size="40" />
				</view>
			</view>
		</view>
		<view class="no-data-wrapper" v-if="accountList.length === 0">
			<u-image src="../../static/images/me/no_data.png" width="543rpx" height="481rpx" />
			<view class="no-data">{{i18n.withdraw.tips3}}</view>
		</view>
		<view class="add-btn-wrapper">
			<view class="add-btn" @click="handleAdd">{{i18n.withdraw.add}}</view>
		</view>
		<u-popup v-model="showModal" closeable mode="bottom" class="account-modal" :border-radius="20" height="770rpx">
			<view class="modal-title">{{i18n.withdraw.addAccount}}</view>
			<view class="modal-line-title">{{ i18n.withdraw.network }}</view>
			<view class="network-input">
				<u-field class="u-input" :border-bottom="false" @click="handleShowAction" :label-width="0" v-model="form.coin_type" :disabled="true" :placeholder="i18n.withdraw.noNetwork" right-icon="arrow-down" />
				<u-action-sheet :cancel-text="i18n.common.cancel" border-radius="20" @click="getCoinType" :list="coinTypeList" v-model="showAction"></u-action-sheet>
			</view>
			<view class="modal-line-title">{{i18n.withdraw.withdrawwAddr}}</view>
			<view class="modal-input-wrapper">
				<input
					class="input-item"
					placeholder-style="color: #818FA; font-size: 26upx"
					v-model="form.addr"
					:placeholder="i18n.withdraw.noWithdrawAddr"
					style="padding-right: 20upx;"
					type="text"
				/>
				<view class="copy-btn" @click="handlePaste">{{i18n.withdraw.copyBtn}}</view>
			</view>
			<view class="modal-line-title">{{i18n.common.desc}}</view>
			<view class="modal-input-wrapper">
				<input
					class="input-item"
					placeholder-style="color: #818FA; font-size: 26upx"
					v-model="form.remark"
					:placeholder="i18n.common.desc"
				/>
			</view>
			<view class="submit-btn" @click="handleSubmit">{{ i18n.updatePwd.btn }}</view>
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
			accountList: [],
			showModal: false,
			seconds: 60,
			tips: '',
			form: {
				coin_type: null,
				addr: null,
				remark: null
			},
			showAction: false,
			coinTypeList: [],
			userData: {}
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.withdraw.title2
		});
		this.loadData()
		this.getList()
	},
	methods: {
		...mapActions('user', ['getReceiver', 'addReceiver', 'deleteReceiver']),
		...mapActions('wallet', ['getFinaceInfo']),
		//请求数据
		loadData() {
			this.getFinaceInfo({ config: 'recharge' }).then(res => {
				this.coinTypeList = res.data.coin_types.map(v=> {
					return{ text: v.coin_type }
				})
			});
		},
		getList() {
			this.getReceiver().then(res => {
				this.accountList = res.data
			})
		},
		handleAdd() {
			this.showModal = true
			this.form = {
				coin_type: null,
				addr: null,
				remark: null
			}
		},
		handleShowAction() {
			this.showAction = true
		},
		handleSelect(item) {
			let userId = uni.getStorageSync('userInfo').id
			uni.setStorageSync(`accountInfo-${userId}`, item)
			uni.navigateBack();
		},
		// 获取网络
		getCoinType(e) {
			console.log('e',e)
			this.form.coin_type = this.coinTypeList[e].text
		},
		handleSubmit() {
			if (!this.form.coin_type) return this.$api.msg(this.i18n.withdraw.noNetwork	)
			if (!this.form.addr) return this.$api.msg(this.i18n.withdraw.placeholder1)
			this.addReceiver(this.form).then(res => {
				this.$api.msg(res.message)
				this.getList()
				this.showModal = false
			})
		},
		handleDelete(item) {
			uni.showModal({
				content: this.i18n.withdraw.isDelete,
				cancelText: this.i18n.common.cancel,
				confirmText: this.i18n.common.ok,
				success: e => {
					if (e.confirm) {
						this.deleteReceiver({addr_id: item.id}).then(res => {
							this.$api.msg(res.message)
							let addrId = uni.getStorageSync('accountInfo').id
							if (addrId == item.id) {
								uni.removeStorageSync('accountInfo')
							}
							this.getList()
						})
					}
				}
			});
			
		},
		// 粘贴
		handlePaste() {
			uni.getClipboardData({
				success: res => {
					this.form.addr = res.data;
					console.log(res.data);
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	.account-list-wrapper {
		width: 100%;
		height: 100%;
		padding-bottom: 180rpx;
		overflow-y: scroll;
		.account-list {
			width: 697rpx;
			height: 194rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin: 20rpx auto;
			display: flex;
			align-items: center;
			padding-left: 30rpx;
		}
		.account-info {
			width: 480rpx;
			margin-left: 42rpx;
			display: flex;
			flex-direction: column;
			.account-txt {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
				display: flex;
				flex-shrink: 0;
				margin-top: 10rpx;
			}
			.account-addr {
				width: 400rpx;
				color: #666666;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
			}
			.remark {
				width: 300rpx;
				color: #666666;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
			}
		}
		.delete-wrapper {
			width: 80rpx;
			height: 140rpx;;
			display: flex;
			flex-direction: column-reverse;
		}
	}
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
			width: 630rpx;
			height: 74rpx;
			background: #FFFFFF;
			border: 1rpx solid #E9E9E9;
			border-radius: 10rpx;
			margin: 30upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.u-input {
				width: 630rpx;
			}
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
				padding: 0 28rpx;
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
