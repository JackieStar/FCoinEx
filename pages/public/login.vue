<template>
	<view class="container">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<!--
			<view class="left-top-sign">LOGIN</view>-->
			<view class="welcome">
				<image mode="widthFix" src="../../static/images/public/logo.png" class="logo"></image>
			</view>
			<view class="input-content">
				<view class="input-item">
					<u-image src="../../static/images/public/email.png" width="42upx" height="30upx" />
					<input placeholder-style="color: #435687"
						v-model="form.username" 
						:placeholder="i18n.login.inputUserName"
						data-key="username"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<u-image src="../../static/images/public/password.png" width="31upx" height="35upx" />
					<input placeholder-style="color: #435687"
						type="password" 
						v-model="form.password" 
						:placeholder="i18n.login.pwdRule"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
						@confirm="toLogin"
					/>
				</view>
			</view>
			<view class="link">
				<view class="forget-section">
					忘记密码?
				</view>
			</view>
			<view @click="useVerify" class="confirm-btn">登录</view>
			<!-- <button class="confirm-btn" @click="useVerify" :disabled="logining">登录</button> -->
		</view>
		<view class="register-section">
			{{i18n.login.noAccount}}
			<text @click="toRegist">{{i18n.login.registration}}</text>
		</view>
		<Verify
				:title="verifyTitle"
				:explain="explain"
				@success="success"
				:mode="'pop'"
				:captchaType="'blockPuzzle'"
				:imgSize="{ width: '300px', height: '155px' }"
				ref="verify"></Verify>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {isMobile, isPassword} from '../../utils/validate'
	import Verify from "../../components/verifition/verify/verify";
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default{
		components: {
			Verify
		},
		mixins: [commonMixin],
		data(){
			return {
				form: {
					username: '13999999999',
					password: 'Aa123456',
					captchaVerify: ''
				},
				logining: false,
				redirect: undefined,
				verifyTitle: '',
				explain: '',
				verifySuccess: '',
				verifyFail: ''
			}
		},
		onShow() {
			this.verifyTitle = this.i18n.common.verifyTitle;
			this.explain = this.i18n.common.explain;
			this.verifySuccess = this.i18n.common.verifySuccess;
			this.verifyFail = this.i18n.common.verifyFail;
		},
		onLoad(options) {
			this.redirect = options.redirect
		},
		methods: {
			...mapActions('user', ['login']),
			success(params){
				this.form.captchaVerify = params.captchaVerification
				console.log("success: ", params)
				this.toLogin()
			},
			useVerify(){
				this.logining = true;
				if(this.form.username == ''){
					this.$api.msg(this.i18n.login.inputUserName)
					this.logining = false
					return;
				}
				if (!isMobile(this.form.username)) {
					this.$api.msg(this.i18n.login.mobileError)
					this.logining = false
					return;
				}
				if(this.form.password == ''){
					this.$api.msg(this.i18n.login.password)
					this.logining = false
					return;
				}
				this.$refs.verify.show()
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			toRegist(){
				uni.navigateTo({
					url: '/pages/public/register'
				})
			},
			toLogin(){
				let $this = this
				this.login(this.form).then(res => {
					
					this.$api.msg(this.i18n.login.loginSuccess, 1000, false, 'none', function() {
						$this.$refs.verify.hiddle()
						setTimeout(function() {
							$this.logining = false
							if($this.redirect && $this.redirect == 'register'){
								uni.switchTab({
									url: '/pages/index/index'
								})
							} else {
								let pages = getCurrentPages();
								if(pages && pages.length == 1){
									uni.switchTab({
										url: '/pages/index/index'
									})
								} else {
									uni.navigateBack({})
								}
							}
						}, 1000)
					})
				}).catch(error => {
					this.logining = false
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
