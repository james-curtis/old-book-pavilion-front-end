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
				<u-grid :col='4' class='block' :border='false'>
					<u-grid-item>
						111
					</u-grid-item>
					<u-grid-item>
						111
					</u-grid-item>
					<u-grid-item>
						111
					</u-grid-item>
					<u-grid-item>
						111
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</layout-default>
</template>

<script>
	import {
		Swiper_mfw_index_data
	} from '@/uni_modules/FatFatMeng-Swiper-mfw/components/FatFatMeng-Swiper-mfw/index.js'
	import LayoutDefault from '@/layouts/default/index.vue'
	export default {
		// 首页
		name: 'IndexPortal',
		components: {
			LayoutDefault
		},
		data() {
			return {
				data: Swiper_mfw_index_data
			}
		},
		onLoad() {

		},
		beforeMount() {},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content-wrapper {
		.block {
			margin: 0 20rpx;
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
</style>
