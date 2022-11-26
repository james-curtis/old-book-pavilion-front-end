<template>
	<layout-default>
		<view class="mine tn-safe-area-inset-bottom">

			<view class="top-backgroup">
				<image src='/static/user/index/my-bg4.png' mode='widthFix' class='backgroud-image'>
				</image>
			</view>

			<view class="about__wrap" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
				<!-- 图标logo/头像 -->
				<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-bottom"
					style="margin-top: -450rpx;">
					<view class="justify-content-item">
						<view class="tn-flex tn-flex-col-center tn-flex-row-left">
							<view class="logo-pic tn-shadow">
								<view class="logo-image">
									<view class="tn-shadow-blur"
										style="background-image:url('/static/logo.png');width: 110rpx;height: 110rpx;background-size: cover;">
									</view>
								</view>
							</view>
							<view class="tn-padding-right">
								<view class="tn-padding-right tn-padding-left-sm">
									<text class="tn-color-cat tn-text-xl tn-text-bold" v-if="!wechartToken">请先登录</text>
									<text class="tn-color-cat tn-text-xl tn-text-bold" v-else>{{wechartAccount}}</text>
								</view>
								<view class="tn-padding-right tn-padding-top-xs tn-padding-left-sm tn-text-ellipsis"
									v-if="wechartToken">
									<text class="tn-color-gray">尾号: {{String(wechartPhone).slice(-4)}}</text>
								</view>
							</view>

						</view>
					</view>
					<view class="justify-content-item" @click="tn('/minePages/set')">
						<view class="tn-icon-right tn-color-gray">
						</view>
					</view>
				</view>

				<!-- 没有授权，则显示这个授权按钮-->
				<view class="tn-flex tn-flex-row-between" @click="login" v-if="!wechartToken">
					<view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
						<tn-button shape="round" backgroundColor="#1D2541" fontColor="#ffffff" padding="20rpx 0"
							width="40%" shadow>
							<text class="tn-icon-wechat tn-padding-right-xs tn-text-xl"></text>
							<text class="">授权登录</text>
						</tn-button>
					</view>
				</view>

				<view class="tn-margin-top-xl" v-else>
					<view class="button-vip tn-flex tn-flex-row-between tn-flex-col-center tn-shadow-blur"
						style="background: linear-gradient(-120deg, #3E445A, #31374A, #2B3042, #262B3C);">

						<view class="tn-margin-left">
							<view class='title' style="color: #F1C68E;">
								<text class="tn-text-bold tn-text-xl">129 积分</text>
								<!-- <text class="tn-icon-vip-text tn-text-center" style="position: absolute;margin: -22rpx 0 0 0;font-size: 92rpx;"></text> -->
							</view>
							<view class='tn-color-white tn-text-sm tn-padding-top-sm'>邀请好友赚取更多积分</view>
						</view>
						<view class="tn-margin-right">
							<tn-button shape="round" backgroundColor="#F1C68E" fontColor="#634738" padding="10rpx 0"
								width="160rpx" shadow open-type="share">
								<!-- <text class="tn-icon-vip tn-padding-right-sm tn-text-lg"></text> -->
								<text class="tn-text-bold">邀 请</text>
							</tn-button>
						</view>

					</view>
				</view>

				<grid1 :list='userGrid1Info' />

				<order-grid />

				<extra-info-cell />
			</view>

			<view class='tn-tabbar-height'></view>

		</view>
	</layout-default>
</template>

<script>
	import LayoutDefault from '@/layouts/default/index.vue'
	import Grid1 from './components/grid1.vue'
	import OrderGrid from './components/orderGrid.vue'
	import ExtraInfoCell from './components/extraInfoCell.vue'
	export default {
		name: 'UserIndex',
		components: {
			LayoutDefault,
			Grid1,
			OrderGrid,
			ExtraInfoCell
		},
		data() {
			return {
				wechartAccount: '',
				wechartPhone: '',
				wechartToken: null
			}
		},
		computed: {
			userGrid1Info() {
				return [{
					label: '收藏',
					value: 11,
					pagePath: ''
				}, {
					label: '足迹',
					value: 65,
					pagePath: ''
				}, {
					label: '买书订单',
					value: 2,
					pagePath: ''
				}, {
					label: '卖书订单',
					value: 3,
					pagePath: ''
				}, ]
			}
		},
		methods: {
			login() {
				this.wechartToken = '112121'
				this.wechartAccount = 'Curtis'
				this.wechartPhone = '13544445555'
			},
			// 跳转到图鸟官网
			navTuniaoWebsite() {
				uni.navigateToMiniProgram({
					appId: 'wxa698b1eee960632f'
				})
			},
			// 跳转到图鸟UI
			navTuniaoUI() {
				uni.navigateToMiniProgram({
					appId: 'wxf3d81a452b88ff4b'
				})
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
			// 收货地址
			navAddress() {
				uni.chooseAddress({})
			},
			// 震动跳转
			navThanks(e) {
				wx.vibrateShort();
				uni.navigateTo({
					url: '/minePages/thanks'
				})
			},
			//拨打固定电话
			callPhoneNumber() {
				uni.makePhoneCall({
					phoneNumber: "18219128888",
				});
			},
			// 复制开源地址
			copySource() {
				uni.setClipboardData({
					data: "等待上传插件市场",
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		max-height: 100vh;
	}

	/* 底部安全边距 start*/
	.tn-tabbar-height {
		min-height: 120rpx;
		height: calc(140rpx + env(safe-area-inset-bottom) / 2);
		height: calc(140rpx + constant(safe-area-inset-bottom));
	}

	.tn-color-cat {
		color: #1D2541;
	}

	.tn-bg-cat {
		background-color: #1D2541;
	}


	/* 自定义导航栏内容 start */
	.custom-nav {
		height: 100%;

		&__back {
			margin: auto 5rpx;
			font-size: 40rpx;
			margin-right: 10rpx;
			flex-basis: 5%;
			width: 100rpx;
			position: absolute;
		}
	}

	/* 自定义导航栏内容 end */


	/* 顶部背景图 end */


	/* 用户头像 start */
	.logo-image {
		width: 110rpx;
		height: 110rpx;
		position: relative;
		overflow: hidden;
		border-radius: 50%;
	}

	.logo-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border: 8rpx solid rgba(255, 255, 255, 0.05);
		box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 50%;
		overflow: hidden;
		// background-color: #FFFFFF;
	}

	/* 页面 start*/
	.about-shadow {
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	.about {

		&__wrap {
			position: relative;
			z-index: 1;
			margin: 20rpx 30rpx;
		}
	}

	/* 页面 end*/


	/* 图标容器12 start */
	.tn-three {
		position: absolute;
		top: 50%;
		right: 50%;
		bottom: 50%;
		left: 50%;
		transform: translate(-38rpx, -16rpx) rotateX(30deg) rotateY(20deg) rotateZ(-30deg);
		text-shadow: -1rpx 2rpx 0 #f0f0f0, -2rpx 4rpx 0 #f0f0f0, -10rpx 20rpx 30rpx rgba(0, 0, 0, 0.2);
	}

	.icon20 {
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
				width: 100rpx;
				height: 100rpx;
				font-size: 60rpx;
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
					background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg.png);
				}
			}
		}
	}



	.button-vip {
		width: 100%;
		height: 150rpx;
		border-radius: 15rpx;
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



	/* 顶部背景图 start */
	.top-backgroup {
		height: 450rpx;
		z-index: -1;

		.backgroud-image {
			width: 100%;
			height: 450rpx;
			// z-index: -1;
		}
	}

	/* 顶部背景图 end */
</style>
