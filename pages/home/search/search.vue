<template>
	<view>
		<u-search placeholder="想吃点啥" bg-color="#edf1f9" v-model="searchValue"></u-search>
		
		<!-- <search-list></search-list> -->
		<view>
			{{searchData}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				dcdata: [
					{name: '100'},
					{name: '120'},
					{name: '130'}
				]
			}
		},
		methods: {

		},
		computed: {
			searchData() {
					return this.dcdata.filter(item => {
						return item.name.includes(this.searchValue)
					})
			}
		}
	}
</script>

<style>

</style>
