<template>
	<view class="container">
		<view class="account-list-wrapper" v-if="accountList.length > 0">
			<view class="account-list" @click="handleSelect(item)" v-for="item in accountList" :key="item.id">
				<u-image style="flex-shrink: 0;" :src="item.icon" width="76rpx" height="76rpx" />
				<view class="account-info">
					<view class="account-txt">
						<view style="flex-shrink: 0;">地址：</view>
						<text class="account-addr">{{item.wallet_addr}}</text></view>
					<view class="account-txt">网络：<text style="color:#666666">{{item.coin_type}}</text></view>
					<view class="account-txt">
						<view style="flex-shrink: 0;">备注：</view>
						<text class="remark">{{item.remark || '无'}}</text></view>
				</view>
				<view class="delete-wrapper" @click="handleDelete(item)">
					<u-icon name="trash" color="#ABABAB" size="40" />
				</view>
			</view>
		</view>
		<view class="no-data-wrapper" v-if="accountList.length === 0">
			<u-image src="../../static/images/me/no_data.png" width="543rpx" height="481rpx" />
			<view class="no-data">还未添加地址，马上去添加吧</view>
		</view>
		<view class="add-btn-wrapper">
			<view class="add-btn" @click="handleAdd">添加</view>
		</view>
		<u-popup v-model="showModal" closeable mode="bottom" class="account-modal" :border-radius="20" height="770rpx">
			<view class="modal-title">添加收款账号</view>
			<view class="modal-line-title">{{ i18n.withdraw.emailCode }}</view>
			<view class="network-input">
				<u-field :border-bottom="false" @click="handleShowAction" v-model="form.coin_type" :disabled="true" placeholder="请选择网络" right-icon="arrow-down-fill" />
				<u-action-sheet border-radius="20" @click="getCoinType" :list="coinTypeList" v-model="showAction"></u-action-sheet>
			</view>
			<view class="modal-line-title">收款地址</view>
			<view class="modal-input-wrapper">
				<input
					class="input-item"
					placeholder-style="color: #818FA; font-size: 26upx"
					v-model="form.addr"
					:placeholder="i18n.withdraw.placeholder"
					style="padding-right: 10upx;"
					type="text"
				/>
				<view class="copy-btn" @click="handleCopy">粘贴</view>
			</view>
			<view class="modal-line-title">备注</view>
			<view class="modal-input-wrapper">
				<input
					class="input-item"
					placeholder-style="color: #818FA; font-size: 26upx"
					v-model="form.remark"
					:placeholder="i18n.withdraw.placeholder1"
				/>
			</view>
			<view class="submit-btn" @click="handleSubmit">{{ i18n.withdraw.submitBtn }}</view>
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
			coinTypeList: []
		};
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.me.kf
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
		},
		handleShowAction() {
			this.showAction = true
		},
		handleSelect(item) {
			uni.setStorageSync('accountInfo', item)
			uni.redirectTo({
				url: '/pages/me/withdraw'
			});
		},
		// 获取网络
		getCoinType(e) {
			console.log('e',e)
			this.form.coin_type = this.coinTypeList[e].text
		},
		handleSubmit() {
			if (!this.form.coin_type) return this.$api.msg('1111')
			if (!this.form.addr) return this.$api.msg('2222')
			this.addReceiver(this.form).then(res => {
				this.$api.msg(res.message)
				this.getList()
				this.showModal = false
			})
		},
		handleDelete(item) {
			this.deleteReceiver({addr_id: item.id}).then(res => {
				this.$api.msg(res.message)
				this.getList()
			})
		},
		handleCopy() {	}
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
			width: 60rpx;
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
			width: 619rpx;
			height: 74rpx;
			background: #FFFFFF;
			border: 1rpx solid #E9E9E9;
			border-radius: 10rpx;
			margin: 20rpx auto;
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
				padding: 0 20rpx;
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
