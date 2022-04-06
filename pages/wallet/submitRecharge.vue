<template>
	<view class="container">
		<view class="upload-wrapper"><upload-images /></view>
		<view class="title">
			<text>交易哈希值</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
		</view>
		<view class="input-wrapper">
			<input type="text" v-model="transfer_addr" class="address-input" />
			<view class="copy-btn" @click="handlePaste">粘贴</view>
		</view>
		<view flex="main:justify cross:center" style="padding: 0 30upx;">
			<view class="submit-btn" @click="handleSubmit">确认充值</view>
			<view class="close-btn" @click="openPage">取消</view>
		</view>
		<view>
			<view class="note">Note</view>
			<c-tips v-for="(item,index) in rechargeInfo.note" :text="item" :key="index" />
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { commonMixin } from '@/common/mixin/mixin.js';
import UploadImages from '@/components/upload-images';
export default {
	mixins: [commonMixin],
	components: { UploadImages },
	data() {
		return {
			tabIndex: 1,
			rechargeInfo: {},
			amount: null,
			transfer_img: '',
			transfer_addr: null
		};
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
	onLoad(e) {
		this.amount = e.amount
	},
	onShow() {
		this.loadData()
	},
	methods: {
		...mapActions('user', ['getFinaceInfo', 'financeRecharge']),
		...mapActions('common', ['uploadImg']),
		//请求数据
		async loadData() {
			this.getFinaceInfo({config: 'recharge'}).then(res=> {
				this.rechargeInfo = res.data
			})
		},
		handleSubmit() {
			let params = {
				coin_type: 'USDT-TRC20',
				amount: this.amount,
				transfer_img: '/static/images/b/BTC.png',
				transfer_addr: 'ddgg23fser134tgvrw'
			}
			this.financeRecharge(params).then(res=> {
				this.$api.msg('充值成功')
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
		// 选择图片
		chooseImage(){
			uni.chooseImage({
				count: 1, //最多可以选择的图片张数，9
				sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
				sourceType: ['album'], //album 从相册选图，camera 使用相机，默认二者都有
				success: (res)=> {
					const images = res.tempFilePaths;
					this.uploadFiles(images);
				}
			});
		},
		uploadFiles(img) {
			this.uploadImg({img}).then(res=> {
				console.log('222')
			})
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
</style>
