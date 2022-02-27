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
		<view style="margin-top: 5vh; font-size: 45rpx;">
			用餐满意度:<u-rate :count="count" v-model="value" size="55" gutter="30"></u-rate>
		</view>
		<view style="margin-top: 20vh; text-align: center;">
			<button type="default" size="mini" @click="evaluation()">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 5,
				value: '',
				foodName: '', // 餐品名称
				reviewText: '',   // 评价的文字
				evaluationdata: { // 评价信息整合
					userName: '',
					userAva: '',
					foodName: '',
					content: ''
				} 
			}
		},
		onUnload() {
			uni.navigateBack({
			    delta: 1
			})
		},
		onLoad(option) {
			// 点击评价时将餐品名存储
			this.foodName = option.name
			// 获取用户信息
			const storage = uni.getStorageSync('storageLogin');
			if(storage) {
				this.evaluationdata.userName = storage.nickName
				this.evaluationdata.userAva = storage.avatarUrl
			}
		},
		methods: {
			// 评价文本编辑器事件
			bindTextAreaBlur(e) {
				if(e.detail.value) {
					this.reviewText = e.detail.value
				}
			},
			async evaluation() {
				if(this.reviewText) {
					this.evaluationdata.foodName = this.foodName
					this.evaluationdata.content = this.reviewText
					uni.showLoading({
					    title: '正在评价中....'
					});
					// 将信息存入数据库
					const db = uniCloud.database();
					await db.collection('dc-comments').add(this.evaluationdata);
					
					// 清空加载提示 显示模态框
					uni.hideLoading();
					uni.showModal({
					    title: '评价成功',
					    content: '评价已完成，请点击返回首页',
						showCancel: false,
					    success: function (res) {
							if (res.confirm) {
								uni.switchTab({
									url: '../../pages/home/home'
								})
							}
					    }
					});
				} else {
					uni.showToast({
					    title: '请输入内容哦',
						icon: 'none',
					    duration: 1500
					});
				}
			}
		}
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
