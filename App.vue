<script>
	export default {
		onLaunch: async function() {
			await uniCloud.callFunction({
				name: 'getFood',
				success: (res) => {
					// console.log(res);
					this.$u.vuex('FOODS',res)
					this.$u.vuex('addOn', res)
					uni.setStorageSync('storagefoods', res);
				}
			})
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
