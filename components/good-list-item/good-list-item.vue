<template>
	<view class="item-wrapper">
		<u-image class='uv-image' :src="img" mode="widthFix">
			<template #loading>
				<u-loading #loading></u-loading>
			</template>
		</u-image>
		<text class="ellipis_text">{{name}}</text>
	</view>
</template>

<script>
	export default {
		name: 'GoodListItem',
		data() {
			return {
				img: '/static/logo.png',
				name: 'item-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapper',
				price: 16.00,
				// 浏览量
				views: 88,
				user: {
					id: 0,
					name: '光速退学Y-_'
				}
			}
		},
		computed: {

		},
		props: {
			good: {
				type: Object,
				requied: true
			},
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.ellipis_text {
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
</style>
