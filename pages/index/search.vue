<template>
	<view class="page-wrapper">
		<search-bar class="search-bar block" @search='goSearchResult' />
		<view class="cell block">
			<view>历史搜索</view>
			<view class="cell-list block">
				<view class="cell-list__item" v-for="item in historyList" :key="item" @tap="goSearchResult(item)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="cell block">
			<view>推荐搜索</view>
			<view class="cell-list block">
				<view class="cell-list__item" v-for="item in recommendList" :key="item" @tap="goSearchResult(item)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="cell block">
			<view>热搜榜</view>
			<view class="hot-list block">
				<view class="hot-list__item" v-for="(item,index) in hotRank" :key="item.title"
					@tap="goSearchResult(item.title)">
					<view class="hot-list__item__rank">{{index+1}}</view>
					<view class="hot-list__item__detail">
						<view class="hot-list__item__title">{{item.title}}</view>
						<view class="hot-list__item__hot-degree">热度{{item.hot}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// 对话页面
		name: 'IndexSearch',
		data() {
			return {
				historyList: ['高等数学', '数学分析', '计算机导论', '线性代数', '高等代数', '墨菲定律', '大学物理', ],
				hotRank: [{
						title: '哈利波特',
						hot: Math.round(Math.random() * Math.random() * 10000)
					},
					{
						title: '岛上书店',
						hot: Math.round(Math.random() * Math.random() * 10000)
					},
					{
						title: '斗罗大陆',
						hot: Math.round(Math.random() * Math.random() * 10000)
					},
					{
						title: '余华',
						hot: Math.round(Math.random() * Math.random() * 10000)
					},
					{
						title: '人类简史',
						hot: Math.round(Math.random() * Math.random() * 10000)
					},
					{
						title: '将来的你',
						hot: Math.round(Math.random() * Math.random() * 10000)
					},
					{
						title: '麦家',
						hot: Math.round(Math.random() * Math.random() * 10000)
					},
					{
						title: '谢谢自己够勇敢',
						hot: Math.round(Math.random() * Math.random() * 10000)
					},
					{
						title: '窗边的小豆豆',
						hot: Math.round(Math.random() * Math.random() * 10000)
					},
				]
			}
		},
		computed: {
			recommendList() {
				return this.$u.randomArray(this.historyList.slice(2))
			},
		},
		methods: {
			goSearchResult(keyword) {
				uni.navigateTo({
					url: `/pages/good/list?keyword=${keyword}`,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-wrapper {
		display: flex;
		flex-direction: column;
		gap: $app-page-gap;
	}

	.cell {
		display: flex;
		flex-direction: column;
		gap: $app-page-gap;

		&-list {
			display: flex;
			flex-wrap: wrap;
			gap: $app-page-gap;

			&__item {
				padding: 5px 10px;
				border-radius: 50px;
				background-color: $u-bg-color;
			}
		}

	}

	.hot {
		&-list {
			display: flex;
			flex-direction: column;
			gap: calc(#{$app-page-gap} * 2);

			&__item {
				display: flex;
				align-items: center;
				gap: calc(#{$app-page-gap} * 2);

				&__rank {
					font-weight: bold;
					font-size: 24px;
					color: #fedc5e;
				}

				&__title {}

				&__hot-degree {
					font-size: 12px;
					color: $u-tips-color;
				}
			}
		}
	}
</style>
