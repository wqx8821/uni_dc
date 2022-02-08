<template>
	<view style="background-color: #f8f8f8;">
		<u-search 
			placeholder="想吃点啥" 
			bg-color="#edf1f9" 
			:focus="true" 
			v-model="searchValue" 
			:show-action='false'
			margin="0 15rpx"
			>
		</u-search>

		<search-list :searchValue="searchValue"></search-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: ''
			}
		},
		methods: {

		},
		computed: {

		}
	}
</script>

<style>

</style>
