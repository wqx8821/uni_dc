<template>
	<view class="content">
		<u-icon name="checkbox-mark" class="success-icon yticon icon-xuanzhong2"></u-icon>
		<text class="success-icon yticon icon-xuanzhong2"></text>
		<text class="tit">支付成功</text>
		
		<view class="btn-group">
			<navigator url="../../../subpkg/allOrders/allOrders" open-type="redirect" class="mix-btn">查看订单</navigator>
			<navigator url="/pages/home/home" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang='scss' scoped>
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.success-icon{
		font-size: 160rpx;
		color: #c53454;
		margin-top: 100rpx;
	}
	.tit{
		font-size: 38rpx;
		color: #303133;
	}
	.btn-group{
		padding-top: 100rpx;
	}
	.mix-btn {
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600rpx;
		height: 80rpx;
		font-size: 26rpx;
		color: #000;
		background-color: #da3a5d;
		border-radius: 10rpx;
		&.hollow{
			background: #fff;
			color: #303133;
			border: 1px solid #ccc;
		}
	}
</style>
