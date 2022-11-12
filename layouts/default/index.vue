<template>
	<view class='wrapper'>
		<slot></slot>
		<layout-default-footer></layout-default-footer>
	</view>
</template>

<script>
	import LayoutDefaultFooter from './footer/index.vue'
	export default {
		name: 'LayoutDefault',
		components: {
			LayoutDefaultFooter
		}
	}
</script>

<style lang='scss' scoped>
</style>
