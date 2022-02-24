<template>
	<view>
		<!-- 文本编辑 -->
		<textarea value="" placeholder="感谢您的宝贵意见" class="evalText" @blur="bindTextAreaBlur"/>
		<!-- 图片上传 -->
		<!-- <view class="wrap">
			选择图片
			<view class="pre-box" v-if="!showUploadList">
				<view class="pre-item" v-for="(item, index) in lists" :key="index">
					<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="plus" size="60" color="#c0c4cc"></u-icon>
				</view>
			</u-upload>
		</view> -->
		<!-- rate评分 -->
		用餐满意度:<u-rate :count="count" v-model="value" size="60" gutter="30"></u-rate>
		<u-button size="default">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 5,
				value: 0,
				// action: '', // 演示地址
				// showUploadList: false,
				// 如果将某个ref的组件实例赋值给data中的变量，在小程序中会因为循环引用而报错
				// 这里直接获取内部的lists变量即可
				// lists: [],
				reviewText: ''   // 评价的文字
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
		// 只有onReady生命周期才能调用refs操作组件
		// onReady() {
		// 	// 得到整个组件对象，内部图片列表变量为"lists"
		// 	this.lists = this.$refs.uUpload.lists;
		// }
	}
</script>
<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>
<style lang="scss" scoped>
	.evalText {
		width: 100%;
		background-color: #ebeef5;
	}
	.wrap {
		padding: 24rpx;
	}
	.slot-btn {
		width: 341rpx;
		height: 140rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}

	.pre-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.pre-item {
		flex: 0 0 32%;
		border-radius: 10rpx;
		height: 140rpx;
		overflow: hidden;
		position: relative;
		margin: 20rpx 0;
	}

	.pre-item-image {
		width: 100%;
		height: 140rpx;
	}
</style>
