<template>
	<view class="u-wrap">
		<view class="search_d">
			<u-search placeholder="想吃点啥" bg-color="#edf1f9" :disabled=true @click="toSearch()"></u-search>
		</view>
		<view class="swiper_wrap">
			<u-swiper :list="list" height="300" mode="rect"></u-swiper>
		</view>
		<view class="">
			<u-select v-model="show" mode="single-column" :list="list1" @confirm="confirm"></u-select>
			<u-tag :text="seat" mode="dark" @click="show = true"/>
			<!-- <button type="default"  shape="square" size="mini" plain>{{seat}}</button> -->
		</view>
		<!-- 最新活动 -->
		<view class="">
			<u-card :title="title" :sub-title="subTitle" :thumb="thumb" padding="30" title-color='red' title-size="40">
					<view class="" slot="body">
						<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
							<view class="u-body-item-title u-line-3">小铺新开张，至今日起前来本店消费的食客，送饮料一份，进店帮忙推广宣传送50元代金卷，祝各位食客吃的开心</view>
							<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
						</view>
					</view>
				</u-card>
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
							<image class="item-menu-image" :src="item.image" mode="" @click="toDetail()"></image>
							<view style="display: flex; flex-direction: column; align-items: center;">
								<!-- <view class="item-menu-name">{{item.name}}</view> -->
								<view class="item-menu-name">好吃的</view>
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
							<image class="item-menu-image" :src="item.image" mode="" @click="toDetail()"></image>
							<view style="display: flex; flex-direction: column; align-items: center;">
								<!-- <view class="item-menu-name">{{item.name}}</view> -->
								<view class="item-menu-name">好吃的</view>
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
			<view class="indicator-dots" v-if="isSwiper">
				<view class="indicator-dots-item" :class="[current == 0 ? 'indicator-dots-active' : '']">
				</view>
				<view class="indicator-dots-item" :class="[current == 1 ? 'indicator-dots-active' : '']">
				</view>
			</view>
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
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-226aa1402126662efd2013ad719f0b77_1440w.jpg%3Fsource%3D172ae18b&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644487883&t=edc2945aa37275441c6405dbfbb3a45e',
					},
					{
						image: 'https://img1.baidu.com/it/u=2338790813,1586896540&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
					},
					{
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftr-osdcp.qunarzz.com%2Ftr-osd-tr-space%2Fimg%2F13b1399e73f91eb66c801106d2bf266c.jpg_r_680x452x95_677723c5.jpg&refer=http%3A%2F%2Ftr-osdcp.qunarzz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644488304&t=9e5d5f13877c9f4dcfab3f54307b19e6',
					},
					{
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.cool-de.com%2Fdata%2Fattachment%2Fforum%2F201907%2F16%2F113959hrivh9vvq3kqa8xq.jpg&refer=http%3A%2F%2Fimage.cool-de.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644488137&t=50a4eeb1913549db8f3251a454254dd6',
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
			}
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
	}

	.swiper_wrap {
		padding: 10rpx;
	}

	.search_d {
		padding: 4rpx 0;
		background-color: #f8f8f8;
	}
	// 最新活动
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
		background-color: #fafafa;
		width: 100%;
		padding: 6rpx;
		// box-shadow: 0 0 1rpx #000000;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		// justify-content: center;
		flex-direction: row;
		// align-items: flex-end;
		justify-content: space-around;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 220rpx;
		height: 200rpx;
		border-radius: 15rpx;
	}
</style>
