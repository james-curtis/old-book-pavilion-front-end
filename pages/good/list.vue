<template>
	<z-paging class='paging' ref="paging" v-model="dataList" :refresher-enabled='false' @query="queryList">
		<view class="good-wrapper">
			<search-bar class="block" @search='reloadSearch' v-model="keyword" />
			<u-sticky>
				<u-dropdown class='good-filter-dropdown'>
					<u-dropdown-item :title="goodTypeTitle" v-model="goodType" :options="goodTypeOptions">
					</u-dropdown-item>
					<u-dropdown-item :title="orderTypeTitle" v-model="orderType" :options="orderTypeOptions">
					</u-dropdown-item>
				</u-dropdown>
			</u-sticky>
			<good-waterfall class='fall' :list='dataList' v-model='keyword'></good-waterfall>
		</view>
	</z-paging>
</template>

<script>
	import {
		goodList
	} from '@/services/good.js'
	export default {
		// 搜索结果，商品列表
		name: 'GoodList',
		data() {
			return {
				keyword: '',
				dataList: [],

				goodType: 0,
				goodTypeOptions: [{
						label: '全部商品',
						value: 0
					},
					{
						label: '新款商品',
						value: 1
					},
					{
						label: '活动商品',
						value: 2
					},
				],
				orderType: 0,
				orderTypeOptions: [{
						label: '综合',
						value: 0
					},
					{
						label: '好评排序',
						value: 1
					},
					{
						label: '价格升序',
						value: 2
					},
					{
						label: '最近上线',
						value: 3
					},
				],
			}
		},
		computed: {
			goodTypeTitle() {
				return this.goodTypeOptions[this.goodType].label
			},
			orderTypeTitle() {
				return this.orderTypeOptions[this.orderType].label
			},
		},
		onLoad(option) {
			if (option.keyword)
				this.keyword = option.keyword
			// this.$refs.paging.reload()
		},
		methods: {
			async queryList(pageNo = 1) {
				goodList(this.keyword, pageNo).then(res => {
					this.$refs.paging.complete(res.records);
				}).catch(res => {
					this.$refs.paging.complete(false);
				})
			},
			reloadSearch(key) {
				this.keyword = key
				this.reload()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.good-wrapper {
		display: flex;
		flex-direction: column;
		gap: $app-page-gap;
	}

	.good-filter-dropdown {
		background-color: white;
		height: 80rpx;
		width: 100vw;

		// /deep/ .u-dropdown__content {
		// 	z-index: 11 #{!important};
		// }

		// /deep/ .u-dropdown__menu {
		// 	z-index: 999;
		// }
	}

	.fall {
		z-index: -2;
	}
</style>
