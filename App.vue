<script>
	export default {
		onLaunch: async function() {

			
			await uniCloud.callFunction({
				name: 'getFood',
				success: (res) => {
					// console.log(res);
					this.$u.vuex('FOODS', res)
					this.$u.vuex('addOn', res)
				}
			})
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
