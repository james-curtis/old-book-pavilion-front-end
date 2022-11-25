<template>
	<u-waterfall v-model="waterfallList" ref='waterfall'>
		<template #left="{leftList}">
			<view class="left-item item" v-for="(item, index) in leftList" :key="item.id">
				<good-list-item :good='item'></good-list-item>
			</view>
		</template>
		<template #right="{rightList}">
			<view class="right-item item" v-for="(item, index) in rightList" :key="item.id">
				<good-list-item :good='item'></good-list-item>
			</view>
		</template>
	</u-waterfall>
</template>

<script>
	export default {
		name: 'PortalWaterfall',
		data() {
			return {
				waterfallList: []
			}
		},
		props: {
			list: {
				type: Array,
				required: true
			}
		},
		watch: {
			list(val) {
				this.waterfallList = val
			}
		},
		mounted() {},
		methods: {
			reload() {
				console.log(111)
				this.$refs.waterfall.clear()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.left-item {
		margin-left: 10px;
		margin-right: 10px;
	}

	.right-item {
		margin-right: 10px;
	}

	.item {
		margin-bottom: 20px;
	}
</style>
