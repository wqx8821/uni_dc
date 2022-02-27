<template>
	<view>
		<view class="item-container" v-if="dcdata.length">
			<view class="thumb-box" v-for="(item, index) in dcdata" :key="index" @click="toDetail(item.name)">
				<image class="item-menu-image" :src="item.foods_thumb"></image>
				<view style="display: flex; flex-direction: column; align-items: flex-end;">
					<view class="item-menu-name">{{item.name}}</view>
					<!-- 价格 -->
					<text style="color: red;">
						￥{{ item.price }}
					</text>
				</view>
			</view>
		</view>
		<view v-else>
			<u-empty
			        mode="list"
			        icon="http://cdn.uviewui.com/uview/empty/car.png"
					marginTop="100"
					iconSize="130"
			>
			</u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dcdata: []
			};
		},
		async onLoad() {
			// let res = this.FOODS
			// this.dcdata = res.result
			// 请求餐品数据
			await uniCloud.callFunction({
				name: 'getFood',
				data: {
					// 传递商品名称
					type: '收藏列表',
					openid: this.VXopenid || ''
				},
				success: (res) => {
					// console.log(res.result);
					this.dcdata = res.result || []
					// console.log(this.dcdata);
				}
			});
		},
		methods: {
			// 跳转详情页
			toDetail(name) {
				uni.navigateTo({
					url: `../detail/detail?name=${name}`
				})
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>
<style lang="scss" scoped>
	.sortStyle {
		border:  1rpx dashed #edf2fa;
	}
	.green {
		color: #55d98d;
	}
	.filer {
		margin: 20rpx 0 0rpx 0;
		background-color: #f5f5f5;
		width: 100%;
		display: flex;
		justify-content: space-around;
		// flex: 1;
	}
	// 列表样式
	.thumb-box {
		background-color: #fbfbfb;
		width: 100%;
		padding: 6rpx 60rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 10rpx;
	}
	.item-menu-name {
		font-weight: normal;
		font-size: 30rpx;
		margin-bottom: 26rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	.item-menu-image {
		width: 180rpx;
		height: 180rpx;
		border-radius: 20rpx;
	}
</style>
