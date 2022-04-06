<template>
	<view class="container">
		<view class="card-item-wrapper" flex="main:justify cross:center">
			<view class="card-item">
				<text>100.2</text>
				<view>总权益(USDT)</view>
			</view>
			<view class="card-item">
				<text>100.2</text>
				<view>可用余额(USDT)</view>
			</view>
		</view>
		<view class="title">
			<text>杠杆倍数</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
		</view>
		<view class="lever-wrapper" flex="main:justify cross:center">
			<view class="lever-btn">
				x2
			</view>
		</view>
		<view class="title">
			<text>开仓价</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
		</view>
		<view class="lever-wrapper" flex="main:justify cross:center">
			<view class="open-btn">
				35345435
			</view>
			<view class="open-btn">
				Market
			</view>
		</view>
		<view class="title">
			<text>Open amount</text>
			<u-image class="title-bg" src="../../static/images/wallet/title-long-bg.png" width="144upx" height="12upx" mode="" />
		</view>
		<view class="lever-wrapper" flex="main:justify cross:center">
			<view class="lever-btn">
				x2
			</view>
		</view>
		<view class="handle-btn-wrapper" flex="main:justify cross:center">
			<view class="rise-btn">买/涨</view>
			<view class="down-btn">卖/跌</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.card-item-wrapper {
		padding: 34upx;
		.card-item {
			width: 328upx;
			height: 173upx;
			background: #1A1A1A;
			border: 2upx solid;
			border-radius: 0px 30upx 0px 30upx;
			padding-left: 36upx;
			padding-top: 23upx;
			text {
				font-size: 55upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
			view {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #9294AB;
				margin-top: 14upx;
			}
		}
	}
	.title {
		width: 100%;
		height: 28upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
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
	.lever-wrapper {
		margin-top: 30upx;
		padding: 20upx 26upx;
		.lever-btn {
			width: 100upx;
			height: 60upx;
			background: #1A1A1A;
			border-radius: 8upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 60upx;
			text-align: center;
		}
		.open-btn {
			width: 299upx;
			height: 61upx;
			background: #1A1A1A;
			border-radius: 8upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 60upx;
			text-align: center;
		}
	}
	.handle-btn-wrapper {
		margin: 20upx 0;
		padding: 0 20upx;
		.rise-btn {
			width: 340upx;
			height: 88upx;
			background: #23B57D;
			border-radius: 14upx;
			text-align: center;
			line-height: 88upx;
		}
		.down-btn {
			width: 340upx;
			height: 88upx;
			background: #D83A53;
			border-radius: 14upx;
			text-align: center;
			line-height: 88upx;
		}
	}
</style>
