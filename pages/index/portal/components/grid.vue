<template>
	<u-grid :col='4' class='' :border='false'>
		<u-grid-item class='grid-nav'>
			<image class="grid-nav--img" src="@/static/logo.png" mode="aspectFill"></image>
			<text>图书分类</text>
		</u-grid-item>
		<u-grid-item class='grid-nav'>
			<image class="grid-nav--img" src="@/static/logo.png" mode="aspectFill"></image>
			<text>合作洽谈</text>
		</u-grid-item>
		<u-grid-item class='grid-nav'>
			<image class="grid-nav--img" src="@/static/logo.png" mode="aspectFill"></image>
			<text>邀请有奖</text>
		</u-grid-item>
		<u-grid-item class='grid-nav'>
			<image class="grid-nav--img" src="@/static/logo.png" mode="aspectFill"></image>
			<text>常见问题</text>
		</u-grid-item>
	</u-grid>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		// 首页
		name: 'PortalGrid',
		components: {},
		data() {
			return {}
		},
		computed: {
			...mapState({
				cooperationLink: s => s.config.portal.cooperationLink
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content-wrapper {
		.block {
			margin: 0 20rpx;
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
