<template>
	<!-- 我的订单 -->
	<view>
		<block v-for="(item,index) in res_data" :key="index">
		<view class="my-order-view"  @click="check(item.transac_status,item._id)">
			<view class="my-order-name">
				<text>柠檬小铺</text>
				<text>{{item.transac_status == 'success' ? '已完成' : '正在出餐'}}</text>
			</view>
			<view class="my-order-number">
				<view>
					<view>
						<text style="color: #000000;">餐桌号 ：</text>
						<text>{{item.table_number}}</text>
					</view>
					<view class="u-m-t-15">
						<view v-for="(item,index) in res_data" :key="index" style="color: #000000;">
							<block>宫保鸡丁</block>
							<text>X{{item.table_number}}</text>
							<!-- <text style="color: red;">单价￥{{item.sett_amount}}</text> -->
						</view>
					</view>
					<view class="my-order-time">
						<text style="color: #000000;">下单时间 ：</text>
						<text>{{item.order_time}}</text>
					</view>
				</view>
				<view class="my-order-price">¥{{item.sett_amount}}</view>
			</view>
		</view>
		</block>
		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
export default{
	
	data() {
		return {
			res_data:[{
				transac_status:'none',
				table_number:1,
				order_time:'2022-02-9 20:12',
				sett_amount:'13'
			}]
		}
	},
	methods:{
		
	},
	onLoad() {
		
	}
}
</script>

<style>
page{background-color: #f4f4f4;}
.my-order-view{
	background-color: #FFFFFF;
	border-radius: 10rpx;
	margin: 20rpx;
	padding: 20rpx;
}
.my-order-name{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 20rpx;
	border-bottom: 1rpx solid #e5e5e5;
}
.my-order-name text:nth-child(1){
	font-weight: bold;
}
.my-order-number{
	padding-top: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #999999;
}
.my-order-time{
	flex-shrink: unset;
	padding-top: 20rpx;
}
.my-order-price{
	align-self: flex-end;
	color: #d31c1c;
	font-weight: bold;
}
</style>
