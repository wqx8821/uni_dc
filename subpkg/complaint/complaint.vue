<template>
	<view>
		<textarea value="" placeholder="请留下您的宝贵意见" class="evalText" @blur="bindTextAreaBlur"/>
		<button type="success" size="medium" :ripple="true" shape="circle" plain>提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 评价文本编辑器事件
			bindTextAreaBlur(e) {
				if(e.detail.value) return;
				if(this.reviewText != e.detail.value ) {
					this.reviewText = e.detail.value
				}
			}
		},
	}
</script>

<style>
	.evalText {
		width: 100%;
		background-color: #ebeef5;
	}
</style>
