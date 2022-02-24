<template>
	<view style="background-color: #f8f8f8;">
		<u-search 
			placeholder="想吃点啥" 
			bg-color="#edf1f9" 
			:focus="true" 
			v-model="searchValue" 
			:show-action='false'
			margin="0 15rpx"
			>
		</u-search>
		<!-- 搜索列表 -->
		<view class="filer">
			<text @click="sortData = false" class="sortStyle">价格降序</text>
			<text @click="sortData = true" class="sortStyle">价格升序</text>
		</view>
		<view class="item-container" v-if="searchData.length">
			<view class="thumb-box" v-for="(item, index) in searchData" :key="index">
				<image class="item-menu-image" :src="item.foods_thumb" @click="toDetail(item.name)"></image>
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
		<!-- <search-list :searchValue="searchValue"></search-list> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				sortData: true,
				dcdata: []
			}
		},
		mounted() {
			let res = uni.getStorageSync('storagefoods')
			this.dcdata = JSON.parse(JSON.stringify(res.result))
		},
		methods: {
			// 跳转详情页
			toDetail(name) {
				console.log(name);
				uni.navigateTo({
					url:`../../../subpkg/detail/detail?name=${name}`,
					success() {
						console.log('cg');
					}
				})
			},
		},
		computed: {
			searchData() {
				let filData = this.dcdata.filter(item => {
					return item.name.includes(this.searchValue)
				})
				return filData.sort((a,b) => {
					return this.sortData ? a.price - b.price : b.price - a.price
				})	
			}
		}
	}
</script>


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
		// box-shadow: 0 0 1rpx #000000;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		// justify-content: center;
		flex-direction: row;
		// align-items: flex-end;
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
		width: 220rpx;
		height: 220rpx;
		border-radius: 20rpx;
	}
</style>

