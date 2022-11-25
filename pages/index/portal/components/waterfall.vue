<template>
	<u-waterfall v-model="list">
		<template v-slot:left="{leftList}">
			<view v-for="(item, index) in leftList" :key="index">
				<good-list-item :good='item'></good-list-item>
				<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
			</view>
		</template>
		<template v-slot:right="{rightList}">
			<view v-for="(item, index) in rightList" :key="index">
				<good-list-item :good='item'></good-list-item>
				<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
			</view>
		</template>
	</u-waterfall>
</template>

<script>
	export default {
		name: 'PortalWaterfall',
		data() {
			return {}
		},
		props: {
			list: {
				type: Array,
				required: true
			}
		},
		methods: {}
	}
</script>

<style>
</style>
