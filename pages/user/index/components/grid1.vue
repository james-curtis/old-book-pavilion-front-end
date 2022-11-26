<template>
	<view class="tn-flex tn-flex-row-between tn-bg-white about-shadow tn-margin-top-xl">
		<view class="tn-padding-sm tn-margin-xs" @click="go(item.pagePath)" v-for="item in list" :key="item.label">
			<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center tn-margin-left">
				<view class="icon15__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur">
					{{item.value}}
				</view>
				<view class="tn-text-center">
					<text class="tn-text-ellipsis">{{item.label}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UserIndexGrid1',
		data() {
			return {}
		},
		props: {
			list: {
				type: Array,
				required: true
			}
		},
		methods: {
			// 跳转
			go(e) {
				uni.navigateTo({
					url: e,
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 图标容器15 start */
	.icon15 {
		&__item {
			width: 30%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 50rpx;
				height: 50rpx;
				font-size: 45rpx;
				border-radius: 50%;
				margin-bottom: 18rpx;
				position: relative;
				z-index: 1;

				&::after {
					content: " ";
					position: absolute;
					z-index: -1;
					width: 100%;
					height: 100%;
					left: 0;
					bottom: 0;
					border-radius: inherit;
					opacity: 1;
					transform: scale(1, 1);
					background-size: 100% 100%;


				}
			}
		}
	}
</style>
