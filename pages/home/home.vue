<template>
	<view class="u-wrap">
		<view class="search_d">
			<u-search placeholder="想吃点啥" bg-color="#edf1f9" :disabled=true @click="toSearch()"></u-search>
		</view>
		<view class="swiper_wrap">
			<u-swiper :list="list" height="350" mode="rect"></u-swiper>
		</view>
		<!-- 选择座位 -->
		<view class="">
			<u-select v-model="show" mode="single-column" :list="list1" @confirm="confirm"></u-select>
			<u-tag :text="seat" mode="dark" @click="show = true"/>
		</view>
		<!-- 最新活动 -->
		<view class="activity">
			<u-card :title="title" :sub-title="subTitle" padding="30" title-color='red' title-size="40">
					<view class="" slot="body">
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
				<text class="tip">8点场</text>
				<text class="hour timer">07</text>
				<text class="minute timer">13</text>
				<text class="second timer">55</text>
				<text class="yticon icon-you"></text>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view 
						v-for="(item, index) in list" :key="index"
						class="floor-item"
						@click="navToDetailPage(item)"
					>
						<image :src="item.image" mode="aspectFill"></image>
						<text class="title clamp">{{item.name}}</text>
						<!-- <text class="price">￥{{item.price}}</text> -->
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 新品推荐 -->
		<view class="">
			热门推荐
			<swiper class="swiper" @change="change">
				<swiper-item>
					<u-grid :col="2" @click="click" :border="false">
						<u-grid-item class="thumb-box">
							<image src="../../static/gif/gif1.gif" mode="" style="width: 100%; height: 300rpx;"></image>
						</u-grid-item>
						<u-grid-item v-for="(item, index) in list.slice(1, 4)" :index="index" :key="index" class="thumb-box">
							<image class="item-menu-image" :src="item.image" mode="" @click="toDetail(item.name)"></image>
							<view style="display: flex; flex-direction: column; align-items: center;">
								<!-- <view class="item-menu-name">{{item.name}}</view> -->
								<view class="item-menu-name">{{item.name}}</view>
								<!-- 价格 -->
								<text class="total-price">
									<!-- ￥{{ item.price }} -->
									￥44元
								</text>
							</view>
						</u-grid-item>
					</u-grid>
				</swiper-item>
				<swiper-item>
					<u-grid :col="2" @click="click" :border="false">
						<u-grid-item v-for="(item, index) in list.slice(2, 4)" :index="index" :key="index" class="thumb-box">
							<image class="item-menu-image" :src="item.image" mode="" @click="toDetail(item.name)"></image>
							<view style="display: flex; flex-direction: column; align-items: center;">
								<!-- <view class="item-menu-name">{{item.name}}</view> -->
								<view class="item-menu-name">{{item.name}}</view>
								<!-- 价格 -->
								<text class="total-price">
									<!-- ￥{{ item.price }} -->
									￥44元
								</text>
							</view>
						</u-grid-item>
					</u-grid>
				</swiper-item>
			</swiper>
	<!-- 		<view class="indicator-dots" v-if="isSwiper">
				<view class="indicator-dots-item" :class="[current == 0 ? 'indicator-dots-active' : '']">
				</view>
				<view class="indicator-dots-item" :class="[current == 1 ? 'indicator-dots-active' : '']">
				</view>
			</view> -->

		</view>
		<!-- <dc_order></dc_order> -->
	</view>
</template>
<script>
	import classifyData from '@/common/classify.data.js';
	export default {
		data() {
			return {
				list: [{
						image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-91815abe-c96c-4864-8fe8-886aafd84f6f/6f1adb6a-208f-4a02-bfcd-e6b1b8b3708f.jfif',
						name: 2
					},
					{
						image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-91815abe-c96c-4864-8fe8-886aafd84f6f/e57f7483-dd70-40da-85b1-153eed6e0f96.jfif',
						name: 2
					},
					{
						image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-91815abe-c96c-4864-8fe8-886aafd84f6f/5677179d-ae35-48f0-9441-6097d3aafd92.jfif',
						name: 2
					}
				],
				search: '', // 双向绑定定义搜索内容
				show: false,
				seat: "请选择座位号", // 座位
				list1: [{
						value: '1',
						label: '一号座位'
					},
					{
						value: '2',
						label: '二号座位'
					},
					{
						value: '2',
						label: '三号座位'
					},
					{
						value: '2',
						label: '四号座位'
					},
					{
						value: '2',
						label: '五号座位'
					},
					{
						value: '2',
						label: '六号座位'
					}
				],
				// 上新推荐
				current: 0,
				// 最新活动
				title: 'NEW 开业福利！！！',
				subTitle: '2022-05-21',
				isSwiper: true, // 
				goodsList: []
			}
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
			// 上新推荐
			change(e) {
				this.current = e.detail.current;
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
	
	// 上新推荐
	.item-menu-image {
		width: 200rpx;
		height: 200rpx;
	}
	.swiper {
		height: 600rpx;
		circular: true;
	}
	.u-grid-item {
		width: 100%;
		height: 300rpx;
		
	}
	.u-grid-item /deep/ .u-grid-item-box {
		// flex-direction: row ;
		padding: 0;
		justify-content: flex-start;
		// align-items: 
	}
	.total-price {
		color: red;
	}
	.item-menu-name {
		font-weight: normal;
		font-size: 30rpx;
		margin-bottom: 6rpx;
		color: $u-main-color;
	}
	
	.thumb-box {
		background-color: #F8F8F8;
		width: 100%;
		// padding: 6rpx;
		// box-shadow: 0 0 1rpx #000000;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		// justify-content: center;
		flex-direction: row;
		// align-items: flex-end;
		justify-content: space-around;
		// margin: 2rpx;
	}
	
	.item-menu-image {
		width: 220rpx;
		height: 200rpx;
		border-radius: 15rpx;
	}

	/* 秒杀专区 */
	.seckill-section{
		margin: 10rpx 15rpx;
		padding: 4upx 30upx 24upx;
		background: #fff;
		.s-header{
			display:flex;
			align-items:center;
			height: 92upx;
			line-height: 1;
			.s-img{
				width: 140upx;
				height: 30upx;
			}
			.tip{
				font-size: 16px;
				color: #000000;
				margin: 0 20upx 0 40upx;
			}
			.timer{
				display:inline-block;
				width: 40upx;
				height: 36upx;
				text-align:center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: 16px;
				color: #fff;
				border-radius: 2px;
				background: rgba(0,0,0,.8);
			}
			.icon-you{
				font-size: 16px;
				color: #000000;
				flex: 1;
				text-align: right;
			}
		}
		.floor-list{
			white-space: nowrap;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 150upx;
			margin-right: 20upx;
			font-size: 16px;
			color: #000000;
			line-height: 1.8;
			image{
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}
			.price{
				color: #000000;
			}
		}
	}
</style>
