<template>
	<view class="item-wrapper" @click="goDetailPage">
		<u-image class='uv-image' :src="img" mode="widthFix" :fade="false" />
		<text class="ellipis_text item-title">{{title}}</text>
		<view class="item-desc">
			<text class="item-desc__price">￥{{Number(price).toFixed(2)}}</text>
			<text class="item-desc__communicated">{{views}}沟通过</text>
		</view>
		<view class="item-owner" @click="goUserPage">
			<u-avatar :src='userInfo.avatar' size='50' />
			<text class="item-owner__name">{{this.userInfo.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'GoodListItem',
		data() {
			return {
				img: '/static/logo.png',
				title: 'item-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapperitem-common-wrapper',
				price: 16.00,
				// 浏览量
				views: 88,
				userInfo: {
					id: 0,
					name: '光速退学Y-_',
					avatar: '/static/logo.png'
				},
				goodId: 0
			}
		},
		created() {
			this.goodId = this.id
			this.views = this.good.views
			this.title = this.good.title
			this.img = this.good.cover
			this.price = this.good.price
			this.userInfo.avatar = this.good.avatar
			this.userInfo.id = this.good.userId
			this.userInfo.name = this.good.createBy
		},
		props: {
			good: {
				type: Object,
				requied: true
			},
		},
		methods: {
			goDetailPage() {
				uni.navigateTo({
					url: `/pages/good/detail/detail?id=${this.id}`
				})
			},
			goUserPage() {
				uni.navigateTo({
					url: `/pages/user/index?id=${this.userInfo.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item-wrapper {
		display: flex;
		flex-direction: column;
		gap: 5px
	}

	.ellipis_text {
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.item-desc {
		&__price {
			font-size: 20px;
			font-weight: bold;
		}

		&__communicated {
			font-size: 12px;
			color: $u-tips-color;
		}
	}

	.item-owner {
		&__name {
			color: $u-tips-color;
		}
	}

	.item-desc,
	.item-owner {
		display: flex;
		gap: 10px;
		align-items: center;
	}
</style>
