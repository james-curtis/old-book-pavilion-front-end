<template>
	<view class='item-common-wrapper'>
		<z-paging ref="paging" :use-virtual-list='true' cell-height-mode="dynamic" @scroll='onScoll'
			:virtualList.sync='virtualList' :scrollable='scrollable' v-model="pagingList" @query="queryList"
			:paging-style='pagingStyle'>
			<template #cell='{item,index}'>
				<good-list-item :index='index'></good-list-item>
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
		data() {
			return {
				pagingStyle: {
					// height: 'calc(100vh - 44px - 40px - 50px)'
				},
				pagingList: [],
				virtualList: []
			}
		},
		props: {
			loadmore: {
				type: Function,
				required: true
			},
			scrollable: {
				type: Boolean,
				default: true
			}
		},
		mounted() {},
		methods: {
			queryList(page, size) {
				this.loadmore(page, size).then(res => {
					this.$refs.paging.complete(res.records);
				}, e => {
					this.$refs.paging.complete(false);
				})
			},
			scrollToTop() {
				this.$refs.paging.scrollToTop(false)
				/// 其实回顶的时候可以不用刷新
				// this.$nextTick(() => {
				// 	this.$refs.paging.reload(true)
				// })
			},
			onScoll(e) {
				this.$emit('scoll', e)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item-common-wrapper {
		margin: 0 $app-page-gap;
	}
</style>
