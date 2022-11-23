<template>
	<view class='item-common-wrapper'>
		<z-paging ref="paging" :use-virtual-list='true' cell-height-mode="fixed" @scroll='onScoll' virtual-list-col='2'
			:scrollable='swiperScrollable.value' v-model="pagingList" @query="queryList"
			:paging-content-style="pagingContentStyle" :safe-area-inset-bottom='true' :refresher-complete-delay='300'
			:inner-list-style='innerListStyle' @scrolltoupper='onScrolltoupper' :refresher-enabled='false'
			:inner-cell-style="innerCellStyle">
			<template #cell='{item,index}'>
				<good-list-item :good='item'></good-list-item>
			</template>
		</z-paging>
	</view>
</template>

<script>
	import PortalGrid from './grid.vue'
	import {
		guessLike
	} from '@/services/portal.js'
	export default {
		name: 'GoodSwiperItemCommon',
		components: {
			PortalGrid
		},
		inject: {
			swiperScrollable: {
				// 从good-swiper.vue中提供
				default: () => ({
					value: false
				})
			}
		},
		data() {
			return {
				innerListStyle: {
					'display': 'flex',
					'flex-wrap': 'wrap',
					'justify-content': 'space-between',
					margin: '0 var(--app-page-gap)',
				},
				innerCellStyle: {
					width: '48%'
				},
				pagingContentStyle: {
					padding: '0 0 calc(var(--app-page-gap) * 2) 0'
				},
				pagingList: [],
				_scrollable: false,
			}
		},
		props: {
			loadmore: {
				type: Function,
				required: true
			},
		},
		mounted() {},
		methods: {
			onScrolltoupper() {
				this.swiperScrollable.value = false
			},
			queryList(page, size) {
				this.loadmore(page, size).then(res => {
					this.$refs.paging.complete(res.records);
				}, e => {
					this.$refs.paging.complete(false);
				})
			},
			scrollToTop() {
				this.$refs.paging.scrollToTop(false)
				// 其实回顶的时候还是需要刷新，不然几个地方一起滚动太卡了
				this.$nextTick(() => {
					this.$refs.paging.reload(true)
				})
			},
			onScoll(e) {
				this.$emit('scoll', e)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item-common-wrapper {}
</style>
