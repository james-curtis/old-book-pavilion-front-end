<template>
	<layout-default>
		<u-image width="750" src="/static/publish/publish/banner.png" mode="widthFix"></u-image>

		<view class="trade-timeline card">
			<view class="trade-timeline__title">交易流程</view>
			<view class='trade-timeline__line'>
				<u-time-line>
					<u-time-line-item nodeTop="2">
						<!-- 此处自定义了左边内容，用一个图标替代 -->
						<template v-slot:node>
							<view class="u-node" style="background: #19be6b;">
								<!-- 此处为uView的icon组件 -->
								<u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-title">Setup.01</view>
								<view class="u-order-desc">
									扫描条码 发布商品
								</view>
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item>
						<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
						<template v-slot:content>
							<view>
								<view class="u-order-title">Setup.02</view>
								<view class="u-order-desc">买家下单 线下交易</view>
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item>
						<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
						<template v-slot:content>
							<view>
								<view class="u-order-title">Setup.03</view>
								<view class="u-order-desc">卖家确认 完成交易</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
			</view>
		</view>

		<view class="question-cell block card">
			<view class="question-cell__title">常见问题</view>
			<view class="question-cell__body">
				<u-cell-group :border='false'>
					<u-cell-item :title="item.title" v-for="item in questionList"></u-cell-item>
				</u-cell-group>
			</view>
		</view>

		<view class="button-wrapper">
			<u-row>
				<u-col span="6">
					<u-button>扫码发布</u-button>
				</u-col>
				<u-col span="6">
					<u-button type="primary">手动输入ISBN</u-button>
				</u-col>
			</u-row>
		</view>
	</layout-default>
</template>

<script>
	import LayoutDefault from '@/layouts/default/index.vue'
	export default {
		// 发布商品
		name: 'GoodPublish',
		components: {
			LayoutDefault,
		},
		data() {
			return {
				questionList: [{
						title: '卖书疑问',
						icon: '',
						pagePath: ''
					},
					{
						title: '买书疑问',
						icon: '',
						pagePath: ''
					},
					{
						title: '平台疑问',
						icon: '',
						pagePath: ''
					},
					{
						title: '流程疑问',
						icon: '',
						pagePath: ''
					},
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		background-color: white;
		box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.07);
		border-radius: 15px;
		z-index: 99;
	}

	.button-wrapper {
		margin: 40px 5px;
	}

	.question-cell {
		margin-top: 40px;
		padding: 10px;

		&__title {
			padding: 10px 0 10px 10px;
			font-size: 16px;
		}
	}

	.trade-timeline {
		padding: 20px;
		margin: -40px 10px 0 10px;

		&__title {
			font-size: 16px;
			margin-bottom: 20px;
		}

		&__line {
			padding-left: 10px;

			/deep/ .u-time-axis::before {
				border-color: #19be6b;
			}

			/deep/ .u-dot {
				background: #19be6b;
			}
		}
	}

	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
