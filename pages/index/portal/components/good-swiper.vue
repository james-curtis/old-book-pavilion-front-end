<template>
	<view>
		<u-sticky>
			<z-tabs ref="tabs" :list="goodSwipeList" :current="current" @change="onTabsChange" value-key='name'
				bar-animate-mode='worm'>
			</z-tabs>
		</u-sticky>
		<swiper class="swiper" :current="current" @transition="swiperTransition"
			@animationfinish="swiperAnimationfinish">
			<swiper-item class="swiper-item" v-for="item in goodSwipeList" :key="item.name">
				<component :is='item.component'></component>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import GoodSwiperItemGuessLike from './good-swiper-item-guess-like.vue'
	import GoodSwiperItemHotGoods from './good-swiper-item-hot-goods.vue'
	import GoodSwiperItemLatestGoods from './good-swiper-item-latest-goods.vue'
	import GoodSwiperItemSaleGoods from './good-swiper-item-sale-goods.vue'

	export default {
		name: 'GoodSwiper',
		data() {
			return {
				goodSwipeList: [{
					name: '猜你喜欢',
					component: GoodSwiperItemGuessLike
				}, {
					name: '最新发布',
					component: GoodSwiperItemHotGoods
				}, {
					name: '热门图书',
					component: GoodSwiperItemLatestGoods
				}, {
					name: '降价图书',
					component: GoodSwiperItemSaleGoods
				}, ],
				current: 0,
			}
		},
		computed: {},
		mounted() {},
		methods: {
			//tabs通知swiper切换
			onTabsChange(index) {
				this.current = index;
			},
			//swiper滑动中
			swiperTransition(e) {
				this.$refs.tabs.setDx(e.detail.dx);
			},
			//swiper滑动结束
			swiperAnimationfinish(e) {
				this.current = e.detail.current;
				this.$refs.tabs.unlockDx();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		// 80rpx是z-tabs里面固定高度
		// 44px是uview中navbar固定高度
		height: calc(100vh - 44px - 80rpx);
	}
</style>
