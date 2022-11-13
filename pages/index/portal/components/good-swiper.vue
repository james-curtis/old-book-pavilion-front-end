<template>
	<view class="good-swiper-wrapper">
		<u-sticky @fixed="onTabsFixed" h5-nav-height='44'>
			<u-tabs-swiper ref="tabs" :list="goodSwipeList" :current="current" @change="onTabsChange"
				:is-scroll='false'>
			</u-tabs-swiper>
		</u-sticky>
		<swiper class="swiper" :current="swiperCurrent" @transition="swiperTransition"
			@animationfinish="swiperAnimationfinish">
			<swiper-item class="swiper-item" v-for="item in goodSwipeList" :key="item.name">
				<good-swiper-item-guess-like ref="swiper" @scroll='onScoll' :scrollable='scrollable'
					v-if="item.name==='猜你喜欢'">
				</good-swiper-item-guess-like>
				<good-swiper-item-hot-goods ref="swiper" @scroll='onScoll' :scrollable='scrollable'
					v-if="item.name==='热门图书'">
				</good-swiper-item-hot-goods>
				<good-swiper-item-latest-goods ref="swiper" @scroll='onScoll' :scrollable='scrollable'
					v-if="item.name==='最新发布'">
				</good-swiper-item-latest-goods>
				<good-swiper-item-sale-goods ref="swiper" @scroll='onScoll' :scrollable='scrollable'
					v-if="item.name==='降价图书'">
				</good-swiper-item-sale-goods>
			</swiper-item>
		</swiper>
		<view @tap.capture.stop @click.capture.stop="onScrollToTop">
			<u-back-top :scrollTop="scrollTop" />
		</view>
	</view>
</template>

<script>
	import GoodSwiperItemGuessLike from './good-swiper-item-guess-like.vue'
	import GoodSwiperItemHotGoods from './good-swiper-item-hot-goods.vue'
	import GoodSwiperItemLatestGoods from './good-swiper-item-latest-goods.vue'
	import GoodSwiperItemSaleGoods from './good-swiper-item-sale-goods.vue'

	export default {
		name: 'GoodSwiper',
		components: {
			GoodSwiperItemGuessLike,
			GoodSwiperItemHotGoods,
			GoodSwiperItemLatestGoods,
			GoodSwiperItemSaleGoods
		},
		data() {
			return {
				goodSwipeList: [{
						name: '猜你喜欢',
					},
					{
						name: '最新发布',
					}, {
						name: '热门图书',
					}, {
						name: '降价图书',
					},
				],
				current: 0,
				swiperCurrent: 0,
				swiperScrollTop: 0,
				scrollable: false
			}
		},
		props: {
			pageScrollTop: {
				type: Number,
				required: true
			}
		},
		watch: {},
		computed: {
			scrollTop() {
				return this.swiperScrollTop + this.pageScrollTop
			}
		},
		mounted() {},
		methods: {
			//tabs通知swiper切换
			onTabsChange(index) {
				this.swiperCurrent = index;
			},
			//swiper滑动中
			swiperTransition(e) {
				this.$refs.tabs.setDx(e.detail.dx);
			},
			//swiper滑动结束
			swiperAnimationfinish(e) {
				let current = e.detail.current;
				this.$refs.tabs.setFinishCurrent(e.detail.current);
				this.swiperCurrent = current;
				this.current = current;
			},
			onTabsFixed() {
				this.scrollable = true
				this.$emit('tabs-fixed')
			},
			onScoll(e) {
				this.scrollTop = e.scrollTop
			},
			onScrollToTop() {
				this.$refs.swiper[this.current].scrollToTop()
				this.$emit('scroll-to-top')
				setTimeout(() => this.scrollable = false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		// 80rpx是z-tabs里面固定高度
		// 44px是uview中navbar固定高度
		// 50px是uview中tabbar固定高度
		// 48rpx是uview中tabbar的midButton固定高度
		// 2px是防止检测不到吸顶
		height: calc(100vh - 44px - 80rpx - 50px + 2px); // - 48rpx
	}
</style>
