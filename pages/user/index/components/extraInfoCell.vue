<template>

	<!-- 更多信息-->
	<view class="about-shadow tn-margin-top-lg tn-padding-top-sm tn-padding-bottom-sm">
		<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="go(item.pagePath)"
			v-for="item in dataList" :key="item.label">
			<view class="tn-flex tn-flex-col-center">
				<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center" style="color: #7C8191;">
					<view :class="[item.icon]"></view>
				</view>
				<view class="tn-margin-left-sm tn-flex-1">{{item.label}}</view>
				<view class="tn-color-gray tn-icon-right"></view>
			</view>
		</tn-list-cell>
	</view>
</template>

<script>
	export default {
		name: 'ExtraInfoCell',
		data() {
			return {
				dataList: [{
					label: '联系我们',
					icon: 'tn-icon-tel-circle-fill',
					pagePath: ''
				}, {
					label: '常见问题',
					icon: 'tn-icon-message-fill',
					pagePath: ''
				}, {
					label: '用户协议',
					icon: 'tn-icon-safe-fill',
					pagePath: ''
				}, {
					label: '关于旧书阁',
					icon: 'tn-icon-science-fill',
					pagePath: ''
				}, ]
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
	.icon1 {
		&__item {
			// width: 30%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 40rpx;
				height: 40rpx;
				font-size: 40rpx;
				border-radius: 50%;
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
					background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg.png);
				}
			}
		}
	}
</style>
