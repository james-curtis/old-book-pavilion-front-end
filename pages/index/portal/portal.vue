<template>
	<layout-default>
		<z-paging class='paging' ref="paging" v-model="dataList" :auto-clean-list-when-reload="false"
			:refresher-complete-delay='500' :min-delay='500' :auto-scroll-to-top-when-reload="false"
			:created-reload='true' lower-threshold='750rpx' @query="queryList" @onRefresh='onRefresh'
			:paging-style='{"padding-bottom":"calc(var(--delta-tabbar-height) + var(--safe-bottom))"}'
			:loading-more-custom-style='{"margin-bottom":"25px"}'>
			<location-header />
			<view class="content-wrapper">
				<view class="search-bar-block block">
					<search-bar class="search-bar" @click='goSearchPage' :disabled='true' />
					<u-icon name="fenleiorguangchangorqitatianchong" custom-prefix="book-icon" size="40" color="#000" />
				</view>
				<FatFatMeng-Swiper-mfw :list='data' />
				<view class="block">
					<portal-grid />
				</view>
			</view>
			<u-sticky class='tabs-sticky'>
				<z-tabs class='tabs-sticky__ztabs' :list="waterfallList" @change="onTabsChange" :is-scroll='false' />
			</u-sticky>
			<good-waterfall ref="portalWaterfall" :list='dataList' />
		</z-paging>
	</layout-default>
</template>

<script>
	import * as PortalService from '@/services/portal.js'
	import {
		mapState
	} from 'vuex'
	import {
		bannerList
	} from '@/services/portal.js'
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
		},
		data() {
			return {
				data: Swiper_mfw_index_data,
				bannerList: [],
				dataList: [],

				waterfallList: [{
						name: '猜你喜欢',
						api: PortalService.guessLike
					},
					{
						name: '最新发布',
						api: PortalService.latestGoods
					},
					{
						name: '热门图书',
						api: PortalService.hotGoods
					},
					{
						name: '降价图书',
						api: PortalService.saleGoods
					},
				],
				currentTab: 0,
			}
		},
		computed: {
			...mapState({
				cooperationLink: s => s.config.portal.cooperationLink
			}),
			waterfallLoadApi() {
				return this.waterfallList[this.currentTab].api
			}
		},
		async created() {
			this.bannerList = await bannerList()
		},
		methods: {
			queryList(page, size) {
				this.waterfallLoadApi(page, size).then(res => {
					this.$refs.paging.complete(res.records);
				}, e => {
					this.$refs.paging.complete(false);
				})
			},
			onTabsChange(index) {
				this.currentTab = index;
				this.$refs.portalWaterfall.reload()
				//当切换tab时请调用组件的reload方法，请勿直接调用：queryList方法！！
				this.$refs.paging.reload();
			},
			onRefresh() {
				this.$refs.portalWaterfall.reload()
			},
			goSearchPage() {
				uni.navigateTo({
					url: '/pages/index/search'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.paging {
		--safe-bottom: calc(constant(safe-area-inset-bottom));
		--safe-bottom: calc(env(safe-area-inset-bottom));
		--delta-tabbar-height: calc(50px);
	}

	.content-wrapper {

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

	.tabs-sticky {
		/deep/ .u-sticky {
			// 防止在微信小程序下z-tabs塌陷
			width: 100vw #{!important};
		}

		&__ztabs {
			width: 750rpx #{!important};
			height: 80rpx #{!important};
		}
	}
</style>
