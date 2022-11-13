<template>
	<good-swiper-item-common ref="swiper" :loadmore='loadmore' @scroll='onScoll' :scrollable='scrollable'>
	</good-swiper-item-common>
</template>

<script>
	import {
		guessLike
	} from '@/services/portal.js'
	import GoodSwiperItemCommon from './good-swiper-item-common.vue'
	export default {
		name: 'GoodSwiperItemGuessLike',
		components: {
			GoodSwiperItemCommon
		},
		props: {
			scrollable: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			loadmore(page, size) {
				return guessLike(page, size)
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
