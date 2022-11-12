<template>
	<layout-default>
		<view class="wrapper">
			<location-header></location-header>
			<view class="content-wrapper">
				<view class="search-bar-block block">
					<search-bar class="search-bar" :disabled='true'></search-bar>
					<u-icon name="fenleiorguangchangorqitatianchong" custom-prefix="book-icon" size="40" color="#000">
					</u-icon>
				</view>
				<FatFatMeng-Swiper-mfw class='' :list='data'></FatFatMeng-Swiper-mfw>
				<view class="block">
					<portal-grid></portal-grid>
				</view>
				<good-swiper></good-swiper>
			</view>
		</view>
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
		methods: {}
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
