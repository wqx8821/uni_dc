<template>
	<view style="background-color: #f8f8f8;">
		<!-- 餐品名称价格特色轮播 -->
		<view class="detailStyle" v-for="item in detailData" :key="item.name">
			<!-- 名字 -->
			<text class="item-menu-name">{{item.name}}</text>
			<!-- 详情页轮播 -->
			<view class="wrap"   >
				<u-swiper :list="item.foods_banner_imgs" :height="450" ></u-swiper>
			</view>
			<text class="u-line-2 u-p-l-20 u-p-r-20 u-m-t-20">{{item.foods_desc}}</text>
			<text class="total-price">￥{{ item.price }}</text>
			<u-divider></u-divider>
		</view>
		<!-- 评价 -->
		<view class="tag">
			<view style="font-size: 32rpx;">食客评价</view>
			<u-tag text="味道不错" mode="light" type="info" />
			<u-tag text="价格公道" mode="light" type="info"/>
			<u-tag text="好评+1" mode="light" type="info"/>
			<u-tag text="服务态度好" mode="light" type="info"/>
		</view>
		<view class="comment" v-for="(res, index) in commentList" :key="res.id">
			<view class="left">
				<image :src="res.url" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.name }}</view>
					<view class="like" :class="{ highlight: res.isLike }">
						<view class="num">{{ res.likeNum }}</view>
						<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)">
						</u-icon>
						<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
					</view>
				</view>
				<view class="content">{{ res.contentText }}</view>
				<view class="reply-box">
					<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
						<view class="username">{{ item.name }}</view>
						<view class="text">{{ item.contentStr }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
						共{{ res.allReply }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
				<view class="bottom">
					{{ res.date }}
					<view class="reply">回复</view>
				</view>
			</view>
		</view>
		
		<!-- 购物栏 -->
		<view class="navigation">
			<view class="left">
				<view class="item">
					<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">首页</view>
				</view>
				<view class="item car">
					<u-badge class="car-num" :count="9" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">选佳肴</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1">加入美食清单</view>
				<view class="buy btn u-line-1">立即结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData: [], // 存储详情页数据
				commentList: [] // 评论信息
			}
		},
		async onLoad(option) {
			this.getComment();
			// 获取菜单页传递的菜品名称,连接数据库查询数据渲染
			const db = uniCloud.database();
			const collection = db.collection('dc-goods')
			// 根据菜品名查询数据
			const res = await collection.where({
				'dc_foods.foods.name': option.name
			}).limit(1).get()
			// 处理查询的数据 获取指定内容
			const filterData = res.result.data[0].dc_foods.foods
			this.detailData = filterData.filter(res=> {
				// 过滤数据
				return res.name == option.name
			})
			console.log(this.detailData);
		},
		methods: {
			// 跳转到全部回复
			toAllReply() {
				uni.navigateTo({
					url: '/pages/detail/reply'
				});
			},
			// 点赞
			getLike(index) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			},
			// 评论列表
			getComment() {
				this.commentList = [{
						id: 1,
						name: '叶轻眉',
						date: '12-25 18:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						allReply: 12,
						likeNum: 33,
						isLike: false,
						replyList: [{
								name: 'uview',
								contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
							},
							{
								name: '粘粘',
								contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
							}
						]
					},
					{
						id: 2,
						name: '叶轻眉1',
						date: '01-25 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 11,
						isLike: false,
						url: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
					},
					{
						id: 3,
						name: '叶轻眉2',
						date: '03-25 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 21,
						isLike: false,
						allReply: 2,
						url: '../../../static/logo.png',
						replyList: [{
								name: 'uview',
								contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
							},
							{
								name: '豆包',
								contentStr: '想吃冰糖葫芦粘豆包，但没钱5555.........'
							}
						]
					},
					{
						id: 4,
						name: '叶轻眉3',
						date: '06-20 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						allReply: 0,
						likeNum: 150,
						isLike: false
					}
				];
			}
		}
	};
</script>

<style lang="scss" scoped>
	.detailStyle {
		margin: 0 8rpx 10rpx 8rpx;
		padding: 10rpx 10rpx;
		// background-color: #fafafa;
		border: 1px solid #f5f5f5;
		border-radius: 20rpx;
		box-shadow: 0 0 1px #7c7c7c;
	}
	// 详细信息
	.item-menu-name {
		font-weight: normal;
		font-size: 35rpx;
		margin: 6rpx 25rpx;
		color: $u-main-color;
	}
	.total-price {
		color: red;
	}
	
	.tag {
		padding-left: 30rpx; 
		.u-tag {
			margin: 20rpx 15rpx;
		}
	}
	.wrap {
		padding: 20rpx 20rpx;
	}
	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
	// 购物栏
	.navigation {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		border: solid 2rpx #f2f2f2;
		background-color: #f8f8f8;
		padding: 16rpx 0;
		.left {
			display: flex;
			font-size: 20rpx;
			margin-right: 30rpx;
			.item {
				margin: 0 30rpx;
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
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			.btn {
				line-height: 66rpx;
				padding: 0 35rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}
			.cart {
				background-color: #ed3f14;
				margin-right: 35rpx;
			}
			.buy {
				background-color: #ff7900;
			}
		}
	}
</style>
