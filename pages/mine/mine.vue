<template>
	<view>
		<view class="userStyle" @click="updateUserProfile">
			<view class="u-m-b-20 u-m-t-40">
				<u-avatar :src="userInfo.avatarUrl || ''" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18">{{userInfo.nickName || '点击登录'}}</view>
			</view>
		</view>
		
		<view class="u-m-t-30">
			<u-cell-group>
				<navigator url="../../subpkg/collect/collect" hover-class="none">
					<u-cell-item icon="star" title="我的收藏" ></u-cell-item>
				</navigator>
				<navigator url="../../subpkg/allOrders/allOrders" hover-class="none">
					<u-cell-item icon="bag" title="全部订单"></u-cell-item>
				</navigator>
				<navigator url="../../subpkg/complaint/complaint" hover-class="none">
					<u-cell-item icon="kefu-ermai" title="用户反馈"></u-cell-item>
				</navigator>
				<u-cell-item icon="man-delete" title="退出登录" @click="logout()"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import loginUser from "../../common/currentUser.js"
	export default {
		data() {
			return {
				userInfo:null,
			}
		},
		// 云函数
		async onLoad(){
			// 将用户信息存入本地存储
			const storage = uni.getStorageSync('storageLogin');
			// console.log(storage);
			if(storage) {
				this.userInfo = storage
			} else {
				this.userInfo  = await loginUser.login();
			}
			
			// 将用户openid存储在vuex中
			this.$u.vuex('VXopenid',this.userInfo.openid || '')

		},
		async onShow() {
			await this.updateUserProfile()
			
			// 根据用户id将用户的私有信息同步到商品
			if(this.VXopenid != '') {
				const db = uniCloud.database();
				const res = await db.collection('comment-favorites').where({
					openid: this.VXopenid
				}).get()
				let data = res.result.data;
				console.log(data);
				let FOODS = this.FOODS;
				
				// console.log(FOODS);
			}
		},
		methods: {
			updateUserProfile(){
				if(!this.userInfo || this.userInfo.nickName==='') {
					uni.getUserProfile({
						desc: '用于完善会员资料',
						success: (res) => {
							this.userInfo = Object.assign({},this.userInfo,res.userInfo);
							// console.log(this.userInfo);
							loginUser.updateUser(this.userInfo);
							// 设置缓存
							uni.setStorageSync('storageLogin', this.userInfo);
						}
					})
				}
			},
			async logout(){
				// 立即改变页面状态
				this.userInfo = null
				// 清除缓存
				uni.clearStorageSync('storageLogin');
				this.$u.vuex('VXopenid','')
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
