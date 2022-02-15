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
						v-model="item.check" 
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
						<u-number-box
							v-model="item.number"
							:min="1" 
							:index='item.name' 
							:disabled-input='true'
							@change="numChange"
							>
						</u-number-box>
					</view>
				</view>
			</u-swipe-action>
		</view>

		<!-- 底部菜单栏 -->
		<view class="action-section">
			<!-- 全选按钮 -->
			<!-- <u-button @click="checkedAll">全选</u-button> -->
			<u-checkbox v-model="allCheck" active-color="red" shape="circle" @change="checkedAll" >全选</u-checkbox>
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
				dcdata: [],
				options: [{text: '删除',style: {backgroundColor: '#dd524d'}}],
				show: false,
				allCheck: true, // 全选
				totalPrice: 0, // 总价
			};
		},
		async onLoad() {
			await this.calcTotal() //计算总价
		},
		async onShow() {
			// 加购解决方案
			let addon = []; 
			(this.FOODS.result || []).forEach(res => {
				// 遍历备份数据，将加购的数据提取出来
				if(res.number) {
					res.check = true
					// 数量大于零就添加到购物车
					addon.push(res)
				} else {
					res.check = false
				}
			})
			// 将提取的数据存入vuex
			await this.$u.vuex('addOn', addon)
			// 加载加入购物车数据
			if(addon.length) this.dcdata = this.addOn
			
			// 云函数将购物车数据存储数据中
			await uniCloud.callFunction({
				name: 'private',
				data: {
					openid: this.VXopenid,
					addOrder: this.dcdata
				},
				success: (res) => {
					// console.log(res);
				}
			})

			// 提前将数据赋值给成功的数据，
			this.$u.vuex('suredata',this.dcdata)
			// console.log(this.addOn);
			
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
				this.allCheck = !this.allCheck
				this.dcdata.forEach(item=>{
					// 根据名字更新数据状态
					if(item.name === e.name) {
						item.check = e.value
					}
					// 若有数据不是选中状态就将 全选状态去除
					if(!item.check) {
						this.allCheck = false
					}
				})
				// console.log(this.dcdata);
				// 将最新的选中状态更新到vuex
				this.$u.vuex('suredata',this.dcdata)
				
				this.calcTotal() //计算总价
				
				// // 云函数将购物车数据存储数据中
				// uniCloud.callFunction({
				// 	name: 'test',
				// 	data: {
				// 		openid: this.VXopenid,
				// 		addOrder: []
				// 	},
				// 	success: (res) => {
				// 		console.log(res);
				// 	}
				// })
			},
			// 全选
			checkedAll(allcked) {
				// 全选按钮状态
				this.allCheck = !this.allCheck
				// 列表按钮状态
				this.dcdata.forEach(item=>{
					item.check = this.allCheck;
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
					if(item.check) {
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
				// 计算总价，若总价为零则不跳转
				this.calcTotal()
				if(!this.totalPrice) {
					uni.showToast({
					    title: '小主还没有选择好吃的',
						icon: 'none',
					    duration: 1000
					});
				} else{
					uni.navigateTo({
						url: `/pages/order/sureOrder`
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 购物车列表项 */
	.cart-list {
		// margin-bottom: 200rpx;
	}
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
