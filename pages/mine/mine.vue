<template>
	<view>
		<view class="userStyle" @click="updateUserProfile">
			<view class="u-m-b-20 u-m-t-40">
				<u-avatar :src="userInfo.avatarUrl || ''" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18">{{userInfo.nickName}}</view>
			</view>
		</view>
		
		<view class="u-m-t-30">
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
		async onLoad(){
			this.userInfo = await loginUser.login();
			// 将用户openid存储在vuex中
			this.$u.vuex('VXopenid',this.userInfo.openid || '')
		},
		async onShow() {
			await this.updateUserProfile()
		},
		methods: {
			updateUserProfile(){
				if(!this.userInfo) {
					uni.getUserProfile({
						desc: '用于完善会员资料',
						success: (res) => {
							this.userInfo = Object.assign(this.userInfo,res.userInfo);
							loginUser.updateUser(this.userInfo);
						}
					})
				}
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
	background-color: #F8F8F8;
}
.userStyle {
	margin: 5vh 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}


</style>
