<template>
	<view class="page-wrapper">
		<zero-custom-bar :singleIcon="true" :fixedHolder='false'></zero-custom-bar>
		<u-swiper :list='swiperList' :autoplay="false" mode="number" height="750" />
		<view class="good-title block">{{this.data.title}}</view>
		<view class="good-price block">￥{{price}}</view>
		<view class="good-summary block">{{this.data.summary}}</view>

		<good-section />

		<view class="submit-bar">
			<submit-bar class='submit-bar__content' />
			<view class="submit-bar__placeholder" :style="[submitBarPlaceholderStyle]"></view>
		</view>
	</view>
</template>

<script>
	import GoodSection from './components/good-section.vue'
	import {
		getGood
	} from '@/services/good.js'
	export default {
		// 商品详细
		name: 'GoodDetail',
		components: {
			GoodSection
		},
		data() {
			return {
				goodId: 0,
				data: {},
				submitBarPlaceholderStyle: {
					height: '54px'
				}
			}
		},
		computed: {
			swiperList() {
				return this.data.cover ? [{
					image: this.data.cover
				}] : []
			},
			price() {
				return Number(this.data.price).toFixed(2)
			},
		},
		onLoad(options) {
			if (options.id) this.goodId = options.id
			this.reload()
		},
		mounted() {
			this.init()

		},
		methods: {
			async reload() {
				this.data = await getGood(this.goodId)
			},
			async init() {
				const rect = await this.$u.getRect('.submit-bar__content')
				submitBarPlaceholderStyle.height = `${rect.height}px`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.good-title {
		font-size: 20px;
		margin-bottom: $app-page-gap;
		margin-top: $app-page-gap;
	}

	.good-price {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: $app-page-gap;
	}

	.submit-bar {
		&__content {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
		}

		&__placeholder {
			width: 750rpx;
			height: 54px;
		}
	}
</style>
