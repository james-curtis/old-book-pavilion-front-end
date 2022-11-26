<template>
	<view class="good-section">
		<view class="good-section__title block">图书信息</view>
		<view class="good-section__info block">图书信息</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.good-section {
		&__title {
			margin-top: calc(#{$app-page-gap} * 2);
			font-weight: bold;
			font-size: 20px;
		}

		&__info {
			margin-top: $app-page-gap;
		}
	}
</style>
