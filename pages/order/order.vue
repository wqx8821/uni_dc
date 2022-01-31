<template>
	<view>
		<!-- 列表 -->
		<view class="cart-list">
			<u-swipe-action 
			:show="show"
			:options="options"
			:index="index"
			v-for="(item, index) in dcdata" 
			:key="index"
			>
				<view class="item u-border-bottom">
					<image mode="aspectFill" class="item-menu-image" :src="item.icon" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<view class="item-menu-name">{{item.name}}</view>
						<!-- 价格 -->
						<text class="total-price">￥{{ item.price }}</text>
						<!-- 数量 -->
						<u-number-box :min="1" :max="100"></u-number-box>
					</view>
				</view>
			</u-swipe-action>
		</view>

		<!-- 底部菜单栏 -->
		<view class="action-section">
			<view class="total-box">
				<text class="price">¥8888</text>
				<text class="coupon">
					已优惠
					<text>74.35</text>
					元
				</text>
			</view>
			<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dcdata: [{
					"_id": "28ee4e3e6023757804385d0b1e9aed15",
					"icon": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3210050521,2628476601&fm=26&gp=0.jpg",
					"name": "宫保鸡丁",
					"price": 35,
					"sell": 12,
					"status": "上架",
					"_createTime": 1612936568799,
					"_updateTime": 1613344915884,
					"fenlei": "店长推荐"
				}],
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				show: false,
			};
		},
		onLoad() {

		},
		computed: {
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}
		},
		methods: {
			// 跳转到评价页面
			toEvaluation() {
				uni.navigateTo({
					url: '../evaluation/evaluation'
				})
			},
			// 跳转确认订单
			createOrder() {
				// let list = this.cartList;
				// let goodsData = [];
				// list.forEach(item => {
				// 	if (item.checked) {
				// 		goodsData.push({
				// 			attr_val: item.attr_val,
				// 			number: item.number
				// 		})
				// 	}
				// })
				uni.navigateTo({
					url: `/pages/order/sureOrder?data=${JSON.stringify({
							// goodsData: goodsData
						})}`
				})
			},
			//删除
			deleteCartItem(index){
				let list = this.cartList;
				let row = list[index];
				let id = row.id;
			
				this.cartList.splice(index, 1);
				this.calcTotal();
				uni.hideLoading();
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 购物车列表项 */
	.item-menu-name {
		font-weight: normal;
		font-size: 30rpx;
		margin-bottom: 6rpx;
		color: $u-main-color;
	}
	.item-menu-image {
		width: 220rpx;
		height: 200rpx;
		border-radius: 10rpx;
		margin: 0 20rpx;
	}
	.item {
		display: flex;
		padding: 20rpx;
	}
	.title-wrap {
		display: flex;
		flex-direction: column;
		padding: 10rpx 25rpx;
		// align-items: center;
		justify-content: space-between;
	}
	
	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100rpx;
		/* #endif */
		position: fixed;
		left: 30rpx;
		bottom: 30rpx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690rpx;
		height: 100rpx;
		padding: 0 30rpx;
		background: rgba(220, 220, 220, 0.6);
		box-shadow: 0 0 5rpx 0 rgba(0, 0, 0, .5);
		border-radius: 16rpx;

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40rpx;

			.price {
				font-size: 34rpx;
				color: rgba(217, 60, 93, 0.72);
			}

			.coupon {
				font-size: 34rpx;
				color: rgba(217, 60, 93, 0.72);

				text {
					color: rgba(217, 60, 93, 0.72);
				}
			}
		}

		.confirm-btn {
			padding: 0 38rpx;
			margin: 0;
			border-radius: 100px;
			height: 76rpx;
			line-height: 76rpx;
			font-size: 34rpx;
			background: #fa436a;
			box-shadow: 1px 2px 5px #d93c5db8;
		}
	}
</style>
