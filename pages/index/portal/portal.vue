<template>
	<layout-default>
		<location-header></location-header>
		<view class="wrapper" v-show="isBlockShow">
			<view class="content-wrapper">
				<view class="search-bar-block block">
					<search-bar class="search-bar" :disabled='true'></search-bar>
					<u-icon name="fenleiorguangchangorqitatianchong" custom-prefix="book-icon" size="40" color="#000">
					</u-icon>
				</view>
				<FatFatMeng-Swiper-mfw class='' :list='data'></FatFatMeng-Swiper-mfw>
				<view class="block" id="portal-grid">
					<portal-grid></portal-grid>
				</view>
			</view>
		</view>
		<good-swiper @tabs-fixed='onTabsFixed' @scroll-to-top='onScrollToTop' :page-scroll-top='pageScrollTop'>
		</good-swiper>
	</layout-default>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		bannerList
	} from '@/services/portal.js'
	import GoodSwiper from './components/good-swiper.vue'
	import {
		Swiper_mfw_index_data
	} from '@/uni_modules/FatFatMeng-Swiper-mfw/components/FatFatMeng-Swiper-mfw/index.js'
	import LayoutDefault from '@/layouts/default/index.vue'
	import PortalGrid from './components/grid.vue'
	export default {
		// 首页
		name: 'IndexPortal',
		components: {
			LayoutDefault,
			PortalGrid,
			GoodSwiper
		},
		data() {
			return {
				data: Swiper_mfw_index_data,
				bannerList: [],
				isBlockShow: true,
				pageScrollTop: 0
			}
		},
		computed: {
			...mapState({
				cooperationLink: s => s.config.portal.cooperationLink
			})
		},
		async created() {
			this.bannerList = await bannerList()
		},
		methods: {
			onTabsFixed() {
				this.isBlockShow = false
			},
			onScrollToTop() {
				this.isBlockShow = true
				this.$nextTick(() => {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 100,
						complete: () => {
							this.pageScrollTop = 0
						}
					})
				})
			}
		},
		onPageScroll(e) {
			if (this.isBlockShow)
				this.pageScrollTop = e.scrollTop
		},
	}
</script>

<style lang="scss" scoped>
	.content-wrapper {
		.block {
			margin: 0 $app-page-gap;
			box-sizing: border-box;
		}

		.search-bar-block {
			display: flex;
			gap: 20rpx;
			align-items: center;
			margin-bottom: 20rpx;

			.search-bar {
				flex: 1;
			}

			.category {
				height: 100%;
			}
		}

		/deep/ .Swiper-mfw-index-box {
			background-color: transparent;
		}
	}

	.grid-nav {
		.grid-nav--img {
			width: 100rpx;
			height: 100rpx;
			margin-bottom: 10rpx;
		}
	}
</style>
