<template>
	<view class="about-shadow tn-margin-top-lg tn-padding-top-sm tn-padding-bottom-sm tn-bg-white order-grid">
		<view v-for="row in dataList" :key="row.label">
			<view class="tn-flex order-grid__head" @click="go(row.pagePath)">
				<text>{{row.label}}</text>
				<view class="tn-color-gray tn-icon-right"></view>
			</view>
			<view class="tn-flex tn-flex-row-center tn-radius ">

				<view class="tn-padding-sm tn-margin-xs tn-radius" @click="go(item.pagePath)"
					v-for="item in row.children" :key="item.label">
					<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
						<view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
							<u-icon :name="item.icon" custom-prefix="book-icon" color="#080808"></u-icon>
						</view>
						<view class="tn-text-center">
							<text class="tn-text-ellipsis">{{item.label}}</text>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UserIndexOrderGrid',
		data() {
			return {
				dataList: [{
					label: '我买入的',
					icon: '',
					pagePath: '',
					children: [{
						label: '待付款',
						icon: '31daifukuan',
						pagePath: ''
					}, {
						label: '待发货',
						icon: '31daishouhuo',
						pagePath: ''
					}, {
						label: '待收货',
						icon: '31daifahuo',
						pagePath: ''
					}, {
						label: '已完成',
						icon: 'zhengquewancheng-xianxingyuankuang',
						pagePath: ''
					}, {
						label: '已取消',
						icon: 'yiquxiao',
						pagePath: ''
					}, ]
				}, {
					label: '我卖出的',
					icon: '',
					pagePath: '',
					children: [{
						label: '待到款',
						icon: 'yishoukuan',
						pagePath: ''
					}, {
						label: '待发货',
						icon: 'daifahuo',
						pagePath: ''
					}, {
						label: '待取件',
						icon: 'chaibaoguoqujian-xianxing',
						pagePath: ''
					}, {
						label: '已完成',
						icon: 'zhengquewancheng-xianxingyuankuang',
						pagePath: ''
					}, {
						label: '已取消',
						icon: 'yiquxiao',
						pagePath: ''
					}, ]
				}]
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
	.order-grid {
		&__head {
			align-items: center;
			justify-content: space-between;
			padding-bottom: 10px;
			margin: 10px 40rpx 5px;
			border-bottom: 1px solid #{$u-form-item-border-color};
		}
	}


	.icon12 {
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
				width: 15rpx;
				height: 15rpx;
				font-size: 50rpx;
				border-radius: 50%;
				margin-bottom: 38rpx;
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
