<template>
	<view style="background-color: #f8f8f8;">
		<!-- 餐品名称价格特色轮播 -->
		<view class="detailStyle" v-for="item in detailData" :key="item.name">
			<!-- 详情页轮播 -->
			<view class="wrap">
				<u-swiper :list="item.foods_banner_imgs" :height="430" ></u-swiper>
			</view>
			<text class="u-line-2 u-p-l-20 u-p-r-20 u-m-t-15 u-m-b-10 u-text-center">
				{{item.foods_desc}}
			</text>
			<!-- 名字 -->
			<text class="item-menu-name">{{item.name}}</text>
			<!-- 单价 -->
			<text class="total-price">￥{{ item.price }}</text>
		</view>
		<!-- 评价 -->
		<view style="padding-bottom: 100rpx;">
			<view class="tag">
				<view style="font-size: 32rpx;">食客评价</view>
				<u-tag text="味道不错" mode="light" type="info" />
				<u-tag text="价格公道" mode="light" type="info"/>
				<u-tag text="好评+1" mode="light" type="info"/>
				<u-tag text="服务态度好" mode="light" type="info"/>
			</view>
			<view class="comment" v-for="(res, index) in commentList" :key="res.id">
				<view class="left">
					<image :src="res.userAva" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="name">{{ res.userName }}</view>
						<view class="like" :class="{ highlight: res.isLike }">
							<view class="num">{{ res.likeNum }}</view>
							<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)">
							</u-icon>
							<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
						</view>
					</view>
					<view class="content">{{ res.content }}</view>
				</view>
			</view>
		</view>
		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/home/home" open-type="switchTab" class="p-b-btn">
				<u-icon name="home" :size="40"></u-icon>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/order/order" open-type="switchTab" class="p-b-btn">
				<u-icon name="shopping-cart" :size="43"></u-icon>
				<text>美食车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" @click="isFavorite">
				<u-icon name="heart" :size="40" :color="$u.color['favorite']"></u-icon>
				<text>收藏</text>
			</view>
			
			<view class="action-btn-group">
				<button type="primary" class="action-btn no-border add-cart-btn" @click="toOrder">加入美食车</button>
				<button type="primary" class="action-btn no-border buy-now-btn" @click="toSureOrder()">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData: [], // 存储详情页数据
				commentList: [], // 评论信息
				favorite: false, // 收藏状态
			}
		},
		async onLoad(option) {
			// 请求餐品数据
			await uniCloud.callFunction({
				name: 'getFood',
				data: {
					// 传递商品名称
					type: option.name,
					openid: this.VXopenid || ''
				},
				success: (res) => {
					this.detailData = [res.result]
					// console.log(this.detailData);
					
					// 页面加载时同步收藏状态
					this.favorite = this.detailData[0].collect
				}
			});
		
			// 执行评论列表
			this.getComment(option.name);

		},
		methods: {
			// 评论点赞
			getLike(index) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			},
			// 评论列表
			async getComment(foodName) {
				const db = uniCloud.database();
				const res = await db.collection('dc-comments').where({
					foodName: foodName
				}).get();
				
				this.commentList = [
					...res.result.data,
					{
						id: 1,
						userName: '叶轻眉',
						content: '味道挺不错的,朋友都很喜欢吃,说下次还要继续点。 今天还是比较幸运的,去了不用排队,可能我们去比较早吧。 虽然中间出了一点小插曲,但还好不影响我们吃,而且店家提供的量是够的。 还担心不好吃呢,结果是感觉比想象中令人满意,..',
						userAva: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						likeNum: 33,
						isLike: false,
					},
					{
						id: 2,
						userName: '叶轻眉1',
						content: '味道超赞，而且一看就让人觉得很有食欲，但是分量不大，属于比较精致的类型。胜在菜品也很新鲜，味道咸淡适中，而且火候掌握的刚好。',
						likeNum: 11,
						isLike: false,
						userAva: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
					},
					{
						id: 3,
						userName: '叶轻眉2',
						content: '这家餐厅环境很好，非常干净整洁，食物不仅外形美观，重要的是味道非常棒，色味俱佳。做法保留了食材原有的味道，清新爽口。',
						likeNum: 21,
						isLike: false,
						userAva: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
					}
				];
			},
			// 收藏
			async isFavorite(){
				// 提取食品id
				let foodId = this.detailData[0]
				// 收藏状态
				this.favorite = !this.favorite;
				if(this.favorite) {
					// 收藏状态就将id存入vuex
					this.VXFavorite.push(foodId)
					uni.showToast({
					    title: '收藏成功',
					    duration: 2000
					});
				} else {
					uni.showToast({
					    title: '取消成功',
					    duration: 2000
					});
					// 若不是收藏状态就从数据库移除
					this.VXFavorite.forEach((res,index) => {
						if(res._id===foodId._id) this.VXFavorite.splice(index,1)
					})
				}
				// console.log(this.VXFavorite);
				// 云函数将 收藏 的数据存储
				await uniCloud.callFunction({
					name: 'private',
					data: {
						openid: this.VXopenid,
						favorites: this.VXFavorite
					},
					success: (res) => {
						console.log(res);
					}
				})
			},
			// 跳转立即购买
			toSureOrder() {
				// let data = this.suredata
				let data = []
				this.detailData[0].number = 1
				this.detailData[0].check = true
				if(data.length > 1) {
					data = []
				}
				data.push(this.detailData[0])
				
				this.$u.vuex('suredata', data)
				this.$u.vuex('addOn', data)
				uni.navigateTo({
					url: `/pages/order/sureOrder`
				})
			},
			// 详情页加购
			toOrder() {
				let data = this.FOODS;
				const name = this.detailData[0].name;
				(data.result || []).forEach(res => {
					if(res.name === name) {
						res.check = true
						res.number += 1
					}
				})
				// console.log(data);
				this.$u.vuex('FOODS', data)
				uni.showToast({
				    title: '加购成功',
				    duration: 500
				});
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
		font-size: 40rpx;
		margin: 6rpx 35rpx;
		color: #c30061;
	}
	.total-price {
		color: #c30061;
		font-size: 38rpx;
	}
	
	.tag {
		padding-left: 30rpx; 
		.u-tag {
			margin: 20rpx 15rpx;
		}
	}
	.wrap {
		padding: 15rpx 15rpx;
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
		}
	}
	
	/* 底部操作菜单 */
		.page-bottom{
			position:fixed;
			left: 30upx;
			bottom:30upx;
			z-index: 95;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 690upx;
			height: 100upx;
			background: rgba(255,255,255,.6);
			box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
			border-radius: 16upx;
			
			.p-b-btn{
				display:flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				color: #000000;
				width: 96upx;
				height: 80upx;
				&.active, &.active .yticon{
					color: #fa436a;
				}
			}
			.action-btn-group{
				display: flex;
				height: 76upx;
				border-radius: 100px;
				overflow: hidden;
				box-shadow: 0 20upx 40upx -16upx #fa436a;
				box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
				background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
				margin-left: 20upx;
				position:relative;
				&:after{
					content: '';
					position:absolute;
					top: 50%;
					right: 50%;
					transform: translateY(-50%);
					height: 28upx;
					width: 0;
					border-right: 1px solid rgba(255,255,255,.5);
				}
				.action-btn{
					display:flex;
					align-items: center;
					justify-content: center;
					width: 180upx;
					height: 100%;
					font-size: 24rpx ;
					padding: 0;
					border-radius: 0;
					background: transparent;
				}
			}
		}
</style>
