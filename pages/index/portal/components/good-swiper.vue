<template>
	<view class="good-swiper-wrapper" :style="[goodSwiperWrapperStyle]">
		<!-- <u-sticky @fixed="onTabsFixed" :offsetTop="`${topHeight}px`" :offsetTopForCheck='`${topHeight+2}px`'> -->
		<u-tabs-swiper ref="tabs" :class='[tabsClass]' :list="goodSwipeList" :current="current" @change="onTabsChange"
			:is-scroll='false'>
		</u-tabs-swiper>
		<!-- </u-sticky> -->
		<swiper class="swiper" :current="swiperCurrent" @transition="swiperTransition"
			@animationfinish="swiperAnimationfinish">
			<swiper-item class="swiper-item" v-for="item in goodSwipeList" :key="item.name">
				<good-swiper-item-guess-like ref="swiper" @scroll='onScoll' v-if="item.name==='猜你喜欢'">
				</good-swiper-item-guess-like>
				<good-swiper-item-hot-goods ref="swiper" @scroll='onScoll' v-if="item.name==='热门图书'">
				</good-swiper-item-hot-goods>
				<good-swiper-item-latest-goods ref="swiper" @scroll='onScoll' v-if="item.name==='最新发布'">
				</good-swiper-item-latest-goods>
				<good-swiper-item-sale-goods ref="swiper" @scroll='onScoll' v-if="item.name==='降价图书'">
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

	import {
		STATUS_BAR_HEIGHT,
		NAVBAR_HEIGHT
	} from '@/constant/page.js'

	export default {
		name: 'GoodSwiper',
		components: {
			GoodSwiperItemGuessLike,
			GoodSwiperItemHotGoods,
			GoodSwiperItemLatestGoods,
			GoodSwiperItemSaleGoods
		},
		inject: {
			scrollable: {
				from: 'swiperScrollable',
				default: () => ({
					value: false
				})
			}
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
				// scrollable: {
				// 	value: false
				// },
				goodSwiperWrapperStyle: {
					'--delta-status-bar-height': `${STATUS_BAR_HEIGHT}px`
				},
				statusBarHeight: STATUS_BAR_HEIGHT,
				navbarHeight: NAVBAR_HEIGHT,
				topHeight: NAVBAR_HEIGHT + STATUS_BAR_HEIGHT,
				tabsClass: this.$u.guid(),
			}
		},
		props: {
			pageScrollTop: {
				type: Number,
				required: true
			}
		},
		computed: {
			scrollTop() {
				return this.swiperScrollTop + this.pageScrollTop
			},
		},
		mounted() {
			this.initObserver()
		},
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
				console.log(`onTabsFixed`);
				this.scrollable.value = true
				this.$emit('tabs-fixed')
			},
			onScoll(e) {
				this.scrollTop = e.scrollTop
			},
			onScrollToTop() {
				this.$refs.swiper[this.current].scrollToTop()
				this.$emit('scroll-to-top')
				setTimeout(() => this.scrollable.value = false)
			},
			initObserver() {
				this.disconnectObserver('contentObserver');
				this.$uGetRect('.' + this.tabsClass).then((res) => {
					this.tabsHeight = res.height;
					this.tabsLeft = res.left;
					this.tabsWidth = res.width;
					this.$nextTick(() => {
						this.observeContent();
					});
				});
			},
			observeContent() {
				this.disconnectObserver('contentObserver');
				const contentObserver = this.createIntersectionObserver({
					thresholds: [0.95, 0.98, 0.99, 1]
				});
				const stickyTop = this.topHeight + 2;
				contentObserver.relativeToViewport({
					top: -stickyTop
				});
				contentObserver.observe('.' + this.tabsClass, res => {
					console.log(`contentObserver.observe`, res);
					const top = res.boundingClientRect.top
					const fixed = top <= stickyTop;
					if (fixed) {
						this.onTabsFixed(top);
						// this.$emit('fixed', this.index);
					} else if (this.fixed) {
						// this.$emit('unfixed', this.index);
					}
				});
				this.contentObserver = contentObserver;
			},
			disconnectObserver(observerName) {
				const observer = this[observerName];
				observer && observer.disconnect();
			},
		},
		beforeDestroy() {
			this.disconnectObserver('contentObserver');
		}
	}
</script>

<style lang="scss" scoped>
	.good-swiper-wrapper {
		--unit-20rpx: 20rpx;
		// 44px IOS , 48px Android是uview中navbar固定高度
		--delta-navbar-height: 48px;

		// 50px是uview中tabbar固定高度

		--safe-bottom: calc(constant(safe-area-inset-bottom));
		--safe-bottom: calc(env(safe-area-inset-bottom));
		--delta-tabbar-height: calc(50px);

		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--delta-status-bar-height) - var(--delta-navbar-height) - var(--delta-tabbar-height) - var(--safe-bottom));
	}

	.swiper {
		// height: calc(100vh - var(--delta-status-bar-height) - var(--delta-navbar-height) - var(--delta-tabs-height) - var(--delta-tabbar-height));
		flex: 1;
	}
</style>
