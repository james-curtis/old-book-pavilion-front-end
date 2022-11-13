<template>
	<u-navbar :is-fixed='true' :border-bottom='false' :is-back='false'>
		<view class="map-wrap slot-wrap">
			<u-icon name="map-fill" size="32"></u-icon>
			<text class="map-wrap-text">{{keyword}}</text>
			<u-icon name="arrow-down-fill" color="#333" size="22"></u-icon>
		</view>
	</u-navbar>
</template>

<script>
	export default {
		name: 'LocationHeader',
		data() {
			return {
				keyword: ''
			}
		},
		props: {
			value: {
				type: String,
				default: '轻舟已过万重山'
			}
		},
		watch: {
			value: {
				immediate: true,
				handler(val) {
					this.keyword = val
				}
			},
			keyword(val) {
				this.$emit('input', val)
			}
		}
	}
</script>

<style lang="scss">
	.map-wrap {
		display: flex;
		align-items: center;
		padding: 4px 6px;
		background-color: #fff;
		font-size: 32rpx;
		border-radius: 100rpx;
		margin-left: 30rpx;
		color: $uni-text-color;

		.map-wrap-text {
			padding: 0 6rpx;
		}
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
</style>
