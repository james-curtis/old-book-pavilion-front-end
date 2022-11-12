<template>
	<view class="wrapper">
		<u-image :src="img" width="40%" height="200px">
			<u-loading v-slot="loading"></u-loading>
		</u-image>
	</view>
</template>

<script>
	export default {
		name: 'GoodListItem',
		data() {
			return {
				img: '/static/logo.png'
			}
		},
		computed: {

		},
		props: {
			good: {
				type: Object,
				requied: true
			},
		},
		methods: {

		}
	}
</script>

<style>
</style>
