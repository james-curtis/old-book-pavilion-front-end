<template>
	<view class='wrapper'>
		<good-list-item></good-list-item>
	</view>
</template>

<script>
	import {
		guessLike
	} from '@/services/portal.js'
	export default {
		name: 'GoodSwiperItemCommon',
		data() {
			return {
				list: []
			}
		},
		async created() {
			this.list = await guessLike()
		}
	}
</script>

<style lang="scss" scoped>
</style>
