<template>
	<good-swiper-item-common ref="swiper" :loadmore='loadmore' @scroll='onScoll'>
	</good-swiper-item-common>
</template>

<script>
	import {
		latestGoods
	} from '@/services/portal.js'
	import GoodSwiperItemCommon from './good-swiper-item-common.vue'
	export default {
		name: 'GoodSwiperItemLatestGoods',
		components: {
			GoodSwiperItemCommon
		},
		methods: {
			loadmore(page, size) {
				return latestGoods(page, size)
			},
			scrollToTop() {
				this.$refs.swiper.scrollToTop()
			},
			onScoll(e) {
				this.$emit('scoll', e)
			}
		}
	}
</script>

<style>
</style>
