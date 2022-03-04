<template>
	<view class="mineStyle">
		<view class="userStyle" @click="updateUserProfile">
			<view class="u-m-b-20 u-m-t-40">
				<u-avatar :src="userInfo.avatarUrl || ''" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18">{{userInfo.nickName || '点击登录'}}</view>
			</view>
		</view>

		<view class="background-color: #c8c8c8;">
			<u-grid :col="2" border=false>
					<navigator url="../../subpkg/collect/collect" hover-class="none">
						<u-grid-item bg-color='#f8f8f8'>
							<u-icon name="star" :size="50"></u-icon>
							<view class="grid-text">我的收藏</view>
						</u-grid-item>
					</navigator>
					<navigator url="../../subpkg/allOrders/allOrders" hover-class="none">
						<u-grid-item bg-color='#f8f8f8'>
							<u-icon name="bag" :size="50"></u-icon>
							<view class="grid-text">全部订单</view>
						</u-grid-item>
					</navigator>
			</u-grid>
			<u-cell-group>
				<button open-type="contact" style="padding: 0; background-color: #f8f8f8;">
					<u-cell-item icon="kefu-ermai" title="在线客服"></u-cell-item>
				</button>
				<button open-type="feedback" style="padding: 0; background-color: #f8f8f8;">
					<u-cell-item icon="edit-pen" title="用户反馈"></u-cell-item>
				</button>
				<button @click="logout()" style="padding: 0; background-color: #f8f8f8;">
					<u-cell-item icon="man-delete" title="退出登录"></u-cell-item>
				</button>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import loginUser from "../../common/currentUser.js"
	export default {
		data() {
			return {
				userInfo: null,
			}
		},
		// 云函数
		async onLoad() {
			// 将用户信息存入本地存储
			// const storage = uni.getStorageSync('storageLogin');
			// if (storage) {
			// 	this.userInfo = storage
			// } else {
				this.userInfo = await loginUser.login();
			// }

			// 将用户openid存储在vuex中
			this.$u.vuex('VXopenid', this.userInfo.openid || '')

		},
		async onShow() {
			await this.updateUserProfile()
		},
		methods: {
			updateUserProfile() {
				// console.log(11);
				if (!this.userInfo || this.userInfo.nickName === '') {
					uni.getUserProfile({
						desc: '用于完善会员资料',
						success: async (res) => {
							// 调用login方法获得带有token 的用户信息
							const UserInfo = await loginUser.login()
							// 将新老信息合并
							this.userInfo = Object.assign({}, UserInfo, res.userInfo);
							// 将合并后的信息更新进数据库
							loginUser.updateUser(this.userInfo);
							// 设置缓存
							uni.setStorageSync('storageLogin', this.userInfo);
						}
					})
				}
			},
			async logout() {
				// 立即改变页面状态
				this.userInfo = null
				// 清除缓存
				uni.clearStorageSync('storageLogin');
				this.$u.vuex('VXopenid', '')
			}
		},

	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>
<style lang="scss" scoped>
	.mineStyle {
		button::after {
			border:none;
		}
	}
	.userStyle {
		margin: 5vh 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// background-color: #606266;
	}
</style>
