<template>
	<view>
		<view class="goods-section">
			<view class="g-header b-b">
				<u-icon name="home"></u-icon>
				<text class="name">柠檬小铺</text>
			</view>
			<!-- 商品列表 -->
			<view class="g-item" v-for="food in surefoods" :key = "food.name">
				<image :src="food.foods_thumb"></image>
				<view class="right">
					<text class="title clamp">{{food.name}}</text>
					<text class="spec"></text>
					<view class="price-box">
						<text class="price">￥{{food.price}}</text>
						<text class="number">x {{food.number}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 优惠明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b" @click="toggleMask('show')">
				<view class="cell-icon">券</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active">选择优惠券</text>
				<!-- <text class="cell-more wanjia wanjia-gengduo-d"></text> -->
			</view>
			<view class="yt-list-cell b-b">
				<view class="cell-icon hb">减</view>
				<text class="cell-tit clamp">商家促销</text>
				<text class="cell-tip disabled">暂无可用优惠</text>
			</view>
		</view>
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip">￥{{totalPrice || 0}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">-￥{{discount}}</text>
			</view>
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="desc" placeholder="可以备注口味哦" placeholder-class="placeholder" />
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{pay || total}}</text>
			</view>
			<!-- submit跳转pay/pay -->
			<text class="submit" @click="submit">提交订单</text>
		</view>
		
		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				可选用优惠卷
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
					<view class="con" @click="useDiscount(item)">
						<view class="left">
							<text class="title">{{item.title}}</text>
							<text class="time">有效期至2022-06-30</text>
						</view>
						<view class="right">
							<text class="price">{{item.price}}</text>
							<text>满{{item.full}}可用</text>
						</view>
						
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">限新用户使用</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				payType: 1, //1微信 2支付宝
				surefoods: [],// 结算商品数据
				total: 0, // 总价
				pay: 0,// 实付款
				couponList: [
					{
						title: '新用户专享优惠券',
						price: 5,
						full: 30
					},
					{
						title: '商家赠送优惠券',
						price: 15,
						full: 100
					}
				],
			}
		},
		async onLoad(){
			//餐品数据
			this.surefoods = JSON.parse(JSON.stringify(this.suredata))
			this.surefoods = this.surefoods.filter(res => {
				return res.check === true
			})
			// console.log(this.surefoods);
		},
		computed: {
			totalPrice() { // 总价
				 this.total = 0;
				 this.surefoods.forEach(item => {
					this.total += item.number * item.price
				 })
				 // 提前执行一次 实际付款计算，防止跳转支付金额为初始值0
				this.pay = this.total
				return this.total
			},
			discount() { // 优惠价格(优惠卷)
				if(this.pay) {
					return this.total- this.pay
				} else {
					return 0
				}
			}
		},
		methods: {
			// 点击使用优惠卷
			useDiscount(item) {
				// 点击优惠卷若总价大于 满减金额 就计算实付款
				if(this.total >= item.full) {
					this.pay = this.total - item.price
					uni.showToast({
					    title: '选择成功',
					    duration: 500
					});
				} else {
					// 不够满减就提示
					uni.showToast({
					    title: '您的食品总价要大于满减金额哦',
						icon: 'none',
					    duration: 1000
					});
				}
				// 点击优惠卷后关闭优惠卷面板
				this.toggleMask('')
			},
			//显示优惠券面板
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(()=>{
					this.maskState = state;
				}, timer)
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type){
				this.payType = type;
			},
			// 提交订单
			submit(){
				uni.redirectTo({
					url: `/pages/order/pay/pay?total=${this.pay}`
				})
			},
			stopPrevent(){}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f8f8f8;
		padding-bottom: 100upx;
	}
	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: #000000;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: #000000;
			}

			.spec {
				font-size: 26upx;
				color: #000000;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: #000000;
				padding-top: 10upx;

				.price {
					color: #fa436a;
					margin-bottom: 4upx;
				}
				.number{
					font-size: 26upx;
					color: #000000;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}
	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: #000000;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: #000000;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: #e1685d;

			&.disabled {
				color: #e1685d;
			}

			&.active {
				color: #e1685d;
			}
			&.red{
				color: #000000;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: 24rpx;
			color: #000000;
		}
	}
	
	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: #000000;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.price-content{
			padding-left: 30upx;
		}
		.price-tip{
			color: #000000;
			margin-left: 8upx;
		}
		.price{
			font-size: 36upx;
			color: #fa436a;
		}
		.submit{
			display:flex;
			align-items:center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: #fa436a;
		}
	}
	
	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		
		.mask-content{
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.mask-content{
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: #fa436a;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: #000000;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #262626;
			height: 100upx;
		}
		.price{
			font-size: 44upx;
			color: #fa436a;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.tips{
			font-size: 24upx;
			color: #9e2a43;
			line-height: 60upx;
			padding-left: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}

</style>
