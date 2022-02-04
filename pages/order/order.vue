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
					<u-checkbox 
						v-model="item.checked" 
						active-color="red" 
						shape="circle"
						:name="item.name"
						@change="check"
					></u-checkbox>
					<image mode="aspectFill" class="item-menu-image" :src="item.foods_thumb" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<view class="item-menu-name">{{item.name}}</view>
						<!-- 价格 -->
						<text class="total-price">￥{{ item.price }}</text>
						<!-- 数量 -->
						<u-number-box v-model="item.number" :min="1" :index='item.name' @change="numChange"></u-number-box>
					</view>
				</view>
			</u-swipe-action>
		</view>

		<!-- 底部菜单栏 -->
		<view class="action-section">
			<!-- 全选按钮 -->
			<!-- <u-button @click="checkedAll">全选</u-button> -->
			<u-checkbox v-model="allChecked" active-color="red" shape="circle" @change="checkedAll" >全选</u-checkbox>
			<view class="total-box">
				<text class="price">总计  ¥{{totalPrice}}</text>
				<text class="coupon">
					已优惠
					<text>0.00</text>
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
					"foods_thumb": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3210050521,2628476601&fm=26&gp=0.jpg",
					"name": "宫保鸡丁",
					"price": 35,
					"number": 2,
					"checked": true,
					"_createTime": 1612936568799,
					"_updateTime": 1613344915884,
					"fenlei": "店长推荐"
				},{
					"_id": "28ee4e3e6023757804385d0b1e9aed15",
					"foods_thumb": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3210050521,2628476601&fm=26&gp=0.jpg",
					"name": "宫保鸡",
					"price": 35,
					"number": 1,
					"checked": true,
					"_createTime": 1612936568799,
					"_updateTime": 1613344915884,
					"fenlei": "店长推荐"
				},{
					"_id": "28ee4e3e6023757804385d0b1e9aed15",
					"foods_thumb": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3210050521,2628476601&fm=26&gp=0.jpg",
					"name": "宫鸡丁",
					"price": 35,
					"number": 5,
					"checked": true,
					"_createTime": 1612936568799,
					"_updateTime": 1613344915884,
					"fenlei": "店长推荐"
				}],
				options: [{text: '删除',style: {backgroundColor: '#dd524d'}}],
				show: false,
				allChecked: true, // 全选
				totalPrice: 0, // 总价
			};
		},
		onLoad() {
			this.calcTotal() //计算总价
		},
		methods: {
			// 跳转到评价页面
			toEvaluation() {
				uni.navigateTo({
					url: '../evaluation/evaluation'
				})
			},
			// 订单选择状态， 是否全选
			check(e) {
				// 每次点击就更新一下全选按钮
				this.allChecked = !this.allChecked
				this.dcdata.forEach(item=>{
					// 根据名字更新数据状态
					if(item.name === e.name) {
						item.checked = e.value
					}
					// 若有数据不是选中状态就将 全选状态去除
					if(!item.checked) {
						this.allChecked = false
					}
				})
				this.calcTotal() //计算总价
			},
			// 全选
			checkedAll(allcked) {
				// 全选按钮状态
				this.allChecked = !this.allChecked
				// 列表按钮状态
				this.dcdata.forEach(item=>{
					item.checked = this.allChecked;
				})
				this.calcTotal() //计算总价
			},
			// 计算总价
			calcTotal() {
				// 每次计算前 清空状态，防止一直累加
				this.totalPrice = 0
				// 若购物车无商品就不计算
				if(!this.dcdata.length) return;
				this.dcdata.forEach(item=>{
					// 只计算选中的食品
					if(item.checked) {
						this.totalPrice += item.price * item.number;
					}
				})
			},
			// 计算商品数量
			numChange(e) {
				// 若购物车无商品就不计算
				if(!this.dcdata.length) return;
				// 根据步进器更新数据
				this.dcdata.forEach(item=>{
					// 只计算选中的食品
					if(item.name === e.index) {
						item.number = e.value 
					}
				})
				// 计算总价
				this.calcTotal()
			},
			// 跳转确认订单
			createOrder() {
				let list = this.dcdata;
				let foodsData = [];
				list.forEach(item => {
					if (item.checked) {
						// 将必须的字段传入 确认订单页
						foodsData.push({
							// foods_thumb: item.foods_thumb,
							name: item.name,
							price: item.price,
							number: item.number,
							// totalPrice:this.totalPrice
						})
					}
				})
				
				uni.navigateTo({
					url: `/pages/order/sureOrder?data=${JSON.stringify({
							foodsData: foodsData
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
		margin: 0 20rpx 0 0;
	}
	.item {
		display: flex;
		background-color: rgba(247, 247, 241, 0.7);
		border-radius: 10rpx;
		margin: 0 10rpx;
		margin-top: 5rpx;
		padding: 10rpx;
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
			align-items: center;
			// justify-content: space-between;
			// text-align: right;
			// padding-right: 40rpx;

			.price {
				font-size: 32rpx;
				color: #303133;
			}

			.coupon {
				font-size: 26rpx;
				color: #909399;

				text {
					color: #303133;
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
