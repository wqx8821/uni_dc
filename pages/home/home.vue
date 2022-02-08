<template>
	<view class="u-wrap">
		<!-- 搜索 -->
		<view class="search_d">
			<u-search 
				placeholder="想吃点啥" 
				bg-color="#edf1f9" 
				:disabled='true' 
				:show-action='false' 
				margin="0 15rpx"
				@click="toSearch()"
				>
			</u-search>
		</view>
		<!-- 轮播 -->
		<view class="swiper_wrap">
			<u-swiper :list="list" height="350" mode="rect"></u-swiper>
		</view>
		<!-- 选择座位 -->
		<view class="">
			<u-select v-model="show" mode="single-column" :list="seatList" @confirm="confirm"></u-select>
			<u-tag :text="seat" mode="dark" @click="show = true"/>
		</view>
		<!-- 最新活动 -->
		<view class="activity">
			<u-card :title="title" :sub-title="subTitle" padding="30" title-color='red' title-size="40">
					<view slot="body">
						<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
							<view class="u-body-item-title u-line-3">小铺新开张，至今日起前来本店消费的食客，送饮料一份，进店帮忙推广宣传送50元代金卷，祝各位食客吃的开心</view>
							<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
						</view>
					</view>
				</u-card>
		</view>
		<!-- 秒杀楼层 -->
		<view class="seckill-section m-t">
			<view class="s-header">
				<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>
				<view>
					<text class="tip">今日特惠</text>
					<u-count-down :timestamp="timestamp" bg-color="#000000" color="#ffffff"></u-count-down>
				</view>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view 
						v-for="(item, index) in discountList" :key="index"
						class="floor-item"
					>
						<image :src="item.foods_thumb" mode="aspectFill" @click="toDetail(item.name)"></image>
						<text class="title clamp">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [{ // 轮播
					image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-91815abe-c96c-4864-8fe8-886aafd84f6f/6f1adb6a-208f-4a02-bfcd-e6b1b8b3708f.jfif'},{
					image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-91815abe-c96c-4864-8fe8-886aafd84f6f/e57f7483-dd70-40da-85b1-153eed6e0f96.jfif'},{
					image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-91815abe-c96c-4864-8fe8-886aafd84f6f/5677179d-ae35-48f0-9441-6097d3aafd92.jfif'}], 
				timestamp: 86400, // 倒计时
				discountList: {}, // 请求的优惠餐品数据信息
				search: '', // 双向绑搜索内容
				show: false,
				seat: "请选择座位号", // 座位
				seatList: [{
						value: '1',
						label: '一号座位'
					},
					{
						value: '2',
						label: '二号座位'
					},
					{
						value: '3',
						label: '三号座位'
					}
				],
				// 最新活动
				title: 'NEW 开业福利！！！',
				subTitle: '2022-05-21',
				isSwiper: true, // 
				goodsList: []
			}
		},
		async onLoad() {
			// 更新倒计时时间
			this.updateTime();
			// 请求餐品数据
			await uniCloud.callFunction({
				name: 'getFood',
				data: {
					type: '今日特惠'
				},
				success: (res) => {
					this.discountList = res.result
					// console.log(this.discountList);
				}
			});
		},
		methods: {
			// 跳转搜索页面
			toSearch() {
				uni.navigateTo({
					url: '/pages/home/search/search'
				})
			},
			// 选择座位
			confirm(e) {
				console.log(e[0].label);
				this.seat = e[0].label
			},
			// 根据时间更新倒计时
			updateTime() {
				// 获取当前时间
				let date = new Date()
				// 获取当前日期 当天0:00
				let e = new Date(date.toLocaleDateString())
				// 获取今天剩余的时间（秒）
				this.timestamp = 86400 - (date.getTime() - e.getTime()) / 1000
			},
			// 推荐商品跳转详情页
			toDetail(name) {
				uni.navigateTo({
					url: `/pages/detail/detail?name=${name}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top) + 300rpx);
		/* #endif */
		display: flex;
		flex-direction: column;
		background-color: #f8f8f8;
	}

	.swiper_wrap {
		padding: 10rpx;
	}

	.search_d {
		padding: 4rpx 0;
		background-color: #f8f8f8;
	}
	// 最新活动
	.activity {
		// padding: 20rpx 10rpx;
	}
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}
		
	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
	/* 秒杀专区 */
	.seckill-section{
		margin: 10rpx 15rpx;
		padding: 4rpx 30rpx 24rpx;
		background: #fff;
		.s-header{
			display:flex;
			justify-content: space-between;
			align-items:center;
			height: 92rpx;
			line-height: 1;
			.s-img{
				width: 88rpx;
				height: 30rpx;
			}
			.tip{
				font-size: 16px;
				color: #000000;
				margin: 0 30rpx 0 40rpx;
			}
		}
		.floor-list{
			// white-space: nowrap;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			margin-right: 20rpx;
			font-size: 16px;
			color: #000000;
			line-height: 1.8;
			image{
				width: 270rpx;
				height: 200rpx;
				border-radius: 6rpx;
			}
			.title {
				padding-left: 10rpx;
			}
			.price{
				color: #c13248;
			}
		}
	}
</style>
