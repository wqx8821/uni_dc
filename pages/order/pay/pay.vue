<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{total}}</text>
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<u-icon name="weixin-fill" class="icon yticon icon-weixinzhifu"></u-icon>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(2)">
				<u-icon name="zhifubao" class="icon yticon icon-alipay"></u-icon>
				<view class="con">
					<text class="tit">支付宝支付</text>
					<text>支付宝不享有特惠</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
<!-- 			<view class="type-item" @click="changePayType(3)">
				<u-icon name="rmb-circle" class="icon yticon icon-erjiye-yucunkuan"></u-icon>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥198.5</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view> -->
		</view>
		
		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				payType: 1, // 判断支付方式
				total: 0,//实付款金额
			};
		},
		computed: {
		
		},
		onLoad(options) {
			// 将接受的总价 赋值出去
			this.total = options.total
		},

		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm: async function() {
				// 将原始数据取出
				let foods = uni.getStorageSync('storagefoods');
				// console.log(foods);
				// 将 在 购物车 但未购买的餐品信息同步，完成确认订单后清除购物车中已购买的餐品
				(this.addOn || []).forEach(res => {
					if(!res.check) {
						foods.result.forEach(val => {
							if(res.name == val.name) {
								val.check = res.check
								val.number = res.number
							} else {
								val.check = false
								val.number = 0
							}
						})
					}
				})
				// 将同步完成的数据赋给全局变量
				this.$u.vuex('FOODS', foods)
				this.$u.vuex('addOn', [])
				
				// let data = {total: this.total, foods: [...this.suredata]}
				// // 将确认的订单加入数据库
				// await uniCloud.callFunction({
				// 	name: 'private',
				// 	data: {
				// 		openid: this.VXopenid,
				// 		sureOrder: data
				// 	},
				// 	success: (res) => {
				// 		console.log(res);
				// 	}
				// })
				// this.$u.vuex('suredata',this.dcdata)
				uni.redirectTo({
					url: '/pages/order/pay/paySuccess'
				})
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #909399;

		.price{
			font-size: 50rpx;
			color: #303133;
			margin-top: 12rpx;
			&:before{
				content: '￥';
				font-size: 40rpx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20rpx;
		background-color: #fff;
		padding-left: 60rpx;
		
		.type-item{
			height: 120rpx;
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60rpx;
			font-size: 30rpx;
			position:relative;
		}
		
		.icon{
			width: 100rpx;
			font-size: 52rpx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: 24rpx;
			color: #01aaef;
			margin-bottom: 4rpx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: 24rpx;
			color: #fa436a;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630rpx;
		height: 80rpx;
		margin: 80rpx auto 30rpx;
		font-size: 30rpx;
		color: #fff;
		background-color: #fa436a;
		border-radius: 10rpx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
