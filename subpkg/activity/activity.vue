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
					<view><p>活动时间: </p>2022-1~~2022-5</view>
					<view><p>参与形式: </p>成功推广</view>
					<view><p>奖励: </p>一年有效期无门槛五十元优惠卷</view>
					
					<p>1.开店大吉，万事如意，生意兴隆，幸福陪着你，辉煌走开去，幸福生活，灿烂明天，生活目标，奋斗陪着你，愿你万事如意，努力有成功，买卖有收获，愿你发财在今朝，兴隆在此刻。</p>

					<p>2.开业迎贵人，真心来指点；开业载福根，四季结善缘；开业装好运，日日进斗金！欣闻贵店开业，前来道喜，祝财源广进！</p>

					<p>3.值此开张大喜之日，我特邀“齐天大圣”为你祥云喝彩，“天蓬元帅”为你佳肴待宾，“卷帘大将”为你接礼迎福，“旃檀功德佛”为你八方求财，最后祝你：生意兴隆达三江，财源茂盛通四海！开张大吉</p>
				`,
				style: {
					// 字符串的形式
					h1: 'color: #c54541;',
					p: 'color: #3b3b3b;font-size:35rpx',
					span: 'font-size: 30rpx'
				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.u-content {
		// margin-top: 100rpx;
		// color: $u-content-color;
		// font-size: 32rpx;
		line-height: 1.8;
	}
</style>
