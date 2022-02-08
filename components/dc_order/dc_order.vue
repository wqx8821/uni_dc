<template>
	<view class="navigation">
		<view class="left" @click="toOrder()">
			<view class="item car">
				<u-badge class="car-num" :count="0" type="error" :offset="[-3, -6]"></u-badge>
				<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">预购</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		toOrder() {
			uni.reLaunch({
				url: '../../pages/order/order'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.navigation {
	width: 93rpx;
	display: flex;
	z-index: 999;
	position: fixed;
	bottom: 1%;
	left: 1%;
	right: 0;
	// margin-top: 100rpx;
	border: solid 2rpx #b8b8b8;
	border-radius: 50%;
	background-color: rgba(234, 234, 234, 0.1);
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
