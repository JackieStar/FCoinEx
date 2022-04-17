<template>
	<view class="container">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="welcome">
				<image mode="widthFix" src="../../static/images/public/logo.png" class="logo"></image>
			</view>
			<view class="input-content">
				<view class="input-item">
					<u-image src="../../static/images/public/email.png" width="42upx" height="30upx" />
					<input placeholder-style="color: #435687"
						v-model="form.email" 
						:placeholder="i18n.login.email"
						data-key="email"
					/>
				</view>
				<view class="input-item">
					<u-image style="flex-shrink:0" src="../../static/images/public/password.png" width="36upx" height="39upx" />
					<input placeholder-style="color: #435687"
						v-if="!isOpenEyes"
						type="password" 
						v-model="form.password" 
						:placeholder="i18n.login.password"
						placeholder-class="input-empty"
						maxlength="20"
						data-key="password"
						@confirm="toLogin"
					/>
					<input placeholder-style="color: #435687"
						v-else
						type="text" 
						v-model="form.password" 
						:placeholder="i18n.login.password"
						placeholder-class="input-empty"
						maxlength="20"
						data-key="password"
						@confirm="toLogin"
					/>
					<view>
						<u-image v-if="isOpenEyes" src="../../static/images/public/open_eyes.png" @click="handleChange(false)" width="33upx" height="21upx" />
						<u-image v-else src="../../static/images/public/close_eyes.png" width="33upx" @click="handleChange(true)" height="21upx" />
					</view>
				</view>
			</view>
			<view class="link">
				<view class="forget-section" @click="toForgetPassword">
					{{i18n.login.forget}}
				</view>
			</view>
			<view @click="toLogin" class="confirm-btn">{{i18n.login.login}}</view>
		</view>
		<view class="register-section">
			{{i18n.login.noAccount}}
			<text @click="toRegist">{{i18n.login.registration}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default{
		mixins: [commonMixin],
		data(){
			return {
				form: {
					email: '', // 702242999@qq.com
					password: '' // 123456
				},
				isOpenEyes: false,
				redirect: undefined,
			}
		},
		onLoad(options) {
			// this.redirect = options.redirect
		},
		methods: {
			...mapActions('user', ['login']),
			navBack(){
				let pages = getCurrentPages();
				if (pages && pages.length > 1 && pages[0].route === 'pages/wallet/wallet') {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					uni.navigateBack()
				}
			},
			toRegist(){
				uni.navigateTo({
					url: '/pages/public/register'
				})
			},
			toForgetPassword() {
				uni.navigateTo({
					url: '/pages/public/forget'
				})
			},
			handleChange(type) {
				this.isOpenEyes = type
			},
			toLogin(){
				let $this = this
				this.login(this.form).then(res => {
					this.$api.msg(this.i18n.login.loginSuccess, 1000, false, 'none', function() {
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/index/index'
							})
							// if($this.redirect && $this.redirect == 'register'){
							// 	uni.switchTab({
							// 		url: '/pages/index/index'
							// 	})
							// } else {
							// 	let pages = getCurrentPages();
							// 	if(pages && pages.length == 1){
							// 		uni.switchTab({
							// 			url: '/pages/index/index'
							// 		})
							// 	} else {
							// 		uni.navigateBack({})
							// 	}
							// }
						}, 1000)
					})
				})
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
		width: 100%;
		height: 100%;
	}
	.container{
		padding-top: 100px;
		position:relative;
		overflow: hidden;
		background: url(../../static/images/public/bg.png);
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: #ffffff;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 60upx;
		.logo{
			width: 184upx;
		}
		.txt{
			display: flex;
			flex-direction: column;
			color: #ffffff;
			padding-left: 20upx;
			padding-bottom: 40upx;
			font-size: 26upx;
			.b{
				font-size: 40upx;
				font-weight: bold;
			}
		}
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0 10upx;
		height: 80upx;
		margin-bottom: 50upx;
		border-bottom: 1px solid #0B2771;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: #ffffff;
			width: 100%;
			padding-left: 20upx;
		}	
	}
	.link{
		/* display: flex; */
		padding: 30upx 60upx;
		
	}
	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		margin-top: 40upx;
		margin: 40upx auto;
		background: url(../../static/images/public/login-btn.png);
		background-size: 100% 100%;
		color: #fff;
		font-size: $font-lg;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: #C9D8FF;
		float: right;
		margin: 40upx 0;
	}
	.register-section{
		width: 100%;
		font-size: $font-sm+2upx;
		color: #fff;
		text-align: center;
		text{
			color: #7A39FF;
			margin-left: 10upx;
		}
	}
</style>
