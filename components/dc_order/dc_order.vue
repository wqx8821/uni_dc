<template>
	<view class="navigation">
		<view class="left">
			<view class="item car">
				<u-badge class="car-num" :count="0" type="error" :offset="[-3, -6]"></u-badge>
				<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">预购</view>
			</view>
		</view>
<!-- 		<view class="right">
			<view class="buy btn u-line-1">付款</view>
		</view> -->
	</view>
</template>

<script>
export default {
	
};
</script>

<style lang="scss" scoped>
.navigation {
	width: 100rpx;
	display: flex;
	z-index: 999;
	position: fixed;
	bottom: 100rpx;
	left: 16%;
	right: 0;
	// margin-top: 100rpx;
	border: solid 2rpx #b8b8b8;
	border-radius: 45%;
	background-color: rgba(234, 234, 234, 0.7);
	padding: 12rpx 0;
	// flex: 1;
	// justify-content: flex-end;
	.left {
		display: flex;
		font-size: 20rpx;
		.item {
			margin: 0 20rpx;
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	// .right {
	// 	display: flex;
	// 	font-size: 28rpx;
	// 	align-items: center;
	// 	.btn {
	// 		line-height: 66rpx;
	// 		padding: 0 20rpx;
	// 		border-radius: 36rpx;
	// 		color: #ffffff;
	// 	}
	// 	.buy {
	// 		background-color: #92e228;
	// 	}
	// }
}
</style>
