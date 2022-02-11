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
				<u-cell-item icon="star" title="我的收藏"></u-cell-item>
				<u-cell-item icon="coupon" title="退出登录" @click="logout()"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import loginUser from "../../common/currentUser.js"
	import cloudApi from '../../common/cloudApi.js'
	export default {
		data() {
			return {
				userInfo:null,
			}
		},
		// 云函数
		async onLoad(options){
			this.userInfo = await loginUser.login();
		},
		async onShow() {
			await this.updateUserProfile()
		},
		methods: {
			updateUserProfile(){
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: (res) => {
						this.userInfo = Object.assign(this.userInfo,res.userInfo);
						loginUser.updateUser(this.userInfo);
					}
				})
			},
			logout(){
				loginUser.logout()
				this.userInfo = null
			}
		},
		
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
