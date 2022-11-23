<template>
	<good-swiper-item-common ref="swiper" :loadmore='loadmore' @scroll='onScoll'>
	</good-swiper-item-common>
</template>

<script>
	import {
		hotGoods
	} from '@/services/portal.js'
	import GoodSwiperItemCommon from './good-swiper-item-common.vue'
	export default {
		name: 'GoodSwiperItemHotGoods',
		components: {
			GoodSwiperItemCommon
		},
		methods: {
			loadmore(page, size) {
				return hotGoods(page, size)
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
