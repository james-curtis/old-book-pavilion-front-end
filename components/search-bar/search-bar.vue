<template>
	<view @click='onClick'>
		<u-search :placeholder='placeholder' v-model='searchPwd' :margin='margin' :disabled='disabled'
			:show-action='!disabled' :style='[style]'>
		</u-search>
	</view>
</template>

<script>
	export default {
		name: 'SearchBar',
		data() {
			return {
				placeholder: '书名/作者/ISBN',
				searchPwd: '',
			}
		},
		props: {
			margin: {
				type: String,
				default: '0'
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			style() {
				return this.disabled ? ({
					'pointer-events': 'none'
				}) : ({})
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		},
	}
</script>

<style lang="scss">
</style>
