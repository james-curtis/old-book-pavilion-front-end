<template>
	<u-grid :col='4' class='' :border='false' @click="onGridClick">
		<u-grid-item class='grid-nav' v-for="(item,index) in list" :key="item.label" :index='index'>
			<image class="grid-nav__img" :src="item.img" mode="aspectFill"></image>
			<text>{{item.label}}</text>
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
			return {
				list: [{
					label: '图书分类',
					url: '/pages/index/category',
					img: '/static/logo.png'
				}, {
					label: '合作洽谈',
					url: '/pages/index/category',
					img: '/static/logo.png'
				}, {
					label: '邀请有奖',
					url: '/pages/index/category',
					img: '/static/logo.png'
				}, {
					label: '常见问题',
					url: '/pages/index/category',
					img: '/static/logo.png'
				}, ]
			}
		},
		computed: {
			...mapState({
				cooperationLink: s => s.config.portal.cooperationLink
			})
		},
		methods: {
			onGridClick(index) {
				uni.navigateTo({
					url: this.list[index].url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.grid-nav {
		&__img {
			width: 100rpx;
			height: 100rpx;
			margin-bottom: 10rpx;
		}
	}
</style>
