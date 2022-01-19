<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-m-t-30" @click="updateUserProfile">
			<view class="u-m-r-10">
				<u-avatar :src="userInfo.avatarUrl" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo.nickName}}</view>
				<view class="u-font-14 u-tips-color">卡号</view>
			</view>

			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="heart" title="会员办理"></u-cell-item>
				<u-cell-item icon="star" title="收藏"></u-cell-item>
				<u-cell-item icon="coupon" title="卡券"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-80">
			<u-button>退出登录</u-button>
		</view>
	</view>
</template>

<script>
	import cloudApi from '../../common/cloudApi.js'
	export default {
		data() {
			return {
				pic:'',
				show:true,
				userInfo:null,
			}
		},
		methods: {
			updateUserProfile(){
				uni.getUserProfile({
					// desc提示信息
					desc: '用于完善会员资料',
					success: (res) => {
						this.userInfo = Object.assign(this.userInfo,res.userInfo);
						cloudApi.call({
							name: 'updateuserinfo',
							data: {
								userInfo: this.userInfo
							}
						})
					}
				})
				console.log(this.userInfo);
			},
		},
		// 云函数
		async onLoad(options){
			uni.login({
				provider: "weixin",
				success: (res) => {
					let code = res.code;
					cloudApi.call({
						name: "login",
						data: {
							code
						},
						success: (res) => {
							this.userInfo = res.result
						}
					})
				},
		
			})
		}
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}

</style>
