<template>
	<view>
		<view class="u-content">
			<u-parse :html="content" :tag-style="style" :show-with-animation="true"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `
					<h1>开业福利！！！<h1>
					<p>小铺新开张，至今日起前来本店消费的食客，送饮料一份，进店帮忙推广宣传送50元代金卷，祝各位食客吃的开心</p>
					<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-91815abe-c96c-4864-8fe8-886aafd84f6f/e57f7483-dd70-40da-85b1-153eed6e0f96.jfif" />
					<h1>开业即送大福利</h1>
					<p>1.您来我就送：单桌消费满100元，送价值42元的金汤酸菜鱼一份（酒水除外，当餐不可使用）。</p>
					<p>2.会员充值有礼：充500元送100元，充1000元送300元。</p>
					
					<p>活动时间: 2022-1~~2022-5</p>
					<p>美食地址: 济水大街老公交站西侧胡同内100米</p>
					<p>奖励: 一年有效期无门槛五十元优惠卷</p>
				`,
				style: {
					// 字符串的形式
					h1: 'color: #d43636;font-size:35rpx',
					p: 'color: #666666;font-size:30rpx',
					span: 'font-size: 30rpx'
				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>
<style lang="scss" scoped>
	.u-content {
		// margin-top: 100rpx;
		// color: $u-content-color;
		// font-size: 32rpx;
		line-height: 2;
	}
</style>
